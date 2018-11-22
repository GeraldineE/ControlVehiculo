firebase.initializeApp({
    apiKey: "AIzaSyAzpSBkup-qt46k0oUtNwU5HzZqEVJegK0",
    authDomain: "proyectoelectivaiii.firebaseapp.com",
    projectId: "proyectoelectivaiii"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

//Agregar documentos
function guardarv(){
    var fcompra = document.getElementById('fcompra').value;
    var pcompra = document.getElementById('pcompra').value;
    var deprec = document.getElementById('deprec').value;
    var seguro = document.getElementById('seguro').value;
    var soat = document.getElementById('soat').value;
    var tecno = document.getElementById('tecno').value;
    var aceite = document.getElementById('aceite').value;
    var pastas = document.getElementById('pastas').value;
    var llantas = document.getElementById('llantas').value;

    db.collection("ContVehic").add({
    fcompra: fcompra,
    pcompra: pcompra,
    deprec: deprec,
    seguro: seguro,
    soat: soat,
    tecno: tecno,
    aceite: aceite,
    pastas: pastas,
    llantas: llantas,


})

.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('fcompra').value = '';
    document.getElementById('pcompra').value = '';
    document.getElementById('deprec').value = '';
    document.getElementById('seguro').value = '';
    document.getElementById('soat').value = '';
    document.getElementById('tecno').value = '';
    document.getElementById('aceite').value = '';
    document.getElementById('pastas').value = '';
    document.getElementById('llantas').value = '';

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("ContVehic").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().fcompra}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().fcompra}</td>
        <td>${doc.data().pcompra}</td>
        <td>${doc.data().deprec}</td>
        <td>${doc.data().seguro}</td>
        <td>${doc.data().soat}</td>
        <td>${doc.data().tecno}</td>
        <td>${doc.data().aceite}</td>
        <td>${doc.data().pastas}</td>
        <td>${doc.data().llantas}</td>

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().fcompra}','${doc.data().pcompra}','${doc.data().deprec}','${doc.data().seguro}','${doc.data().soat}','${doc.data().tecno}','${doc.data().aceite}','${doc.data().pastas}','${doc.data().llantas}','${doc.id}')">Editar</button></td>
        </tr>
        `
    });
});
//Borrar documentos
function eliminar(id){
    db.collection("ContVehic").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
    
    //Editar documentos
    function editar(id,fcompra,pcompra,deprec,seguro,soat,tecno,aceite,pastas,llantas){
    
        document.getElementById('fcompra').value = fcompra;
        document.getElementById('pcompra').value = pcompra;
        document.getElementById('deprec').value = deprec;
        document.getElementById('seguro').value = seguro;
        document.getElementById('soat').value = soat;
        document.getElementById('tecno').value = tecno;
        document.getElementById('aceite').value = aceite;
        document.getElementById('pastas').value = pastas;
        document.getElementById('llantas').value = llantas;

        var boton = document.getElementById('boton');
        boton.innerHTML = 'Editar';
    
        boton.onclick = function(){
            var washingtonRef = db.collection("ContVehic").doc(id);
            // Set the "capital" field of the city 'DC'
    
            var fcompra = document.getElementById('fcompra').value; 
            var pcompra = document.getElementById('pcompra').value; 
            var deprec = document.getElementById('deprec').value;
            var seguro = document.getElementById('seguro').value;
            var soat = document.getElementById('soat').value;
            var tecno = document.getElementById('tecno').value;
            var aceite = document.getElementById('aceite').value;
            var pastas = document.getElementById('pastas').value;
            var llantas = document.getElementById('llantas').value;

    
            return washingtonRef.update({
                fcompra: fcompra,
                pcompra: pcompra,
                deprec: deprec,
                seguro: seguro,
                soat: soat,
                tecno: tecno,
                aceite: aceite,
                pastas: pastas,
                llantas: llantas,
            })
            .then(function() {
                console.log("Document successfully updated!");
                document.getElementById('fcompra').value = '';
                document.getElementById('pcompra').value = '';
                document.getElementById('deprec').value = '';
                document.getElementById('seguro').value = '';
                document.getElementById('soat').value = '';
                document.getElementById('tecno').value = '';
                document.getElementById('aceite').value = '';
                document.getElementById('pastas').value = '';
                document.getElementById('llantas').value = '';

                boton.innerHTML = 'Guardar';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    
        }    
