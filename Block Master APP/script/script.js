const IMG_PATH = `https://image.tmdb.org/t/p/w1280`



const grid = new Muuri('.grid', {
    layout: {
        rounding: false
      }
});
window.addEventListener('load', () =>{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces= document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) =>{
        elemento.addEventListener('click', (e) =>{
            e.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            e.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
           
        });
    });
    
});



   
let templateCard = document.getElementById('template-card').content;
let fragment = document.createDocumentFragment();
let main = document.getElementById('main');
const getData=async()=>{
    let url= 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    let {results} = datos;
    return results;
}
const showData = async () => {
    let data = await getData();
    data.forEach(movie => {
        let {title, poster_path, overview} = movie;
        templateCard.querySelector('h3').textContent = title;
        templateCard.querySelector('img').setAttribute('src',IMG_PATH + poster_path);
        templateCard.querySelector('span').textContent = overview; 
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);   
})

    main.appendChild(fragment);
    console.log(data);
}
    
document.addEventListener('DOMcontentLoaded', showData())
let boton = document.getElementById('btnBuscar');
boton.addEventListener('click', async() => {
let texto = document.getElementById('inputBuscar').value;
    let data = await getData();
    let busqueda = data.filter(movie => movie.title.toLowerCase() ===  texto.toLowerCase())
    
 
    busqueda.forEach(movie => {
        let {title, poster_path, overview} = movie;
        templateCard.querySelector('h3').textContent = title;
        templateCard.querySelector('img').setAttribute('src',IMG_PATH + poster_path);
        templateCard.querySelector('span').textContent=overview; 
        const clone=templateCard.cloneNode(true);
        fragment.appendChild(clone); 
    });
    main.innerHTML = "";
    main.appendChild(fragment)});
