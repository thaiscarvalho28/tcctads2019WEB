// Declarando variaveis
var modalCadas = document.querySelector('#modal_cadastrar');
var btnAbrirCadastro = document.querySelector('.btnnovo');
var btnAFecharCadastro = document.querySelector('.btnfechar');

// Adicionando eventos
btnAbrirCadastro.addEventListener('click', openModalRegister);
btnAFecharCadastro.addEventListener('click', closeModalRegister);

// Funcoes
function openModalRegister() {
    modalCadas.style.display = 'block';
}

function closeModalRegister() {
    modalCadas.style.display = 'none';
}