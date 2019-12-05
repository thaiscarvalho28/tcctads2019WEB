/// ------------------------------------------------ ///
/// ------------Busca todas as vendas------------///
var urlAllVendas = "http://localhost:8080/venda/todasvendas";
fetch(urlAllVendas).then(res => res.json()).then(resJ => {
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var soma = 0;
        var custoInsumo = 0;

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Data da Venda</th>';
        strTable += '<th>Comprador</th>';
        strTable += '<th>Valor da Venda</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {

            strTable += '<tr>';
            strTable += '<td>'+ element.idVendaGado +'</td>';
            strTable += '<td>'+ moment(element.dataVenda).format("DD/MM/YYYY") +'</td>';
            strTable += '<td>'+ element.comprador.nomeCompleto +'</td>';
            strTable += '<td>R$ '+ element.valorTotalVenda.toFixed(2) +'</td>';
            //strTable += '<td width="180px">'+ element.tratamento +'</td>';

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

        document.getElementById("dados-venda").innerHTML = strTable;
    }
});




/** ------------------------------------------------------------------- */
/*------------ ADICIONA O GADO DO LOTE SELECIONADO NA TABELA ------------*/ 
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
                        strTable += '<td id="num-brinco">'+ gado.numeroBrinco + '</td>';
                        strTable += '<td> <button type="button" onclick="remove(this)" class="btn-remove remove-linha">Excluir</button> </td>';
                        strTable += '</tr>';
                    });
                }
            });
            document.getElementById("venda-gado").innerHTML = strTable;
        }

    });
}

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
}); //-----------------------------------------------


/** ------------------------------------------------------------------- */
/*--------- Busca todos os parceirtos e preenche combobox ----------*/ 
var urlParc = "http://localhost:8080/parceiros/buscartodosparca";
fetch(urlParc).then(res => res.json()).then(resJ => {
    var strCombobox = "";
    strCombobox += '<option>Selecione...</option>';
    resJ.forEach(element => {
        strCombobox += '<option value="' + element.idParceiro + '">' + element.nomeCompleto + '</option>'
    });
    document.getElementById('comprador').innerHTML = strCombobox;
}); //-----------------------------------------------