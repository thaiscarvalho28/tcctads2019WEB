function desativaGado(id){
    console.log("ID recebido na funcao: "+id)
    var url = "http://localhost:8080/gadobov/buscargado/" + id;

    fetch(url).then(res => res.json()).then(resJ => {
        
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
                    $( "#minhaDiv" ).css("display", "none");
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

/** -------------------------------------------- */
/** --- Envia os dados para API (Salva) --- */
function enviaDadosAPI(objeto){
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/perda/cadastperda", true);
    ajax.setRequestHeader("Content-type", "application/json");

    var objetoMorte = JSON.stringify(objeto);
    console.log(objetoMorte);

    ajax.send(objetoMorte);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            desativaGado(objeto.idGado.id);
        }
    }
}


/** ----------------------------------------- */
/** --- Pega os dados do formulario --- */
function capturaDados(){
    var gb = document.getElementById("comb-idGado");
    var gado = gb.options[gb.selectedIndex].value;
    
    var lt = document.getElementById("comb-idLote");
    var lote = lt.options[lt.selectedIndex].value;

    var dataPerdaMorte = document.getElementById("dataPerdaMorte").value;
    var causa = document.getElementById("causa").value;
    var observacoes = document.getElementById("observacoes").value;

    var obj = {
        idGado: {
            id: gado
        },
        idLote: {
            id: lote
        },
        dataPerdaMorte: dataPerdaMorte,
        causa: causa,
        observacoes: observacoes
    }
    console.log(obj);
    enviaDadosAPI(obj);
}

/* ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-morte").submit(function(e){
        e.preventDefault();
        capturaDados();
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
    $(document).on('submit', '#form-cadastro-morte', function(event) {
      event.preventDefault();
    });
});
/*--------------------------FIM-----------------------------*/
