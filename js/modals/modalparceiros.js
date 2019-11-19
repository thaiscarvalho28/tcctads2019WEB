$('#tabelamainparc tbody').on('click', '#btnviewparc', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalView(col1);
});

const modal = document.querySelector('#modal_visualizar_parc');
const closeBtn = document.querySelector('.btnfepa');

// Abre modal do "Visualizar" de Parceiros
function openModalView(id) {
    modal.style.display = 'block';
    var url = "http://localhost:8080/parceiros/buscarparceiro/" + id;

    fetch(url).then(resJ => resJ.json()).then(resJ => {
        console.log(resJ);
        
        var div = "";

        div += '<div class="view-info-lote">';
        div += '<p><b>Nome Completo: </b></p>';
        div += '<p class="resp">' + resJ.nomeCompleto + '</p>';
        div += '<p><b>Função: </b></p>';
        div += '<p class="resp">' + resJ.tipo + '</p>';
        div += '<p><b>E-mail: </b></p>';
        div += '<p class="resp">' + resJ.email + '</p>';
        div += '<p><b>Telefone Comercial: </b></p>';
        div += '<p class="resp">' + resJ.telefoneComercial + '</p>';
        div += '<p><b>Telefone Pessoal: </b></p>';
        div += '<p class="resp">' + resJ.telefonePessoal + '</p>';
        div += '<p><b>Endereço: </b></p>';
        div += '<p class="resp">' + resJ.endereco + '</p>';
        div += '</div>';
        
        document.getElementById("dadosparceiros").innerHTML = div;
    });    
}
  
// Evento que fecha o modal
closeBtn.addEventListener('click', closeModal);

// Funcao que fecha modal
function closeModal() {
    modal.style.display = 'none';
};