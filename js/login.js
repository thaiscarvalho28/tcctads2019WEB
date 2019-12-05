

function login(){
    var urlLogin = "http://localhost:8080/loginadmin/admin/login";

    var usernameFORM = document.getElementById("usernameFORM").value;
    var senhaFORM = document.getElementById("senhaFORM").value;
    
    var objeto = {
        nomeUser: usernameFORM,
        senha: senhaFORM
    }

    var objJSON = JSON.stringify(objeto);
    console.log("OBJETO LOGIN => " + objJSON);

    var ajax = new XMLHttpRequest();
    ajax.open("POST", urlLogin, true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objJSON);
    ajax.onreadystatechange = function() {
        //console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 200) {
            $("#resposta-login").html();
            var token = ajax.getResponseHeader('Authorization');
            window.sessionStorage.setItem("admToken", token);
            window.location.href = "painelinicial.html"
        } else {
            console.log(ajax.responseText);
            $("#resposta-login").html(ajax.responseText);
        }
    }
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
