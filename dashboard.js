//variables globales
let nombreInput = document.querySelector("#nombre-input"); //# es para determinar que es un id
let tipoIdentiInput = document.querySelector("#tipo-Identi");
let noIdentiInput = document.querySelector("#no-identi");
let areaInput = document.querySelector("#area");
let salarioInput = document.querySelector("#salario-input");
let btnCrear = document.querySelector(".boton-crear"); //.es para determinar que es una clase
let tabla = document.querySelector("#datos-tabla tbody")

//agregar evento
btnCrear.addEventListener("click", ()=>{ //función vacia en flecha
    //alert("Diste click");
    let datosEmpleado = validarForm(); 
    if (datosEmpleado != null){
        guardarDatos(datosEmpleado); //para guardar los datos que se ingresan en el form
    }
    borrarTabla();
    mostrarDatos();
});


//función para validar campos del formulario
function validarForm() {
    let datosForm; //variable vacia para llenarla dentro del if de abajo
    if(nombreInput.value && tipoIdentiInput.value && noIdentiInput.value &&
        areaInput.value && salarioInput.value) {
            datosForm = { //la variable se llena como objeto con los datos del formulario
                nombre : nombreInput.value,
                tipoIdenti : tipoIdentiInput.value,
                noIdenti : noIdentiInput.value,
                area : areaInput.value,
                salario : salarioInput.value
            }
            nombreInput.value = ""; //Esto es para que se vean vacios los input despúes
            tipoIdentiInput.value = ""; //de enviar los datos del formulario
            noIdentiInput.value = "";
            areaInput.value = "";
            salarioInput.value = "";
    } else {
        alert("Todos los campos son obligatorios");
    }
    return datosForm;
}

//Función para guardar datos en localStorage
function guardarDatos(datos) {

    let empleados = []; //crear una lista vacia
    let datosPrevios = JSON.parse(localStorage.getItem("empleados")); //Acá quedarán todos los datos guardados
    
    if(datosPrevios != null) { //para que se pasen los datos guardados a un Array
        empleados = datosPrevios;
    } 

    empleados.push(datos); //agregar el nuevo dato del formulario

    localStorage.setItem("empleados", JSON.stringify(empleados)) //para guardarlos en local
    //y JSON.stringify para que los cambie a string a texto y no quede como objeto
    alert("El empleado fue guardado con exito");
}

//Función para mostrar datos en la tabla
function mostrarDatos() {
    let empleados = []; //crear una lista vacia
    let datosPrevios = JSON.parse(localStorage.getItem("empleados")); //Acá quedarán todos los datos guardados
    
    if(datosPrevios != null) { //para que se pasen los datos guardados a un Array
        empleados = datosPrevios;
    } 
    empleados.forEach((dato, pos)=>{ //para recorrer el Array, es una manera simplificada
        let fila = document.createElement("tr");
    fila.innerHTML = `
        <td> ${pos+1} </td>
        <td> ${dato.nombre} </td>
        <td> ${dato.tipoIdenti} </td>
        <td> ${dato.noIdenti} </td>
        <td> ${dato.area} </td>
        <td> ${dato.salario} </td>
        <td>
            <span onclick= "actualizarEmpleado(${pos})" class="btn-editar btn btn-warning"> 📄 </span>
            <span onclick="eliminarEmpleado(${pos})" class="btn-eliminar btn btn-danger"> ✖️ </span>
        </td>

    `;
    tabla.appendChild(fila);
    }
); 
}

//quitar los campos de la tabla
function borrarTabla() {
    let filas = document.querySelectorAll(".table tbody tr");
    //console.log(filas)
    filas.forEach((f)=>{
        f.remove();
    })
}

//función eliminar un empleado de la tabla
function eliminarEmpleado(pos) {
    let empleados = []; //crear una lista vacia
    let datosPrevios = JSON.parse(localStorage.getItem("empleados")); //Acá quedarán todos los datos guardados
    
    if(datosPrevios != null) { //para que se pasen los datos guardados a un Array
        empleados = datosPrevios;
    } 
    //confirmar empleado a eliminar
    let confirmar = confirm("¿Desea eliminar este empleado " + empleados[pos].nombre + " ?");
    if(confirmar) {
        //alert("Eliminado")
        empleados.splice(pos,1); //eliminar por posición
        alert("Empleado eliminado con exito")
        //guardar los datos que quedaron el localStorage
        localStorage.setItem("empleados", JSON.stringify(empleados));

        borrarTabla();
        mostrarDatos();

        nombreInput.value = ""; //Esto es para que se vean vacios los input despúes
        tipoIdentiInput.value = ""; //de enviar los datos del formulario
        noIdentiInput.value = "";
        areaInput.value = "";
        salarioInput.value = "";
    }
}

//función para actualizar información de empleados
function actualizarEmpleado(pos){
    let empleados = []; //crear una lista vacia
    let datosPrevios = JSON.parse(localStorage.getItem("empleados")); //Acá quedarán todos los datos guardados
    
    if(datosPrevios != null) { //para que se pasen los datos guardados a un Array
        empleados = datosPrevios;
    } 
    //pasar los datos al formulario para editarlos
    nombreInput.value = empleados[pos].nombre;
    tipoIdentiInput.value = empleados[pos].tipoIdenti;
    noIdentiInput.value = empleados[pos].noIdenti;
    areaInput.value = empleados[pos].area;
    salarioInput.value = empleados[pos].salario;
    //seleccionar el botón de actualizar
    let btnActualizar = document.querySelector(".boton-actualizar");
    btnActualizar.classList.toggle("d-none");//toggle hace que si la etiqueta tiene esa clase la quita y si no la tiene entonces la agrega
    btnCrear.classList.toggle("d-none");
    //agregar evento al botón de actualizar
    btnActualizar.addEventListener("click", function(){
        empleados[pos].nombre = nombreInput.value
        empleados[pos].tipoIdenti = tipoIdentiInput.value
        empleados[pos].noIdenti = noIdentiInput.value
        empleados[pos].area = areaInput.value
        empleados[pos].salario = salarioInput.value
        //guardar los datos editados en localStorage
        localStorage.setItem("empleados", JSON.stringify(empleados));
        alert("El dato fue actualizado con exito!");

        borrarTabla();
        mostrarDatos();

        nombreInput.value = ""; //Esto es para que se vean vacios los input despúes
        tipoIdentiInput.value = ""; //de enviar los datos del formulario
        noIdentiInput.value = "";
        areaInput.value = "";
        salarioInput.value = "";
        
        location.reload(); //para que cargue nuevamente la página luego de actualizar
    });
}

function buscadorEmpleados() {
    let searchInput = document.getElementById("searchInput");

    let handleSearch = () => {
        let searchTerm = searchInput.value.toLowerCase();
        let empleados = JSON.parse(localStorage.getItem("empleados")) || []; //para tomar los datos de localStorage

        let filteredEmpleados = empleados.filter((empleado) => 
            empleado.nombre.toLowerCase().startsWith(searchTerm)
        );

        // para limpiar la tabla antes de agregar nuevos resultados
        borrarTabla();

        if (filteredEmpleados.length === 0) {
            let tbody = document.querySelector("#datos-tabla tbody");
            let fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="7" class="text-center">No se encontraron resultados</td>`;
            tbody.appendChild(fila);
        } else {
            filteredEmpleados.forEach((dato, pos) => {
                let fila = document.createElement("tr");
                fila.innerHTML = `
                    <td> ${pos+1} </td>
                    <td> ${dato.nombre} </td>
                    <td> ${dato.tipoIdenti} </td>
                    <td> ${dato.noIdenti} </td>
                    <td> ${dato.area} </td>
                    <td> ${dato.salario} </td>
                    <td>
                        <span onclick= "actualizarEmpleado(${pos})" class="btn-editar btn btn-warning"> 📄 </span>
                        <span onclick="eliminarEmpleado(${pos})" class="btn-eliminar btn btn-danger"> ✖️ </span>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        }
    };

    searchInput.addEventListener("input", handleSearch);
}

buscadorEmpleados();

//evento para detectar si se recarga el navegador e inmediatamente mostrar los datos
document.addEventListener("DOMContentLoaded", ()=>{
    borrarTabla();
    mostrarDatos();
})



