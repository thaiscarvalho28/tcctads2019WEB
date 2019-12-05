/** ----------------------------------------------------------- */
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

/** ----------------------------------------------------------- */
/** ----------------------------------------------------------- */
/** --------------------MODAL DE CADASTRO--------------------- */
$('#dataNascimentoedt').mask('99/99/9999');

$('#tabelarebanho tbody').on('click', '#btn-edit', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalEdit(col1);
    console.log(col1);
});

const modalEditGado = document.getElementById('modal_editar');
const btnCloseModalEdit = document.querySelector('.btnfp');

function openModalEdit(numBrinco){
    modalEditGado.style.display = 'block';
    var url = "http://localhost:8080/gadobov/buscabrinco/" + numBrinco;
    fetch(url).then(res => res.json()).then(resJ => {
        // INSERE O VALOR BUSCADO NA URL NO INPUT
        document.querySelector("[name='idgado']").value = resJ.id;
        document.querySelector("[name='numeroBrincoedt']").value = resJ.numeroBrinco;
        document.querySelector("[name='categoriaAnimaledt']").value = resJ.categoriaAnimal;
        document.querySelector("[name='sexoedt']").value = resJ.sexo; //COMBOBOX
        document.querySelector("[name='pesoinicialedt']").value = resJ.pesoinicial;
        document.querySelector("[name='racaedt']").value = resJ.raca;
        document.querySelector("[name='pelagemedt']").value = resJ.pelagem;
        document.querySelector("[name='dataNascimentoedt']").value =  moment(resJ.dataNascimento).format("DD/MM/YYYY"); 
        document.querySelector("[name='statusedt']").value = resJ.status; //COMBOBOX
    });
}

// Evento que fecha o modal
btnCloseModalEdit.addEventListener('click', closeModalEdit);

// Funcao que fecha modal
function closeModalEdit() {
    modalEditGado.style.display = 'none';
}

function capturaDadosEditados(){
    var l = document.getElementById("combo-idlotesedt");
    var lote = l.options[l.selectedIndex].value;
    if(lote == "selec"){
        document.getElementById("combo-idlotesedt").focus();
    } else {
        var id = document.getElementById("idgado").value;
        var numeroBrinco = document.getElementById("numeroBrincoedt").value;
        var categoriaAnimal = document.getElementById("categoriaAnimaledt").value;
        var pesoinicial = document.getElementById("pesoinicialedt").value;
        var raca = document.getElementById("racaedt").value;
        var pelagem = document.getElementById("pelagemedt").value;
        var dataNascimento = document.getElementById("dataNascimentoedt").value;

        var dateNasci = Date.parse(dataNascimento);
        //var formatData = dateNasci/1000;
        //var date = new Date(dataNascimento.split("-").reverse().join("-")).getTime();
        console.log(dateNasci);

        var s = document.getElementById("sexoedt");
        var e = document.getElementById("statusedt");
        
        var sexo = s.options[s.selectedIndex].value;
        var status = e.options[e.selectedIndex].value;

        var objeto = {
            id: id,
            numeroBrinco: numeroBrinco,
            categoriaAnimal: categoriaAnimal,
            pesoinicial: pesoinicial,
            raca: raca,
            pelagem: pelagem,
            dataNascimento: dateNasci,
            sexo: sexo,
            status: status,
            lote: {
                id: lote
            }
        }

        var objJSON = JSON.stringify(objeto);
        console.log(objJSON);
        enviaDados(objJSON);
    }
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Envia os dados para API------------ */
function enviaDados(objeto){
    console.log("OBJETO DENTRO DA FUNCAO => " + objeto);
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/gadobov/atualigado", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            $( "#modal_editar" ).css("display", "none");
            $("div.success").html("Animal atualizado com sucesso.");
            setTimeout(function () {                
                $("div.success").fadeIn( 500 ).delay( 4000 ).fadeOut( 500 ).slideDown(0, function () {
                    $("div.success").remove(); 
                    document.location.reload(true);
                });               
            }, 500);
        }
    }
}

/** ------------------------------------------------------
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Evento do FORM -----
*/ $( document ).ready(function() { 
    $("#form-edit-gado").submit(function(e){
        e.preventDefault();
        capturaDadosEditados();
    });
});




// ---------------------------------------------------//
// ---------------------------------------------------//
// ---------------------------------------------------//
/** ---- MODAL DELETAR LOTE ----- */
$('#tabelarebanho tbody').on('click', '#btndelet', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalConfirm(col1);
});

const modalConfirm = document.getElementById('modal_delete');
const btnCloseModalConfirm = document.querySelector('.btnfdelet');
const btnCancel = document.getElementById('btncancel');
const btnConfirm = document.getElementById('btnSim');


function apagarAnimal(id){
    console.log("CONFIRMOU!")
    var urlDelete = "http://localhost:8080/gadobov/deletegado/" + id;
    $.ajax({
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        },
        url: urlDelete,
        type: 'DELETE',
        success: function(result) {
            console.log("RESULTADO DA REQUISICAO: "+result)
        }
    });
}

/// ------ BUSCA PELO BRINCO PARA PEGAR O ID ------ ///
function capturaId(numbrinco){
    console.log("DENTRO DA FUNCAO => " + numbrinco);
    var url = "http://localhost:8080/gadobov/buscabrinco/" + numbrinco;

    $.get(url, function(response){
        console.log("RESPONSE => " + JSON.stringify(response.id));
        var idAnimalDel = JSON.stringify(response.id);
        btnConfirm.addEventListener('click', apagarAnimal(idAnimalDel));
    });
}

/// ----- ABRE O MODAL ------ ///
function openModalConfirm(num){
    modalConfirm.style.display = 'block';
    capturaId(num);
}

// Evento que fecha o modal
btnCloseModalConfirm.addEventListener('click', closeModalConfirm);
btnCancel.addEventListener('click', closeModalConfirm);

// Funcao que fecha modal
function closeModalConfirm() {
    modalConfirm.style.display = 'none';
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/*----- Impede o button de atualizar a pagina -----*/
$(document).ready(function($) {
    $(document).on('submit', '#form-delete-lote', function(event) {
      event.preventDefault();
    });
});
/*--------------------------FIM-----------------------------*/