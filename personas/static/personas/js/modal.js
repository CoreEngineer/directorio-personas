const modalPersona = document.getElementById('modal');

function abrirModal(persona) {
    modalPersona.innerHTML = `
        <div class="modal-contenido">
            <button id="cerrar-modal">Cerrar</button>

            <h2>${persona.name}</h2>

            <p>
                <strong>Usuario:</strong>
                ${persona.username}
            </p>

            <p>
                <strong>Correo:</strong>
                ${persona.email}
            </p>

            <p>
                <strong>Teléfono:</strong>
                ${persona.phone}
            </p>

            <p>
                <strong>Sitio web:</strong>
                ${persona.website}
            </p>

            <p>
                <strong>Dirección:</strong>
                ${persona.address.street},
                ${persona.address.suite},
                ${persona.address.city},
                ${persona.address.zipcode}
            </p>

            <p>
                <strong>Empresa:</strong>
                ${persona.company.name}
            </p>
        </div>
    `;

    modalPersona.style.display = 'flex';

    document
        .getElementById('cerrar-modal')
        .addEventListener('click', cerrarModal);
}

function cerrarModal() {
    modalPersona.style.display = 'none';
    modalPersona.innerHTML = '';
}