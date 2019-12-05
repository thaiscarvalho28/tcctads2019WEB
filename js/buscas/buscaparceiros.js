var url = "http://localhost:8080/parceiros/buscartodosparca";

fetch(url).then(res => res.json()).then(resJ => {
    /*document.getElementById('manejo').innerHTML = resJ.length;*/
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var status = "";

        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Nome</th>';
        strTable += '<th>Função</th>';
        strTable += '<th>Tele Comercial</th>';
        strTable += '<th>Situtação</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {

            if(element.status === true){ 
                status = "Ativo";
            } else {
                status = "Desativado"
            };

            strTable += '<tr>';
            strTable += '<td>'+ element.idParceiro +'</td>';
            strTable += '<td>'+ element.nomeCompleto +'</td>';
            strTable += '<td>'+ element.tipo +'</td>';
            strTable += '<td>'+ element.telefoneComercial +'</td>';
            strTable += '<td>'+ status +'</td>';

            strTable += '<td>';
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnviewparc"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';
            
            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/delete.svg" class="imgopera"> <span class="dica">Desativar</span> </button>';
            strTable += '</div>';
            strTable += '</td>';

            strTable += '</tr>';
        });

        document.getElementById("data").innerHTML = strTable;
    }
});

document.getElementById('buscarbtnfunc').addEventListener('click', buscaFiltragemFunc);

function buscaFiltragemFunc(){
    var coluna = "1";
    var filtrar, tabela, tr, td, th, i;

    filtrar = document.getElementById("buscarcampfunc");
    filtrar = filtrar.value.toUpperCase();

    tabela = document.getElementById('tabelamainfunc');
    tr =tabela.getElementsByTagName('tr');
    th =tabela.getElementsByTagName('th');
    
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[coluna];

        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filtrar) > -1){
                tr[i].style.display = ""; 
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

document.getElementById('buscarbtnparc').addEventListener('click', buscaFiltragemParc);

function buscaFiltragemParc(){
    var coluna = "1";
    var filtrar, tabela, tr, td, th, i;

    filtrar = document.getElementById("buscarcampparc");
    filtrar = filtrar.value.toUpperCase();

    tabela = document.getElementById('tabelamainparc');
    tr =tabela.getElementsByTagName('tr');
    th =tabela.getElementsByTagName('th');
    
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[coluna];

        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filtrar) > -1){
                tr[i].style.display = ""; 
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/*------------ Botao que da refresh na pagina ------------*/
function refresh(){
    window.location.reload();
}
/*--------------------------------------------------------------------- */