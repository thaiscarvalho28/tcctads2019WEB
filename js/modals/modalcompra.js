/** --------------------------------------------------------------------------- */
/** ----------------- MODAL DAS OPERACOES DA TABELA --------------------- */
$('#table-compra tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalView(col1);
});

const modal = document.querySelector('#modal_visualizar');
const closeBtn = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModalView(id) {
    modal.style.display = 'block';
    var url = "http://localhost:8080/compgado/buscarcompgado/" + id;

    fetch(url).then(res => res.json()).then(resJ => {
        console.log(resJ);
        
        var valor = resJ.valorDaCompra;
        var frete = resJ.valorDoFrete;
        var table = "";

        var soma = parseFloat(valor) + parseFloat(frete);
        document.getElementById("info-valor").innerHTML = "Valor total da compra => R$ <b>" + parseFloat(soma).toFixed(2) + "</b>";

        table += '<tr>';
        table += '<th><b>Data da compra:</b></th>';
        table += '<td>' + moment(resJ.dataDaCompra).format("DD/MM/YYYY") + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Valor total de rebanho:</b></th>';
        table += '<td>R$ ' + valor.toFixed(2) + '</td>';
        strTable += '</tr>';

        table += '<tr>';
        table += '<th><b>Valor do frete:</b></th>';
        table += '<td>R$ ' + frete.toFixed(2) + ' </div> </td>';
        table += '</tr>';
        
        table += '<tr>';
        table += '<th><b>Anotações:</b></th>';
        table += '<td> <div class="scroll-cell"> ' + resJ.anotacoes + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Fornecedor:</b></th>';
        table += '<td>' + resJ.fornecedor.nomeCompleto + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Tipo do fornecedor:</b></th>';
        table += '<td>' + resJ.fornecedor.tipo + ' </div> </td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Telefone comercial:</b></th>';
        table += '<td>' + resJ.fornecedor.telefoneComercial + ' </div> </td>';
        table += '</tr>';
       
        document.getElementById("table-view-cmp").innerHTML = table;
    
        var arroba = 0;
        var pesoVivo = 0;
        var rendimento = 0.5;

        var strTable = "";
        strTable += '<tr>';
        strTable += '<th>Número do <br> brinco</th>';
        strTable += '<th>Categoria</th>';
        strTable += '<th>Sexo</th>';
        strTable += '<th>Peso de entrada</th>';
        strTable += '</tr>';

        resJ.idGadoComprado.forEach(element => {

            pesoVivo = element.pesoinicial;
            arroba = (pesoVivo * rendimento)/15;
            
            strTable += '<tr>';
            strTable += '<td>'+ element.numeroBrinco +'</td>';
            strTable += '<td>'+ element.categoriaAnimal +'</td>';
            strTable += '<td>'+ element.sexo +'</td>';
            strTable += '<td>'+ element.pesoinicial +' kg / ' + parseFloat(arroba).toFixed(2) + ' @</td>';
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