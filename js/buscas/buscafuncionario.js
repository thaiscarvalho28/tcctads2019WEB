var url = "http://localhost:8080/funcionario/todosfuncio";

fetch(url).then(res => res.json()).then(resJ => {
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var status = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Nome</th>';
        strTable += '<th>Cargo</th>';
        strTable += '<th>Contratação</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {
            strTable += '<tr>';
            strTable += '<td>'+ element.idPessoa +'</td>';
            strTable += '<td>'+ element.nomeCompleto +'</td>';
            strTable += '<td>'+ element.cargo +'</td>';
            strTable += '<td>'+ element.dataContratacao +'</td>';

            strTable += '<td>';
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnviewfunc"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';
            
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/delete.svg" class="imgopera"> <span class="dica">Desativar</span> </button>';
            strTable += '</div>';
            strTable += '</td>';

            strTable += '</tr>';
        });

        document.getElementById("datafunc").innerHTML = strTable;
    }
});