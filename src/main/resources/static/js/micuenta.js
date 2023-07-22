let idUsuario;
idUsuario = localStorage.getItem("idUsuario");
let mensaje = document.getElementById("mensaje");
let nombre;
let correo;
const URL_MAIN = `http://127.0.0.1:8080/usuarios/${idUsuario}`;
let botonCerrar = document.getElementById("botonCerrarSesion");
let statusCompra = document.getElementById("statusCompra");
let URL_COMPRAS = "http://127.0.0.1:8080/pedidos/";



botonCerrar.addEventListener("click", function (event) {
    event.preventDefault();
    // Borrar el local storage
    localStorage.removeItem("idUsuario");

     // Borrar el local storage
     localStorage.removeItem("carrito");

    // Recargar la página actual
    location.reload();
});

if (localStorage.getItem('idUsuario')) {
    window.addEventListener("load", function (event) {

        getUsuario().then((resultado) => {
            if (resultado) {
                view();
                mostrarCompra();
            } else {

            }
        }).catch((error) => {
            console.log(error);
        });
    });
}


async function getUsuario() {
    /*  if(idUsuario!==null){ */
    try {
        const response = await fetch(URL_MAIN, { method: 'get' });
        const json = await response.json();
        nombre = json.nombre;
        correo = json.correo;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
    /* } */
}


function view() {
    mensaje.style.display = "none";
    botonCerrar.style.display = "block";
    const itemHTML = `
        <div class = "micuenta">
            <h1>Has iniciado sesion como ${nombre}</h1>
            <h2>Correo electronico: ${correo}</h2>
            
        </div>`;
    const infocuenta = document.getElementById("infocuenta");
    infocuenta.innerHTML += itemHTML;
}


function mostrarCompra() {
    var idUsuario = localStorage.getItem("idUsuario");
  
    fetch(URL_COMPRAS)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        stockCompras = json;
        // Después de obtener el stock de productos, generamos el HTML de los productos
        generarProductosHTML();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function generarProductosHTML() {
    // Filtrar los objetos en "stockCompras" por la condición "id_Usuario === idUsuario"
    var productosFiltrados = stockCompras.filter(function (producto) {
      return producto.id_Usuario == idUsuario;
    });
  
    // Crear una tabla en HTML para los productos filtrados
    var tablaHTML = "<h3>Pedidos</h3><table>";
    tablaHTML += "<tr><th>Nombre producto   </th><th>Precio </th><th>Cantidad   </th><th>Estado del pedido  </th></tr>";
    productosFiltrados.forEach(function (producto) {
      tablaHTML += "<tr>";
      tablaHTML += "<td>" + producto.nombre + "</td>";
      tablaHTML += "<td>" + producto.precio + "</td>";
      tablaHTML += "<td>" + producto.cantidad + "</td>";
      tablaHTML += "<td>En proceso</td>";
      tablaHTML += "</tr>";
    });
    tablaHTML += "</table>";
  
    // Imprimir la tabla en el HTML
    document.getElementById("statusCompra").innerHTML = tablaHTML;
  }
  
  

  