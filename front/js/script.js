
// variable declaration
const btnCrearPedido = document.getElementById("btnCrearPedido");
const btnVerProgramacion = document.getElementById("btnVerProgramacion");
const btnCrearVehiculo = document.getElementById("btnCrearVehiculo");
const btnEditarVehiculo = document.getElementById("btnEditarVehiculo");
const btnEliminarVehiculo = document.getElementById("btnEliminarVehiculo");

const divCrearPedido = document.getElementById("divCrearPedido");
const divVerProgramacion = document.getElementById("divVerProgramacion");
const divCrearVehiculo = document.getElementById("divCrearVehiculo");
const divEditarVehiculo = document.getElementById("divEditarVehiculo");
const divEliminarVehiculo = document.getElementById("divEliminarVehiculo");

// code to be executed at the very beggining of the program execution
$(document).ready(()=> {
    createInitialData();
})

// Events onclick to menu buttons
btnCrearPedido.onclick = () => {showOptionDisplay('divCrearPedido')};
btnVerProgramacion.onclick = () => {showOptionDisplay('divVerProgramacion')};
btnCrearVehiculo.onclick = () => {showOptionDisplay('divCrearVehiculo')};
btnEditarVehiculo.onclick = () => {showOptionDisplay('divEditarVehiculo')};
btnEliminarVehiculo.onclick = () => {showOptionDisplay('divEliminarVehiculo')};

const showOptionDisplay = (divToShow)=> {
    divCrearPedido.style.display = 'none';
    divVerProgramacion.style.display = 'none';
    divCrearVehiculo.style.display = 'none';
    divEditarVehiculo.style.display = 'none';
    divEliminarVehiculo.style.display = 'none';
    
    switch(divToShow) {
        case 'divCrearPedido':
            divCrearPedido.style.display = divCrearPedido.style.display === "none" ? "block" : "none";
            break;
        case 'divVerProgramacion':
            divVerProgramacion.style.display = divCrearPedido.style.display === "none" ? "block" : "none";
            break;
        case 'divCrearVehiculo':
            divCrearVehiculo.style.display = divCrearPedido.style.display === "none" ? "block" : "none";
            break;
        case 'divEditarVehiculo':
            divEditarVehiculo.style.display = divCrearPedido.style.display === "none" ? "block" : "none";
            break;
        case 'divEliminarVehiculo':
            divEliminarVehiculo.style.display = divCrearPedido.style.display === "none" ? "block" : "none";
            break;
    }
};


const createInitialData = () => {
    const requestData = {
        method : 'POST',
        body : {},
        headers : new Headers()
    }

    fetch("http://localhost:3000/predefineValues", requestData)
    .then(response => {
        if (response.ok) console.log("Data created");
    })
    .catch((error) => console.log(`There was an error creating the data: ${error}`));
}