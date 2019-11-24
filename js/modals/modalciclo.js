$('#tabelamain tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalViewCiclo(col1);
    console.log(col1);
});

const modalViewCiclo = document.getElementById('modal_visualizar');
const btnCloseViewCiclo = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModalViewCiclo(id) {
    console.log(id);
    modalViewCiclo.style.display = 'block';
    var url1 = "http://localhost:8080/ciclorepro/buscarciclo/" + id;

    fetch(url1).then(res => res.json()).then(resJ => {
        console.log(resJ);
        
        var div = "";
        div += '<h2 class="titulo-h2">Ciclo Reprodutivo: ID '+ resJ.idCiclo +'</h2>'
        /*div += '<div class="view-info-lote">';
        div += '<p><b>Número do Brinco: </b>'+ resJ.numeroBrinco +'</p>';
        div += '<p><b>Categoria: </b>'+ resJ.categoriaAnimal +'</p>';
        div += '<p><b>Sexo: </b>'+ resJ.sexo +'</p>';
        div += '<p><b>Peso de entrada: </b>'+ resJ.pesoinicial +'</p>';
        div += '<p><b>Raça: </b>'+ resJ.raca +'</p>';
        div += '<p><b>Pelagem: </b>'+ resJ.pelagem +'</p>';
        div += '<p><b>Data de nascimento: </b>'+ moment(resJ.dataNascimento).format("DD/MM/YYYY") +'</p>';
        div += '</div>';*/
        
        document.getElementById("dadosciclo").innerHTML = div;
    });    
}
  
// Evento que fecha o modal
btnCloseViewCiclo.addEventListener('click', closeViewCicloModal);

// Funcao que fecha modal
function closeViewCicloModal() {
    modalViewCiclo.style.display = 'none';
}