function capturaDadosCiclo(){
    var m = document.getElementById("comb-idTouroUsado");
    var idTouroUsado = m.options[m.selectedIndex].value;

    var f = document.getElementById("comb-idFemeaUsada");
    var idFemeaUsada = f.options[m.selectedIndex].value;

    var diasAposUltimoParto = document.getElementById("diasAposUltimoParto").value;
    var situacaoDaFemea = document.getElementById("situacaoDaFemea").value;
    var dataPrevistaParto = document.getElementById("dataPrevistaParto").value;

    var idInseminacao = enviaDadosInsemi();
    console.log(idInseminacao);

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
        idInseminacao: idInseminacao,
        idParto: {}
    }
    console.log(objCiclo);    
}

function capturaDadosInseminassao(){
    var dataCobertura = document.getElementById("dataCobertura").value;
    var observacoes = document.getElementById("observacoes").value;
    
    var objInseminacao = {
        dataCobertura: dataCobertura,
        observacoes: observacoes
    }
    return objInseminacao;
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Envia os dados para API------------ */
function enviaDadosInsemi(){
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/insemi/cadastinsemi", true);
    ajax.setRequestHeader("Content-type", "application/json");

    var objeto = JSON.stringify(capturaDadosInseminassao());
    console.log(objeto);

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            return data;
        }
    }
}


function enviaDadosCiclo(objetoCiclo){
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/ciclorepro/cadastciclo", true);
    ajax.setRequestHeader("Content-type", "application/json");

    var objeto = JSON.stringify(objetoCiclo);
    console.log(objeto);

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
        }
    }
}


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

