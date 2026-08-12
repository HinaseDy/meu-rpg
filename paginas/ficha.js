// ==========================================
// FICHA DO RPG
// ==========================================


// ==========================================
// DADOS
// ==========================================

const ficha = {

    atributos: {

        forca: 0,

        agilidade: 0,

        carisma: 0,

        vigor: 0,

        intelecto: 0

    },

    pontosRestantes: 12,

    pv: 10,

    sanidade: 15,

    esforco: 10,

    lore: "",

    inventario: []

};


// ==========================================
// CARREGAR PERSONAGEM
// ==========================================

function carregarPersonagem() {

    const salvo =
        localStorage.getItem("personagemRPG");


    if (!salvo) {

        console.log(
            "Nenhum personagem encontrado."
        );

        return;

    }


    try {

        const personagem =
            JSON.parse(salvo);


        document.getElementById(
            "nomePersonagem"
        ).textContent =
            personagem.nome || "Personagem";


        document.getElementById(
            "infoNome"
        ).textContent =
            personagem.nome || "—";


        document.getElementById(
            "infoIdade"
        ).textContent =
            personagem.idade || "—";


        document.getElementById(
            "infoGenero"
        ).textContent =
            personagem.genero || "—";


        document.getElementById(
            "historiaPersonagem"
        ).textContent =
            personagem.historia || "—";

    }

    catch (erro) {

        console.error(
            "Erro ao carregar personagem:",
            erro
        );

    }

}


// ==========================================
// SALVAR FICHA
// ==========================================

function salvarFicha() {

    localStorage.setItem(
        "fichaRPG",
        JSON.stringify(ficha)
    );

}


// ==========================================
// CARREGAR FICHA
// ==========================================

function carregarFicha() {

    const salvo =
        localStorage.getItem("fichaRPG");


    if (!salvo) {

        atualizarTela();

        return;

    }


    try {

        const dados =
            JSON.parse(salvo);


        Object.assign(
            ficha,
            dados
        );


        if (!dados.atributos) {

            ficha.atributos = {
                forca: 0,
                agilidade: 0,
                carisma: 0,
                vigor: 0,
                intelecto: 0
            };

        }


        atualizarTela();

    }

    catch (erro) {

        console.error(
            "Erro ao carregar ficha:",
            erro
        );

    }

}


// ==========================================
// ATUALIZAR TELA
// ==========================================

function atualizarTela() {


    document.getElementById(
        "forca"
    ).textContent =
        ficha.atributos.forca;


    document.getElementById(
        "agilidade"
    ).textContent =
        ficha.atributos.agilidade;


    document.getElementById(
        "carisma"
    ).textContent =
        ficha.atributos.carisma;


    document.getElementById(
        "vigor"
    ).textContent =
        ficha.atributos.vigor;


    document.getElementById(
        "intelecto"
    ).textContent =
        ficha.atributos.intelecto;


    document.getElementById(
        "pontosRestantes"
    ).textContent =
        ficha.pontosRestantes;


    document.getElementById(
        "pv"
    ).textContent =
        ficha.pv;


    document.getElementById(
        "sanidade"
    ).textContent =
        ficha.sanidade;


    document.getElementById(
        "esforco"
    ).textContent =
        ficha.esforco;


    document.getElementById(
        "loreTexto"
    ).value =
        ficha.lore;


    atualizarInventario();

}


// ==========================================
// ALTERAR ATRIBUTO
// ==========================================

function alterarAtributo(
    atributo,
    quantidade
) {


    const atual =
        ficha.atributos[atributo];


    // DIMINUIR

    if (quantidade < 0) {

        if (atual <= 0) {

            return;

        }


        ficha.atributos[atributo]--;

        ficha.pontosRestantes++;

    }


    // AUMENTAR

    else {

        if (ficha.pontosRestantes <= 0) {

            return;

        }


        ficha.atributos[atributo]++;

        ficha.pontosRestantes--;

    }


    salvarFicha();

    atualizarTela();

}


// ==========================================
// ALTERAR RECURSOS
// ==========================================

function alterarRecurso(
    recurso,
    quantidade
) {


    ficha[recurso] += quantidade;


    if (ficha[recurso] < 0) {

        ficha[recurso] = 0;

    }


    salvarFicha();

    atualizarTela();

}


// ==========================================
// ABRIR ABA
// ==========================================

function abrirAba(
    nome,
    botao
) {


    document
        .querySelectorAll(".painel")
        .forEach(function(painel) {

            painel.classList.remove(
                "ativo"
            );

        });


    document
        .querySelectorAll(".aba")
        .forEach(function(aba) {

            aba.classList.remove(
                "ativa"
            );

        });


    const painel =
        document.getElementById(nome);


    if (painel) {

        painel.classList.add(
            "ativo"
        );

    }


    botao.classList.add(
        "ativa"
    );

}


// ==========================================
// ROLAR D20
// ==========================================

function rolarD20() {

    const resultado =
        Math.floor(
            Math.random() * 20
        ) + 1;


    alert(
        "🎲 Resultado do D20: " +
        resultado
    );

}


// ==========================================
// LORE
// ==========================================

function salvarLore() {

    ficha.lore =
        document.getElementById(
            "loreTexto"
        ).value;


    salvarFicha();

}


// ==========================================
// INVENTÁRIO
// ==========================================

function adicionarItem() {


    ficha.inventario.push("");


    salvarFicha();

    atualizarInventario();

}


function removerItem(indice) {


    ficha.inventario.splice(
        indice,
        1
    );


    salvarFicha();

    atualizarInventario();

}


function atualizarInventario() {


    const lista =
        document.getElementById(
            "listaInventario"
        );


    lista.innerHTML = "";


    ficha.inventario.forEach(
        function(item, indice) {


            const div =
                document.createElement(
                    "div"
                );


            div.style.display =
                "flex";


            div.style.gap =
                "10px";


            div.style.marginBottom =
                "10px";


            const input =
                document.createElement(
                    "input"
                );


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


            input.addEventListener(
                "input",
                function() {

                    ficha.inventario[indice] =
                        input.value;

                    salvarFicha();

                }
            );


            const botao =
                document.createElement(
                    "button"
                );


            botao.textContent =
                "✕";


            botao.style.width =
                "45px";


            botao.style.background =
                "#400000";


            botao.style.border =
                "1px solid #800000";


            botao.style.color =
                "white";


            botao.style.cursor =
                "pointer";


            botao.onclick =
                function() {

                    removerItem(indice);

                };


            div.appendChild(
                input
            );


            div.appendChild(
                botao
            );


            lista.appendChild(
                div
            );

        }
    );

}


// ==========================================
// SALVAR LORE AUTOMATICAMENTE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {


        const lore =
            document.getElementById(
                "loreTexto"
            );


        lore.addEventListener(
            "input",
            salvarLore
        );


        carregarPersonagem();

        carregarFicha();

    }
);
