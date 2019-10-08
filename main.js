let body = document;
let correctos = document.getElementById('correctos');
let intentos = document.getElementById('intentos');
let porcentaje = document.getElementById('porcentaje');

let puertas = [document.getElementById('1'), document.getElementById('2'), document.getElementById('3')];

let mensaje = document.getElementById('mensaje');

let nroDecision = 0;
let terminado = false;
let premio = null;
let eleccion = null;
let porciento = 0;
let puertaMostrada = null;

function asignarPremio() {
	premio = Math.floor((Math.random() * 4));
	
	if (premio == 0) {
		asignarPremio();
	}
}

function updatePorcentaje() {
	let correct = Number(correctos.innerHTML);
	let intent = Number(intentos.innerHTML);

	porciento = (correct * 100) / intent;

	porcentaje.innerHTML = porciento.toFixed(2);
}

function ganar() {
	correctos.innerHTML = Number(correctos.innerHTML) + 1;
	intentos.innerHTML = Number(intentos.innerHTML) + 1;

	correctos.classList.add("correcto");
	mensaje.classList.add("correcto");
	porcentaje.classList.add("correcto");
	puertas[premio - 1].classList.add("correcto-puerta");

	setTimeout(function () {
		correctos.classList.remove("correcto");
		mensaje.classList.remove("correcto");
		porcentaje.classList.remove("correcto");
		puertas[premio - 1].classList.remove("correcto-puerta");
	}, 1000);
}

function perder() {
	intentos.innerHTML = Number(intentos.innerHTML) + 1;

	correctos.classList.add("incorrecto");
	mensaje.classList.add("incorrecto");
	porcentaje.classList.add("incorrecto");
	puertas[eleccion - 1].classList.add("incorrecto-puerta");

	setTimeout(function () {
		correctos.classList.remove("incorrecto");
		mensaje.classList.remove("incorrecto");
		porcentaje.classList.remove("incorrecto");
		puertas[eleccion - 1].classList.remove("incorrecto-puerta");
	}, 1000);
}

function mostrarPuerta() {
	let rand = Math.floor((Math.random() * 3) + 1);

	if (rand != premio && rand != eleccion) {
		puertas[rand - 1].innerHTML = "NO HAY PREMIO";
		mensaje.innerHTML = `NO HAY PREMIO ATRAS DE LA PUERTA ${rand}`;
		puertaMostrada = rand;

	} else if (rand == eleccion || rand == premio) {
		mostrarPuerta();
	}
}

function mostrarPremio() {
	puertas[premio - 1].innerHTML = "PREMIO";
	mensaje.innerHTML = `EL PREMIO ESTA EN LA PUERTA ${premio}`;
	terminado = true;
	nroDecision = 0;

	if (premio == eleccion) {
		ganar();
	} else {
		perder();
	}

	updatePorcentaje();
}

function getEleccion(ele) {
	eleccion = ele;

	if (!terminado) {
		if (nroDecision == 0) {
			mostrarPuerta();
		} else {
			mostrarPremio();
		}
		nroDecision++;
	} else {
		reset();
	}
}

function reset() {
	if (terminado) {
		puertas[0].innerHTML = "<wbr>";
		puertas[1].innerHTML = "<wbr>";
		puertas[2].innerHTML = "<wbr>";

		terminado = false;
		nroDecision = 0;

		asignarPremio();

		mensaje.innerHTML = "ELEGI UNA PUERTA"
	}
}

asignarPremio();

puertas[0].addEventListener("click", function () {
	getEleccion(1);
});
puertas[1].addEventListener("click", function () {
	getEleccion(2);
});
puertas[2].addEventListener("click", function () {
	getEleccion(3);
});

function mantenerEleccion(max, ele) {
	for (i = 0; i < max * 3; i++) {
		getEleccion(ele);
	}
}

function cambiarEleccion(max, ele) {
	for (i = 0; i < max; i++) {
		getEleccion(ele);

		do {
			var random = Math.floor(Math.random() * 3) + 1;
		} while (random == eleccion || random == puertaMostrada);

		getEleccion(random);
		getEleccion(random);

	}
}