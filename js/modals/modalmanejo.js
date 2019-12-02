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
    var url = "http://localhost:8080/manejosanidade/buscarmanejo/" + id;

    fetch(url).then(res => res.json()).then(resJ => {
        console.log(resJ);

        var table = "";

        table += '<tr>';
        table += '<th><b>Data do manejo:</b></th>';
        table += '<td>' + moment(resJ.dataManejo).format("DD/MM/YYYY") + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Data do próximo:</b></th>';
        table += '<td>' + moment(resJ.dataProximo).format("DD/MM/YYYY") + '</td>';
        strTable += '</tr>';

        table += '<tr>';
        table += '<th><b>Lote manejado:</b></th>';
        table += '<td>' + resJ.lote.codigoLote + ' </div> </td>';
        table += '</tr>';
        
        table += '<tr>';
        table += '<th><b>Tipo de manejo:</b></th>';
        table += '<td>' + resJ.tipoDeManejo + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Via de aplicação:</b></th>';
        table += '<td>' + resJ.viaDeAplicacao + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Tratamento:</b></th>';
        table += '<td>' + resJ.tratamento + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Insumo utilizado / Quantid.:</b></th>';
        table += '<td>' + resJ.insumoUtilizado+ ' / ' + resJ.quantInsumo + ' unid </div> </td>';
        table += '</tr>';
        
        table += '<tr>';
        table += '<th><b>Custo do insumo (unidade):</b></th>';
        table += '<td> R$ ' + resJ.custoUnitarioInsumo + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Custos adicionais:</b></th>';
        table += '<td> R$ ' + resJ.custosAdicionais + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Anotações:</b></th>';
        table += '<td> <div class="scroll-cell"> ' + resJ.anotacoes + ' </div> </td>';
        table += '</tr>';

        document.getElementById("table-view-manejo").innerHTML = table;
    
        var strTable = "";
        strTable += '<tr>';
        strTable += '<th>Número do <br> brinco</th>';
        strTable += '<th>Categoria</th>';
        strTable += '<th>Sexo</th>';
        strTable += '</tr>';

        resJ.rebanhoManejado.forEach(element => {
            
            strTable += '<tr>';
            strTable += '<td>'+ element.numeroBrinco +'</td>';
            strTable += '<td>'+ element.categoriaAnimal +'</td>';
            strTable += '<td>'+ element.sexo +'</td>';
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