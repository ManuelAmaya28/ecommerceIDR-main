let enlacesNav = document.getElementById("enlacesNav");
let botonesNav = document.getElementById("botonesNav");


let enlaces = `<a href="./index.html" style="padding-left: 20px;" >Inicio</a>
                <a href="./productos.html" style="padding-left: 20px;" >Productos</a>
                <a href="./formulario.html" style="padding-left: 20px;" >Registrar producto</a>
                `

let botones = `
            <ul class="lista">
                <li>
                <h6>Registrate / Inicia sesión</h6>   <a href="./login.html"><img src="./img/login-32.png" alt="login" id="login"  ali: 20px></a>
                </li>
                <li>
                <h6>Usuario</h6>   <a href="./micuenta.html"><img src="./img/Vectorlogin.png" alt="carrito" id="carrito"></a>
                </li>
            </ul>`



window.addEventListener("load", function (event) {
  event.preventDefault;
  enlacesNav.insertAdjacentHTML("beforeend", enlaces);
  botonesNav.insertAdjacentHTML("beforeend", botones);


});

function myFunction() {
  //var topnav = document.querySelector(".topnav");
  let topnav = document.getElementById("topnav");
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
    topnav.style.height = "0";
  } else {
    x.style.display = "block";
    topnav.style.height = "100%";
  }
}

