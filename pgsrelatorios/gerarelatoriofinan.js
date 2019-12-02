/** ---------------------------------------------------------------------- 
 * ----------------- RELATORIO FINANCEIRO -------------------
*/

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
filtro(data);

/** ---------------- Preenche tabela do relatorio ---------------- */
function filtro(data){
    var mesSelected = data["mes"];
    var anoSelected = data["ano"];
    //var mesSelected = $("#mes-finan").val();
    var mes = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro',
                'Outubro','Novembro','Dezembro'];
    var mesArr = mes[mesSelected-1];
    console.log(mesSelected);
    //var anoSelected = $("#ano-finan").val();
    console.log(anoSelected);
    document.getElementById("mes-ano").innerHTML = mesArr + "/" + anoSelected;

    var urlFiltro = "http://localhost:8080/caixa/filtrardate/"+ mesSelected +"/"+ anoSelected;
    console.log(urlFiltro);

    /** Buscando os dados e preenchendo a tabela */
    fetch(urlFiltro).then(res => res.json()).then(resJ => {
        console.log(resJ);
        if(resJ.length > 0){
            var strTable = "";
            var resultIn = 0;
            var resultOut = 0; 
    
            strTable += '<tr>';
            strTable += '<th>Descrição</th>';
            strTable += '<th>Data</th>';
            strTable += '<th>Movimento</th>';
            strTable += '<th>Valor</th>';
            strTable += '</tr>'; 
            
            resJ.forEach(element => {
    
                strTable += '<tr>';
                strTable += '<td>'+ element.descricao +'</td>';
                strTable += '<td>'+ moment(element.data).format("DD/MM/YYYY") +'</td>';
                strTable += '<td>'+ element.tipoMovimento +'</td>';
                strTable += '<td>'+ element.valor.toFixed(2) +'</td>';
                strTable += '</tr>';
    
                if(element.tipoMovimento == "ENTRADA"){
                    resultIn = resultIn + element.valor;
                }
    
                if(element.tipoMovimento == "SAIDA"){
                    resultOut = resultOut + element.valor;
                }
            });

            var calculo = resultIn - resultOut;
            document.getElementById("total-entra").innerHTML = "Valor total de entradas => R$ " + resultIn.toFixed(2);
            document.getElementById("total-sai").innerHTML = "Valor total de saídas => R$ " + resultOut.toFixed(2);
            document.getElementById("resultado").innerHTML = "Rendimento mensal => R$ " + calculo.toFixed(2);
            document.getElementById("data-finan").innerHTML = strTable;

        } else {
            strTable += '<tr>';
            strTable += '<th>Descrição</th>';
            strTable += '<th>Data</th>';
            strTable += '<th>Movimento</th>';
            strTable += '<th>Valor</th>';
            strTable += '<th>Operações</th>';
            strTable += '</tr>'; 

            strTable += '<tr>';
            strTable += '<td colspan="5" style="font-size: 30px; color: #e60000" font-weight: bold;> Nenhum Resultado Encontrado</th>';
            strTable += '</tr>';
            document.getElementById("total-entra").innerHTML = "Valor total de entradas => R$ ";
            document.getElementById("total-sai").innerHTML = "Valor total de saídas => R$ ";
            document.getElementById("resultado").innerHTML = "Rendimento mensal => R$ ";
            document.getElementById("data-finan").innerHTML = strTable;
        }
    });

    /** ---- Buscando balanco do ano atual ---- */
    var url2 = "http://localhost:8080/caixa/filtrardate/" + anoSelected;
    fetch(url2).then(res => res.json()).then(resJ => {
        console.log(resJ)
        if(resJ.length > 0){
            var somaIn = 0;
            var somaOut = 0;
            resJ.forEach(e => {
                if(e.tipoMovimento == "ENTRADA"){
                    somaIn = somaIn + e.valor;
                }
    
                if(e.tipoMovimento == "SAIDA"){
                    somaOut = somaOut + e.valor;
                }
            });
            var calculoAnualAtual = somaIn - somaOut;
            document.getElementById("ano-atual").innerHTML = "Rendimento do ano de " + anoSelected + " => R$ " +  calculoAnualAtual;
        };
    });

    /** ---- Buscando balanco do ano anterior ---- */
    var anoAntes = anoSelected - 1;
    var url3 = "http://localhost:8080/caixa/filtrardate/" + anoAntes;
    fetch(url3).then(res => res.json()).then(resJ => {
        console.log(resJ)
        if(resJ.length > 0){
            var somaIn = 0;
            var somaOut = 0;
            resJ.forEach(e => {
                if(e.tipoMovimento == "ENTRADA"){
                    somaIn = somaIn + e.valor;
                }
    
                if(e.tipoMovimento == "SAIDA"){
                    somaOut = somaOut + e.valor;
                }
            });
            var calculoAnualAtual = somaIn - somaOut;
            document.getElementById("ano-antes").innerHTML = "Rendimento do ano de " + anoAntes + " => R$ " +  calculoAnualAtual;
        } else {
            document.getElementById("ano-antes").innerHTML = "Rendimento do ano de " + anoAntes + " => Nenhum rendimento encontrado!";
        }
    });
    
}



/** ---------------------------------------------------------------------- 
 * ----------------- GERAR PDF - FINANCEIRO -------------------
*/
function gerarPDFfinan(){
    var doc = new jsPDF("landscape", "pt", "a4");
    var specialElementHandlers = {
        '#hide-finan' : function(element, render) {return true;}
    };

    doc.fromHTML($('#relatorio-finan').get(0), 30, 30, {
        'width':800,
        'elementHandlers': specialElementHandlers
    })
    doc.save('relatoriofinanceiro.pdf');
}