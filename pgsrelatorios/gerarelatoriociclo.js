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
    console.log(anoSelected);
    document.getElementById("mes-ano").innerHTML = mesArr + "/" + anoSelected;

    var urlFiltro = "http://localhost:8080/ciclorepro/filtrardate/"+ mesSelected +"/"+ anoSelected;
    console.log(urlFiltro);

    /** Buscando os dados e preenchendo a tabela */
    fetch(urlFiltro).then(res => res.json()).then(resJ => {
        console.log(resJ);
        if(resJ.length > 0){
            var strTable = ""; 
            var strTableati = "";            
            resJ.forEach(element => {
                if(element.status == false){
                    strTable += '<tr>';
                    strTable += '<td>'+ moment(element.idInseminacao.dataCobertura).format("DD/MM/YYYY") +'</td>';
                    strTable += '<td>'+ element.idFemeaUsada.numeroBrinco +'</td>';
                    strTable += '<td>'+ element.idTouroUsado.numeroBrinco +'</td>';
                    strTable += '<td>'+ moment(element.idParto.dataParto).format("DD/MM/YYYY") +'</td>';
                    strTable += '<td colspan="2">'+ element.idParto.idBezerro.numeroBrinco +'</td>';
                    strTable += '<td>'+ element.idParto.idBezerro.sexo +'</td>';
                    strTable += '<td>'+ element.idParto.dificuldades +'</td>';
                    strTable += '<td>'+ element.diasAposUltimoParto +'</td>';
                    strTable += '</tr>';
                }

                if(element.status == true){
                    strTableati += '<tr>';
                    strTableati += '<td>'+ moment(element.idInseminacao.dataCobertura).format("DD/MM/YYYY") +'</td>';
                    strTableati += '<td>'+ element.idFemeaUsada.numeroBrinco +'</td>';
                    strTableati += '<td>'+ element.idTouroUsado.numeroBrinco +'</td>';
                    strTableati += '<td>'+ moment(element.dataPrevistaParto).format("DD/MM/YYYY") +'</td>';
                    strTableati += '<td>'+ element.diasAposUltimoParto +'</td>';
                    strTableati += '<td>'+ element.situacaoDaFemea +'</td>';
                    strTableati += '</tr>';
                }
            });

            document.getElementById("concluidos").innerHTML = strTable;
            document.getElementById("ativos").innerHTML = strTableati;

        } else {
            strTable += '<tr>';
            strTable += '<td colspan="5" style="font-size: 30px; color: #e60000" font-weight: bold;> Nenhum Resultado Encontrado</th>';
            strTable += '</tr>';
            document.getElementById("total-entra").innerHTML = "Valor total de entradas => R$ ";
            document.getElementById("total-sai").innerHTML = "Valor total de saídas => R$ ";
            document.getElementById("resultado").innerHTML = "Rendimento mensal => R$ ";
            document.getElementById("data-finan").innerHTML = strTable;
        }
    });
}



/** ---------------------------------------------------------------------- 
 * ----------------- GERAR PDF - CICLO -------------------
*/
function gerarPDFciclo(){
    var doc = new jsPDF("landscape", "pt", "a4");
    var specialElementHandlers = {
        '#hide-finan' : function(element, render) {return true;}
    };

    doc.fromHTML($('#relatorio-ciclo').get(0), 30, 30, {
        'width':800,
        'elementHandlers': specialElementHandlers
    })
    doc.save('relatorioreproducao.pdf');
}