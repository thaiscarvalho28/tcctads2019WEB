const url = "http://localhost:8080/loginadmin/cadastlogadmin";

function enviarDados(){
    /*var admin = {
        nome: document.getElementById("nomeCompleto").value,
        tele: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        vsenha: document.getElementById("senha").value
    }; 
    alert(admin);

    var formData = new FormData();
    formData.append("adminJson", JSON.stringify(admin));

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(resp => {
        if(!resp.ok)
            throw new Error("Não foi possível completar cadastro!!");
            
        return resp.text();
    })
    .then(data => alert(data));*/

    alert(document.getElementById("form-cadastro-admin").nomeCompleto);
};

/*
    var nome = document.getElementById("nomeCompleto").value;
    var tele = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    
    const dados =  {
        "nomeCompleto" : nome,
        "email" : email,
        "telefone" : tele,
        "senha" : senha
    };

    $.ajax({
        url: url,
        type: "POST",
        data: dados,
        dataType: 'json',
        success: function(result){
            console.log(result);
        },
        error: function(error){
            console.log('Error ${error}');
        }
    });



const btnSalvar = document.getElementById('btncadastrar');
btnSalvar.addEventListener('click', enviarDados);


$('#btncadastrar').click(function(){
    $.getJSON(url, function(result){
        console.log(result);
    });
});

$('#btncadastrar').click(function(){
    $.post(url, dados, function(dados, status){
        console.log(dados);
        console.log('${dados} and status is ${status}');
    });
});*/



/*function verificaXmlHttp(){
    var xmlHttp;

    if(window.XMLHttpRequest){
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
}


function capturaEventos(obj, evt, fn){
    if(obj.addEventListener){
        obj.addEventListener(evt, fn, true);
    } else {
        var evento = 'on' + evt;
        obj.attachEvent(evento, fn);
    }
}


capturaEventos(window, 'load', function(evt){
    var btn = document.getElementById('btncadastrar');

    capturaEventos(btn, 'click', function(evt){
        var xmlhttp = verificaXmlHttp();
        console.log(xmlhttp);
        xmlhttp.onreadystatechange = function(){
            if(xmlhttp.readyState === 4 && xmlhttp.status === 200){
                var dadosJSON;
                try{
                    dadosJSON = JSON.parse(xmlhttp.responseText);
                } catch(e){
                    eval("dadosJSON = (" + xmlhttp.responseText + ");");
                }
            }
        }

        xmlhttp.open('POST', url, true);
        
    });
});*/

/*function mostraValor(){
    var nome = document.getElementById("nomeCompleto").value;
    var tele = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    var text = nome + " \\ " + tele  + " \\ " + email + " \\ " + senha;
    console.log(text);
}

document.getElementById("btncadastrar").onclick = function(e){
    mostraValor();
    e.preventDefault();
}*/