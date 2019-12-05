/**
 * ----------------------------------------------------
 * ----------- MODAL DE VISUALIZACAO --------------
 */
$('#tabelamain tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalViewCiclo(col1);
    //console.log(col1);
});

const modalViewCiclo = document.getElementById('modal_visualizar');
const btnCloseViewCiclo = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModalViewCiclo(id) {
    console.log(id);
    modalViewCiclo.style.display = 'block';
    var url1 = "http://localhost:8080/ciclorepro/buscarciclo/" + id;

    fetch(url1).then(res => res.json()).then(resJ => {
        console.log(resJ);

        var table = "";

        table += '<tr>';
        table += '<th><b>Data da inseminação:</b></th>';
        table += '<td>' + moment(resJ.idInseminacao.dataCobertura).format("DD/MM/YYYY") + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Observações da inseminação:</b></th>';
        table += '<td> <div class="scroll-cell">' + resJ.idInseminacao.observacoes + '</div></td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Fêmea usada:</b></th>';
        table += '<td>' + resJ.idFemeaUsada.numeroBrinco + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Dias após último parto:</b></th>';
        table += '<td>' + resJ.diasAposUltimoParto + ' dias</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Situação da fêmea:</b></th>';
        table += '<td>' + resJ.situacaoDaFemea + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Macho usado:</b></th>';
        table += '<td>' + resJ.idTouroUsado.numeroBrinco + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Data prevista para o parto:</b></th>';
        table += '<td>' + moment(resJ.dataPrevistaParto).format("DD/MM/YYYY") + '</td>';
        table += '</tr>';

        if(resJ.idParto == null){
            table += '<tr>';
            table += '<th><b>Data do parto:</b></th>';
            table += '<td> Parto ainda não registrado!</td>';
            table += '</tr>';
        } else {
            table += '<tr>';
            table += '<th><b>Data do parto:</b></th>';
            table += '<td> ' + moment(resJ.idParto.dataParto).format("DD/MM/YYYY") + '</td>';
            table += '</tr>';

            table += '<tr>';
            table += '<th><b>Dificuldades:</b></th>';
            table += '<td><div class="scroll-cell">' + resJ.idParto.dificuldades + '</div></td>';
            table += '</tr>';

            table += '<tr>';
            table += '<th><b>Observações:</b></th>';
            table += '<td><div class="scroll-cell">' + resJ.idParto.observacoes + '</td>';
            table += '</tr>';
            
            table += '<tr>';
            table += '<th><b>Bezerro gerado:</b></th>';
            table += '<td>' + resJ.idParto.idBezerro.numeroBrinco + '  </td>';
            table += '</tr>';

            table += '<tr>';
            table += '<th><b>Sexo do bezerro:</b></th>';
            table += '<td>' + resJ.idParto.idBezerro.sexo + '  </td>';
            table += '</tr>';
            
        }
        document.getElementById("table-view-ciclo").innerHTML = table;
    });    
}
  
// Evento que fecha o modal
btnCloseViewCiclo.addEventListener('click', closeViewCicloModal);

// Funcao que fecha modal
function closeViewCicloModal() {
    modalViewCiclo.style.display = 'none';
}

/**
 * ----------------------------------------------------
 * ----------- MODAL DE CADASTRO --------------
 */
$('#tabelamain tbody').on('click', '#regisparto', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalCadastro(col1);
    //console.log(col1);
});

const modalCadastroParto = document.getElementById('modal_cadastrar');
const btnCloseCadastroParto = document.querySelector('.btnfp');

function openModalCadastro(idCiclo){
    modalCadastroParto.style.display = 'block';
    document.querySelector("[name='idCiclo']").value = idCiclo;
}

// Evento que fecha o modal
btnCloseCadastroParto.addEventListener('click', closeModalCadastro);

// Funcao que fecha modal
function closeModalCadastro() {
    modalCadastroParto.style.display = 'none';
}