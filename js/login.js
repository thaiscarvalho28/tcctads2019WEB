var urlBusca = "http://localhost:8080/loginadmin/buscalogins";

function login(){
    var usernameFORM = document.getElementById("usernameFORM").value;
    var senhaFORM = document.getElementById("senhaFORM").value;
    var validacao = 0;
    console.log("CREDENCIAIS => "+ usernameFORM + " / " +senhaFORM);
    window.location = "painelinicial.html";

    /*fetch(urlBusca).then(res => res.json()).then(resJ => {
        console.log(resJ);

        if(usernameFORM == resJ.nomeUser && senhaFORM == resJ.senha){
            validacao = 1;
            console.log(validacao);
        } 

        if(validacao == 1){
       
        } else {
            $("#resposta-login").html("<b>Não foi possível realizar o login. <br> Os dados estão incorretos!</b>");
        }
    });*/

    
}


/**
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Envia os dados para o endpoint -----
*/ $( document ).ready(function() { 
    $("#form-login").submit(function(e){
        e.preventDefault();
        login();
    });
});
