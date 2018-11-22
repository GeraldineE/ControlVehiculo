firebase.initializeApp({
    apiKey: "AIzaSyAzpSBkup-qt46k0oUtNwU5HzZqEVJegK0",
    authDomain: "proyectoelectivaiii.firebaseapp.com",
    projectId: "proyectoelectivaiii"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

//Agregar documentos
function guardarv(){
    var fmantenimiento = document.getElementById('fmantenimiento').value;
    var elemcambiado = document.getElementById('elemcambiado').value;
    var costo = document.getElementById('costo').value;
    var lugarmanteni= document.getElementById('lugarmanteni').value;
    var valor = document.getElementById('valor').value;
    var descripcion = document.getElementById('descripcion').value;
   

    db.collection("ContManteni").add({
        fmantenimiento: fmantenimiento,
        elemcambiado: elemcambiado,
        costo: costo,
        lugarmanteni: lugarmanteni,
        valor: valor,
        descripcion: descripcion



})

.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('fmantenimiento').value = '';
    document.getElementById('elemcambiado').value = '';
    document.getElementById('costo').value = '';
    document.getElementById('lugarmanteni').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('descripcion').value = '';
   
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("ContManteni").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().fmantenimiento}`);
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().fmantenimiento}</td>
        <td>${doc.data().elemcambiado}</td>
        <td>${doc.data().costo}</td>
        <td>${doc.data().lugarmanteni}</td>
        <td>${doc.data().valor}</td>
        <td>${doc.data().descripcion}</td>
       

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().fmantenimiento}','${doc.data().elemcambiado}','${doc.data().costo}','${doc.data().lugarmanteni}','${doc.data().valor}','${doc.data().descripcion}',${doc.id}')">Editar</button></td>
        </tr>
        `
    });
});
//Borrar documentos
function eliminar(id){
    db.collection("ContManteni").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
    
    //Editar documentos
    function editar(id,fmantenimiento,elemcambiado,costo,lugarmanteni,valor,descripcion){
    
        document.getElementById('fmantenimiento').value = fmantenimiento;
        document.getElementById('elemcambiado').value = elemcambiado;
        document.getElementById('costo').value = costo;
        document.getElementById('lugarmanteni').value = lugarmanteni;
        document.getElementById('valor').value = valor;
        document.getElementById('descripcion').value = descripcion;
       

        var boton = document.getElementById('boton');
        boton.innerHTML = 'Editar';
    
        boton.onclick = function(){
            var washingtonRef = db.collection("ContManteni").doc(id);
            // Set the "capital" field of the city 'DC'
    
            var fmantenimiento = document.getElementById('fmantenimiento').value;
            var elemcambiado = document.getElementById('elemcambiado').value;
            var costo = document.getElementById('costo').value;
            var lugarmanteni= document.getElementById('lugarmanteni').value;
            var valor = document.getElementById('valor').value;
            var descripcion = document.getElementById('descripcion').value;
    
            return washingtonRef.update({
                fmantenimiento: fmantenimiento,
                elemcambiado: elemcambiado,
                costo: costo,
                lugarmanteni: lugarmanteni,
                valor: valor,
                descripcion: descripcion
        
            
    
            })
            .then(function() {
                console.log("Document successfully updated!");
                 
                document.getElementById('fmantenimiento').value = fmantenimiento;
                document.getElementById('elemcambiado').value = elemcambiado;
                document.getElementById('costo').value = costo;
                document.getElementById('lugarmanteni').value = lugarmanteni;
                document.getElementById('valor').value = valor;
                document.getElementById('descripcion').value = descripcion;
               

                boton.innerHTML = 'Guardar';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

          
        }
    
        }    