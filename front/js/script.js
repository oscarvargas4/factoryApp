// import {routes as routes} from './routes.js'
// import routes from './routesFile.js';

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

// code to be executed at the very begining of the program execution
$(document).ready(() => {
    const requestCreateData = FetchRequest('POST', {}, 'http://localhost:3000/predefineValues');

    requestCreateData.then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log("Data created");
                    const requestGetCarBrands = FetchRequest('GET', {}, 'http://localhost:3000/cars/all');
                    requestGetCarBrands.then(responseCarBrands => {
                        
                        if (responseCarBrands.ok) {
                            responseCarBrands.text().then(textResponse => ShowAvaiableBrands(JSON.parse(textResponse)))
                        }

                    }).catch();

                });
            }
        })

})

// Events onclick to menu buttons
btnCrearPedido.onclick = () => {
    showOptionDisplay('divCrearPedido')
};
btnVerProgramacion.onclick = () => {
    showOptionDisplay('divVerProgramacion')
};
btnCrearVehiculo.onclick = () => {
    showOptionDisplay('divCrearVehiculo')
};
btnEditarVehiculo.onclick = () => {
    showOptionDisplay('divEditarVehiculo')
};
btnEliminarVehiculo.onclick = () => {
    showOptionDisplay('divEliminarVehiculo')
};

const showOptionDisplay = (divToShow) => {
    divCrearPedido.style.display = 'none';
    divVerProgramacion.style.display = 'none';
    divCrearVehiculo.style.display = 'none';
    divEditarVehiculo.style.display = 'none';
    divEliminarVehiculo.style.display = 'none';

    switch (divToShow) {
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


const FetchRequest = (method, body, url) => {

    const requestData = (method == 'POST') || (method == 'PUT') || (method == 'DELETE') ?
    {
        method: method,
        body: body,
        headers: new Headers()
    } :
    {
        method: method,
        headers: new Headers()
    }

    return fetch(url, requestData);
}

const ShowAvaiableBrands = brandsData => {
    console.log(brandsData);
    const selectCarBrand = document.getElementById('txtCarBrand');
    brandsData.findCars.forEach(carInfo => {
        const tag = document.createElement('option');
        tag.value = carInfo.id;
        tag.appendChild(document.createTextNode(carInfo.brand));
        selectCarBrand.appendChild(tag);
    });
}

const CreateOrder = () => {

}