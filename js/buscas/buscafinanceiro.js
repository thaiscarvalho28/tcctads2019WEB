/** ------------------------------------------ */
/** ------------------------------------------ */
/* ------ Imprime a data atual ------ */ 
var date = new Date();
var dateFormat = date.toLocaleDateString();
document.getElementById("dataHoje").innerHTML = dateFormat;
/** ------------------------------------------ */


/** ------------------------------------------ */
/** ------------------------------------------ */
/* ------ Busca mes e ano atual ------ */
var mes = date.getMonth() + 1;
var ano = date.getFullYear();
var url1 = "http://localhost:8080/caixa/filtrardate/"+ mes +"/"+ ano;

fetch(url1).then(res => res.json()).then(resJ => {
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
        strTable += '<th>Operações</th>';
        strTable += '</tr>'; 
        
        resJ.forEach(element => {

            strTable += '<tr>';
            strTable += '<td>'+ element.descricao +'</td>';
            strTable += '<td>'+ moment(element.data).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.tipoMovimento +'</td>';
            strTable += '<td>'+ element.valor +'</td>';

            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera edit"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';
            strTable += '</td>';
            strTable += '</tr>';

            if(element.tipoMovimento == "ENTRADA"){
                resultIn = resultIn + element.valor;
            }

            if(element.tipoMovimento == "SAIDA"){
                resultOut = resultOut + element.valor;
            }
        });

        document.getElementById("es-entra").innerHTML = "R$ " + resultIn.toFixed(2);
        document.getElementById("es-sai").innerHTML = "R$ " + resultOut.toFixed(2);

        var result = resultIn - resultOut;

        document.getElementById("res-es").innerHTML = "R$ " +  result.toFixed(2);

        document.getElementById("movimento-mes").innerHTML = strTable;
    }
});
/** ------------------------------------------ */


/** ------------------------------------------ */
/** ------------------------------------------ */
/* ------ Busca ano atual ------ */
var url2 = "http://localhost:8080/caixa/filtrardate/" + ano;

fetch(url2).then(res => res.json()).then(resJ => {
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
        document.getElementById("val-entra").innerHTML = "R$ " + somaIn.toFixed(2);
        document.getElementById("val-sai").innerHTML = "R$ " + somaOut.toFixed(2);

        var soma = somaIn - somaOut;

        document.getElementById("res-balanco").innerHTML = "R$ " + soma.toFixed(2);
    };
});
/** ------------------------------------------ */


/** ------------------------------------------ */
/** ------------------------------------------ */
/* ------ Combobox por ano ------ */
var url3 = "http://localhost:8080/caixa/todoscaixas";
fetch(url3).then(res => res.json()).then(resJ => {
    var datas = [];
    var vetDatas = [];

    resJ.forEach(e => {
        datas.push(new Date(e.data));
        if(!vetDatas.includes(new Date(e.data).getFullYear())){
            vetDatas.push(new Date(e.data).getFullYear());
        }
    });

    var dataMax = new Date(Math.max.apply(null, datas));
    var dataMin = new Date(Math.min.apply(null, datas));
    console.log(dataMin);
    console.log(dataMax);
    console.log(vetDatas);

    vetDatas.sort();
    var strCombobox = "";

    strCombobox += '<option selected="select">Ano...</option>';
    for(i = 0; i < vetDatas.length; i++){
        strCombobox += '<option value="' + vetDatas[i] + '">' + vetDatas[i] + '</option>';
    }
    document.getElementById("ano").innerHTML = strCombobox;
});
/** ------------------------------------------ */


/** ------------------------------------------ */
/** ------------------------------------------ */
/* ------ Filtragem por mes e ano ------ */
//var btnFiltrar = document.getElementById("btnFiltro");
//btnFiltrar.addEventListener('click', filtro);

function filtro(){
    var mesSelected = $("#mes").val();
    //console.log(mesSelected);
    var anoSelected = $("#ano").val();
    //console.log(anoSelected);
    
    var urlFiltro = "http://localhost:8080/caixa/filtrardate/"+ mesSelected +"/"+ anoSelected;
    //console.log(urlFiltro);

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
            strTable += '<th>Operações</th>';
            strTable += '</tr>'; 
            
            resJ.forEach(element => {
    
                strTable += '<tr>';
                strTable += '<td>'+ element.descricao +'</td>';
                strTable += '<td>'+ moment(element.data).format("DD/MM/YYYY") +'</td>';
                strTable += '<td>'+ element.tipoMovimento +'</td>';
                strTable += '<td>'+ element.valor +'</td>';
    
                strTable += '<td>';
    
                strTable += '<div class="divdica">';
                strTable += '<button class="btnopera edit"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
                strTable += '</div>';
                strTable += '</td>';
                strTable += '</tr>';
    
                if(element.tipoMovimento == "ENTRADA"){
                    resultIn = resultIn + element.valor;
                }
    
                if(element.tipoMovimento == "SAIDA"){
                    resultOut = resultOut + element.valor;
                }
            });
    
            document.getElementById("es-entra").innerHTML = "R$ " + resultIn.toFixed(2);
            document.getElementById("es-sai").innerHTML = "R$ " + resultOut.toFixed(2);

            var calculo = resultIn - resultOut;
    
            document.getElementById("res-es").innerHTML = "R$ " +  calculo.toFixed(2);
    
            document.getElementById("movimento-mes").innerHTML = strTable;
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

            document.getElementById("es-entra").innerHTML = "R$ ";
            document.getElementById("es-sai").innerHTML = "R$ ";
    
            document.getElementById("res-es").innerHTML = "R$ ";

            document.getElementById("movimento-mes").innerHTML = strTable;
        }
    });

    var url2 = "http://localhost:8080/caixa/filtrardate/" + anoSelected;
    fetch(url2).then(res => res.json()).then(resJ => {
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
            document.getElementById("val-entra").innerHTML = "R$ " + somaIn.toFixed(2);
            document.getElementById("val-sai").innerHTML = "R$ " + somaOut.toFixed(2);
    
            document.getElementById("res-balanco").innerHTML = "R$ " +  (somaIn - somaOut);
        };
    });
    
}
/** ------------------------------------------ */