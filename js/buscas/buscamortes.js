/** -------------------------------------------------------------------------- */
/** ----------- Busca na tabela por meio da data ------------- */
$(document).ready(function(){
    $("#buscarcamp").mask("00/0000");
});

document.getElementById('buscarbtn').addEventListener('click', buscaFiltragem);

function buscaFiltragem(){
    var coluna = "0";
    var filtrar, tabela, tr, td, th, i;
    var result;

    filtrar = document.getElementById("buscarcamp");
    filtrar = filtrar.value.toUpperCase();

    tabela = document.getElementById('tabelamain');
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

/** ------------------------------------------------ */
/** ----- Popula combobox de Lote e Gado ----- */
var urlLote = "http://localhost:8080/lotes/listalotes";
fetch(urlLote).then(res => res.json()).then(resJ => {
    var strCombobox = "";
    strCombobox += '<option>Selecione...</option>';
    resJ.forEach(element => {
        strCombobox += '<option value="' + element.id + '">' + element.codigoLote + '</option>';
    });
    document.getElementById('comb-idLote').innerHTML = strCombobox;

    
});

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

/** -------------------------------------------------------------------------- */
/** ----- Busca e preenche tabela de todos os registros de morte ----- */
var urlBusca = "http://localhost:8080/perda/todasperdas";
fetch(urlBusca).then(res => res.json()).then(resJ => {
    console.log(resJ);
    if(resJ.length > 0){
        var strTable = "";
    
        strTable += '<tr>';
        strTable += '<th>Data da morte</th>';
        strTable += '<th>Núm. do brinco</th>';
        strTable += '<th>Cód. do lote</th>';
        strTable += '<th>Causa da morte</th>';
        strTable += '<th>Observações</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';
    
        resJ.forEach(element => {
    
            strTable += '<tr>';
            strTable += '<td>'+ moment(element.dataPerdaMorte).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.idGado.numeroBrinco +'</td>';
            strTable += '<td>'+ element.idLote.codigoLote +'</td>';
            strTable += '<td>'+ element.causa +'</td>';
            strTable += '<td>'+ element.observacoes +'</td>';
    
            strTable += '<td>';
    
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera edit"><img src="img/edit (1).svg" class="imgopera"><span class="dica">Editar</span> </button>';
            strTable += '</div>';
    
            strTable += '&nbsp &nbsp';
    
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera delete"><img src="img/delete.svg" class="imgopera"> <span class="dica">Desativar</span> </button>';
            strTable += '</div>';
    
            strTable += '</td>';
            strTable += '</tr>';
        });
    
        document.getElementById("dataTable").innerHTML = strTable;
    }
});


/*------------ Botao que da refresh na pagina ------------*/
function refresh(){
    window.location.reload();
}
/*--------------------------------------------------------------------- */
