function capturaDados(){
    var admin = {
        nomeCompleto: document.getElementById("nomeCompleto").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        nomeUser: document.getElementById("nomeUser").value,
        senha: document.getElementById("senha").value
    }; 

    var adminJSON = JSON.stringify(admin)
    console.log(adminJSON);
    enviaDados(adminJSON);
};

function enviaDados(objeto){

    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        url: "http://localhost:8080/loginadmin/cadastlogadmin",
        type: "POST",
        data: objeto,
        //dataType: 'json',
        contentType: "application/json",
        success: function(result){
            console.log(result);
            $("#resposta-cadastro").html("<b>Cadastrado com sucesso!</b>");
        },
        error: function(error){
            console.log(error);
        }
    });

}

/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-cadastro-admin").submit(function(e){
        e.preventDefault();
        capturaDados();
    });
});
