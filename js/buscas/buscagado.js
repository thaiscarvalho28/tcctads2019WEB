/** Pega a data atual
 * var date = new Date();
    var dateFormat = date.toLocaleDateString(); */

/*---------------------------------------------------------------------*/
/*------------------------- BUSCA REBANHO ---------------------------*/
var url = "http://localhost:8080/gadobov/buscatodos";

fetch(url).then(res => res.json()).then(resJ => {   
    document.getElementById('qtdGado').innerHTML = resJ.length;
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var status = "";

        strTable += '<tr>';
        strTable += '<th>Número do brinco</th>';
        strTable += '<th>Categoria</th>';
        strTable += '<th>Sexo</th>';
        strTable += '<th>Peso de Entrada</th>';
        strTable += '<th>Idade</th>';
        strTable += '<th>Situação</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {

            if(element.status === true){ 
                status = "Ativo";
            } else {
                status = "Desativado"
            };

            strTable += '<tr>';
            strTable += '<td>'+ element.numeroBrinco +'</td>';
            strTable += '<td>'+ element.categoriaAnimal +'</td>';
            strTable += '<td>'+ element.sexo +'</td>';
            strTable += '<td>'+ element.pesoinicial +'</td>';
            strTable += '<td>'+ moment(element.dataNascimento).endOf('day').fromNow() +'</td>';
            strTable += '<td>'+ status +'</td>';

            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnview"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
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


document.getElementById('buscarbtn').addEventListener('click', buscaFiltragem);

function buscaFiltragem(){
    var coluna = "0";
    var filtrar, tabela, tr, td, th, i;

    filtrar = document.getElementById("buscarcamp");
    filtrar = filtrar.value.toUpperCase();

    tabela = document.getElementById('tabelarebanho');
    tr = tabela.getElementsByTagName('tr');
    th = tabela.getElementsByTagName('th');
    
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