window.addEventListener("load", () => {
    cargarPeliculas();
  });

let pagina=1

let btnAnterior=document.querySelector("#btnAnterior")
console.log(btnAnterior);

let btnSiguiente=document.querySelector("#btnSiguiente")
console.log(btnSiguiente);

btnAnterior.addEventListener("click", ()=>{

if(pagina > 1){
    pagina-=1
    cargarPeliculas()
}

})

btnSiguiente.addEventListener("click", ()=>{

    if(pagina <=500){
        pagina+=1
        cargarPeliculas()
}
})

const cargarPeliculas= async ()=>{

    try {
        
    let respuesta= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2a0057b396375a66770e5450c6dedbf9&language=es-MX&page=${pagina}`)
        
    if(respuesta.status===200){

        let datos= await respuesta.json()
        let peliculas=""

        datos.results.forEach((pelicula) => {
            peliculas+=`<div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w300${pelicula.poster_path}"/>
            <h3 class="titulo">${pelicula.title}</h3>
            </div>`
        })
        document.querySelector(".contenedor").innerHTML= peliculas
    }
    else if(respuesta.status===404){
        console.log("la página no existe");
    }

    }
    
    catch (error) {
        console.log(error);
    }
    document.querySelector(".pagina").innerHTML = `Muerte al pochoclo salado: página n° ${pagina}`;
}