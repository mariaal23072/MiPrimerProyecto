// Referencias al HTML (botones y pantalla)
const displayTiempo = document.querySelector('.timer-display');
const botonPlay = document.querySelector('.btn-play');
const botonPausa = document.querySelector('.btn-pausa');
const botonMeRindo = document.querySelector('.btn-meRindo');
const pantallaInicio = document.querySelector('.pantalla-inicio');
const btn25 = document.querySelector('.btn-25');
const btn45 = document.querySelector('.btn-45');
const btn50 = document.querySelector('.btn-50');
const pomodoroApp = document.querySelector('.pomodoro-app');
const miImput = document.querySelector('.mi-input');
const btnOtro = document.querySelector('.btn-otro');
const btnAtras = document.querySelector('.btn-atras');

// DURACIÓN DEL TEMPORIZADOR
let min = 50;
let estaCorriendo = false; // Para saber si el temporizador está en marcha o no

// variables para el tiempo
let tiempoSegundos = 60 * min; // X minutos en segundos
let timerIntervalo = null; // intervalo del temporizador (latido)


function iniciarApp() {
    // Mostrar el tiempo inicial en pantalla
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo inicial (ej: 25:00)
}

iniciarApp(); // para que se ejecute sola

// Para que se vaya actualizando el tiempo
function actualizarCronometro() {
    // Restar un segundo
    tiempoSegundos--;

    // Calcular minutos y segundos restantes para mostrar
    let minutos = Math.floor(tiempoSegundos / 60); // redondear hacia abajo
    let segundos = tiempoSegundos % 60;

    // Si seg < 10, mostrar con un cero delante (ej: 09,08,07...)
    if (segundos < 10) segundos = '0' + segundos;

    // Escribir el tiempo en pantalla
    displayTiempo.textContent = minutos + ':' + segundos; // ${minutos}:${segundos} tbn funciona

    // Si llega a 0, parar el temporizador
    if (tiempoSegundos === 0) { // === compara el valor y el tipo de dato
        detenerCronometro(); // Se para
        tiempoSegundos = 60 * min; // Reiniciar el tiempo a X
        displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
        alert("¡Tiempo terminado! DESCANSA NENA");
    }
}

function inicioCronometro() {
    if (!estaCorriendo) { // Solo funciona si está parado
        timerIntervalo = setInterval(actualizarCronometro, 1000); // Ejecutar cada 1000 ms (1 segundo)
        estaCorriendo = true;
    }
}


// Le decimos qué hacer cuando alguien haga "click"
botonPlay.addEventListener('click', () => {
    inicioCronometro(); // Se inicia
});


// Para que cada vez que se pulse el botón, no avance más rápido
function detenerCronometro() { 
    clearInterval(timerIntervalo); // Detener el intervalo
    estaCorriendo = false; // marcar que está parado
}


botonPausa.addEventListener('click', () => {
    detenerCronometro(); // Se para
});

botonMeRindo.addEventListener('click', () => {
    tiempoSegundos = 60 * min; // Reiniciar el tiempo a X
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    detenerCronometro(); // Se para

});

btn25.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto'); // Ocultar pantalla inicio
    pomodoroApp.classList.remove('oculto'); // Monstrar app pomodoro
    min = 25; // Actualizar el valor de min para mostrar el tiempo correcto
    tiempoSegundos = 60 * 25; // Reiniciar el tiempo a 25 minutos
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});

btn45.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto');
    pomodoroApp.classList.remove('oculto');
    min = 45; // Actualizar el valor de min para mostrar el tiempo correcto
    tiempoSegundos = 60 * min; // Reiniciar el tiempo a 45 minutos
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});


btn50.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto');
    pomodoroApp.classList.remove('oculto');
    min = 50; // Actualizar el valor de min para mostrar el tiempo correcto
    tiempoSegundos = 60 * min; // Reiniciar el tiempo a 50 minutos
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});

// TIEMPO ELEGIDO

btnOtro.addEventListener('click', () => {
    console.log(miImput.value); // para ver qué valor se ingresa en el input
    const numero = Number(miImput.value); // Convertir el valor del input a número
    pantallaInicio.classList.add('oculto');
    pomodoroApp.classList.remove('oculto');
    min = numero; // Actualizar el valor de min para mostrar el tiempo correcto
    tiempoSegundos = 60 * min; // Reiniciar el tiempo a X minutos
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});

btnAtras.addEventListener('click', () => {
    pantallaInicio.classList.remove('oculto'); // Mostrar pantalla inicio
    pomodoroApp.classList.add('oculto'); // Ocultar app pomodoro
    detenerCronometro(); // Se para
});