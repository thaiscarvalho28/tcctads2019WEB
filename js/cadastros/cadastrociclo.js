//---------------------------------------------
/** -------Captura dados do parto------ */
function capturaDadosParto(){
    var b = document.getElementById("comb-idGado");

    var idCiclo = document.getElementById("idCiclo").value;
    var idBezerro = b.options[b.selectedIndex].value;
    
    var dificuldades = document.getElementById("dificuldades").value;
    var dataParto = document.getElementById("dataParto").value;
    var observacoes = document.getElementById("observacoesparto").value;

    var objParto = {
        dificuldades: dificuldades,
        dataParto: dataParto,
        observacoes: observacoes,
        idBezerro: {
            id: idBezerro
        }
    }

    console.log("CICLO => " + idCiclo);
    console.log(objParto);
    var objPartoJSON = JSON.stringify(objParto);
    enviaParto(objPartoJSON, idCiclo);

    //alert(idCiclo + ' / => ' + JSON.stringify(objParto));
}

function enviaParto(objeto, idCiclo){
    var ciclo = idCiclo;
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/parto/cadastparto", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            atualizaCiclo(data, ciclo);
        }
    }
}

function atualizaCiclo(idParto, idCiclo){
    console.log("ID DO CICLO RECEBIDO => " + idCiclo);
    var urlCiclo = "http://localhost:8080/ciclorepro/buscarciclo/" + idCiclo;

    fetch(urlCiclo).then(res => res.json()).then(resJ => {
        var dados =  '{';
            dados += '"idCiclo":' + resJ.idCiclo + ', ';
            dados += '"dataPrevistaParto":' + resJ.dataPrevistaParto + ', ';
            dados += '"diasAposUltimoParto": "' + resJ.diasAposUltimoParto + '", ';
            dados += '"idFemeaUsada": { "id": "' + resJ.idFemeaUsada.id + '" }, ';
            dados += '"idInseminacao": { "idInseminacao": "' + resJ.idInseminacao.idInseminacao + '" }, ';
            dados += '"idTouroUsado":  { "id": "' + resJ.idTouroUsado.id + '" }, ';
            dados += '"situacaoDaFemea": "' + resJ.situacaoDaFemea + '", ';  
            dados += '"idParto": { "idParto":"' + idParto + '" }, ';
            dados += '"status": false';
            dados += '}';

            var obj = dados;
            console.log("OBJETO JSON =>" + obj);

            var ajax = new XMLHttpRequest();
            ajax.open("POST", "http://localhost:8080/ciclorepro/atualiciclo", true);
            ajax.setRequestHeader("Content-type", "application/json");

            ajax.send(obj);
            ajax.onreadystatechange = function() {
                console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
                if (ajax.readyState == 4 && ajax.status == 201) {
                    var data = ajax.response;
                    console.log("Cadastrado com sucesso => " + data);
                    $( "#modal_cadastrar" ).css("display", "none");
                    //$( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );

                    setTimeout(function () {                
                        $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                            $("div.success").remove(); 
                            document.location.reload(true);
                        });               
                    }, 500);
                }
            }
    });
}


//---------------------------------------------
/** Captura dados da inseminacao */
function capturaDadosInseminacao(){
    var dataCobertura = document.getElementById("dataCobertura").value;
    var observacoes = document.getElementById("observacoes").value;
    
    var objInseminacao = {
        dataCobertura: dataCobertura,
        observacoes: observacoes
    }
    var objJSONinsemi = JSON.stringify(objInseminacao);
    enviaDadosInsemi(objJSONinsemi);
}


function capturaDadosCiclo(idInseminacao){
    var m = document.getElementById("comb-idTouroUsado");
    var idTouroUsado = m.options[m.selectedIndex].value;

    var f = document.getElementById("comb-idFemeaUsada");
    var idFemeaUsada = f.options[f.selectedIndex].value;

    var diasAposUltimoParto = document.getElementById("diasAposUltimoParto").value;
    var situacaoDaFemea = document.getElementById("situacaoDaFemea").value;
    var dataPrevistaParto = document.getElementById("dataPrevistaParto").value;

    var objCiclo = {
        idTouroUsado: {
            id: idTouroUsado
        },
        idFemeaUsada: {
            id: idFemeaUsada
        },
        diasAposUltimoParto: diasAposUltimoParto,
        situacaoDaFemea: situacaoDaFemea,
        dataPrevistaParto: dataPrevistaParto,
        idInseminacao: {
            idInseminacao: idInseminacao
        }
    }
    console.log(objCiclo);
    var objJSON = JSON.stringify(objCiclo);
    enviaDadosCiclo(objJSON);
}



/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Envia os dados para API------------ */
function enviaDadosInsemi(objeto){
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/insemi/cadastinsemi", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            capturaDadosCiclo(data);
        }
    }
}


function enviaDadosCiclo(objetoCiclo){
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/ciclorepro/cadastciclo", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objetoCiclo);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            $( "#minhaDiv" ).css("display", "none");
                setTimeout(function () {                
                    $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                        $("div.success").remove(); 
                        document.location.reload(true);
                    });               
            }, 500);
        } else {

        }
    }
}

/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Evento do FORM -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-ciclo").submit(function(e){
        e.preventDefault();
        capturaDadosInseminacao();
    });
});


/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Evento do FORM Modal Cadastro -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-parto").submit(function(e){
        e.preventDefault();
        capturaDadosParto();
    });
});


/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Abre e fecha a tela de cadastro------------ */
function Mudarestado(el){
    var display = document.getElementById(el).style.display;
    if (display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}
/*--------------------------FIM-----------------------------*/


/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*----- Impede o button de atualizar a pagina -----*/
$(document).ready(function($) {
    $(document).on('submit', '#form-cadastro-ciclo', function(event) {
      event.preventDefault();
    });
});
/*--------------------------FIM-----------------------------*/

