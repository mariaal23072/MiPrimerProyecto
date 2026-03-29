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
const btnMusica = document.querySelector('.btn-musica');

// DURACIÓN DEL TEMPORIZADOR
let min = 50;
let estaCorriendo = false; // Para saber si el temporizador está en marcha o no
let animacionIntervalo = null; // intervalo de la animación del tomate

// variables para el tiempo
let tiempoSegundos = 60 * min; // X minutos en segundos
let timerIntervalo = null; // intervalo del temporizador (latido)

// TOMATE FLOTANDO ANIMACIÓN
const framesSano = ['fotos/tomate/t1.png', 'fotos/tomate/t2.png', 
                'fotos/tomate/t3.png', 'fotos/tomate/t4.png', 
                'fotos/tomate/t5.png', 'fotos/tomate/t6.png', 
                'fotos/tomate/t5.png', 'fotos/tomate/t4.png', 'fotos/tomate/t3.png',
                'fotos/tomate/t2.png'];
const framesP1 = ['fotos/tomate/p11.png', 'fotos/tomate/p12.png',
                'fotos/tomate/p13.png', 'fotos/tomate/p14.png',
                'fotos/tomate/p15.png', 'fotos/tomate/p16.png',
                'fotos/tomate/p15.png', 'fotos/tomate/p14.png', 'fotos/tomate/p13.png',
                'fotos/tomate/p12.png'];
const framesP2 = ['fotos/tomate/p21.png', 'fotos/tomate/p22.png',
                'fotos/tomate/p23.png', 'fotos/tomate/p24.png',
                'fotos/tomate/p25.png', 'fotos/tomate/p26.png',
                'fotos/tomate/p25.png', 'fotos/tomate/p24.png', 'fotos/tomate/p23.png',
                'fotos/tomate/p22.png'];
const framesP3 = ['fotos/tomate/p31.png', 'fotos/tomate/p32.png',
                'fotos/tomate/p33.png', 'fotos/tomate/p34.png',
                'fotos/tomate/p35.png', 'fotos/tomate/p36.png',
                'fotos/tomate/p35.png', 'fotos/tomate/p34.png', 'fotos/tomate/p33.png',
                'fotos/tomate/p32.png'];

let frameActual = 0;
let tiempoTotal = tiempoSegundos; // Guardar el tiempo total para calcular el porcentaje restante
let frames = framesSano; // Variable para almacenar los frames actuales (sano o podrido)



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
    // PORCENTAJE RESTANTE
    const porcentaje = (tiempoSegundos / tiempoTotal) * 100; // Calcular el porcentaje restante

    // Cambiar los frames del tomate según el porcentaje restante
    if (porcentaje > 75) {
    frames = framesSano;
    } else if (porcentaje > 50) {
        frames = framesP1;
    } else if (porcentaje > 25) {
        frames = framesP2;
    } else {
        frames = framesP3;
    }

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
        animacionIntervalo = setInterval(() => {
            pomodoroApp.style.backgroundImage = `url('${frames[frameActual]}')`;
            frameActual = (frameActual + 1) % frames.length;
        }, 200); // Cambiar cada 150 ms para una animación fluida
        
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
    clearInterval(animacionIntervalo); // Detener la animación del tomate
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
    tiempoTotal = tiempoSegundos; // 👈 sincronizar el total
    frames = framesSano;          // 👈 resetear al tomate sano
    frameActual = 0;              // 👈 empezar desde el primer frame
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});

btn45.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto');
    pomodoroApp.classList.remove('oculto');
    min = 45; // Actualizar el valor de min para mostrar el tiempo correcto
    tiempoSegundos = 60 * min; // Reiniciar el tiempo a 45 minutos
    tiempoTotal = tiempoSegundos; // 👈 sincronizar el total
    frames = framesSano;          // 👈 resetear al tomate sano
    frameActual = 0;              // 👈 empezar desde el primer frame
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});


btn50.addEventListener('click', () => {
    pantallaInicio.classList.add('oculto');
    pomodoroApp.classList.remove('oculto');
    min = 50; // Actualizar el valor de min para mostrar el tiempo correcto
    tiempoSegundos = 60 * min; // Reiniciar el tiempo a 50 minutos
    tiempoTotal = tiempoSegundos; // 👈 sincronizar el total
    frames = framesSano;          // 👈 resetear al tomate sano
    frameActual = 0;              // 👈 empezar desde el primer frame
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
    tiempoTotal = tiempoSegundos; // 👈 sincronizar el total
    frames = framesSano;          // 👈 resetear al tomate sano
    frameActual = 0;              // 👈 empezar desde el primer frame
    displayTiempo.textContent = min + ':00'; // Mostrar el tiempo reiniciado
    inicioCronometro(); // Se inicia
});

btnAtras.addEventListener('click', () => {
    pantallaInicio.classList.remove('oculto'); // Mostrar pantalla inicio
    pomodoroApp.classList.add('oculto'); // Ocultar app pomodoro
    detenerCronometro(); // Se para
});

btnMusica.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para reproducir música de fondo
    alert("MÚSICA DISPONIBLE PRÓXIMAMENTE 🎶");
});



