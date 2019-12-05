var url = "http://localhost:8080/lotes/listalotes";

fetch(url).then(res => res.json()).then(resJ => {
    console.log(resJ);
    var ativo = 0;
    var desativo = 0;
    if(resJ.length > 0){
        var strTable = "";
        var status = "";
        
        strTable += '<tr>';
        strTable += '<th>Identificador</th>';
        strTable += '<th>Código do lote</th>';
        strTable += '<th>Finalidade</th>';
        strTable += '<th>Quant./Capacid.</th>';
        strTable += '<th>Extensão</th>';
        strTable += '<th>Pastagem</th>';
        strTable += '<th>Situação</th>';
        strTable += '<th>Operações</th>';
        strTable += '</tr>';

        resJ.forEach(element => {

            if(element.status === true){ 
                status = "Ativo";
                ativo++;
            } else {
                status = "Desativado"
                desativo++;
            };
            
            strTable += '<tr>';
            strTable += '<td>'+ element.id +'</td>';
            strTable += '<td>'+ element.codigoLote +'</td>';
            strTable += '<td>'+ element.finalidadeLote +'</td>';
            strTable += '<td>'+ element.gado_bovino.length+ ' / ' + element.capacidadeDeGado +'</td>';
            strTable += '<td>'+ element.tamanhoLote + '/' + element.unidadeMedida +'</td>';
            strTable += '<td>'+ element.tipoPastagem +'</td>';
            strTable += '<td>'+ status +'</td>';

            strTable += '<td>';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera edit" id="btnedit"><img src="img/edit (1).svg" class="imgopera"> <span class="dica">Editar</span> </button>';
            strTable += '</div>';

            strTable += '&nbsp &nbsp';

            strTable += '<div class="divdica">';
            strTable += '<button class="btnopera" id="btnview"><img src="img/focus.svg" class="imgopera"> <span class="dica">Visualizar</span> </button>';
            strTable += '</div>';

            strTable += '</td>';
            strTable += '</tr>';
        });

        document.getElementById('qtdLoteAtiv').innerHTML = ativo;
        document.getElementById('qtdLoteDesat').innerHTML = desativo;
        document.getElementById("data").innerHTML = strTable;
    }
});


document.getElementById('buscarbtn').addEventListener('click', buscaFiltragem);

function buscaFiltragem(){
    var coluna = "1";
    var filtrar, tabela, tr, td, th, i;

    filtrar = document.getElementById("buscarcamp");
    filtrar = filtrar.value.toUpperCase();
    

    tabela = document.getElementById('tablelotes');
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
