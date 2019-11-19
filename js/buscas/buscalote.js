var url = "http://localhost:8080/lotes/listalotes";

fetch(url).then(res => res.json()).then(resJ => {
    document.getElementById('qtdLote').innerHTML = resJ.length;
    console.log(resJ);

    if(resJ.length > 0){
        var strTable = "";
        var status = "";

        strTable += '<tr>';
        strTable += '<th>Código do lote</th>';
        strTable += '<th>Finalidade</th>';
        strTable += '<th>Quant. de animal</th>';
        strTable += '<th>Capacidade</th>';
        strTable += '<th>Extensão</th>';
        strTable += '<th>Pastagem</th>';
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
            strTable += '<td>'+ element.codigoLote +'</td>';
            strTable += '<td>'+ element.finalidadeLote +'</td>';
            strTable += '<td>'+ element.gado_bovino.length +'</td>';
            strTable += '<td>'+ element.capacidadeDeGado +'</td>';
            strTable += '<td>'+ element.tamanhoLote + '/' + element.unidadeMedida +'</td>';
            strTable += '<td>'+ element.tipoPastagem +'</td>';
            strTable += '<td>'+ status +'</td>';

            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera edit"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera delete"><img src="img/delete.svg" class="imgopera"> <span class="dica">Desativar</span> </button>';
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

    tabela = document.getElementById('tablelotes');
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
