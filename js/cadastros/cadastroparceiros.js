function enviaDadosParceiro(objeto){
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        url: "http://localhost:8080/parceiros/cadasparceiro",
        type: "POST",
        data: objeto,
        contentType: "application/json",
        success: function(result){
            console.log(result);
            $("#div-success-parc").html("Parceiro cadastrado com sucesso!");
            console.log("Resposta do success => " + JSON.stringify(result));
            $( "#minhaDivParc" ).css("display", "none");

            setTimeout(function () {                
                $("div.succ-parc").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.succ-parc").remove(); 
                    document.location.reload(true);
                });               
            }, 500);
        },
        error: function(error){
            console.log(error);
            $("#div-error").html("Erro ao cadastrar! Tente novamente.");
        }
    });
}

function capturaDadosParc(){
    var tp = document.getElementById("tipo");
    var tipo = tp.options[tp.selectedIndex].value;
    
    var objeto = {
        nomeCompleto: document.getElementById("nomeCompletop").value,
        telefoneComercial: document.getElementById("telefoneComercial").value,
        tipo: tipo,
        email: document.getElementById("emailp").value,
        telefonePessoal: document.getElementById("telefonePessoal").value,
        endereco: document.getElementById("enderecop").value
    }

    var objetoJSON = JSON.stringify(objeto);
    console.log(objetoJSON);
    enviaDadosParceiro(objetoJSON);
}

/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-parceiro").submit(function(e){
        e.preventDefault();
        capturaDadosParc();
    });
});



/*---------------------MASK--------------------*/
$("#telefoneComercial").mask("(99) 99999-9999");
$("#telefonePessoal").mask("(99) 99999-9999");


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
    $(document).on('submit', '#form-cadastro-funcio', function(event) {
      event.preventDefault();
    });
});
/*--------------------------FIM-----------------------------*/