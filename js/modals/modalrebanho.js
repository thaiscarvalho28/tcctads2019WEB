/** */
$('#tabelarebanho tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalViewGado(col1);
    console.log(col1);
});

const modalViewGado = document.getElementById('modal_visualizar');
const btnCloseViesGado = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModalViewGado(numBrinco) {
    modalViewGado.style.display = 'block';

    var urlBuscaId = "http://localhost:8080/gadobov/buscatodos";
    fetch(urlBuscaId).then(res => res.json()).then(res => {
        var id = 0;
        res.forEach(el => {
            if(numBrinco == el.numeroBrinco){
                id = el.id;
                console.log("ID ENCONTRADO! => " + id);
            }
        });
        console.log("ID POR FORA => " + id);
        var url = "http://localhost:8080/gadobov/buscargado/" + id;
        console.log("URL => " + url);

        fetch(url).then(res => res.json()).then(resJ => {
            /*document.getElementById('peso').innerHTML = resJ.length;*/
            console.log(resJ);

            var arroba = 0;
            var pesoVivo = 0;
            var rendimento = 0.5;
            pesoVivo = resJ.pesoinicial;
            arroba = (pesoVivo * rendimento)/15;
            
            var strTable = "";

            strTable += '<tr>';
            strTable += '<th><b>Número do Brinco:</b></th>';
            strTable += '<td>' + resJ.numeroBrinco + '</td>';
            strTable += '</tr>';

            strTable += '<tr>';
            strTable += '<th><b>Categoria:</b></th>';
            strTable += '<td>' + resJ.categoriaAnimal + '</td>';
            strTable += '</tr>';

            strTable += '<tr>';
            strTable += '<th><b>Sexo:</b></th>';
            strTable += '<td>' + resJ.sexo + '</td>';
            strTable += '</tr>';

            strTable += '<tr>';
            strTable += '<th><b>Peso de entrada:</b></th>';
            strTable += '<td>'+ resJ.pesoinicial +' kg / ' + arroba.toFixed(2) + ' @</td>';
            strTable += '</tr>';

            strTable += '<tr>';
            strTable += '<th><b>Raça:</b></th>';
            strTable += '<td>' + resJ.raca + '</td>';
            strTable += '</tr>';

            strTable += '<tr>';
            strTable += '<th><b>Pelagem:</b></th>';
            strTable += '<td>' + resJ.pelagem + '</td>';
            strTable += '</tr>';

            strTable += '<tr>';
            strTable += '<th><b>Data de nascimento:</b></th>';
            strTable += '<td>' + moment(resJ.dataNascimento).format("DD/MM/YYYY") + '</td>';
            strTable += '</tr>';
            
            document.getElementById("dadosgado").innerHTML = strTable;
        });    
    });
    
}
  
// Evento que fecha o modal
btnCloseViesGado.addEventListener('click', closeModalViewGado);

// Funcao que fecha modal
function closeModalViewGado() {
    modalViewGado.style.display = 'none';
}