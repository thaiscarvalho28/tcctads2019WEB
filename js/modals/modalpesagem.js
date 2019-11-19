/** --------------------------------------------------------------------------- */
/** ----------------- MODAL DAS OPERACOES DA TABELA --------------------- */
$('#tabelamain tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    /*var col2 = currow.find('td:eq(1)').text();
    var col3 = currow.find('td:eq(2)').text();
    var col4 = currow.find('td:eq(3)').text();
    var col5 = currow.find('td:eq(4)').text();
    var result = col1 + '\n' + col2 + '\n' + col3 + '\n' + col4 + '\n' + col5;*/
    openModalView(col1);
});

const modal = document.querySelector('#modal_visualizar');
const closeBtn = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModalView(id) {
    modal.style.display = 'block';
    var url = "http://localhost:8080/pesagem/buscarpesagem/" + id;

    fetch(url).then(resJ => resJ.json()).then(resJ => {
        /*document.getElementById('peso').innerHTML = resJ.length;*/
        console.log(resJ);
        
        var div = "";

        div += '<div class="view-info-lote">';
        div += '<p><b>ID da pesagem: </b>'+ resJ.idPesagem +'</p>';
        div += '<p><b>Lote relizada a pesagem: </b>'+ resJ.idLote.codigoLote +'</p>';
        div += '<p><b>Data da pesagem: </b>'+ moment(resJ.dataPesagem).format("DD/MM/YYYY") +'</p>';
        div += '<p><b>Observações: </b>'+ resJ.observacoes +'</p>';
        div += '<p><b>Rebanho pesado: </b></p>';
        div += '</div>';
        
        document.getElementById("dadospeso").innerHTML = div;
    
        var strTable = "";
        strTable += '<tr>';
        strTable += '<th>Número do brinco</th>';
        strTable += '<th>Categoria</th>';
        strTable += '<th>Sexo</th>';
        strTable += '<th>Novo Peso</th>';
        strTable += '</tr>';

        resJ.rebanhoPesado.forEach(element => {
            
            strTable += '<tr>';
            strTable += '<td>'+ element.idGado.numeroBrinco +'</td>';
            strTable += '<td>'+ element.idGado.categoriaAnimal +'</td>';
            strTable += '<td>'+ element.idGado.sexo +'</td>';
            strTable += '<td>'+ element.peso +'</td>';
            strTable += '</tr>';
        });

        document.getElementById("tabview").innerHTML = strTable;
    });    
}
  
// Evento que fecha o modal
closeBtn.addEventListener('click', closeModal);

// Funcao que fecha modal
function closeModal() {
    modal.style.display = 'none';
}



