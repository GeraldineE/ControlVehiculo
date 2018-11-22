firebase.initializeApp({
    apiKey: "AIzaSyAzpSBkup-qt46k0oUtNwU5HzZqEVJegK0",
    authDomain: "proyectoelectivaiii.firebaseapp.com",
    projectId: "proyectoelectivaiii"
  });
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
 

//Agregar documentos
function guardarv(){
    var kminicial = document.getElementById('kminicial').value;
    var kmfinal = document.getElementById('kmfinal').value;
    var factual = document.getElementById('factual').value;
    var resta = kmfinal - kminicial;
    var recorrido = document.getElementById('recorrido').value = resta;
   

    db.collection("ContaKil").add({
        kminicial: kminicial,
        kmfinal: kmfinal,
        factual: factual,
        recorrido: recorrido


})

.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('kminicial').value = '';
    document.getElementById('kmfinal').value = '';
    document.getElementById('factual').value = '';
    document.getElementById('recorrido').value = '';
    

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("ContaKil").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().factual}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().kminicial}</td>
        <td>${doc.data().kmfinal}</td>
        <td>${doc.data().factual}</td>
        <td>${doc.data().recorrido}</td>
      

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().kminicial}','${doc.data().kmfinal}','${doc.data().factual}','${doc.data().recorrido}','${doc.id}')">Editar</button></td>
        </tr>
        `
    });
});
//Borrar documentos
function eliminar(id){
    db.collection("ContaKil").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
    
    //Editar documentos
    function editar(id,kminicial,kmfinal,factual,recorrido){
    
        document.getElementById('kminicial').value = kminicial;
        document.getElementById('kmfinal').value = kmfinal;
        document.getElementById('factual').value = factual;
        document.getElementById('recorrido').value = recorrido;
       

        var boton = document.getElementById('boton');
        boton.innerHTML = 'Editar';
    
        boton.onclick = function(){
            var washingtonRef = db.collection("ContaKil").doc(id);
            // Set the "capital" field of the city 'DC'
    
            var kminicial = document.getElementById('kminicial').value;
            var kmfinal = document.getElementById('kmfinal').value;
            var factual = document.getElementById('factual').value;
            var resta = kmfinal - kminicial;
            var recorrido = document.getElementById('recorrido').value = resta;
    
            return washingtonRef.update({
                kminicial: kminicial,
                kmfinal: kmfinal,
                factual: factual,
                recorrido: recorrido
            
    
            })
            .then(function() {
                console.log("Document successfully updated!");
                 
                document.getElementById('kminicial').value = kminicial;
                document.getElementById('kmfinal').value = kmfinal;
                document.getElementById('factual').value = factual;
                document.getElementById('recorrido').value = recorrido;
               

                boton.innerHTML = 'Guardar';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

          
        }
    
        }    
