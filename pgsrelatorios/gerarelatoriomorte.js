/** --------Pega os parametros passados pela URL-------- */
var query = location.search.slice(1);
var partes = query.split('&');
var data = [];
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = valor;
});
console.log(data); 
filtroAno(data);

/** -------------------------------------------------------------------------- */
/** ----- Busca e preenche tabela de todos os registros de morte ----- */
function filtroAno(ano){
    var anoSelect = ano["ano"];
    console.log(anoSelect);
    var urlBusca = "http://localhost:8080/perda/filtrarano/" + anoSelect;
    fetch(urlBusca).then(res => res.json()).then(resJ => {
        console.log(resJ);
        if(resJ.length > 0){

            document.getElementById("total-mortes").innerHTML = "Total de mortes no ano de " 
                + anoSelect + " = <b>" + resJ.length + "</b> mortes.";

            var strTable = "";
        
            strTable += '<tr>';
            strTable += '<th>Data da morte</th>';
            strTable += '<th>Núm. do brinco</th>';
            strTable += '<th>Sexo</th>';
            strTable += '<th>Data de nascimento</th>';
            strTable += '<th>Lote residente</th>';
            strTable += '<th>Causa da morte</th>';
            strTable += '<th>Observações</th>';
            strTable += '</tr>';
        
            resJ.forEach(element => {
        
                strTable += '<tr>';
                strTable += '<td>'+ moment(element.dataPerdaMorte).format("DD/MM/YYYY") +'</td>';
                strTable += '<td>'+ element.idGado.numeroBrinco +'</td>';
                strTable += '<td>'+ element.idGado.sexo +'</td>';
                strTable += '<td>'+ moment(element.idGado.dataNascimento).format("DD/MM/YYYY") +'</td>';
                strTable += '<td>'+ element.idLote.codigoLote +'</td>';
                strTable += '<td>'+ element.causa +'</td>';
                strTable += '<td>'+ element.observacoes +'</td>';
                strTable += '</tr>';
            });
        
            document.getElementById("table-morte").innerHTML = strTable;
        }
    });

    var anoAnterior = anoSelect - 1;
    var urlBuscaAntes = "http://localhost:8080/perda/filtrarano/" + anoAnterior;
    fetch(urlBuscaAntes).then(res => res.json()).then(resJ => {
        if(resJ.length > 0){
            document.getElementById("total-mortes-antes").innerHTML = "Total de mortes no ano de " 
                    + anoSelect - 1 + " = <b>" + resJ.length + "</b> mortes.";
        } else {
            document.getElementById("total-mortes-antes").innerHTML = "Total de mortes no ano de " 
                + anoAnterior + " = Nenhum registro neste ano!";
        }
    });

}

/** ---------------------------------------------------------------------- 
 * ----------------- GERAR PDF - FINANCEIRO -------------------
*/
function gerarPDFmorte(){
    var doc = new jsPDF("landscape", "pt", "a4");
    var specialElementHandlers = {
        '#hide-finan' : function(element, render) {return true;}
    };

    doc.fromHTML($('#relatorio-morte')[0], 60, 60, {
        'width': 50000,
        'elementHandlers': specialElementHandlers
    })
    doc.save('relatorioanualmortes.pdf');
}