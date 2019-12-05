/** Abre e fecha a janela de cadastro */
function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    if (display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}
/** ---------- FIM ----------- */


/**----------------------------------------------------- */
/**----------------------------------------------------- */
/**Busca os lotes cadastrados e preenche combobox */
var urlLote = "http://localhost:8080/lotes/listalotes";
fetch(urlLote).then(res => res.json()).then(resJ => {
    console.log(resJ);
    var strCombobox = "";
    strCombobox += '<option value="selec">Selecione...</option>';
    resJ.forEach(element => {
        if(element.status == true){
            strCombobox += '<option value= "' + element.id + '">' + element.codigoLote + '</option>';
        }
    });
    document.getElementById('combo-idlotes').innerHTML = strCombobox;
    document.getElementById('combo-idlotesedt').innerHTML = strCombobox;
});

/**----------------------------------------------------- */



/**----------------------------------------------------- */
/**----------------------------------------------------- */
/** ----------Converte o objeto para JSON---------- */
function ConvertFormToJSON(){
    var numeroBrinco = document.getElementById("numeroBrinco").value;
    var categoriaAnimal = document.getElementById("categoriaAnimal").value;
    var sexo = document.getElementById("sexo").value;
    var pesoinicial = document.getElementById("pesoinicial").value;
    var raca = document.getElementById("raca").value;
    var pelagem = document.getElementById("pelagem").value;
    var dataNascimento = document.getElementById("dataNascimento").value;
    var lt = document.getElementById("combo-idlotes");
    var lote = lt.options[lt.selectedIndex].value;

    var objeto = {
        numeroBrinco: numeroBrinco,
        categoriaAnimal: categoriaAnimal,
        sexo: sexo,
        pesoinicial: pesoinicial,
        raca: raca,
        pelagem: pelagem,
        dataNascimento: dataNascimento,
        lote: {
            id: lote
        }
    };

    return objeto;
}


/**----------------------------------------------------- */
/**----------------------------------------------------- */
/** Realiza o cadastro do gado */
$( document ).ready(function() {
    $("#form-cadastro-gado").submit(function(e){
        e.preventDefault();
        var urlCad = 'http://localhost:8080/gadobov/cadastgado';

        //var data = {}
        var Form = this;
        var objeto = ConvertFormToJSON();
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




/*------------ Impede o button de atualizar a pagina ------------*/
$(document).ready(function($) {
    $(document).on('submit', '#form-cadastro-gado', function(event) {
      event.preventDefault();
    });
});
/*--------------------------------------------------------------------- */



/*------------ Botao que da refresh na pagina ------------*/
function refresh(){
    window.location.reload();
}
/*--------------------------------------------------------------------- */