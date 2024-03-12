const llaves = [
    ['e', 'enter'], //00, 01
    ['i', 'imes'],  //10, 11
    ['a', 'ai'],    //20, 21
    ['o', 'ober'],  //30, 31
    ['u', 'ufat']   //40, 41
];

function verificarMinusculasAcentos(){
    var textoIngresado = document.querySelector('.ingresarTexto').value;
    var textoAVerificar = textoIngresado;

    let lista = ['ñ', '\n', ' ']
    for(let c=0;c<3;c++){
        textoAVerificar = textoAVerificar.split(lista[c]).join("");
    }

    if(!(/^[a-z]+$/.test(textoAVerificar))){
        document.querySelector('.letras').style.color = 'red';
        document.querySelector('.ingresarTexto').value = '';
        document.querySelector('.munecoMensajes').style.display = '';
        document.querySelector('.mensajeProcesado').value = '';
        document.querySelector('.botonCopiar').style.display = 'none';
        if(window.innerWidth <= 768 && window.innerWidth > 500){
            document.querySelector('.mensajeProcesado').style.borderBottom = '32px solid transparent';
            let iT = document.querySelector('.mensajeProcesado');
            iT.style.height = '69px';
        }
        if(window.innerWidth <= 500){
            document.querySelector('.mensajeProcesado').style.borderBottom = '32px solid transparent';
            let iT = document.querySelector('.mensajeProcesado');
            iT.style.height = '122px';
        }
    }
    else{
        document.querySelector('.letras').style.color = '#495057';
        document.querySelector('.munecoMensajes').style.display = 'none';
        document.querySelector('.ingresarTexto').value = '';
        document.querySelector('.botonCopiar').style.display = '';
        return textoIngresado;
    }
}

function encriptar(){
    var mensajeAEncriptar = verificarMinusculasAcentos();
    var mensajeEncriptado = '';
    let coincidencia = false;
    //console.log(mensajeAEncriptar);
    for(let c=0;c<mensajeAEncriptar.length;c++){
        for(let i=0;i<5;i++){
            if(mensajeAEncriptar[c] == llaves[i][0]){
                mensajeEncriptado += llaves[i][1];
                coincidencia = true;
            }
        }
        if(coincidencia == false){
            mensajeEncriptado += mensajeAEncriptar[c];
        }
        coincidencia = false;
    }
    //console.log(mensajeEncriptado);
    document.querySelector('.mensajeProcesado').value = mensajeEncriptado;
    document.querySelector('.botonCopiar').style.display = '';
}

function desencriptar(){
    var mensajeADesencriptar = verificarMinusculasAcentos();
    var mensajeDesencriptado = '';
    let coincidencia = false;
    let x = 0;
    //console.log(mensajeADesencriptar);
    for(let c=0;c<mensajeADesencriptar.length;c++){
        for(let i=0;i<5;i++){
            if(mensajeADesencriptar.slice(c, llaves[i][1].length + c) == llaves[i][1]){
                mensajeDesencriptado += llaves[i][0];
                c += llaves[i][1].length - 1;
                coincidencia = true;
            }
        }
        if(coincidencia == false){
            mensajeDesencriptado += mensajeADesencriptar[c];
        }
        coincidencia = false;
    }
    //console.log(mensajeDesencriptado);
    document.querySelector('.mensajeProcesado').value = mensajeDesencriptado;
}

function copiar(){
    var textoCopiado = document.querySelector('.mensajeProcesado');

    // Select the text field
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(textoCopiado.value);
}

function expandirMensajeProcesadoTablet(){
    if(window.innerWidth <= 768 && window.innerWidth > 500){
        document.querySelector('.mensajeProcesado').style.borderBottom = '131px solid transparent';

        let iT = document.querySelector('.mensajeProcesado');
        iT.style.height = '69px';
        iT.style.height = `${iT.scrollHeight}px`;

        let bC = document.querySelector('.botonCopiar');
        if(iT.scrollHeight <= 180){
            bC.style.top = (parseInt('64px') + iT.scrollHeight) + 'px';
        } else{
            bC.style.top = '244px';
        }
    }
}

function expandirMensajeProcesadoCel(){
    if(window.innerWidth <= 500){
        document.querySelector('.mensajeProcesado').style.borderBottom = '131px solid transparent';

        let iT = document.querySelector('.mensajeProcesado');
        iT.style.height = '122px';
        iT.style.height = `${iT.scrollHeight}px`;

        let bC = document.querySelector('.botonCopiar');
        if(iT.scrollHeight <= 432){
            bC.style.top = (parseInt('112px') + iT.scrollHeight) + 'px';
        } else{
            bC.style.top = '544px';
        } 
    }
}

function expandirIngresarTextoCel(){
    if(window.innerWidth <= 500){
        let iT = document.querySelector('.ingresarTexto');
        iT.style.height = '232px';
        iT.style.height = `${iT.scrollHeight}px`;
    }
}

function comprimirIngresarTextoCel(){
    if(window.innerWidth <= 500){
        let iT = document.querySelector('.ingresarTexto');
        iT.style.height = '232px';
    }
}

// efecto presionar botones
// ocultar y mostrar copiar
// al pasar de pc a tablet se queda en iT.style.height = '69px';incluso si `${iT.scrollHeight}px` es mayor, y al pasar de tablet a pc, la textarea queda un poco más chica
// al pasar de cel a tablet y viceversa después de una operación, iT.style.height se queda con el formato del anterior