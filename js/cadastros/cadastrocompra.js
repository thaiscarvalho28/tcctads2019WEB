/*----------------------------------------------------------------
--------------------------------------------------------------
-------PERCORRE A TABELA, CAPTURA NUMERO DO BRINCO-------*/
async function capturaIdGado(){
    var ids = [];
    var itemsProcessed = 0;

    await new Promise((resolve) => {
        //Percorrendo tabela, capturando num_brinco e pegadando o id
        $('#tb-id-gado tbody tr ').each(function () {
            var brinco = $(this).find('#num-brinco').html();
            console.log(brinco);

            var urlAll = "http://localhost:8080/lotes/listalotes";
            var lt = document.getElementById("combo-idlotes");
            var lote = lt.selectedIndex;

            fetch(urlAll).then(res => res.json()).then(resJ => {
                if (resJ.length > 0) {
                    resJ[lote-1].gado_bovino.forEach(gado => {

                        if (brinco == gado.numeroBrinco) { //compara o brinco da tabela com o do objeto vindo do endpoint
                            itemsProcessed++;
                            var id = {
                                id: gado.id
                            }
                            console.log(id);
                            ids.push(id);

                            if (itemsProcessed === resJ[lote-1].gado_bovino.length) {
                                resolve(console.log("ALL DONE HERE"));
                            }
                        }

                    });
                    // if(itemsProcessed === resJ.length){
                    //     resolve(console.log("ALL DONE HERE"));
                    // }
                    // }
                    // });

                }
            });//---Fim do fetch().then
        });//---Fim do $().each
    });

    console.log("Now this");
    capturaDados(ids);
    
    //Percorrendo tabela, capturando num_brinco e pegadando o id
    /*$('#tb-id-gado tbody tr ').each(function(){
        var brinco = $(this).find('#num-brinco').html();
        console.log(brinco);

        var urlAll = "http://localhost:8080/lotes/listalotes";
        var loteSelect = document.getElementById("combo-idlotes").value;
        
        fetch(urlAll).then(res => res.json()).then(resJ => {       
            if(resJ.length > 0){
                resJ.forEach(element => {
                    if(element.id == loteSelect){ //pega pelo lote selecionado 
                        element.gado_bovino.forEach(gado => {
                            if(brinco == gado.numeroBrinco){ //compara o brinco da tabela com o do objeto vindo do endpoint
                                var id = {
                                    id: gado.id
                                }
                                ids.push(id);
                            }
                        });
                    }
                });
            }
        });//---Fim do fetch().then
    });//---Fim do $().each
    console.log(ids);
    return ids;*/
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------PEGA OS DADOS DO FORM------------ */
function capturaDados(ids){

    var f = document.getElementById("fornecedor");

    var dataDaCompra = document.getElementById("dataDaCompra").value;
    var anotacoes = document.getElementById("anotacoes").value;
    var fornecedor = f.options[f.selectedIndex].value;
    var valorDoFrete = document.getElementById("valorDoFrete").value;
    var valorDaCompra = document.getElementById("valorDaCompra").value;
    var forne = f.options[f.selectedIndex].text;
    //Montando o objeto
    var objeto = {
        valorDaCompra: valorDaCompra,
        valorDoFrete: valorDoFrete,
        dataDaCompra: dataDaCompra,
        fornecedor: {
            idParceiro: fornecedor
        },
        anotacoes: anotacoes,
        idGadoComprado: ids
    }
    

    console.log(objeto);
    
    var valor = parseFloat(valorDaCompra) + parseFloat(valorDoFrete);
    console.log("VALOR DO CALCULO => " + valor);
    enviaValorCaixa(valor, forne);

    var objJSON = JSON.stringify(objeto);
    console.log(objJSON);
    enviaCompra(objJSON);
}


/*---------------------------------------------------------*/
/** ----------ENVIA OS DADOS PARA O ENDPOINT------------ */
function enviaCompra(objeto) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        crossDomain: true,
        url: "http://localhost:8080/compgado/cadastcompgado",
        type: "POST",
        //dataType: "json",
        contentType: "application/json",
        data: objeto,
        success: function (response) {
            //$("#div-success").html(response);
            console.log("Resposta do success => " + response);

            $("#minhaDiv").css("display", "none");
            setTimeout(function () {
                $("div.success").fadeIn(500).delay(4000).fadeOut(500).slideDown(0, function () {
                    $("div.success").remove();
                    document.location.reload(true);
                });
            }, 500);
        },


        error: function (response) {
            $("#div-error").html(response);
            console.log("Resposta do error => " + JSON.stringify(response));
            $("#minhaDiv").css("display", "none");
            setTimeout(function () {
                $("div.failure").fadeIn(500).delay(4000).fadeOut(500).slideDown(0, function () {
                    $("div.failure").remove();
                    document.location.reload(true);
                });
            }, 500);
        }
    })
};


/** -----------------------------------------------------
 * Envia os valores gastos com a compra para o endpoint */
function enviaValorCaixa(valor, forne){
    var urlCaixa = "http://localhost:8080/caixa/cadastcaixa";
    var date = new Date();

    //Constroi o objeto
    var objeto = {
        data: date,
        tipoMovimento: "SAIDA",
        descricao: "Compra de rebanho do fornecedor: " + forne,
        valor: valor
    }

    //Converte para JSON
    var objJSON = JSON.stringify(objeto);
    console.log("OBJ CAIXA => " + objJSON);

    var ajax = new XMLHttpRequest();
    ajax.open("POST", urlCaixa, true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(objJSON);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
    }

}


/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Evento do FORM -----
*/ $( document ).ready(function() { 
    $("#form-cad-compra").submit(function(e){
        e.preventDefault();
       capturaIdGado();
        
    });
});

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Abre e fecha a tela de cadastro------------ */
function addCadastro(el) {
    var display = document.getElementById(el).style.display;
    if (display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}
/*--------------------------FIM---------------------------*/

/*------------ Impede o button de atualizar a pagina ------------*/
$(document).ready(function($) {
    $(document).on('submit', '', function(event) {
      event.preventDefault();
    });
});
/*--------------------------------------------------------------------- */

/*------------ Botao que da refresh na pagina ------------*/
function refreshPage(){
    window.location.reload();
}
/*--------------------------------------------------------*/