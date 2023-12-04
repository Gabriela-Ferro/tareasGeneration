const cargarInfo = async () => {
  try {
    const datosGuardados = localStorage.getItem('datosDeUsuarios');
    const tiempoGuardado = localStorage.getItem('tiempoGuardado');
    const tiempoActual = new Date().getTime();
    const tiempoPasado = tiempoGuardado ? tiempoActual - tiempoGuardado : 0;
    const menosDeUnMinuto = tiempoPasado < 60000; 

    if (datosGuardados && menosDeUnMinuto) {
      console.log('Obteniendo datos guardados en localStorage.');
      mostrarDatos(JSON.parse(datosGuardados));
    } else {
      console.log('Solicitud nueva al servidor.');
      const respuesta = await fetch('https://reqres.in/api/users?delay=3');
      if (respuesta.status === 200) {
        const datosDeRespuesta = await respuesta.json();
        localStorage.setItem('datosDeUsuarios', JSON.stringify(datosDeRespuesta));
        localStorage.setItem('tiempoGuardado', tiempoActual);
        mostrarDatos(datosDeRespuesta);
      } else {
        console.error('Error al obtener los datos.');
      }
    }
  } catch (error) {
    console.log("error");
  }
};

const mostrarDatos = (datos) => {
  let usuarios = '';
  usuarios += `<div class="row row-cols-2 row-cols-md-4 g-4">`; // Iniciamos la fila aquí
  datos.data.forEach(usuario => {
    usuarios += `
    <div class="col">
      <div class="card text-bg-dark mb-3 animate__animated animate__bounceIn" style="max-width: 18rem;">
        <img src="${usuario.avatar}" class="rounded-circle" class="card-img-top" alt="Avatar">
        <div class="card-body">
          <h5 class="card-title">${usuario.first_name} ${usuario.last_name}</h5>
          <p class="card-text">${usuario.email}</p>
        </div>
      </div>
    </div>`;
  });

  document.getElementById('card-container-fluid').innerHTML = usuarios;
};

cargarInfo();
