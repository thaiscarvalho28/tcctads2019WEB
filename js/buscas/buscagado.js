/**Definicao das categorias 
 * https://cloud.cnpgc.embrapa.br/sac/2012/10/16/prezados-senhores-busquei-no-site-a-embrapa-e-nao-obtive-exito-1-onde-posso-obter-o-peso-medio-de-um-novilho-2-onde-posso-obter-o-peso-medio-de-um-boi-com-45-meses-3-um-novilho-e-considerado-no/
 */

/*---------------------------------------------------------------------*/
/*------------------------- CONTAGEM DE REBANHO ---------------------------*/
var urlM = "http://localhost:8080/gadobov/filtramachos";
var urlF = "http://localhost:8080/gadobov/filtrafemeas";

fetch(urlM).then(res => res.json()).then(resJ =>{
    document.getElementById('qtdMacho').innerHTML = resJ.length;
});

fetch(urlF).then(res => res.json()).then(resJ =>{
    document.getElementById('qtdFemea').innerHTML = resJ.length;
});



/*---------------------------------------------------------------------*/
/*------------------------- BUSCA REBANHO ---------------------------*/
var url = "http://localhost:8080/gadobov/buscatodos";

fetch(url).then(res => res.json()).then(resJ => {   
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var status = "";
        var categoria = "";

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
                status = "Desativado";
            };

            var dataLocal = new Date();
            var dataNascimento = new Date(element.dataNascimento);

            //console.log(dataNascimento);

            var idade = dateNascimento(dataNascimento, dataLocal);
            if(idade == 0){
                idade = "Menos de 1 mês";
            }

            /** -----------Verificacao da categoria---------- */
            if(element.sexo == "Macho"){
                console.log("ENTROU NO PRIMEIRO IF => " + element.sexo + " => " + idade);
                if(idade <= 10){
                    if(idade == 1){
                        categoria = "Vitelo";
                        idade = idade + " mês";
                    } else {
                        categoria = "Vitelo";
                        idade = idade + " meses";
                    }
                    
                } 
                if(idade > 10 && idade <= 14){
                    categoria = "Novilho super precoce";
                    idade = idade + " meses";
                } 
                if(idade >= 15 && idade <= 28){
                    categoria = "Novilho";
                    idade = idade + " meses";
                } 
                if(idade > 28 && idade <= 60){
                    categoria = "Boi";
                    idade = idade + " meses";
                } 
                if(idade > 60){
                    categoria = "Touruno";
                    idade = idade + " meses";
                }
            } else {
                categoria = element.categoriaAnimal;
                idade = idade + " meses";
            }

            strTable += '<tr>';
            strTable += '<td>'+ element.numeroBrinco +'</td>';
            strTable += '<td>'+ categoria +'</td>';
            strTable += '<td>'+ element.sexo +'</td>';
            strTable += '<td>'+ element.pesoinicial +'</td>';
            strTable += '<td>'+ idade +' </td>';
            strTable += '<td>'+ status +' </td>';

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



/** -------------------------------------------------------------------------- */
/** ---------- Calcula diferenca em meses entre duas data (IDADE) ----------- */
function dateNascimento(dataNascido, dataAtual) {

    var intervalo = dataAtual - dataNascido;
    var dias = parseInt((dataAtual - intervalo) / (24 * 3600 * 100));

    var anoDataNascido = dataNascido.getFullYear();
    var anoDataHoje = dataAtual.getFullYear();
    var mesDataNascido = dataNascido.getMonth();
    var mesDataAtual = dataAtual.getMonth();

    var meses = (mesDataAtual + 12 * anoDataHoje) - (mesDataNascido + 12 * anoDataNascido);
    var anos = dataAtual.getFullYear() - dataNascido.getFullYear();

    //console.log("=> " + dias + " DIAS, => " + meses +"MESES => " + anos);

    return meses;
    
}



/** -------------------------------------------------------------------------- */
/** ----------- Busca na tabela por meio do codico do animal ------------- */
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