/** */

$('#tabelarebanho tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModal(col1);
    console.log(col1);
});

const modal = document.getElementById('modal_visualizar');
const closeBtn = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModal(id) {
    console.log(id);
    modal.style.display = 'block';
    var url = "http://localhost:8080/gadobov/buscargado/" + id;

    fetch(url).then(resJ => resJ.json()).then(resJ => {
        /*document.getElementById('peso').innerHTML = resJ.length;*/
        console.log(resJ);
        
        var div = "";

        div += '<div class="view-info-lote">';
        div += '<p><b>Número do Brinco: </b>'+ resJ.numeroBrinco +'</p>';
        div += '<p><b>Categoria: </b>'+ resJ.categoriaAnimal +'</p>';
        div += '<p><b>Sexo: </b>'+ resJ.sexo +'</p>';
        div += '<p><b>Peso de entrada: </b>'+ resJ.pesoinicial +'</p>';
        div += '<p><b>Raça: </b>'+ resJ.raca +'</p>';
        div += '<p><b>Pelagem: </b>'+ resJ.pelagem +'</p>';
        div += '<p><b>Data de nascimento: </b>'+ moment(resJ.dataNascimento).format("DD/MM/YYYY") +'</p>';
        div += '</div>';
        
        document.getElementById("dadosgado").innerHTML = div;
    });    
}
  
// Evento que fecha o modal
closeBtn.addEventListener('click', closeModal);

// Funcao que fecha modal
function closeModal() {
    modal.style.display = 'none';
}