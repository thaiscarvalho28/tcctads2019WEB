var url1 = "http://localhost:8080/ciclorepro/ativos";
var url2 = "http://localhost:8080/ciclorepro/concluidos";

fetch(url1).then(res => res.json()).then(resJ => { 
    console.log(resJ);
    if(resJ.length > 0){
        var strTable = "";
        var status = "";
        var parto = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Situação</th>';
        strTable += '<th>Previsão do Parto</th>';
        strTable += '<th>Data da Cobertura</th>';
        strTable += '<th>Data do Parto</th>';

        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {
            
            if(element.situacao == true){ 
                status = "Em andamento";
                
            }

            strTable += '<tr>';
            strTable += '<td>'+ element.idCiclo +'</td>';
            strTable += '<td>'+ status +'</td>';
            strTable += '<td>'+ moment(element.dataPrevistaParto).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ moment(element.idInseminacao.dataCobertura).format("DD/MM/YYYY") +'</td>';
            
            if(element.idParto == null){
                parto = "Parto ainda não registrado";
                strTable += '<td>'+ parto +'</td>';
            } else {
                strTable += '<td>'+ moment(element.idParto.dataParto).format("DD/MM/YYYY") +'</td>';
            }
                  
            /** ------------OPERACOES----------- */
            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnview"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
            strTable += '</div>';

            strTable += '</td>';
            strTable += '</tr>';

        });

        
        document.getElementById("table-ciclo-ativo").innerHTML = strTable;
        document.getElementById("ciclo-ativ").innerHTML = resJ.length;
        

    }
});

fetch(url2).then(res => res.json()).then(resJ => { 
    console.log(resJ);
    if(resJ.length > 0){
        var strTable = "";
        var status = "";
        var parto = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Situação</th>';
        strTable += '<th>Previsão do Parto</th>';
        strTable += '<th>Data da Cobertura</th>';
        strTable += '<th>Data do Parto</th>';
        /*strTable += '<th>Animal Gerado</th>';*/
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {
            
            if(element.situacao != true){ 
                status = "Concluído";
                
            }

            strTable += '<tr>';
            strTable += '<td>'+ element.idCiclo +'</td>';
            strTable += '<td>'+ status +'</td>';
            strTable += '<td>'+ moment(element.dataPrevistaParto).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ moment(element.idInseminacao.dataCobertura).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ moment(element.idParto.dataParto).format("DD/MM/YYYY") +'</td>';
        
            /** ------------OPERACOES----------- */
            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnview"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
            strTable += '</div>';

            strTable += '</td>';
            strTable += '</tr>';

        });

        document.getElementById("table-ciclo-concluido").innerHTML = strTable;
        document.getElementById("ciclo-concl").innerHTML = resJ.length;

    }
});