document.addEventListener("DOMContentLoaded", () => {
    const galeriaCards = document.getElementById('galeria-cards');
    const prevButton = document.querySelector('#botones-galeria button:first-child');
    const nextButton = document.querySelector('#botones-galeria button:last-child');
    const pageNumberButton = document.querySelector('#botones-galeria #page-number'); // Cambiado a span
    let currentPage = 0;
    const itemsPerPage = 4; // Número de imágenes por página

    function loadImages() {
        fetch('/manicura/galeria-manicura.json')
            .then(response => response.json())
            .then(data => {
                const totalPages = Math.ceil(data.length / itemsPerPage);
                const limitedData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
                
                // Limpiar el contenedor antes de agregar nuevas imágenes
                galeriaCards.innerHTML = '';
                
                limitedData.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.style.backgroundImage = `url(${item.src})`;
                    card.innerHTML = `
                        <div class="card-content">
                            <h3>${item.descripcion}</h3>
                            <p>${item.tags.join(', ')}</p>
                        </div>
                    `;
                    // Añadir evento de clic para abrir el popup
                    card.addEventListener('click', () => {
                        openPopup(item.src, item.descripcion, item.tags);
                    });
                    galeriaCards.appendChild(card);
                });

                // Actualizar el número de página en el span
                pageNumberButton.textContent = currentPage + 1; // +1 porque currentPage es 0-indexed

                // Deshabilitar botones si es necesario
                prevButton.disabled = currentPage === 0;
                nextButton.disabled = currentPage === totalPages - 1;
            })
            .catch(error => console.error('Error al cargar las imágenes:', error));
    }

    // Cargar imágenes iniciales
    loadImages();

    // Manejar clic en el botón anterior
    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            loadImages();
        }
    });

    // Manejar clic en el botón siguiente
    nextButton.addEventListener('click', () => {
        currentPage++;
        loadImages();
    });

    // Función para alternar el menú
    window.toggleMenu = function() {
        const sidebarMenu = document.getElementById('sidebar-menu');
        if (sidebarMenu.style.display === 'none' || sidebarMenu.style.display === '') {
            sidebarMenu.style.setProperty('display', 'flex', 'important'); // Mostrar el sidebar como flex
        } else {
            sidebarMenu.style.setProperty('display', 'none', 'important'); // Ocultar el sidebar
        }
    };

    // Función para mostrar el sidebar cuando la pantalla es mayor a 1190px
    window.showSidebar = function() {
        const sidebarMenu = document.getElementById('sidebar-menu');
        sidebarMenu.style.setProperty('display', 'flex', 'important'); // Mostrar el sidebar como flex
        sidebarMenu.style.setProperty('right', '0', 'important'); // Alinear el sidebar a la derecha
    };

    // Detectar cambios en el tamaño de la ventana
    window.addEventListener('resize', () => {
        const sidebarMenu = document.getElementById('sidebar-menu');
        if (window.innerWidth > 1190) {
            showSidebar(); // Mostrar el sidebar si es mayor a 1190px
        } else {
            sidebarMenu.style.setProperty('display', 'none', 'important'); // Ocultar el sidebar si es menor o igual a 1190px
        }
    });
});

// Función para abrir el popup
function openPopup(imageSrc, description, tags) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <img class="popup-content" src="${imageSrc}" alt="${description}">
        <div class="popup-description">${description}</div>
        <div class="popup-tags">${tags.join(', ')}</div>
    `;
    
    // Cerrar el popup al hacer clic en el fondo
    popup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    document.body.appendChild(popup);
}
