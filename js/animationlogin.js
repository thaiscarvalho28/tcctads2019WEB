
$("#telefone").mask("(99) 99999-9999");

var btnsignup = document.querySelector("#signup");
var btnsignin = document.querySelector("#signin");

var body = document.querySelector("body");

btnsignup.addEventListener('click', function(){
    body.className = "sign-up-js";
});

btnsignin.addEventListener('click', function(){
    body.className = "sign-in-js";
});