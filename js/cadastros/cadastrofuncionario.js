function enviaDadosFuncio(objeto){
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        url: "http://localhost:8080/funcionario/cadastfuncio",
        type: "POST",
        data: objeto,
        contentType: "application/json",
        success: function(result){
            console.log(result);
            $("#div-successfun").html("Funcionário cadastrado com sucesso!");
            console.log("Resposta do success => " + JSON.stringify(result));
            $( "#minhaDiv" ).css("display", "none");

            setTimeout(function () {                
                $("div.succ-fun").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.succ-fun").remove(); 
                    document.location.reload(true);
                });               
            }, 500);
        },
        error: function(error){
            console.log(error);
            $("#div-errorfun").html("Erro ao cadastrar! Tente novamente.");
        }
    });
}

function capturaDadosFuncio(){
    var objeto = {
        nomeCompleto: document.getElementById("nomeCompleto").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        endereco: document.getElementById("endereco").value,
        cargo: document.getElementById("cargo").value,
        dataContratacao: document.getElementById("dataContratacao").value,
        valorSalario: document.getElementById("valorSalario").value
    }

    var objetoJSON = JSON.stringify(objeto);
    console.log(objetoJSON);
    enviaDadosFuncio(objetoJSON);
}

/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-funcio").submit(function(e){
        e.preventDefault();
        capturaDadosFuncio();
    });
});



/*---------------------MASK--------------------*/
$("#telefone").mask("(99) 99999-9999");


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