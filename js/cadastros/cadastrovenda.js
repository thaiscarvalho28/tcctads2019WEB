/*----------------------------------------------------------------
--------------------------------------------------------------
-------PERCORRE A TABELA, CAPTURA NUMERO DO BRINCO-------*/
async function capturaIdGado(){
    var ids = [];
    var itemsProcessed = 0;

    await new Promise((resolve) => {
        //Percorrendo tabela, capturando num_brinco e pegadando o id
        $('#tb-id-gado tbody tr').each(function () {
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
                            //console.log(id);
                            ids.push(id);

                            if (itemsProcessed === resJ[lote-1].gado_bovino.length) {
                                resolve(console.log("ALL DONE HERE"));
                            }
                        }
                    });
                }
            });//---Fim do fetch().then
        });//---Fim do $().each
    });

    console.log("Now this");
    capturaDados(ids);
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------PEGA OS DADOS DO FORM------------ */
function capturaDados(ids){

    var c = document.getElementById("comprador");
    var comprador = c.options[c.selectedIndex].text;

    var dataVenda = document.getElementById("dataVenda").value;
    var anotacoes = document.getElementById("anotacoes").value;
    var valorTotalVenda = document.getElementById("valorTotalVenda").value;
    var compr = c.options[c.selectedIndex].value;

    //Montando o objeto
    var objeto = {
        dataVenda: dataVenda,
        valorTotalVenda: valorTotalVenda,
        comprador: {
            idParceiro: compr
        },
        anotacoes: anotacoes,
        idGadoVendido: ids
    }
    

    console.log(objeto);
   // enviaValorCaixa(valorTotalVenda, dataVenda, comprador);

    var objJSON = JSON.stringify(objeto);
    //console.log(objJSON);
    enviaCompra(objJSON, valorTotalVenda, dataVenda, comprador);
}

/*---------------------------------------------------------*/
/** ----------ENVIA OS DADOS PARA O ENDPOINT------------ */
function enviaCompra(objeto, valorTotalVenda, dataVenda, comprador) {

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/venda/cadastvenda", true);
    ajax.setRequestHeader("Content-type", "application/json");

    //console.log(objeto);

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var gadoVendido = [];
            enviaValorCaixa(valorTotalVenda, dataVenda, comprador);
            var data = JSON.parse(ajax.response);
            gadoVendido = data.idGadoVendido;

            gadoVendido.forEach(gado => {
                desativaGado(JSON.stringify(gado));
            })
            console.log(gadoVendido);
            //desativaGado(objeto);
        }
    }
};

async function desativaGado(objetoGado){
    //console.log("GADOS => " + objetoVenda);
    var url = "http://localhost:8080/gadobov/desativado";

    var ajax = new XMLHttpRequest();
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objetoGado);



    /*fetch(url).then(res => res.json()).then(resJ => {
        
        var dados =  '{';
            dados += '"id":' + resJ.id + ', ';
            dados += '"numeroBrinco":' + resJ.numeroBrinco + ', ';
            dados += '"categoriaAnimal": "' + resJ.categoriaAnimal + '", ';
            dados += '"sexo": "' + resJ.sexo + '", ';
            dados += '"pesoinicial": ' + resJ.pesoinicial + ', ';
            dados += '"raca": "' + resJ.raca + '", ';
            dados += '"pelagem": "' + resJ.pelagem + '", ';
            dados += '"dataNascimento": "' + resJ.dataNascimento + '", ';
            dados += '"status": false';
            dados += '}';
            var obj = dados;
            //var objJSON = JSON.stringify(obj);
            console.log("OBJETO JSON =>" + obj);

            var ajax = new XMLHttpRequest();
            ajax.open("POST", "http://localhost:8080/gadobov/atualigado", true);
            ajax.setRequestHeader("Content-type", "application/json");

            ajax.send(obj);
            ajax.onreadystatechange = function() {
                console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
                if (ajax.readyState == 4 && ajax.status == 201) {
                    var data = ajax.response;
                    console.log(data);
                    
                }
            }
    });*/
}

/** -----------------------------------------------------
 * Envia os valores gastos com a compra para o endpoint */
function enviaValorCaixa(valor, data, comprador){
    var urlCaixa = "http://localhost:8080/caixa/cadastcaixa";
    //var date = new Date();

    //Constroi o objeto
    var objeto = {
        data: data,
        tipoMovimento: "ENTRADA",
        descricao: "Venda de rebanho para o comprador: " + comprador,
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
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status);
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



/**
 * --------------------------------------------------------------- */
/** ---- REMOVE A LINHA DE UMA TABELA (CLICK NO BOTAO) */
(function($) {
    remove = function(item) { 
      var tr = $(item).closest('tr');
      tr.fadeOut(400, function() {
        tr.remove();  
      });
      return false;
    }
})(jQuery);


/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Abre e fecha a tela de cadastro------------ */
function Mudarestado(el) {
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