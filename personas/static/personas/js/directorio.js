const API_PERSONAS = 'https://jsonplaceholder.typicode.com/users';

let personas = [];

const listaPersonas = document.getElementById('lista-personas');
const estadoCarga = document.getElementById('estado-carga');
const estadoError = document.getElementById('estado-error');
const estadoSinResultados = document.getElementById('estado-sin-resultados');
const buscador = document.getElementById('buscador');

function ocultarEstados() {
    estadoCarga.style.display = 'none';
    estadoError.style.display = 'none';
    estadoSinResultados.style.display = 'none';
}

async function cargarPersonas() {
    ocultarEstados();
    estadoCarga.style.display = 'block';

    try {
        const respuesta = await fetch(API_PERSONAS);

        if (!respuesta.ok) {
            throw new Error('No fue posible consultar el servicio');
        }

        personas = await respuesta.json();

        ocultarEstados();
        mostrarPersonas(personas);

    } catch (error) {
        ocultarEstados();
        estadoError.style.display = 'block';
        estadoError.textContent = 'La consulta no se pudo realizar. Intenta nuevamente.';
        console.error(error);
    }
}

function mostrarPersonas(personasMostrar) {
    listaPersonas.innerHTML = '';

    if (personasMostrar.length === 0) {
        estadoSinResultados.style.display = 'block';
        estadoSinResultados.textContent = 'No se encontraron resultados.';
        return;
    }

    personasMostrar.forEach(persona => {
        const tarjeta = document.createElement('div');

        tarjeta.classList.add('tarjeta-persona');

        tarjeta.innerHTML = `
            <h3>${persona.name}</h3>
            <p><strong>Usuario:</strong> ${persona.username}</p>
            <p><strong>Correo:</strong> ${persona.email}</p>
            <p><strong>Teléfono:</strong> ${persona.phone}</p>
            <p><strong>Ciudad:</strong> ${persona.address.city}</p>
            <button class="btn-detalle" data-id="${persona.id}">
                Ver detalle
            </button>
        `;

        listaPersonas.appendChild(tarjeta);
    });

    document.querySelectorAll('.btn-detalle').forEach(boton => {
        boton.addEventListener('click', () => {
            const idPersona = Number(boton.dataset.id);
            const persona = personas.find(persona => persona.id === idPersona);

            abrirModal(persona);
        });
    });
}

function buscarPersonas(texto) {
    const busqueda = texto.toLowerCase().trim();

    const resultados = personas.filter(persona =>
        persona.name.toLowerCase().includes(busqueda) ||
        persona.email.toLowerCase().includes(busqueda) ||
        persona.username.toLowerCase().includes(busqueda)
    );

    ocultarEstados();
    mostrarPersonas(resultados);
}

buscador.addEventListener('input', evento => {
    buscarPersonas(evento.target.value);
});

cargarPersonas();