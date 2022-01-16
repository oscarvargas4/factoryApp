// import {routes as routes} from './routes.js'
// import routes from './routesFile.js';

// variable declaration
const btnCrearPedido = document.getElementById('btnCrearPedido');
const btnVerProgramacion = document.getElementById('btnVerProgramacion');
const btnCrearVehiculo = document.getElementById('btnCrearVehiculo');
const btnEditarVehiculo = document.getElementById('btnEditarVehiculo');
const btnEliminarVehiculo = document.getElementById('btnEliminarVehiculo');
const btnCreateOrder = document.getElementById('btnCreateOrder');

const divCrearPedido = document.getElementById('divCrearPedido');
const divVerProgramacion = document.getElementById('divVerProgramacion');
const divCrearVehiculo = document.getElementById('divCrearVehiculo');
const divEditarVehiculo = document.getElementById('divEditarVehiculo');
const divEliminarVehiculo = document.getElementById('divEliminarVehiculo');

// code to be executed at the very begining of the program execution
$(document).ready(() => {
  const requestCreateData = FetchRequest(
    'POST', {},
    'http://localhost:3000/predefineValues'
  );

  requestCreateData.then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log('Data created');
        const requestGetCarBrands = FetchRequest('GET', {}, 'http://localhost:3000/cars/all');
        requestGetCarBrands.then((responseCarBrands) => {
            if (responseCarBrands.ok) {
              responseCarBrands.text()
                .then((textResponse) => ShowAvaiableBrands(JSON.parse(textResponse)));
            }
          })
          .catch();
      });
    }
  });
});

// Events onclick to menu buttons
btnCrearPedido.onclick = () => {
  showOptionDisplay('divCrearPedido');
};
btnVerProgramacion.onclick = () => {
  showOptionDisplay('divVerProgramacion');
};
btnCrearVehiculo.onclick = () => {
  showOptionDisplay('divCrearVehiculo');
};
btnEditarVehiculo.onclick = () => {
  showOptionDisplay('divEditarVehiculo');
};
btnEliminarVehiculo.onclick = () => {
  showOptionDisplay('divEliminarVehiculo');
};

const showOptionDisplay = (divToShow) => {
  divCrearPedido.style.display = 'none';
  divVerProgramacion.style.display = 'none';
  divCrearVehiculo.style.display = 'none';
  divEditarVehiculo.style.display = 'none';
  divEliminarVehiculo.style.display = 'none';

  switch (divToShow) {
    case 'divCrearPedido':
      divCrearPedido.style.display = divCrearPedido.style.display === 'none' ? 'block' : 'none';
      break;
    case 'divVerProgramacion':
      divVerProgramacion.style.display = divCrearPedido.style.display === 'none' ? 'block' : 'none';
      break;
    case 'divCrearVehiculo':
      divCrearVehiculo.style.display = divCrearPedido.style.display === 'none' ? 'block' : 'none';
      break;
    case 'divEditarVehiculo':
      divEditarVehiculo.style.display = divCrearPedido.style.display === 'none' ? 'block' : 'none';
      break;
    case 'divEliminarVehiculo':
      divEliminarVehiculo.style.display = divCrearPedido.style.display === 'none' ? 'block' : 'none';
      break;
  }
};

const FetchRequest = (method, body, url) => {
  const requestData =
    method == 'POST' || method == 'PUT' || method == 'DELETE' ? {
      method: method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    } : {
      method: method,
      headers: new Headers(),
    };

  return fetch(url, requestData);
};

const ShowAvaiableBrands = brandsData => {

  const selectCarBrand = document.getElementById('txtCarBrand');
  const selectDeleteBrand = document.getElementById('txtDeleteBrand');
  const selectEditBrand = document.getElementById('txtEditBrand');
  const branches = [selectCarBrand, selectDeleteBrand, selectEditBrand]

  brandsData.findCars.forEach(carInfo => {
    branches.forEach(branch => {
      const tag = document.createElement('option');
      tag.value = carInfo.id;
      tag.appendChild(document.createTextNode(carInfo.brand));
      branch.appendChild(tag);
    });
    // const tag1 = document.createElement('option');
    // const tag2 = document.createElement('option');
    // tag1.value = carInfo.id;
    // tag2.value = carInfo.id;
    // tag1.appendChild(document.createTextNode(carInfo.brand));
    // tag2.appendChild(document.createTextNode(carInfo.brand));
    // selectDeleteBrand.appendChild(tag1);
    // selectCarBrand.appendChild(tag2);
  });

};

const CreateOrder = () => {
  const dataToSend = {
    clientName: document.getElementById('txtName').value,
    desiredDay: parseInt(document.getElementById('txtOrderDay').value),
    quantity: parseInt(document.getElementById('txtNumberCars').value),
    CarId: parseInt(document.getElementById('txtCarBrand').value),
  };

  const createOrderRequest = FetchRequest('POST', dataToSend, 'http://localhost:3000/order');
  const tagP = document.getElementById('createOrderMsg');
  tagP.innerHTML = "";

  createOrderRequest.then((createOrderResponse) => {
      if (createOrderResponse.ok) {
        createOrderResponse.json().then((createOrderObject) => {
          let deliveryDay = '';
          switch (createOrderObject.order.deliverDay) {
            case 1:
              deliveryDay = 'Lunes';
              break;
            case 2:
              deliveryDay = 'Martes';
              break;
            case 3:
              deliveryDay = 'Miercoles';
              break;
            case 4:
              deliveryDay = 'Jueves';
              break;
            case 5:
              deliveryDay = 'Viernes';
              break;
            case 6:
              deliveryDay = 'Sabado';
              break;
            case 7:
              deliveryDay = 'Domingo';
              break;
            default:
              deliveryDay = 'Orden no procesada';
          }
          if (deliveryDay != 'Orden no procesada') {
            tagP.appendChild(document.createTextNode(`Pedido creado satisfactoriamente.  La fecha de entrega del vehículo es para ${deliveryDay}`));
            ResetForms();
          }
        })
      } else {
        //Manage error when is != to 201
        tagP.appendChild(document.createTextNode(`Ocurrió un error 2 en el sistema.  Intente más tarde`));
      }
    })
    .catch((error) => tagP.appendChild(document.createTextNode(`Ocurrió un error 3 en el sistema.  Intente más tarde`))

    );
};

const CreateBrand = () => {
  const dataToSend = {
    brand: document.getElementById('txtBrand').value,
    prodTime: parseInt(document.getElementById('txtProdTime').value),
  };

  const createBrandRequest = FetchRequest('POST', dataToSend, 'http://localhost:3000/cars');
  const tagP = document.getElementById('createBrandMsg');
  tagP.innerHTML = "";

  createBrandRequest.then((createBrandResponse) => {
      if (createBrandResponse.ok) {
        createBrandResponse.json().then((response) => {
          tagP.appendChild(document.createTextNode(`Marca ${response.newCar.brand} creada satisfactoriamente`));
          ResetForms()
        })
      } else {
        tagP.appendChild(document.createTextNode(`Ocurrió un error en el sistema.  Intente más tarde`));
      }
    })
    .catch((error) => tagP.appendChild(document.createTextNode(`Ocurrió un error en el sistema.  Intente más tarde`)));
};


const DeleteBrand = () => {
  const dataToSend = {
    id: parseInt(document.getElementById('txtDeleteBrand').value)
  };

  const deleteBrandRequest = FetchRequest('DELETE', dataToSend, 'http://localhost:3000/cars');
  const tagP = document.getElementById('deleteBrandMsg');
  tagP.innerHTML = "";

  deleteBrandRequest.then((deleteBrandResponse) => {
      if (deleteBrandResponse.ok) {
        deleteBrandResponse.json().then((deleteBrandObject) => {
            tagP.appendChild(document.createTextNode(`La marca se eliminó correctamente`));
            ResetForms();
          })
      } else {
        //Manage error when is != to 201
        tagP.appendChild(document.createTextNode(`La marca no existe`));
      }
    })
    .catch((error) => tagP.appendChild(document.createTextNode(`Ocurrió un error en el sistema.  Intente más tarde`))

    );
};

const ResetForms = () => {

  document.getElementById('formCreateOrder').reset();
  document.getElementById('formEditBrand').reset();
  document.getElementById('formCreateBrand').reset();
  document.getElementById('formDeleteBrand').reset();

  //   document.getElementById('deleteBrandMsg').innerHTML() = "";
  //   document.getElementById('createBrandMsg').innerHTML() = "";
  //   document.getElementById('createOrderMsg').innerHTML() = "";
  //   document.getElementById('editOrderMsg').innerHTML() = "";

  const selectCarBrand = document.getElementById('txtCarBrand');
  selectCarBrand.innerHTML = "";
  const selectDeleteBrand = document.getElementById('txtDeleteBrand');
  selectDeleteBrand.innerHTML = "";
  const selectEditBrand = document.getElementById('txtEditBrand');
  selectEditBrand.innerHTML = "";

  const requestGetCarBrands = FetchRequest('GET', {}, 'http://localhost:3000/cars/all');
  requestGetCarBrands.then((responseCarBrands) => {
      if (responseCarBrands.ok) {
        responseCarBrands.text()
          .then((textResponse) => ShowAvaiableBrands(JSON.parse(textResponse)));
      }
    })
    .catch();

}