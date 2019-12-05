/** ---------------------------------------------- */
/** ----- Busca fazenda e proprietario ----- */
var urlFarm = "http://localhost:8080/fazenda/buscarfazenda/1";

fetch(urlFarm).then(res => res.json()).then(resJ => {
    var strTable = "";

    strTable += '<tr>';
    strTable += '<th><b>Nome:</b></th>';
    strTable += '<td>' + resJ.nomeFazenda + '</td>';
    strTable += '</tr>';

    strTable += '<tr>';
    strTable += '<th><b>Registro:</b></th>';
    strTable += '<td>' + resJ.numDeRegistro + '</td>';
    strTable += '</tr>';

    strTable += '<tr>';
    strTable += '<th><b>Endereço:</b></th>';
    strTable += '<td>' + resJ.endereco + '</td>';
    strTable += '</tr>';

    strTable += '<tr>';
    strTable += '<th><b>Proprietário:</b></th>';
    strTable += '<td>' + resJ.proprietario.nomeCompleto + '</td>';
    strTable += '</tr>';

    document.getElementById("table-fazenda").innerHTML = strTable;
});


/** ---------------------------------------------- */
/** ----- Busca administrador ----- */
var urlAdmin = "http://localhost:8080/loginadmin/buscarlogadmin/1";

fetch(urlAdmin).then(res => res.json()).then(resJ => {
    var strTable = "";

    strTable += '<tr>';
    strTable += '<th><b>Nome:</b></th>';
    strTable += '<td>' + resJ.nomeCompleto + '</td>';
    strTable += '</tr>';

    strTable += '<tr>';
    strTable += '<th><b>E-mail:</b></th>';
    strTable += '<td>' + resJ.email + '</td>';
    strTable += '</tr>';

    strTable += '<tr>';
    strTable += '<th><b>Telefone:</b></th>';
    strTable += '<td>' + resJ.telefone + '</td>';
    strTable += '</tr>';

    strTable += '<tr>';
    strTable += '<th><b>Usuário:</b></th>';
    strTable += '<td>' + resJ.nomeUser + '</td>';
    strTable += '</tr>';

    document.getElementById("table-admin").innerHTML = strTable;
});