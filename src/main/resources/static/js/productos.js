let spinner = document.getElementById("spinner");

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const botonVaciar = document.getElementById('vaciar-carrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');
const cantidadTotal = document.getElementById('cantidadTotal');
let confirmarCompra = document.getElementById("confirmarCompra");
let alertExito = document.getElementById("alertExito");

let carrito = [];
let stockProductos = [];
const URL_STOCK_PRODUCTOS = 'http://127.0.0.1:8080/productos/';
let URL_MAIN = "http://127.0.0.1:8080/pedidos/arreglo";

botonAbrir.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

confirmarCompra.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) => {
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        actualizarCarrito();
    }
});

// Obtener el stock de productos desde el fetch
fetch(URL_STOCK_PRODUCTOS)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        stockProductos = json;
        // Después de obtener el stock de productos, generamos el HTML de los productos
        generarProductosHTML();
        spinner.setAttribute("hidden", true); // Ocultar el spinner
    })
    .catch(function (err) {
        console.log(err);
    });

// Generar el HTML de los productos
function generarProductosHTML() {
    stockProductos.forEach((producto) => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
      <div class="cajitas container" >
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="imagen">
        <div class="card-body">
          <h5 class="card-title nombre">${producto.nombre}</h5>
          <p class="card-text text-justify">${producto.descripcion}</p>
          <p class="card-text text-justify categoria">${producto.categorias_id}</p>
          <p class="card-text text-justify">Stock: ${producto.stock}</p>
          <div style="display: flex; align-items: center; justify-content: space-around;">
            <button type="button" class="btn btn-primary" id="agregar${producto.id}">Agregar al carrito</button>
            <h5 class="card-title" style="padding-left: 15px; padding-top: 8px;">$${producto.precio}</h5>
          </div>
        </div>
      </div>
    </div>
    `;
        contenedorProductos.appendChild(div);

        const boton = document.getElementById(`agregar${producto.id}`);
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        });
    });
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
});

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some((prod) => prod.id === prodId);

    if (existe) {
        carrito.map((prod) => {
            if (prod.id === prodId) {
                prod.cantidad++;
            }
        });
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId);
        carrito.push(item);
    }

    actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);

    carrito.splice(indice, 1);
    actualizarCarrito();
};

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = '';

    carrito.forEach((prod) => {
        const div = document.createElement('div');
        div.className = 'productoEnCarrito';
        div.innerHTML = `
      <p>${prod.nombre}</p>
      <p>Precio:$${prod.precio}</p>
      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
      <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
    `;

        contenedorCarrito.appendChild(div);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    });

    contadorCarrito.innerText = carrito.length;
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
};


/* POST Compra del carrito */
function actualizarIdsCarrito() {
    // Obtener el arreglo "carrito" del localStorage
    var carrito = JSON.parse(localStorage.getItem("carrito"));

    // Obtener el "idUsuario" del localStorage
    var idUsuario = localStorage.getItem("idUsuario");

    // Verificar si el "carrito" y el "idUsuario" existen en el localStorage
    if (carrito && idUsuario) {
        // Recorrer el arreglo "carrito" y actualizar los IDs con el "idUsuario"
        carrito.forEach(function (item) {
            item.id_Usuario = parseInt(idUsuario);
            delete item.id
            delete item.descripcion;
            delete item.stock;
            delete item.categorias_id;
            delete item.imagen;
        });

        fetch(URL_MAIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carrito)
        })
            .then(response => response.json())
            .then(carrito => {
                console.log('Success:', carrito);
                alertExito.style.display = "block";
                idTimeout = setTimeout(function () {
                    alertExito.style.display = "none";
                }, 10000);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function filterCards() {
    let cards = document.getElementsByClassName("cajitas container");
    let nombres = document.getElementsByClassName("card-title nombre");
    let searchNombre = document.getElementById("textBoxNombre").value.toLowerCase();

    let categorias = document.getElementsByClassName("card-text text-justify categoria");
    let searchCategoria = document.getElementById("textBoxCategoria").value.toLowerCase();

    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let nombre = nombres[i];
        let currentName = nombre.innerText.toLowerCase();

        let categoria = categorias[i];
        let currentCategoria = categoria.innerText.toLowerCase();

        if ((!currentName.includes(searchNombre) && searchNombre !== "") ||
            (currentCategoria !== searchCategoria && searchCategoria !== "selecciona una categoria")) {
            card.setAttribute("hidden", true);
            console.log("Oculto");
        } else {
            card.removeAttribute("hidden");
            console.log("Mostrado");
        }
    }
}