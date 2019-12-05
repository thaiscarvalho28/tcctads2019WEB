var url1 = "http://localhost:8080/ciclorepro/ativos";
var url2 = "http://localhost:8080/ciclorepro/concluidos";

//--------------------------------------------------
/**----- Preenche tabela de ativos ------ */
fetch(url1).then(res => res.json()).then(resJ => { 
    console.log(resJ);
    if(resJ.length > 0){
        var strTable = "";
        var status = "";
        var parto = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Situação</th>';
        strTable += '<th>Data da Cobertura</th>';
        strTable += '<th>Previsão do Parto</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {
            
            if(element.status == true){ 
                status = "Em andamento";
            }

            strTable += '<tr>';
            strTable += '<td>'+ element.idCiclo +'</td>';
            strTable += '<td>'+ status +'</td>';
            strTable += '<td>'+ moment(element.idInseminacao.dataCobertura).format("DD/MM/YYYY") +'</td>';
            strTable += '<td> <b>'+ moment(element.dataPrevistaParto).format("DD/MM/YYYY") +'</b></td>';
             
            /** ------------OPERACOES----------- */
            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="regisparto"><img src="img/parto.svg" class="imgopera parto"> <span class="dica">Registrar parto</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

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

//--------------------------------------------------
/**----- Preenche tabela de concluidos ------ */
fetch(url2).then(res => res.json()).then(resJ => { 
    if(resJ.length > 0){
        var strTable = "";
        var status = "";
        var parto = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Situação</th>';
        strTable += '<th>Data da Inseminação</th>';
        strTable += '<th>Data do Parto</th>';
        strTable += '<th>Brinco do <br> Animal Gerado</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {
            
            if(element.situacao != true){ 
                status = "Concluído";
                
            }

            strTable += '<tr>';
            strTable += '<td>'+ element.idCiclo +'</td>';
            strTable += '<td>'+ status +'</td>';
            strTable += '<td>'+ moment(element.idInseminacao.dataCobertura).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ moment(element.idParto.dataParto).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.idParto.idBezerro.numeroBrinco +'</td>';
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
    } else {
        document.getElementById("ciclo-concl").innerHTML = 0;
    }
});



/**----------------------------------------------------- */
/**----------------------------------------------------- */
/** --- Busca machos e femeas, preenche bombobox --- */
var urlM = "http://localhost:8080/gadobov/filtramachos";
var urlF = "http://localhost:8080/gadobov/filtrafemeas";

fetch(urlM).then(res => res.json()).then(resJ => {
    //console.log(resJ);
    var strCombobox = "";
    strCombobox += '<option>Selecione...</option>';
    resJ.forEach(element => {
        if(element.status == true){
            strCombobox += '<option value= "' + element.id + '">' + element.numeroBrinco + '</option>';
        }
    });
    document.getElementById('comb-idTouroUsado').innerHTML = strCombobox;
});

/// ---------------------------- ///

fetch(urlF).then(res => res.json()).then(resJ => {
    //console.log(resJ);
    var strCombobox = "";
    strCombobox += '<option>Selecione...</option>';
    resJ.forEach(element => {
        if(element.status == true){
            fetch
            strCombobox += '<option value= "' + element.id + '">' + element.numeroBrinco + '</option>';
        }
    });
    document.getElementById('comb-idFemeaUsada').innerHTML = strCombobox;
});
/**----------------------------------------------------- */



/**----------------------------------------------------- */
/**----------------------------------------------------- */
/** --- Busca lotes, preenche bombobox em PARTO --- */
var urlLote = "http://localhost:8080/lotes/listalotes";
fetch(urlLote).then(res => res.json()).then(resJ => {
    var strCombobox = "";
    strCombobox += '<option>Selecione...</option>';
    resJ.forEach(element => {
        strCombobox += '<option value="' + element.id + '">' + element.codigoLote + '</option>';
    });
    document.getElementById('comb-idLote').innerHTML = strCombobox;
});


// ------ Preenche combo de gado, de acordo com o lote selecionado ------
function pegaGadoLote(){
    var urlLote = "http://localhost:8080/lotes/listalotes";
    var loteSelect = document.getElementById("comb-idLote").value;
    fetch(urlLote).then(res => res.json()).then(resJ => {
        var strCombobox = "";
        strCombobox += '<option>Selecione...</option>';
        resJ.forEach(element => {
            if(element.id == loteSelect){
                if(element.gado_bovino.length == 0){
                    strCombobox += '<option> O LOTE NÃO POSSUI ANIMAIS </option>';
                } else {
                    element.gado_bovino.forEach(gado => {
                        strCombobox += '<option value="' + gado.id + '">' + gado.numeroBrinco + '</option>';
                    
                    });
                }
            }
        });
        document.getElementById("comb-idGado").innerHTML = strCombobox;
    });
}



/*------------ Botao que da refresh na pagina ------------*/
function refresh(){
    window.location.reload();
}
/*--------------------------------------------------------------------- */


/** -------------------------------------------------------------------------- */
/** ----------- Busca na tabela por meio da data ------------- */
$(document).ready(function(){
    $("#buscarcampativ").mask("00/0000");
    $("#buscarcampconcl").mask("00/0000");
});

document.getElementById('buscarbtnativ').addEventListener('click', buscaFiltragem);
function buscaFiltragem(){
    var coluna = "2";
    var filtrar, tabela, tr, td, th, i;
    
    filtrar = document.getElementById("buscarcampativ");
    filtrar = filtrar.value.toUpperCase();

    tabela = document.querySelector('.ativos');
    tr = tabela.getElementsByTagName('tr');
    th = tabela.getElementsByTagName('th');
    
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[coluna];

        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filtrar) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.getElementById('buscarbtnconcl').addEventListener('click', buscaFiltragemConc);
function buscaFiltragemConc(){
    var coluna = "4";
    var filtrar, tabela, tr, td, th, i;
    
    filtrar = document.getElementById("buscarcampconcl");
    filtrar = filtrar.value.toUpperCase();

    tabela = document.querySelector('.concluidos');
    tr = tabela.getElementsByTagName('tr');
    th = tabela.getElementsByTagName('th');
    
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[coluna];

        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filtrar) > -1){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
