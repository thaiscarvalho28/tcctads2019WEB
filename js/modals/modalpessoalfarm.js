const modalViewFarm = document.getElementById('modal_visualizar');
const btnCloseViewFarm = document.querySelector('.btnfechar');

function openModalViewFarm(){
    modalViewFarm.style.display = 'block';
    var url = "http://localhost:8080/fazenda/buscarfazenda/1";
    var table = "";

    fetch(url).then(resJ => resJ.json()).then(resJ => {
        table += '<tr>';
        table += '<th><b>Nome da Fazenda:</b></th>';
        table += '<td>' + resJ.nomeFazenda + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Registro:</b></th>';
        table += '<td>' + resJ.numDeRegistro + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Endereço:</b></th>';
        table += '<td>' + resJ.endereco + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Nome do Proprietário:</b></th>';
        table += '<td>' + resJ.proprietario.nomeCompleto + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>E-mail:</b></th>';
        table += '<td>' + resJ.proprietario.email + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Telefone:</b></th>';
        table += '<td>' + resJ.proprietario.telefone + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Data de Nascimento:</b></th>';
        table += '<td>' + moment(resJ.proprietario.dataNascimento).format("DD/MM/YYYY") + '</td>';
        table += '</tr>';

        table += '<tr>';
        table += '<th><b>Endereço:</b></th>';
        table += '<td>' + resJ.proprietario.endereco + '</td>';
        table += '</tr>';

        document.getElementById("dadosfarm").innerHTML = table;
    });

   
}

// Evento que fecha o modal
btnCloseViewFarm.addEventListener('click', closeModalViewFarm);

// Funcao que fecha modal
function closeModalViewFarm() {
    modalViewFarm.style.display = 'none';
}