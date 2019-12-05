
/** -----------------------------------------------------------
 * ------------------------------------------------------
 * ----------------------------------------------
 *//** ----- RELATORIO FINANCEIRO ------  */
function capturaeEnvia(){
    var mesSelected = $("#mes-finan").val();
    var anoSelected = $("#ano-finan").val();
    openHTMLfinan(mesSelected, anoSelected);
}

function openHTMLfinan(mes, ano){
    window.open("C:/sispecortv1/relatoriofinanceiro.html?mes=" + mes + "&ano=" + ano);
} 

/* --- Preenche combobox do FINANCEIRO --- */
var urlCaixa = "http://localhost:8080/caixa/todoscaixas";
fetch(urlCaixa).then(res => res.json()).then(resJ => {
    var datas = [];
    var vetDatas = [];

    resJ.forEach(e => {
        datas.push(new Date(e.data));
        if(!vetDatas.includes(new Date(e.data).getFullYear())){
            vetDatas.push(new Date(e.data).getFullYear());
        }
    });

    var dataMax = new Date(Math.max.apply(null, datas));
    var dataMin = new Date(Math.min.apply(null, datas));
    vetDatas.sort();
    var strCombobox = "";

    strCombobox += '<option selected="select">Ano...</option>';
    for(i = 0; i < vetDatas.length; i++){
        strCombobox += '<option value="' + vetDatas[i] + '">' + vetDatas[i] + '</option>';
    }
    document.getElementById("ano-finan").innerHTML = strCombobox;
});

/** -----------------------------------------------------------
 * ------------------------------------------------------
 * ----------------------------------------------
 *//** --- RELATORIO CICLO REPRODUTIVO ---  */
/* --- Preenche combobox do CICLO REPRODUTIVO --- */
var urlCiclo = "http://localhost:8080/ciclorepro/todosciclos";
fetch(urlCiclo).then(res => res.json()).then(resJ => {
    var datas = [];
    var vetDatas = [];

    resJ.forEach(e => {
        datas.push(new Date(e.idInseminacao.dataCobertura));
        if(!vetDatas.includes(new Date(e.idInseminacao.dataCobertura).getFullYear())){
            vetDatas.push(new Date(e.idInseminacao.dataCobertura).getFullYear());
        }
    });

    var dataMax = new Date(Math.max.apply(null, datas));
    var dataMin = new Date(Math.min.apply(null, datas));
    vetDatas.sort();
    var strCombobox = "";

    strCombobox += '<option selected="select">Ano...</option>';
    for(i = 0; i < vetDatas.length; i++){
        strCombobox += '<option value="' + vetDatas[i] + '">' + vetDatas[i] + '</option>';
    }
    document.getElementById("ano-ciclo").innerHTML = strCombobox;
});


function capturaeEnviaCiclo(){
    var mesSelected = $("#mes-ciclo").val();
    var anoSelected = $("#ano-ciclo").val();
    openHTMLciclo(mesSelected, anoSelected);
}

function openHTMLciclo(mes, ano){
    window.open("C:/sispecortv1/relatoriociclo.html?mes=" + mes + "&ano=" + ano);
}


 /** -----------------------------------------------------------
 * ------------------------------------------------------
 * ----------------------------------------------
 *//** ----- RELATORIO MORTES ------  */
function capturaeEnviaMorte(){
    var anoSelected = $("#ano-morte").val();
    openHTMLmorte(anoSelected);
}

function openHTMLmorte(ano){
    window.open("C:/sispecortv1/relatoriomortes.html?ano=" + ano);
} 


///------------------------------------------///
/* --- Preenche combobox do MORTE --- */
var urlMorte = "http://localhost:8080/perda/todasperdas";
fetch(urlMorte).then(res => res.json()).then(resJ => {
    var datas = [];
    var vetDatas = [];

    resJ.forEach(e => {
        datas.push(new Date(e.dataPerdaMorte));
        if(!vetDatas.includes(new Date(e.dataPerdaMorte).getFullYear())){
            vetDatas.push(new Date(e.dataPerdaMorte).getFullYear());
        }
    });

    var dataMax = new Date(Math.max.apply(null, datas));
    var dataMin = new Date(Math.min.apply(null, datas));
    vetDatas.sort();
    var strCombobox = "";

    strCombobox += '<option selected="select">Ano...</option>';
    for(i = 0; i < vetDatas.length; i++){
        strCombobox += '<option value="' + vetDatas[i] + '">' + vetDatas[i] + '</option>';
    }
    document.getElementById("ano-morte").innerHTML = strCombobox;
});

