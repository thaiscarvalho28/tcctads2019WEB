/**
 * ---------------------------------------------------- 
 * ----------------------------------------------------
 * ----- Captura os dados da tebela de novo peso ------
*/ 
async function capturaDados(){
    var urlLote = "http://localhost:8080/lotes/listalotes";
    var itemsProcessed = 0;
    var idPeso = [];

    await new Promise((resolve) => {

        $('table#table-novoPeso tr:has(input)').each(function(){
           
            var self = $(this);
            var currow = $(this).closest('tr');
            var tdNumBrinco = currow.find('td:eq(0)').text(); //pega brinco
    
            var lt = document.getElementById("combo-idlotes");
            var lote = lt.selectedIndex;

           fetch(urlLote).then(res => res.json()).then( resJ => {
                //console.log(resJ);
                console.log(lote-1);
                //resJ.forEach(element => {

                resJ[lote-1].gado_bovino.forEach(item => {
                    if(item.numeroBrinco == tdNumBrinco){
                            
                        var peso = {
                            idGado : {
                                id: item.id
                            },
                            peso : self.find('#peso').val()
                        }
                        
                        var pesoJSON = JSON.stringify(peso);
                        enviaPesos(pesoJSON).then(res => {
                            itemsProcessed++;

                            var pesoNovo = {
                                idPeso : res.idPeso,
                            }

                            idPeso.push(pesoNovo);
                            //console.log(idPeso[0]);
                            if(itemsProcessed === resJ[lote-1].gado_bovino.length){
                                resolve(console.log("ALL DONE HERE"));
                            }
                        });
                    }    
                })
            });
        });
        //resolve(console.log("all DONE HERE"))
    }) //Fim do awaint
    console.log("OLa");
    console.log(idPeso);
    capturaDadosPesagem(idPeso);
    
}



/**
 * ---------------------------------------------------------- 
 * ----------------------------------------------------------
 * ------- Captura os dados completos da pesagem -------
*/
function capturaDadosPesagem(peso){

    var lt = document.getElementById("combo-idlotes");

    var lote = lt.options[lt.selectedIndex].value;
    var dataPesagem = document.getElementById("dataPesagem").value;
    var observacoes = document.getElementById("observacoes").value;
    

    //console.log(peso);
                    
    var pesagem = {
        idLote: {
            id: lote
        },
        dataPesagem: dataPesagem,
        observacoes: observacoes,
        rebanhoPesado: peso 
    };   
    console.log(pesagem);
    enviaPesagem(JSON.stringify(pesagem));

}


/**
 * ---------------------------------------------------------- 
 * ----------------------------------------------------------
 * ------- Envia os novos pesos -------
*/
function enviaPesos(dadoPeso){
    return $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        crossDomain: true,
        url : "http://localhost:8080/pesogado/cadastpeso",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data : dadoPeso,
        success : function(response){
            $("#div-success").html(response);
            console.log("Resposta do success => " + JSON.stringify(response));
            $( "#minhaDiv" ).css("display", "none");    
            setTimeout(function () {                
                $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.success").remove(); 
                    document.location.reload(true);
                });               
            }, 500);
        }, 


        error: function(response){
            $("#div-error").html(response);
            console.log("Resposta do error => " + JSON.stringify(response));
            $( "#minhaDiv" ).css("display", "none");
            setTimeout(function () {                
                $("div.failure").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.failure").remove(); 
                    document.location.reload(true);
                });               
            }, 500); 
        }
    });  
}

/**
 * ------------------------------------------------------ 
 * ------------------------------------------------------ 
 * ------ Envia os dados da pesagem completo ------
*/
function enviaPesagem(pesagem){
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        crossDomain: true,
        url : "http://localhost:8080/pesagem/cadastpesagem",
        type: "POST",
        dataType : "JSON", 
        contentType: "application/json",
        data : pesagem,
        success : function(response){
            $("#div-success").html(response);
            console.log("Resposta do success => " + JSON.stringify(response.idPeso));
            
            $( "#minhaDiv" ).css("display", "none");
            $( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );
    
            setTimeout(function () {                
                $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.success").remove(); 
                    document.location.reload(true);
                });               
            }, 500);
        }, 


        error: function(response){
            $("#div-error").html(response);
            console.log("Resposta do error => " + JSON.stringify(response));
            $( "#minhaDiv" ).css("display", "none");
            $( "div.success" ).fadeIn( 500 ).delay( 4000 ).fadeOut( 500 );
    
            setTimeout(function () {                
                $("div.failure").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.failure").remove(); 
                    document.location.reload(true);
                });               
            }, 500);
            
        }
    })
}


/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-addPesagem").submit(function(e){
        e.preventDefault();
        //capturaDadosPesagem();
        capturaDados();
    });
});