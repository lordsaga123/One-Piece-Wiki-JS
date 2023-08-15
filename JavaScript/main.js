document.addEventListener("DOMContentLoaded", ()=>{
/*Fetch con la información de las Frutas del Diablo*/
        let frutasYUsuarios = [];

        fetch("../JavaScript/frutas.json")
        .then(response => response.json())
        .then(data =>{
            frutasYUsuarios = data;
            cargarDatosFrutas(frutasYUsuarios);
        })

/*Carga de las frutas a la sección "Frutas del Diablo" en el HTML*/
        const divProductos = document.querySelector("#frutas__Del__Diablo");


        function cargarDatosFrutas (){

            divProductos.innerHTML = '';
            frutasYUsuarios.forEach(fruta => {

                const div = document.createElement("div");
                div.classList.add("fruta__Y__Usuario");
                div.innerHTML = `
                <div class="imagen__Container">
                    <img class="imagen1" src="${fruta.img1}" alt="imagen__Fruta">
                    <img class="imagen2" src="${fruta.img2}" alt="imagen__Fruta">
                </div>
                <div class="informacion__General__Fruta">
                    <p class="nombre__Fruta" id="nombre__Fruta">Nombre: ${fruta.nombre} </p>
                    <p class="clase__Fruta" id="clase__Fruta">Clase: ${fruta.clase} </p>
                    <p class="usuario__Fruta" id="usuario__Fruta">Usuario: ${fruta.usuario} </p>
                </div>
                `;
                divProductos.appendChild(div);

            })
            
            }

cargarDatosFrutas(frutasYUsuarios)


/*Filtrado de frutas a medida que se escribe en la barra de Buscar*/
function filtrarDatosFrutas(termino) {
    const resultadosFiltrados = frutasYUsuarios.filter(fruta =>
        fruta.nombre.toLowerCase().includes(termino.toLowerCase())
    );

    /*Limpia el contenedor antes de mostrar los resultados filtrados*/
    divProductos.innerHTML = '';

    resultadosFiltrados.forEach(fruta => {
        const div = document.createElement("div");
        div.classList.add("fruta__Y__Usuario");
        div.innerHTML = `
            <div class="imagen__Container">
                <img class="imagen1" src="${fruta.img1}" alt="imagen__Fruta">
                <img class="imagen2" src="${fruta.img2}" alt="imagen__Fruta">
            </div>
            <div class="informacion__General__Fruta">
                <p class="nombre__Fruta" id="nombre__Fruta">Nombre: ${fruta.nombre} </p>
                <p class="clase__Fruta" id="clase__Fruta">Clase: ${fruta.clase} </p>
                <p class="usuario__Fruta" id="usuario__Fruta">Usuario: ${fruta.usuario} </p>
            </div>
        `;
        divProductos.appendChild(div);
    });
}

document.querySelector("#buscar").addEventListener("keyup", (event) => {
    const q = event.target.value;

    if (q.length >= 2) {
        filtrarDatosFrutas(q);
    } else {
        cargarDatosFrutas();
    }
});

})

/* Aqui se define el modo Oscuro*/
const toggle = document.querySelector("#toggle");
const temaActual = localStorage.getItem("tema");

if (temaActual) {
    document.documentElement.setAttribute("data-theme", temaActual);
}

if (temaActual === "Oscuro") {
    toggle.checked = true;
}

const cambiarTema = (event) => {
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "Oscuro");
        localStorage.setItem("tema", "Oscuro");
        /*Uso de la librería Toastify*/
        Toastify({
            text: "Modo Oscuro, Nakama!",
            duration: 1200,
            gravity: "top", 
            position: "left", 
            borderRadius:"50%",
            stopOnFocus: true, 
            style: {
                
                fontFamily: "Roboto",
                borderRadius: "2rem",
                color: "var(--titulos)",
                background: "var(--primario) ",
            },
            onClick: function(){}
          }).showToast();
    } else {
        Toastify({
            text: "Modo Claro, Nakama!",
            duration: 1200,
            gravity: "top", 
            position: "left", 
            borderRadius:"50%",
            stopOnFocus: true, 
            style: {
                fontFamily: "Roboto",
                borderRadius: "2rem",
                color: "var(--titulos)",
                background: "var(--primario) ",
            },
            onClick: function(){}
          }).showToast();
        document.documentElement.removeAttribute("data-theme");
        localStorage.removeItem("tema");
    }
}

toggle.addEventListener("click", cambiarTema);


/*Sección Contacto - Formulario para suscripción*/
const form = document.getElementById("form");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const confirmPass = document.getElementById("confirmPassword");
const parrafo = document.getElementById("warnings");

function resetForm() {
    form.reset();
    parrafo.innerHTML = "";
}

form.addEventListener("submit", e => {
    e.preventDefault();
    let warnings = "";
    let entrar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    parrafo.innerHTML = "";

    if (usuario.value.length < 6) {
        warnings += `El nombre no es válido. Minimo de 7 caractéres.  <br>`;
        entrar = true;
    }
    if (!regexEmail.test(email.value)) {
        warnings += `El email no es válido. <br>`;
        entrar = true;
    }
    if (pass.value.length < 8) {
        warnings += `La contraseña no es válida Minimo de 8 caracteres.. <br>`;
        entrar = true;
    }
    if (pass.value !== confirmPass.value) {
        warnings += `Las contraseñas no coinciden. <br>`;
        entrar = true;
    }

    if (entrar) {
        parrafo.innerHTML = warnings;
    } else {
        /* Uso de la Librería Sweet Alert2*/
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres enviar el formulario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, enviar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Enviado!',
                    'Suscripción exitosa Nakama!',
                    'success')
                resetForm();
            }
        });
    }
});

