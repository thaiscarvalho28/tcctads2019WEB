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
        
        var div = "";

        div += '<div class="view-info-lote">';
        div += '<p><b>ID do manejo: </b>'+ resJ.idManejo +'</p>';
        div += '<p><b>Data do manejo: </b>'+ moment(resJ.dataManejo).format("DD/MM/YYYY") +'</p>';
        div += '<p><b>Data do próximo: </b>'+ moment(resJ.dataProximo).format("DD/MM/YYYY") +'</p>';
        div += '<p><b>Lote manejado: </b>'+ resJ.lote.codigoLote +'</p>';
        div += '<p><b>Tipo de manejo: </b>'+ resJ.tipoDeManejo +'</p>';
        div += '<p><b>Via de aplicação: </b>'+ resJ.viaDeAplicacao +'</p>';
        div += '<p><b>Tratamento: </b>'+ resJ.tratamento +'</p>';
        div += '<p><b>Insumo utilizado: </b>'+ resJ.insumoUtilizado +'</p>';
        div += '<p><b>Custo do insumo (unidade): </b>R$ '+ resJ.custoUnitarioInsumo +'</p>';
        div += '<p><b>Quantidade de insumo: </b>'+ resJ.quantInsumo +'</p>';
        div += '<p><b>Custos adicionais: </b>R$ '+ resJ.custosAdicionais +'</p>';

        div += '<p><b>Rebanho manejado: </b></p>';
        div += '</div>';
        
        document.getElementById("dadosmanejo").innerHTML = div;
    
        var strTable = "";
        strTable += '<tr>';
        strTable += '<th>Número do brinco</th>';
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