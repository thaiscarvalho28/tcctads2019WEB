/** --------------------------------------------------------------------------- */
/** ----------------- MODAL DAS OPERACOES DA TABELA --------------------- */
$('#tabelamain tbody').on('click', '#btnview', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalView(col1);
});

const modal = document.querySelector('#modal_visualizar');
const closeBtn = document.querySelector('.btnfechar');

// Abre modal do "Visualizar" de Pesagens
function openModalView(id) {
    modal.style.display = 'block';
    var url = "http://localhost:8080/pesagem/buscarpesagem/" + id;

    fetch(url).then(resJ => resJ.json()).then(resJ => {
        /*document.getElementById('peso').innerHTML = resJ.length;*/
        console.log(resJ);
        
        var table = "";

        table += '<tr>';
        table += '<th><b>ID da pesagem:</b></th>';
        table += '<td>' + resJ.idPesagem + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Lote relizada a pesagem:</b></th>';
        table += '<td>' + resJ.idLote.codigoLote + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Data da pesagem:</b></th>';
        table += '<td>' + moment(resJ.dataPesagem).format("DD/MM/YYYY") + '</td>';
        strTable += '</tr>';

        table += '<tr>';
        table += '<th><b>Observações:</b></th>';
        table += '<td> <div class="scroll-cell"> ' + resJ.observacoes + ' </div> </td>';
        table += '</tr>';
        
        document.getElementById("dadospesagem").innerHTML = table;

        var arroba = 0;
        var pesoVivo = 0;
        var rendimento = 0.5;
    
        var strTable = "";
        strTable += '<tr>';
        strTable += '<th>Número do <br> brinco</th>';
        strTable += '<th>Categoria</th>';
        strTable += '<th>Sexo</th>';
        strTable += '<th>Peso em Kg</th>';
        strTable += '<th>Peso em @</th>';
        strTable += '</tr>';

        resJ.rebanhoPesado.forEach(element => {
            
            pesoVivo = element.peso;
            arroba = (pesoVivo * rendimento)/15;

            strTable += '<tr>';
            strTable += '<td>'+ element.idGado.numeroBrinco +'</td>';
            strTable += '<td>'+ element.idGado.categoriaAnimal +'</td>';
            strTable += '<td>'+ element.idGado.sexo +'</td>';
            strTable += '<td>'+ element.peso.toFixed(2) +' kg</td>';
            strTable += '<td>'+ parseFloat(arroba.toFixed(2)) +'* @ </td>';
            strTable += '</tr>';
        });
        document.getElementById("tabview").innerHTML = strTable;
    });    
}
  
// Evento que fecha o modal
closeBtn.addEventListener('click', closeModal);

// Funcao que fecha modal
function closeModal() {
    modal.style.display = 'none';
}





/// ------------------------------------------------------------ ///
/// ------------------------------------------------------------ ///
/// ------------------------------------------------------------ ///
/// ----------------MODAL PARA EDITAR----------------- ///
$('#tabelamain tbody').on('click', '#btn-edit', function(){
    var currow = $(this).closest('tr');
    var col1 = currow.find('td:eq(0)').text();
    openModalEdit(col1);
    console.log(col1);
});

const modalEditGado = document.getElementById('modal_editar');
const btnCloseModalEdit = document.querySelector('.btnfp');

function openModalEdit(idPeso){
    modalEditGado.style.display = 'block';
    var url = "http://localhost:8080/pesagem/buscarpesagem/" + idPeso;
    fetch(url).then(res => res.json()).then(resJ => {
        // INSERE O VALOR BUSCADO NA URL NO INPUT
        console.log(resJ.idLote.codigoLote);
        var combobox = document.querySelector("[name='combo-idlotesedt']");
        document.querySelector("[name='idpesagemedt']").value = resJ.idPesagem;
        combobox.selectedIndex = resJ.idLote.codigoLote;
        document.querySelector("[name='dataPesagemedt']").value = moment(resJ.dataPesagem ).format("DD/MM/YYYY");
        document.querySelector("[name='observacoesedt']").value = resJ.observacoes; 
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
        var idpesagem = document.getElementById("idpesagemedt").value;
        var data = document.getElementById("dataPesagemedt").value;
        var obs = document.getElementById("observacoesedt").value;

        var objeto = {
            idPesagem: idpesagem,
            dataPesagem: data,
            observacoes: obs,
            lote: {
                id: lote
            }
        }

        var objJSON = JSON.stringify(objeto);
        console.log(objJSON);
        //enviaDados(objJSON);
    }
}

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
/** ----------Envia os dados para API------------ */
/*function enviaDados(objeto){
    console.log("OBJETO DENTRO DA FUNCAO => " + objeto);
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "", true);
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
}*/

/** ------------------------------------------------------
 * ------------------------------------------------------ 
 * ---------------------------------------------------- 
 * ----- Evento do FORM -----
*/ $( document ).ready(function() { 
    $("#form-edit-pesagem").submit(function(e){
        e.preventDefault();
        capturaDadosEditados();
    });
});

