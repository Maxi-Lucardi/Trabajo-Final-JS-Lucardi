const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

 
window.addEventListener('load', () => {

    formulario.addEventListener('submit', buscarClima);

})


function buscarClima(e){
e.preventDefault();
// validacion
const ciudad = document.querySelector('#ciudad').value;
const pais = document.querySelector('#pais').value;



if(ciudad === '' || pais === ''){

//Error

mostrarError();

return;
}


//consulta de api...
consultarAPI(ciudad, pais)

}


function mostrarError(){
  

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ambos campos son obligatorios!',
        
      })

}

function consultarAPI(ciudad, pais ) {
    

// leer la url  y agregar el API key en caso de no funcionar cambiar la api key
const appId = 'a10eed07d8e34c806d55b549d7c7ff81';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

Borrado();


fetch(url)
  .then(respuesta => {
    return respuesta.json();
  })
  .then(datos => {

    if(datos.cod === "404") {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error! Ciudad no encontrada',
        
      })

    } else {
      mostrarClima(datos)
    }
  })
  .catch(error => {
    console.log(error)
  });
}



function mostrarClima(datos) {

    const { name, main: { temp, temp_max, temp_min } } = datos;
    
    const grados = KelvinACentigrados(temp);
    const min = KelvinACentigrados(temp_max);
    const max = KelvinACentigrados(temp_min);
  //mostrando los resultados y aplicando css con tailwind
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-3xl')
  
    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')
  
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-2xl')
    
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-2xl')
    
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
  
    resultado.appendChild(resultadoDiv)
  }

  function KelvinACentigrados(grados) {
    return parseInt( grados - 273.15); //formula para pasar los grados kelvin a celsius
  }
  
  function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
  }
  // borrado de la busqueda
  
  function Borrado() {
  
    limpiarHTML();
  
  }
