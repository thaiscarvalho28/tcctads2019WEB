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
/*--------------------------FIM-----------------------------*/


// ----- Percorre tabela, pega ID do gado e preenche array -----
async function capturaIdGado() {
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
                    //resJ.forEach(element => {
                    
                    // if(element.id == loteSelect){ //pega pelo lote selecionado 
                    //itemsProcessed++;
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
}


/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------PEGA OS DADOS DO FORM------------ */
function capturaDados(ids) {

    var tm = document.getElementById("tipoDeManejo");
    var lt = document.getElementById("combo-idlotes");

    var dataManejo = document.getElementById("dataManejo").value;
    var dataProximo = document.getElementById("dataProximo").value;
    var tipoDeManejo = tm.options[tm.selectedIndex].value;
    var anotacoes = document.getElementById("anotacoes").value;
    var viaDeAplicacao = document.getElementById("viaDeAplicacao").value;
    var tratamento = document.getElementById("tratamento").value;
    var insumoUtilizado = document.getElementById("insumoUtilizado").value;
    var custoUnitarioInsumo = document.getElementById("custoUnitarioInsumo").value;
    var quantInsumo = document.getElementById("quantInsumo").value;
    var custosAdicionais = document.getElementById("custosAdicionais").value;
    var lote = lt.options[lt.selectedIndex].value;

    //var idGado = capturaIdGado();
    console.log("AND Now This!")


    //Montando o objeto
    var objeto = {
        dataManejo: dataManejo,
        dataProximo: dataProximo,
        tipoDeManejo: tipoDeManejo,
        anotacoes: anotacoes,
        viaDeAplicacao: viaDeAplicacao,
        tratamento: tratamento,
        insumoUtilizado: insumoUtilizado,
        custoUnitarioInsumo: custoUnitarioInsumo,
        quantInsumo: quantInsumo,
        custosAdicionais: custosAdicionais,
        lote: {
            id: lote
        },
        rebanhoManejado: ids
    }


    //Fazer requisicao para fluxo de caixa como Saida
    var multip = custoUnitarioInsumo * quantInsumo;
    var calculoSaida = parseFloat(multip) + parseInt(custosAdicionais);

    console.log("CALCULO => " + calculoSaida);
    enviaValorCaixa(calculoSaida, tipoDeManejo);


    console.log(JSON.stringify(objeto));
    enviaManejo(JSON.stringify(objeto));

}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------ENVIA OS DADOS PARA O ENDPOINT------------ */
function enviaManejo(objetoManejo) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        crossDomain: true,
        url: "http://localhost:8080/manejosanidade/cadastmanejo",
        type: "POST",
        //dataType: "json",
        contentType: "application/json",
        data: objetoManejo,
        success: function (response) {
            //$("#div-success").html(response);
            console.log("Resposta do success => " + response);

            $("#minhaDiv").css("display", "none");
            //$("div.success").fadeIn(500).delay(4000).fadeOut(500);

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

            /*if (response.status == 201) {
                $("#minhaDiv").css("display", "none");
                $("div.success").fadeIn(500).delay(4000).fadeOut(500);

                setTimeout(function () {
                    $("div.success").fadeIn(500).delay(4000).fadeOut(500).slideDown(0, function () {
                        $("div.success").remove();
                        document.location.reload(true);
                    });
                }, 500);
            } else {*/
                $("#minhaDiv").css("display", "none");
                //$("div.success").fadeIn(500).delay(4000).fadeOut(500);

                setTimeout(function () {
                    $("div.failure").fadeIn(500).delay(4000).fadeOut(500).slideDown(0, function () {
                        $("div.failure").remove();
                        document.location.reload(true);
                    });
                }, 500);
            //}
        }
    })
};

/** -----------------------------------------------------
 * Envia os valores gastos com o manejo para o endpoint */
function enviaValorCaixa(valor, desc){
    var urlCaixa = "http://localhost:8080/caixa/cadastcaixa";
    var date = new Date();
    //var dateFormat = date.toLocaleDateString();

    //Constroi o objeto
    var objeto = {
        data: date,
        tipoMovimento: "SAIDA",
        descricao: "Gastos com manejo sanitário do tipo: " + desc,
        valor: parseFloat(valor)
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
 * ----- Envia os dados para o endpoint -----
*/ $(document).ready(function () {
    $("#form-cad-manejo").submit(function (e) {
        e.preventDefault();
        //capturaDadosPesagem();
        //capturaDados();
        capturaIdGado();
    });
});