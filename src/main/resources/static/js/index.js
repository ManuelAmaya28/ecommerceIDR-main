const URL_MAIN = 'http://127.0.0.1:8080/usuarios/';

window.addEventListener('load', function () {
  const idUsuario = localStorage.getItem('idUsuario');

  if (idUsuario) {
    const URL_USUARIO = `${URL_MAIN}${idUsuario}`;
    getUsuario(URL_USUARIO)
      .then((nombre) => {

        view(nombre);

      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const itemHTML = `<p>Inicia sesión para comprar👋</p>`;
    const notification = document.getElementById('notification');
    if (notification) {
      notification.innerHTML += itemHTML;
    }
  }
});

async function getUsuario(url) {
  try {
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    return json.nombre;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function view(nombre) {
  const itemHTML = `<p>Bienvenido, ${nombre}👋 <br> Ya puedes comprar en la sección de Productos.</p>`;
  const notification = document.getElementById('notification');
  if (notification) {
    notification.innerHTML += itemHTML;
  }
}




