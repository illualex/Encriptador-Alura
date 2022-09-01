//matrix
const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};

setInterval(draw, 30);

//Selectores
const input = document.querySelector("#input-texto");
const btnEncriptador = document.querySelector("#btn-encriptar");
const btnDesencriptar = document.querySelector("#btn-desencriptar");
const mensaje = document.querySelector("#mensaje");
const btnCopiar = document.querySelector("#btn-copiar");

//captura el id y esconde la div-aparece da de la pantalla
document.getElementById("div-aparece").style.display = 'none';
inputverificar();

//caputura el id en el momento del click y direcciona el programa para el método que encripta el texto
document.getElementById('btn-encriptar').onclick = (e) => {
  e.preventDefault();
  const textoEncriptado = encriptar(input.value.toLowerCase());
  mensaje.value = textoEncriptado;
  input.value = "";
  aparece()
}

//caputura el id en el momento del click y direcciona el programa para el método que desencripta el texto
document.getElementById('btn-desencriptar').onclick = (e) => {
  e.preventDefault();
  const textoDesencriptado = desencriptar(input.value);
  mensaje.value = textoDesencriptado;
  input.value = "";
  aparece()
}

//captura el id en el momento del click y hace la validación que copia el texto
document.getElementById('btn-copiar').onclick = (e) => {
  e.preventDefault();
  const mensaje = document.querySelector("#mensaje");
  mensaje.select();
  navigator.clipboard.writeText(mensaje.value)
  mensaje.value = "";
}

//encriptar
function encriptar(stringEncriptada) {
  let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
  stringEncriptada = stringEncriptada.toLowerCase()
  for (let i = 0; i < matrixCode.length; i++) {
    if (stringEncriptada.includes(matrixCode[i][0])) {
      stringEncriptada = stringEncriptada.replaceAll(matrixCode[i][0], matrixCode[i][1])
    }
  }
  return stringEncriptada
}

//desencriptar
function desencriptar(stringDesencriptada) {
  let matrixCode = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]]
  stringDesencriptada = stringDesencriptada.toLowerCase()
  for (let i = 0; i < matrixCode.length; i++) {
    if (stringDesencriptada.includes(matrixCode[i][1])) {
      stringDesencriptada = stringDesencriptada.replaceAll(matrixCode[i][1], matrixCode[i][0])
    }
  }
  return stringDesencriptada
}

//manipula el dom para que algunos componentes aparezcan y desaparezcan de la pantalla
function aparece() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("div-aparece").style.display = 'block';
}

//manipula el dom para que algunos componentes aparezcan y desaparezcan de la pantalla
function home() {
  document.getElementById("div-aparece").style.display = 'none';
  document.getElementById("div-desaparece").style.display = 'block';
}


//verifica lo que el usuario digito
function inputverificar() {
  var inputPalabra = document.querySelector("#input-texto");
  inputPalabra.addEventListener("keypress", function (e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);

    if (keyCode > 47 && keyCode < 65) {
      e.preventDefault();
    }
  });
}

//verifica que no entre letras con tilde y caracteres especiales
function check(e) {
  tecla = (document.all) ? e.keyCode : e.which;

  //Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
      return true;
  }

  // Patrón de entrada, en este caso solo acepta numeros y letras
  patron = /[A-Za-z0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}