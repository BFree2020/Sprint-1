let formulario = document.getElementById('formulario');
let btncorreo = document.getElementById('btnCorreo')
let botoneliminar = document.getElementById('btnEliminar')
let url = 'http://localhost:4000/post'

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            lastName,
            email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }

    })
})

btncorreo.addEventListener('click', async () => {


    let capturaEmail = document.getElementById("email").value

    const datos = await fetch(url)
    const data = await datos.json()
        

    //como vamos a buscar

        
    document.getElementById("email").setAttribute("readonly",true);
    //d = document = true;
    const buscado = data.find(user => user.email.toLowerCase() === capturaEmail.toLowerCase())
    //se desestructura

    

    document.getElementById("name").value = buscado.name
    document.getElementById("lastName").value = buscado.lastName
    document.getElementById("email").value = buscado.email
    document.getElementById("id").value = buscado.id

})
let btnEditar = document.getElementById("btnEditar")

btnEditar.addEventListener('click', async () => {

    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    console.log(id, name, lastName, email);



    await fetch(url + "/" + id, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            lastName,
            email
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    });

});
botoneliminar.addEventListener('click', async () => {
   let idModificar = document.getElementById("id").value;
    await fetch(url + "/" + idModificar, {
        method: 'DELETE'})
    })


    