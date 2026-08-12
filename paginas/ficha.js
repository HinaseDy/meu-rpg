// ==========================================================
// FICHA DO PERSONAGEM — SISTEMA RPG
// ==========================================================

// ----------------------------------------------------------
// DADOS DO PERSONAGEM
// ----------------------------------------------------------

const personagem = {

    nome: "",
    idade: "",
    genero: "",
    historia: "",

    // ATRIBUTOS
    forca: 0,
    agilidade: 0,
    carisma: 0,
    vigor: 0,
    intelecto: 0,

    // PONTOS PARA DISTRIBUIR
    pontosAtributos: 12,

    // RECURSOS
    pv: 10,
    sanidade: 15,
    esforco: 10,

    // INVENTÁRIO
    inventario: [],

    // LORE
    lore: "",

    // PERÍCIAS
    pericias: {

        acrobacia: 0,
        crime: 0,
        investigacao: 0,
        resistencia: 0,
        percepcao: 0,
        intuicao: 0,
        diplomacia: 0,
        furtividade: 0,
        enganacao: 0,
        iniciativa: 0,
        luta: 0,
        pontaria: 0,
        reflexo: 0,
        medicina: 0,
        profissao: 0,
        intimidacao: 0,
        atletismo: 0,
        religiao: 0

    }

};


// ==========================================================
// ATRIBUTO PRINCIPAL DE CADA PERÍCIA
// ==========================================================

const atributosPericias = {

    acrobacia: "agilidade",

    crime: "agilidade",

    investigacao: "intelecto",

    resistencia: "vigor",

    percepcao: "agilidade",

    intuicao: "carisma",

    diplomacia: "carisma",

    furtividade: "agilidade",

    enganacao: "carisma",

    iniciativa: "agilidade",

    luta: "forca",

    pontaria: "agilidade",

    reflexo: "agilidade",

    medicina: "intelecto",

    profissao: "intelecto",

    intimidacao: "carisma",

    atletismo: "forca",

    religiao: "intelecto"

};


// ==========================================================
// NOMES DAS PERÍCIAS
// ==========================================================

const nomesPericias = {

    acrobacia: "Acrobacia",
    crime: "Crime",
    investigacao: "Investigação",
    resistencia: "Resistência",
    percepcao: "Percepção",
    intuicao: "Intuição",
    diplomacia: "Diplomacia",
    furtividade: "Furtividade",
    enganacao: "Enganação",
    iniciativa: "Iniciativa",
    luta: "Luta",
    pontaria: "Pontaria",
    reflexo: "Reflexo",
    medicina: "Medicina",
    profissao: "Profissão",
    intimidacao: "Intimidação",
    atletismo: "Atletismo",
    religiao: "Religião"

};


// ==========================================================
// CÁLCULO DO BÔNUS
// ==========================================================

// Cada ponto de atributo dá +2 na perícia.

function calcularBonusPericia(pericia) {

    const atributo =
        atributosPericias[pericia];

    const valor =
        personagem[atributo];

    return valor * 2;
}


// ==========================================================
// ATUALIZAR PERÍCIAS NA TELA
// ==========================================================

function atualizarPericias() {

    const elementos =
        document.querySelectorAll(".pericia");


    elementos.forEach(elemento => {

        const nomeElemento =
            elemento.querySelector("span:first-child");

        const valorElemento =
            elemento.querySelector(".pericia-info");


        if (!nomeElemento || !valorElemento) {
            return;
        }


        const nome =
            nomeElemento.textContent
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ /g, "");


        if (!atributosPericias[nome]) {
            return;
        }


        const atributo =
            atributosPericias[nome];

        const bonus =
            calcularBonusPericia(nome);


        valorElemento.textContent =
            "+" + bonus;


        valorElemento.title =
            "Atributo: " +
            nomeAtributo(atributo);

    });

}


// ==========================================================
// NOME BONITO DOS ATRIBUTOS
// ==========================================================

function nomeAtributo(atributo) {

    const nomes = {

        forca: "Força",
        agilidade: "Agilidade",
        carisma: "Carisma",
        vigor: "Vigor",
        intelecto: "Intelecto"

    };

    return nomes[atributo] || atributo;
}


// ==========================================================
// ALTERAR ATRIBUTO
// ==========================================================

function alterarAtributo(atributo, quantidade) {

    const valorAtual =
        personagem[atributo];


    // Não permite atributo negativo
    if (
        quantidade < 0 &&
        valorAtual <= 0
    ) {
        return;
    }


    // Não permite gastar mais pontos
    if (
        quantidade > 0 &&
        personagem.pontosAtributos <= 0
    ) {
        return;
    }


    personagem[atributo] += quantidade;


    // Atualiza pontos disponíveis

    if (quantidade > 0) {

        personagem.pontosAtributos--;

    } else {

        personagem.pontosAtributos++;

    }


    atualizarAtributos();

    atualizarPericias();

    salvarEstado();

}


// ==========================================================
// ATUALIZAR ATRIBUTOS
// ==========================================================

function atualizarAtributos() {

    const atributos = [

        "forca",
        "agilidade",
        "carisma",
        "vigor",
        "intelecto"

    ];


    atributos.forEach(atributo => {

        const elemento =
            document.getElementById(atributo);


        if (elemento) {

            elemento.textContent =
                personagem[atributo];

        }

    });


    const pontos =
        document.getElementById(
            "pontosRestantes"
        );


    if (pontos) {

        pontos.textContent =
            personagem.pontosAtributos;

    }

}


// ==========================================================
// RECURSOS
// ==========================================================

function alterarRecurso(recurso, quantidade) {

    if (
        personagem[recurso] === undefined
    ) {
        return;
    }


    personagem[recurso] += quantidade;


    if (personagem[recurso] < 0) {

        personagem[recurso] = 0;

    }


    atualizarRecursos();

    salvarEstado();

}


// ==========================================================
// ATUALIZAR RECURSOS
// ==========================================================

function atualizarRecursos() {

    const pv =
        document.getElementById("pv");

    const sanidade =
        document.getElementById("sanidade");

    const esforco =
        document.getElementById("esforco");


    if (pv) {

        pv.textContent =
            personagem.pv;

    }


    if (sanidade) {

        sanidade.textContent =
            personagem.sanidade;

    }


    if (esforco) {

        esforco.textContent =
            personagem.esforco;

    }

}


// ==========================================================
// ABAS
// ==========================================================

function abrirAba(nome, botao) {

    const paineis =
        document.querySelectorAll(".painel");


    paineis.forEach(painel => {

        painel.classList.remove("ativo");

    });


    const painel =
        document.getElementById(nome);


    if (painel) {

        painel.classList.add("ativo");

    }


    const abas =
        document.querySelectorAll(".aba");


    abas.forEach(aba => {

        aba.classList.remove("ativa");

    });


    if (botao) {

        botao.classList.add("ativa");

    }

}


// ==========================================================
// D20
// ==========================================================

function rolarD20() {

    const resultado =
        Math.floor(
            Math.random() * 20
        ) + 1;


    alert(
        "🎲 D20\n\nResultado: " +
        resultado
    );

}


// ==========================================================
// TESTE DE PERÍCIA
// ==========================================================

function rolarPericia(pericia) {

    const atributo =
        atributosPericias[pericia];


    if (!atributo) {

        return;

    }


    const bonus =
        calcularBonusPericia(pericia);


    const d20 =
        Math.floor(
            Math.random() * 20
        ) + 1;


    const total =
        d20 + bonus;


    alert(

        "🎲 TESTE DE " +
        nomesPericias[pericia].toUpperCase() +

        "\n\n" +

        "D20: " + d20 +

        "\nAtributo: " +
        nomeAtributo(atributo) +

        "\nBônus: +" + bonus +

        "\n\nRESULTADO: " +
        total

    );

}


// ==========================================================
// INVENTÁRIO
// ==========================================================

function adicionarItem() {

    personagem.inventario.push("");

    atualizarInventario();

    salvarEstado();

}


// ----------------------------------------------------------
// ATUALIZAR INVENTÁRIO
// ----------------------------------------------------------

function atualizarInventario() {

    const lista =
        document.getElementById(
            "listaInventario"
        );


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    personagem.inventario.forEach(
        (item, indice) => {


        const linha =
            document.createElement("div");


        linha.style.display =
            "flex";

        linha.style.gap =
            "10px";

        linha.style.marginBottom =
            "10px";


        const input =
            document.createElement("input");


        input.type =
            "text";


        input.value =
            item;


        input.placeholder =
            "Nome do item...";


        input.style.flex =
            "1";

        input.style.padding =
            "14px";

        input.style.background =
            "#090909";

        input.style.border =
            "1px solid #650000";

        input.style.color =
            "white";

        input.style.fontFamily =
            "Georgia, serif";


        input.addEventListener(
            "input",
            function() {

                personagem.inventario[indice] =
                    input.value;

                salvarEstado();

            }
        );


        const remover =
            document.createElement("button");


        remover.textContent =
            "×";


        remover.style.width =
            "45px";

        remover.style.background =
            "#400000";

        remover.style.border =
            "1px solid #800000";

        remover.style.color =
            "white";

        remover.style.fontSize =
            "22px";


        remover.onclick =
            function() {

                personagem.inventario
                    .splice(indice, 1);

                atualizarInventario();

                salvarEstado();

            };


        linha.appendChild(input);

        linha.appendChild(remover);

        lista.appendChild(linha);


    });

}


// ==========================================================
// LORE
// ==========================================================

function atualizarLore() {

    const lore =
        document.getElementById(
            "loreTexto"
        );


    if (!lore) {
        return;
    }


    lore.value =
        personagem.lore;


    lore.addEventListener(
        "input",
        function() {

            personagem.lore =
                lore.value;

            salvarEstado();

        }
    );

}


// ==========================================================
// SALVAR ESTADO
// ==========================================================

function salvarEstado() {

    localStorage.setItem(

        "fichaRPG",

        JSON.stringify(personagem)

    );

}


// ==========================================================
// CARREGAR ESTADO
// ==========================================================

function carregarEstado() {

    const salvo =
        localStorage.getItem(
            "fichaRPG"
        );


    if (salvo) {

        try {

            const dados =
                JSON.parse(salvo);


            Object.assign(
                personagem,
                dados
            );


            if (!personagem.inventario) {

                personagem.inventario = [];

            }


        } catch (erro) {

            console.log(
                "Erro ao carregar ficha:",
                erro
            );

        }

    }

}


// ==========================================================
// CARREGAR DADOS DA CRIAÇÃO
// ==========================================================

function carregarPersonagemCriado() {

    const salvo =
        localStorage.getItem(
            "personagemRPG"
        );


    if (!salvo) {

        return;

    }


    try {

        const dados =
            JSON.parse(salvo);


        personagem.nome =
            dados.nome || "";

        personagem.idade =
            dados.idade || "";

        personagem.genero =
            dados.genero || "";

        personagem.historia =
            dados.historia || "";


    } catch (erro) {

        console.log(
            "Erro ao carregar personagem:",
            erro
        );

    }

}


// ==========================================================
// MOSTRAR INFORMAÇÕES
// ==========================================================

function atualizarInformacoes() {

    const nomeTopo =
        document.getElementById(
            "nomePersonagem"
        );


    const nome =
        document.getElementById(
            "infoNome"
        );


    const idade =
        document.getElementById(
            "infoIdade"
        );


    const genero =
        document.getElementById(
            "infoGenero"
        );


    const historia =
        document.getElementById(
            "historiaPersonagem"
        );


    if (nomeTopo) {

        nomeTopo.textContent =
            personagem.nome || "Personagem";

    }


    if (nome) {

        nome.textContent =
            personagem.nome || "—";

    }


    if (idade) {

        idade.textContent =
            personagem.idade || "—";

    }


    if (genero) {

        genero.textContent =
            personagem.genero || "—";

    }


    if (historia) {

        historia.textContent =
            personagem.historia || "—";

    }

}


// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarEstado();

        carregarPersonagemCriado();

        atualizarInformacoes();

        atualizarAtributos();

        atualizarRecursos();

        atualizarPericias();

        atualizarInventario();

        atualizarLore();

    }
);
