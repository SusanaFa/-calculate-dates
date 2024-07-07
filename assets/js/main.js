//declarando constante para próximas operaciones

const milisegundos = 1000;
const segundosOMinutos = 60;
const horasPorDia = 24;

// obtener referencia al boton y formulario
const calcularBtn = document.getElementById('calcularBtn');
const fechaForm = document.getElementById('fechaForm');
const resultadoDiv = document.getElementById("resultado"); 


// Función para obtener el nombre del día de la semana
function obtenerDiaSemanaTexto(dia) {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return diasSemana[dia];
}

// Función para obtener el nombre del mes
function obtenerMesNombre(mes) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[mes];
}


// funcion para mostrar fecha actual
function mostrarFechaActual(){
    let ahora = new Date();
    let diaSemana = obtenerDiaSemanaTexto(ahora.getDay());
    let dia = ahora.getDate();
    let mes = obtenerMesNombre(ahora.getMonth());
    let anio = ahora.getFullYear();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();

// horas, minutos y segundos siempre con dos digitos
//versión resumida de escribir un if-else
    horas = horas < 10? `0${horas}` : horas;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    segundos = segundos < 10 ? `0${segundos}` : segundos;

    let mensaje = `Hoy es ${diaSemana} ${dia} de ${mes} de ${anio}, y son las ${horas} con ${minutos} minutos y ${segundos} segundos.` ;
    document.getElementById('fechaHoraActual').textContent = mensaje;
      
}

function mostrarTiempoRestante(){
    let ahora = new Date();
    let finDeAnio = new Date(ahora.getFullYear() + 1, 0 , 1); //año siguiente, primer día
    let diferencia = finDeAnio.getTime() - ahora.getTime();
    let segundosRestantes = Math.floor(diferencia / milisegundos);
    let minutosRestantes = Math.floor(segundosRestantes/ segundosOMinutos);
    let horasRestantes = Math.floor(minutosRestantes/ segundosOMinutos);
    let diasRestantes = Math.floor(horasRestantes / horasPorDia);

    // calcular el resto de la división y asignarlo de regreso a la misma variable, esto asegura que los valores esten dentro del rango respectivos de cada uno.
    segundosRestantes %= segundosOMinutos;
    minutosRestantes %= segundosOMinutos;
    horasRestantes%= horasPorDia;

    // horas, minutos y segundos siempre con dos digitos
    //versión resumida de escribir un if-else
    horasRestantes = horasRestantes < 10? `0${horasRestantes}` : horasRestantes;
    minutosRestantes = minutosRestantes < 10 ? `0${minutosRestantes}` : minutosRestantes;
    segundosRestantes = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;

    let mensaje = `Faltan ${diasRestantes} días, ${horasRestantes} horas, ${minutosRestantes} minutos, ${segundosRestantes} segundos para el próximo año.` ;
    document.getElementById('contadorTiempo').textContent = mensaje;


}


// // función para calcular una fecha ingresada por el usuario
function calcularDiferenciaFechasUsuario(fechaSeleccionada){
    let ahora = new Date();
    let fechaSeleccionadaDate = new Date(fechaSeleccionada);
    let diferencia = fechaSeleccionadaDate.getTime()- ahora.getTime();
    let diasRestantesFS = Math.ceil(diferencia/ (milisegundos * segundosOMinutos * segundosOMinutos * horasPorDia));

    return diasRestantesFS;
    
}

function formatearFecha(fecha) {
    let ahora = new Date(fecha);
    let dia = ahora.getDate()+1;
    let mes = ahora.toLocaleString('es-ES', { month: 'long' }); // Obtener el nombre del mes en español
    let anio = ahora.getFullYear();

    return `${dia} de ${mes} de ${anio}`;
}

calcularBtn.addEventListener('click', function(){
    let fechaIngresada = fechaForm.fechaInput.value;

    if (fechaIngresada) {
        let diasRestantes = calcularDiferenciaFechasUsuario(fechaIngresada);
        let fechaFormateada = formatearFecha(fechaIngresada);
        resultadoDiv.textContent = `Días restantes hasta ${fechaFormateada}: ${diasRestantes}`;
    } else {
        resultadoDiv.textContent = 'Por favor ingrese una fecha válida.';
    }

});


// llamar a la función para mostrar la fecha y hora actual.
mostrarFechaActual();

// llamar a la funcion para mostrar tiempo restante proximo año
mostrarTiempoRestante();

//actualizar los segundos cada segundo de ambas funciones
setInterval(mostrarFechaActual, milisegundos); 
setInterval(mostrarTiempoRestante, milisegundos)


