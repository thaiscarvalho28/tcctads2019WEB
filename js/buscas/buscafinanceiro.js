/** ------------------------------------------ */
/* ------ Imprime a data atual ------ */ 
var date = new Date();
var dateFormat = date.toLocaleDateString();
document.getElementById("dataHoje").innerHTML = dateFormat;

/** ------------------------------------------ */
/* ------ Busca caixa mes e ano atual ------ */
var mes = date.getMonth() + 1;
var ano = date.getFullYear();
var url = "http://localhost:8080/caixa/filtrardate/"+ mes +"/"+ ano;

fetch(url).then(res => res.json()).then(resJ => {
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

        document.getElementById("es-entra").innerHTML = "R$ " + resultIn;
        document.getElementById("es-sai").innerHTML = "R$ " + resultOut;

        document.getElementById("res-es").innerHTML = "R$ " +  (resultIn - resultOut);

        document.getElementById("data").innerHTML = strTable;

        
    }
});


/** ------------------------------------------ */
/* ------ Busca caixa ano atual ------ */
var url = "http://localhost:8080/caixa/filtrardate/" + ano;

fetch(url).then(res => res.json()).then(resJ => {
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

        console.log(somaIn);
        console.log(somaOut);

        document.getElementById("val-entra").innerHTML = "R$ " + somaIn;
        document.getElementById("val-sai").innerHTML = "R$ " + somaOut;

        document.getElementById("res-balanco").innerHTML = "R$ " +  (somaIn - somaOut);
    };
});