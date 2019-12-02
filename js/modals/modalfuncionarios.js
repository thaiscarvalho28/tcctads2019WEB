/** --------------------------------------------------------------------------- */
/** ----------------- MODAL DAS OPERACOES DA TABELA --------------------- */
$('#tabelamainfunc tbody').on('click', '#btnviewfunc', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalViewFunc(col1);
});

const modalfunc = document.querySelector('#modal_visualizar_func');
const closeBtnFunc = document.querySelector('.btnfefun');

// Abre modal do "Visualizar" de Funcionarios
function openModalViewFunc(id) {
    modalfunc.style.display = 'block';
    var url = "http://localhost:8080/funcionario/buscarfuncio/" + id;

    fetch(url).then(res => res.json()).then(resJ => {
        console.log(resJ);
        
        var div = "";

        div += '<div class="view-info-lote">';
        div += '<p><b>Nome Completo: </b></p>';
        div += '<p class="resp">' + resJ.nomeCompleto + '</p>';
        div += '<p><b>E-mail: </b></p>';
        div += '<p class="resp">' + resJ.email + '</p>';
        div += '<p><b>Telefone: </b></p>';
        div += '<p class="resp">' + resJ.telefone + '</p>';
        div += '<p><b>Cargo: </b></p>';
        div += '<p class="resp">' + resJ.cargo + '</p>';
        div += '<p><b>Data de Nascimento: </b></p>';
        div += '<p class="resp">' + resJ.dataNascimento + '</p>';
        div += '<p><b>Endereço: </b></p>';
        div += '<p class="resp">' + resJ.endereco + '</p>';
        div += '<p><b>Data Contratação: </b></p>';
        div += '<p class="resp">' + resJ.dataContratacao + '</p>';
        div += '<p><b>Valor Salário: </b></p>';
        div += '<p class="resp"> R$ ' + resJ.valorSalario + '</p>';

        div += '</div>';
        
        document.getElementById("dadosfuncionarios").innerHTML = div;
    });    
}
  
// Evento que fecha o modal
closeBtnFunc.addEventListener('click', closeModal);

// Funcao que fecha modal
function closeModal() {
    modalfunc.style.display = 'none';
}