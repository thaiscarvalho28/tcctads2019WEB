/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ------ Envia os dados para api ------
*/function enviaDados(objeto){
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        url: "http://localhost:8080/caixa/cadastcaixa",
        type: "POST",
        data: objeto,
        contentType: "application/json",
        success: function(result){
            console.log(result);
            $("#div-success").html("Movimento de caixa cadastrado com sucesso!");
            console.log("Resposta do success => " + JSON.stringify(result));
            $( "#minhaDiv" ).css("display", "none");

            setTimeout(function () {                
                $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.success").remove(); 
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

/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ------ Captura os dados do formulario ------
*/function capturaDados(){
    var m = document.getElementById("tipoMovimento");
    var objeto = {
        data: document.getElementById("data").value,
        tipoMovimento: m.options[m.selectedIndex].value,
        descricao: document.getElementById("descricao").value,
        valor: document.getElementById("valor").value
        
    }
    var objetoJSON = JSON.stringify(objeto);
    enviaDados(objetoJSON);
}


/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-finan").submit(function(e){
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