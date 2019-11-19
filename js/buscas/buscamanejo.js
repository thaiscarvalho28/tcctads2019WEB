var url = "http://localhost:8080/manejosanidade/todosmanejos";

fetch(url).then(res => res.json()).then(resJ => {
    document.getElementById('manejo').innerHTML = resJ.length;
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Data do Manejo</th>';
        strTable += '<th>Data do próximo</th>';
        strTable += '<th>Lote Manejado</th>';
        strTable += '<th>Tratamento</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {

            strTable += '<tr>';
            strTable += '<td>'+ element.idManejo +'</td>';
            strTable += '<td>'+ moment(element.dataManejo).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ moment(element.dataProximo).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.lote.codigoLote +'</td>';
            strTable += '<td width="180px">'+ element.tratamento +'</td>';

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