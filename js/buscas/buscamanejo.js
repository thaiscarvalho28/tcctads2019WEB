var url = "http://localhost:8080/manejosanidade/todosmanejos";

fetch(url).then(res => res.json()).then(resJ => {
    document.getElementById('manejo').innerHTML = resJ.length;
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var soma = 0;
        var custoInsumo = 0;

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Data do Manejo</th>';
        strTable += '<th>Data do Próximo</th>';
        strTable += '<th>Lote Manejado</th>';
        strTable += '<th>Tratamento</th>';
        strTable += '<th>Custos Totais</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {

            custoInsumo = element.custoUnitarioInsumo * element.quantInsumo;
            soma = custoInsumo + element.custosAdicionais;

            strTable += '<tr>';
            strTable += '<td>'+ element.idManejo +'</td>';
            strTable += '<td>'+ moment(element.dataManejo).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ moment(element.dataProximo).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.lote.codigoLote +'</td>';
            strTable += '<td width="180px">'+ element.tratamento +'</td>';

            strTable += '<td>R$ '+ parseFloat(soma.toFixed(2)) +'</td>';

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


/** ------------------------------------------------------------------- */
/*------------ Busca todos os lotes e preenche combobox ------------*/ 
var urlLote = "http://localhost:8080/lotes/listalotes";
fetch(urlLote).then(res => res.json()).then(resJ => {
    var strCombobox = "";
    strCombobox += '<option>Selecione...</option>';
    resJ.forEach(element => {
        strCombobox += '<option value="' + element.id + '">' + element.codigoLote + '</option>'
    });
    document.getElementById('combo-idlotes').innerHTML = strCombobox;
});

/** ------------------------------------------------------------------- */
/*------------ Preenche combobox de gado ------------*/ 
function pegaGadoLote(){
    var urlLote = "http://localhost:8080/lotes/listalotes";
    var loteSelect = document.getElementById("combo-idlotes").value;
    console.log(loteSelect);

    fetch(urlLote).then(res => res.json()).then(resJ => {
        var strCombobox = "";
        console.log(resJ);
        strCombobox += '<option>Selecione...</option>';
        resJ.forEach(element => {
            if(element.id == loteSelect){
                element.gado_bovino.forEach(gado => {
                    strCombobox += '<option value="' + gado.id + '">' + gado.numeroBrinco + '</option>';
                });
            }
            
        });
        document.getElementById('combo-idgado').innerHTML = strCombobox;
    });

}

/** ------------------------------------------------------------------- */
/*------------ Adiciona o gado e o novo peso da table ------------*/ 
function addGadoManejado(){
    var idGado = document.getElementById("combo-idgado").value; //Pego o ID do gado selecionado
    var strTable = "";
    
    var urlIdGado = "http://localhost:8080/gadobov/buscargado/" + idGado;
    console.log(urlIdGado);

    var tbody = document.getElementById("tbadd-novo"); 
    var tr = document.createElement('tr');
    fetch(urlIdGado).then(res => res.json()).then(resJ => {
        //strTable += '<td>'+ resJ.id +'</td>';
        strTable += '<td>'+ resJ.numeroBrinco +'</td>';
        tr.innerHTML = strTable;
        tbody.appendChild(tr);
    });
}

function addAllGado(){
    var urlAll = "http://localhost:8080/lotes/listalotes";
    var loteSelect = document.getElementById("combo-idlotes").value;
    
    fetch(urlAll).then(res => res.json()).then(resJ => {       
        if(resJ.length > 0){
            var strTable = "";
            resJ.forEach(element => {
                if(element.id == loteSelect){
                    element.gado_bovino.forEach(gado => {
                        strTable += '<tr>';
                        strTable += '<td>'+ gado.numeroBrinco +'</td>';
                        strTable += '</tr>';
                    });
                }
            });
            document.getElementById("tbadd-novo").innerHTML = strTable;
        }

    });
}


/*------------ Impede o button de atualizar a pagina ------------*/
$(document).ready(function($) {
    $(document).on('submit', '#form-addGado', function(event) {
      event.preventDefault();
    });
});