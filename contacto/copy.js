function copyToClipboard(type) {
    let textToCopy;
    let button;

    if (type === 'tel') {
        textToCopy = '123 456 789'; // Número de teléfono
        button = document.querySelector('button[onclick="copyToClipboard(\'tel\')"]');
    } else if (type === 'email') {
        textToCopy = 'laura@example.com'; // Correo electrónico
        button = document.querySelector('button[onclick="copyToClipboard(\'email\')"]');
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        // Cambiar el texto del botón
        button.innerHTML = '<i class="fa-solid fa-copy" style="color: white;"></i> Copiado';
        button.classList.add('copied'); // Agregar clase para cambiar el color

        // Volver al texto original y quitar la clase después de 1 segundo
        setTimeout(() => {
            button.innerHTML = '<i class="fa-solid fa-copy" style="color: white;"></i> Copiar';
            button.classList.remove('copied'); // Quitar clase para volver al color original
        }, 1000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
} 