/** --------------------------------------------------------------------------- */
/** ----------------- MODAL DAS OPERACOES DA TABELA --------------------- */
$('#tabelamain tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
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
        
        var table = "";

        table += '<tr>';
        table += '<th><b>ID da pesagem:</b></th>';
        table += '<td>' + resJ.idPesagem + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Lote relizada a pesagem:</b></th>';
        table += '<td>' + resJ.idLote.codigoLote + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Data da pesagem:</b></th>';
        table += '<td>' + moment(resJ.dataPesagem).format("DD/MM/YYYY") + '</td>';
        strTable += '</tr>';

        table += '<tr>';
        table += '<th><b>Observações:</b></th>';
        table += '<td> <div class="scroll-cell"> ' + resJ.observacoes + ' </div> </td>';
        table += '</tr>';

        /*div += '<div class="view-info-lote">';
        div += '<p><b>ID da pesagem: </b>'+ resJ.idPesagem +'</p>';
        div += '<p><b>Lote relizada a pesagem: </b>'+ resJ.idLote.codigoLote +'</p>';
        div += '<p><b>Data da pesagem: </b>'+ moment(resJ.dataPesagem).format("DD/MM/YYYY") +'</p>';
        div += '<p><b>Observações: </b>'+ resJ.observacoes +'</p>';
        div += '</div>';*/
        
        document.getElementById("dadospesagem").innerHTML = table;

        var arroba = 0;
        var pesoVivo = 0;
        var rendimento = 0.5;
    
        var strTable = "";
        strTable += '<tr>';
        strTable += '<th>Número do brinco</th>';
        strTable += '<th>Categoria</th>';
        strTable += '<th>Sexo</th>';
        strTable += '<th>Peso em Kg</th>';
        strTable += '<th>Peso em @</th>';
        strTable += '</tr>';

        resJ.rebanhoPesado.forEach(element => {
            
            pesoVivo = element.peso;
            arroba = (pesoVivo * rendimento)/15;

            strTable += '<tr>';
            strTable += '<td>'+ element.idGado.numeroBrinco +'</td>';
            strTable += '<td>'+ element.idGado.categoriaAnimal +'</td>';
            strTable += '<td>'+ element.idGado.sexo +'</td>';
            strTable += '<td>'+ element.peso +'</td>';
            strTable += '<td>'+ parseFloat(arroba.toFixed(2)) +'* </td>';
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



