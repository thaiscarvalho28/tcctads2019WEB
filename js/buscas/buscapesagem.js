var url = "http://localhost:8080/pesagem/todospesos";

fetch(url).then(res => res.json()).then(resJ => {
    document.getElementById('peso').innerHTML = resJ.length;
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Data da Pesagem</th>';
        strTable += '<th>Lote</th>';
        strTable += '<th>Quant Animais Pesados</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {
   
            strTable += '<tr>';
            strTable += '<td>'+ element.idPesagem +'</td>';
            strTable += '<td>'+ moment(element.dataPesagem).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.idLote.codigoLote +'</td>';
            strTable += '<td width="180px">'+ element.rebanhoPesado.length +'</td>';

            strTable += '<td>';
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';
            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnview"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
            strTable += '</div>';
            strTable += '&nbsp &nbsp';
            
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/delete.svg" class="imgopera"> <span class="dica">Desativar</span> </button>';
            strTable += '</div>';
            strTable += '</td>';

            strTable += '</tr>';
        });

        document.getElementById("data").innerHTML = strTable;
    }
});