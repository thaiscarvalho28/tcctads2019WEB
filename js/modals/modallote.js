
/** ---- MODAL EDITAR LOTE ----- */
$('#tablelotes tbody').on('click', '#btnedit', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalEdit(col1);
});

const modalEditLote = document.getElementById('modal_editar');
const btnCloseModalEdit = document.querySelector('.btnfp');

function openModalEdit(idLote){
    modalEditLote.style.display = 'block';

    console.log("ID Lote => " + idLote);
    var url = "http://localhost:8080/lotes/buscarlote/" + idLote;
    fetch(url).then(res => res.json()).then(resJ => {
        // INSERE O VALOR BUSCADO NA URL NO INPUT
        document.querySelector("[name='idlote']").value = resJ.id;
        document.querySelector("[name='statusedt']").value = resJ.status; //COMBOBOX
        document.querySelector("[name='codigoLoteedt']").value = resJ.codigoLote;
        document.querySelector("[name='tamanhoLoteedt']").value = resJ.tamanhoLote;
        document.querySelector("[name='capacidadeDeGadoedt']").value = resJ.capacidadeDeGado;
        document.querySelector("[name='finalidadeLoteedt']").value = resJ.finalidadeLote;
        document.querySelector("[name='unidadeMedidaedt']").value = resJ.unidadeMedida; //COMBOBOX
        document.querySelector("[name='tipoPastagemedt']").value = resJ.tipoPastagem;
    });
}

// Evento que fecha o modal
btnCloseModalEdit.addEventListener('click', closeModalEdit);

// Funcao que fecha modal
function closeModalEdit() {
    modalEditLote.style.display = 'none';
}

/** --------------------------------------------------------- */
/** ----- Captura os dados do formulario de editar ----- */
function capturaDadosEditados(){
    var idLote = document.getElementById("idlote").value;
    var codigoLote = document.getElementById("codigoLoteedt").value;
    var tamanhoLote = document.getElementById("tamanhoLoteedt").value;
    var capacidadeDeGado = document.getElementById("capacidadeDeGadoedt").value;
    var finalidadeLote = document.getElementById("finalidadeLoteedt").value;
    var tipoPastagem = document.getElementById("tipoPastagemedt").value;

    var s = document.getElementById("statusedt");
    var u = document.getElementById("unidadeMedidaedt");
    var status = s.options[s.selectedIndex].value;
    var unidMedida = u.options[u.selectedIndex].value;

    var objeto = {
        id: idLote,
        codigoLote: codigoLote,
        tamanhoLote: tamanhoLote,
        unidadeMedida: unidMedida,
        finalidadeLote: finalidadeLote,
        capacidadeDeGado: capacidadeDeGado,
        tipoPastagem: tipoPastagem,
        status: status
    }

    // console.log("OBJETO NORMAL => " + objeto);
    // console.log("OBJETO JSON => " + JSON.stringify(objeto));
    var objJSON = JSON.stringify(objeto);
    console.log(objJSON);
    enviaDadosLote(objJSON);
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Envia os dados para API------------ */
function enviaDadosLote(objeto){
    console.log("OBJETO DENTRO DA FUNCAO => " + objeto);
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:8080/lotes/atuallote", true);
    ajax.setRequestHeader("Content-type", "application/json");

    ajax.send(objeto);
    ajax.onreadystatechange = function() {
        console.log("READY STATE => " + ajax.readyState + " / STATUS =>" +ajax.status)
        if (ajax.readyState == 4 && ajax.status == 201) {
            var data = ajax.response;
            console.log(data);
            $( "#modal_editar" ).css("display", "none");
            $("div.success").html(data);
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
    $("#form-editar-lote").submit(function(e){
        e.preventDefault();
        capturaDadosEditados();
    });
});








// ---------------------------------------------------//
// ---------------------------------------------------//
// ---------------------------------------------------//
/** ---- MODAL VISUALIZAR GADO DO LOTE ----- */
$('#tablelotes tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalView(col1);
});

const modalViewRebanho = document.getElementById('modal_visualizar');
const btnCloseModal = document.querySelector('.btnfview');

function openModalView(idlote){
    modalViewRebanho.style.display = 'block';
    var url = "http://localhost:8080/lotes/buscarlote/" + idlote;
    var strTable = "";

    fetch(url).then(resJ => resJ.json()).then(resJ => {
        if(resJ.gado_bovino.length == 0){
            document.getElementById("result-gado").innerHTML = "Nenhum animal cadastrado no lote!";
        } else {

        }
        resJ.gado_bovino.forEach(element => {
            if(element.status == true){
                strTable += '<tr>';

                strTable += '<td>' + element.numeroBrinco +  '</td>';
                strTable += '<td>' + element.categoriaAnimal +  '</td>';
                strTable += '<td>' + element.sexo +  '</td>';

                strTable += '</tr>';
            }
        });
        document.getElementById("animal-resid").innerHTML = strTable;
    });

}

// Evento que fecha o modal
btnCloseModal.addEventListener('click', closeModalView);

// Funcao que fecha modal
function closeModalView() {
    modalViewRebanho.style.display = 'none';
}