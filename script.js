const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const btnEncriptarElem = document.querySelector(".btn-encriptar");
const btnDesencriptarElem = document.querySelector(".btn-desencriptar");
const btnCopiarElem = document.querySelector(".copiar");

/*
La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat"
*/

function validarTexto() {
    const texto = textArea.value;
    const regex = /^[a-z\s]*$/;

    if (!regex.test(texto)) {
        mensaje.value = "Por favor, utiliza solo los caracteres permitidos";
        mensaje.style.backgroundImage = "none";
        btnEncriptarElem.disabled = true;
        btnDesencriptarElem.disabled = true;
    } else {
        mensaje.value = "";
        btnEncriptarElem.disabled = texto.trim() === "";
        btnDesencriptarElem.disabled = texto.trim() === "";
    }
}

function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    btnCopiarElem.disabled = false;
    mensaje.style.backgroundImage = "none";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replace(new RegExp(matrizCodigo[i][0], 'g'), matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    btnCopiarElem.disabled = false;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replace(new RegExp(matrizCodigo[i][1], 'g'), matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function btnCopiar() {
    navigator.clipboard.writeText(mensaje.value).then(() => {
        textArea.value = mensaje.value;
        btnEncriptarElem.disabled = false;
        btnDesencriptarElem.disabled = false;
        mensaje.value = "";
        btnCopiarElem.disabled = true;
    });
}

textArea.addEventListener('input', validarTexto);