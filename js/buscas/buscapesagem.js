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
/*------------ Preenche tabela com os gados do lote selecionado ------------*/ 
function pegaGadoLote(){
    var urlLote = "http://localhost:8080/lotes/listalotes";
    var loteSelect = document.getElementById("combo-idlotes").value;
    fetch(urlLote).then(res => res.json()).then(resJ => {
        console.log(resJ);

        var strTable = "";
        resJ.forEach(element => {
            if(element.id == loteSelect){
                element.gado_bovino.forEach(gado => {
                    if(gado.status == true){
                        strTable += '<tr>';
                        strTable += '<td>'+ gado.numeroBrinco +'</td>';
                        strTable += '<td><input type="number" class="input-peso" step="any" autocomplete="off" name="idPeso" id="idPeso" placeholder="Exemplo: 585.89"></td>';
                        strTable += '</tr>';
                    }
                });
            }
        });
        document.getElementById("tbadd-novoPeso").innerHTML = strTable;
    });
}



/*------------ Impede o button de atualizar a pagina ------------*/
$(document).ready(function($) {
    $(document).on('submit', '#form-addPeso', function(event) {
      event.preventDefault();
    });
});