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
/** ----------Envia os dados para API---------- */
$( document ).ready(function() {
    $("#form-cadastro-lote").submit(function(e){
        e.preventDefault();
        var urlCad = 'http://localhost:8080/lotes/cadastlote';

        //var data = {}
        var Form = this;
        var objeto = ConvertFormToJSON("#form-cadastro-lote");
        var objJSON = JSON.stringify(objeto);
        console.log("OBJETO JSON => " + objJSON);

        //Salvando os dados.......
        $.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            },
            crossDomain: true,
            url : urlCad,
            type: "POST",
            dataType : "text",
            contentType: "application/json",
            data : objJSON,
            context : Form,
            success : function(response){
                $("#div-success").html(response);
                console.log("Resposta do success => " + JSON.stringify(response));
                $( "#minhaDiv" ).css("display", "none");
                //$( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );

                setTimeout(function () {                
                    $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                        $("div.success").remove(); 
                        document.location.reload(true);
                    });               
                }, 500);

            }, 
            error: function(response){
                $("#div-error").html(response);
                console.log("Resposta do success => " + JSON.stringify(response));
                $( "#minhaDiv" ).css("display", "none");
                //$( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );

                setTimeout(function () {                
                    $("div.failure").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                        $("div.failure").remove(); 
                        document.location.reload(true);
                    });               
                }, 500);
                
            }
        })
    
    });
});
/*--------------------------FIM-----------------------------*/




/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Converte o objeto para JSON---------- */
function ConvertFormToJSON(form){
    console.log('ConvertFormToJSON invoked!');
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });

    console.log('JSON: ' + json);
    return json;
}
/*--------------------------FIM-----------------------------*/




/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ---------- Alertas para requisicoes ---------- */
$(document).ready(function(){ 
  //$( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );
});

$( "#success-btn" ).click(function() {
  $( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );
});

$( "#failure-btn" ).click(function() {
  $( "div.failure" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );
});

$( "#warning-btn" ).click(function() {
  $( "div.warning" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );
});



/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*----- Impede o button de atualizar a pagina -----*/
$(document).ready(function($) {
    $(document).on('submit', '#form-cadastro-lote', function(event) {
      event.preventDefault();
    });
});
/*--------------------------FIM-----------------------------*/

/*------------ Botao que da refresh na pagina ------------*/
function refresh(){
    window.location.reload();
}
/*--------------------------------------------------------------------- */

