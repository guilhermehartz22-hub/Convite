/* =====================================================
   PROJETO ADRIELE ❤️
   Script principal
===================================================== */


// ===============================
// ELEMENTOS PRINCIPAIS
// ===============================

const pages = document.querySelectorAll(".page");

const progressBar = document.getElementById("progressBar");

const heartContainer = document.getElementById("heart-container");

const explosion = document.getElementById("explosion");

let currentPage = 1;


// ===============================
// CONTROLE DAS PÁGINAS
// ===============================

function showPage(pageNumber) {

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target = document.getElementById(
        `page${pageNumber}`
    );


    if (target) {

        target.classList.add("active");

        currentPage = pageNumber;

        updateProgress();

    }

}



function updateProgress() {

    const total = pages.length;

    const percent =
        (currentPage / total) * 100;


    progressBar.style.width =
        `${percent}%`;

}



// ===============================
// CORAÇÕES CAINDO NO FUNDO ❤️
// ===============================


function createHeart() {


    const heart =
        document.createElement("div");


    heart.classList.add("heart");


    heart.innerHTML = "❤️";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (Math.random() * 25 + 12) + "px";


    heart.style.animationDuration =
        (Math.random() * 5 + 5) + "s";


    heart.style.opacity =
        Math.random();


    heartContainer.appendChild(heart);



    setTimeout(() => {

        heart.remove();

    }, 10000);


}



setInterval(createHeart, 400);



// ===============================
// ANIMAÇÃO DO GATINHO INICIAL 🐱
// ===============================


const continuar =
    document.getElementById("continuar");


continuar.addEventListener(
    "click",
    () => {


        const gato =
            document.getElementById(
                "gatoInicio"
            );


        if (gato) {


            gato.animate(

                [
                    {
                        transform:
                        "rotate(0deg)"
                    },

                    {
                        transform:
                        "rotate(15deg)"
                    },

                    {
                        transform:
                        "rotate(-15deg)"
                    },

                    {
                        transform:
                        "rotate(0deg)"
                    }

                ],

                {

                    duration:600

                }

            );


        }



        setTimeout(() => {

            showPage(2);

        },300);


    }
);



// ===============================
// BOTÃO NÃO DIMINUINDO 😂
// ===============================


const botaoNao =
    document.getElementById("nao");


let tamanhoNao = 1;



botaoNao.addEventListener(
    "click",
    () => {


        tamanhoNao -= 0.15;


        botaoNao.style.transform =
            `scale(${tamanhoNao})`;



        if(tamanhoNao <= 0.25){

            botaoNao.style.display =
                "none";

        }


    }
);



// ===============================
// EXPLOSÃO DE CORAÇÕES 💥❤️
// ===============================


function criarExplosao(){


    for(let i = 0; i < 60; i++){


        const heart =
            document.createElement("span");



        heart.innerHTML="❤️";


        heart.style.position="fixed";


        heart.style.left="50%";

        heart.style.top="50%";


        heart.style.fontSize =
            Math.random()*25+15+"px";


        heart.style.zIndex="9999";



        explosion.appendChild(heart);



        const x =
            (Math.random()-0.5)*600;


        const y =
            (Math.random()-0.5)*600;



        heart.animate(

            [

                {
                    transform:
                    "translate(0,0) scale(1)",

                    opacity:1

                },

                {

                    transform:
                    `translate(${x}px,${y}px) scale(0)`,

                    opacity:0

                }

            ],

            {

                duration:1200,

                easing:"ease-out"

            }

        );



        setTimeout(()=>{

            heart.remove();

        },1200);



    }


}



// ===============================
// BOTÃO SIM ❤️
// ===============================


const sim =
    document.getElementById("sim");



sim.addEventListener(
    "click",
    ()=>{


        criarExplosao();



        setTimeout(()=>{


            showPage(3);


        },700);



    }
);



// ===============================
// PRÓXIMA PARTE:
// DATA, HORÁRIO, ESCOLHAS,
// CARTA E ENVELOPE
// ===============================// ===============================
// PÁGINA 3 - DATA E HORÁRIO 📅
// ===============================


const proximo1 =
    document.getElementById("proximo1");


const campoData =
    document.getElementById("data");


const campoHora =
    document.getElementById("hora");



proximo1.addEventListener(
    "click",
    () => {


        if(
            campoData.value === "" ||
            campoHora.value === ""
        ){

            alert(
                "Escolhe uma data e um horário primeiro ❤️"
            );

            return;

        }



        showPage(4);



    }
);



// ===============================
// PÁGINA 4 - ESCOLHAS DE PASSEIO 🍿🍔
// ===============================


const proximo2 =
    document.getElementById("proximo2");



const opcoes =
    document.querySelectorAll(
        ".option input"
    );



let escolhas = [];



proximo2.addEventListener(
    "click",
    () => {



        escolhas = [];



        opcoes.forEach(
            (item)=>{


                if(item.checked){


                    const texto =
                        item.parentElement
                        .querySelector("span")
                        .innerText;



                    escolhas.push(texto);


                }


            }
        );




        if(escolhas.length === 0){


            alert(
                "Escolhe pelo menos uma opção ❤️"
            );


            return;


        }



        showPage(5);



    }
);



// ===============================
// PÁGINA 5 - ABRIR CARTA 💌
// ===============================


const abrirCarta =
    document.getElementById(
        "abrirCarta"
    );




function enviarEmail() {

    const passeios = [];

    document.querySelectorAll(".option input:checked").forEach(item => {
        passeios.push(item.value);
    });

    return emailjs.send(
        "service_ixt5sxp",
        "template_ufonq8q",
        {
            resposta: "SIM ❤️",
            data: document.getElementById("data").value,
            hora: document.getElementById("hora").value,
            passeios: passeios.join(", ")
        }

    ).then(() => {

        console.log("Email enviado!");

    }).catch((erro) => {

        console.log(erro);

    });

}



abrirCarta.addEventListener("click", () => {

    enviarEmail()

        .then(() => {

            showPage(6);

            setTimeout(() => {

                abrirEnvelope();

            }, 300);

        })

        .catch((erro) => {

            console.error(erro);

            alert("Ocorreu um erro ao enviar as respostas.");

        });

});



// ===============================
// ENVELOPE E CARTA 💌
// ===============================


function abrirEnvelope(){



    const envelope =
        document.querySelector(
            ".envelope"
        );



    const carta =
        document.querySelector(
            ".letter"
        );



    if(!envelope || !carta){

        return;

    }



    envelope.animate(

        [

            {

                transform:
                "scale(1)"

            },


            {

                transform:
                "scale(1.05)"

            },


            {

                transform:
                "scale(1)"

            }

        ],


        {

            duration:700,

            easing:"ease"

        }

    );




    carta.animate(

        [

            {

                transform:
                "translateY(80px)",

                opacity:0

            },


            {

                transform:
                "translateY(0)",

                opacity:1

            }


        ],


        {

            duration:1200,

            easing:"ease-out",

            fill:"forwards"

        }

    );


}



// ===============================
// EFEITO DE BRILHO NA CARTA ✨
// ===============================


function brilhoCarta(){


    const carta =
        document.querySelector(
            ".letter"
        );


    if(!carta){

        return;

    }



    carta.style.transition =
        "0.5s";



    carta.style.boxShadow =
        "0 0 35px #ff7bab";



    setTimeout(()=>{


        carta.style.boxShadow =
            "none";


    },1500);


}



// ===============================
// GATINHO FINAL 😛
// ===============================


function animarGatoFinal(){


    const gato =
        document.querySelector(
            ".catFinal"
        );



    if(!gato){

        return;

    }



    gato.animate(

        [

            {

                transform:
                "translateY(0)"

            },


            {

                transform:
                "translateY(-15px)"

            },


            {

                transform:
                "translateY(0)"

            }


        ],


        {

            duration:900,

            iterations:Infinity

        }


    );


}




// inicia animação final quando existir

window.addEventListener(
    "load",
    ()=>{


        animarGatoFinal();


    }
);



// ===============================
// INFORMAÇÕES ESCOLHIDAS
// ===============================


function gerarResumo(){


    let texto = "";



    if(campoData.value){


        texto +=
        "📅 Data: "
        + campoData.value
        + "\n";


    }



    if(campoHora.value){


        texto +=
        "⏰ Horário: "
        + campoHora.value
        + "\n";


    }



    if(escolhas.length){


        texto +=
        "❤️ Programas: "
        + escolhas.join(", ");


    }



    return texto;


}


// ===============================
// PARTE 3 CONTINUA:
// melhorias de animação,
// efeitos extras,
// segurança dos eventos
// ===============================
// ===============================
// EFEITOS EXTRAS DE INTERAÇÃO ✨
// ===============================


// Pequeno efeito ao passar pelos botões

const botoes =
    document.querySelectorAll("button");



botoes.forEach(
    botao => {


        botao.addEventListener(
            "mouseenter",
            ()=>{


                botao.animate(

                    [

                        {
                            transform:
                            "scale(1)"

                        },

                        {

                            transform:
                            "scale(1.08)"

                        },

                        {

                            transform:
                            "scale(1)"

                        }

                    ],

                    {

                        duration:300

                    }

                );


            }
        );


    }
);



// ===============================
// EFEITO DE ROSA 🌹
// ===============================


const rosa =
    document.querySelector(".rose");



if(rosa){


    rosa.animate(

        [

            {

                transform:
                "rotate(-5deg)"

            },


            {

                transform:
                "rotate(5deg)"

            },


            {

                transform:
                "rotate(-5deg)"

            }


        ],

        {

            duration:1500,

            iterations:Infinity

        }

    );


}




// ===============================
// EFEITO DE ENTRADA DAS PÁGINAS
// ===============================


function animarEntradaPagina(){



    const pagina =
        document.querySelector(
            ".page.active"
        );



    if(!pagina){

        return;

    }



    pagina.animate(

        [

            {

                opacity:0,

                transform:
                "translateY(25px)"

            },


            {

                opacity:1,

                transform:
                "translateY(0)"

            }


        ],

        {

            duration:500,

            easing:"ease-out"

        }

    );


}



// substitui a função de troca adicionando animação

const mostrarPaginaOriginal =
    showPage;



showPage = function(numero){


    mostrarPaginaOriginal(numero);


    setTimeout(()=>{


        animarEntradaPagina();


    },50);



};




// ===============================
// CHUVA DE CORAÇÕES APÓS SIM ❤️
// ===============================


function chuvaEspecial(){



    for(let i = 0; i < 30; i++){


        setTimeout(()=>{


            const heart =
                document.createElement(
                    "div"
                );



            heart.className =
                "heart";



            heart.innerHTML =
                "❤️";



            heart.style.left =
                Math.random()*100+"vw";



            heart.style.fontSize =
                "30px";



            heart.style.animationDuration =
                "3s";



            document.body.appendChild(
                heart
            );



            setTimeout(()=>{


                heart.remove();


            },4000);



        },i*80);



    }



}



// adiciona junto com SIM

sim.addEventListener(
    "click",
    ()=>{


        chuvaEspecial();


    }
);



// ===============================
// EFEITO DE DIGITAÇÃO NA CARTA 💌
// ===============================


function efeitoDigitacao(){



    const cartaTexto =
        document.querySelector(
            ".letter p"
        );



    if(!cartaTexto){

        return;

    }



    const texto =
        cartaTexto.innerHTML;



    cartaTexto.innerHTML =
        "";



    let contador = 0;



    const intervalo =
        setInterval(()=>{


            cartaTexto.innerHTML +=
                texto[contador];



            contador++;



            if(contador >= texto.length){


                clearInterval(intervalo);


            }



        },25);



}




// ativa quando abrir carta

abrirCarta.addEventListener(
    "click",
    ()=>{


        setTimeout(()=>{


            efeitoDigitacao();



        },1000);


    }
);



// ===============================
// SOMENTE UMA PÁGINA VISÍVEL
// ===============================


function verificarPaginas(){



    pages.forEach(
        pagina => {


            if(
                pagina.classList.contains(
                    "active"
                )
            ){

                pagina.style.display =
                    "block";


            }else{


                pagina.style.display =
                    "none";


            }


        }
    );


}



setInterval(
    verificarPaginas,
    300
);



// ===============================
// PROTEÇÃO CONTRA ERROS
// ===============================


window.addEventListener(
    "error",
    (evento)=>{


        console.log(
            "Projeto Adriele:",
            evento.message
        );


    }
);



// ===============================
// PARTE 4 CONTINUA:
// FINALIZAÇÃO, AJUSTES MOBILE,
// EFEITOS FINAIS
// ===============================
// ===============================
// FINALIZAÇÕES DO PROJETO ADRIELE ❤️
// ===============================



// ===============================
// AJUSTE INICIAL DA BARRA
// ===============================


updateProgress();




// ===============================
// EFEITO DE PULSO NO BOTÃO SIM ❤️
// ===============================


if(sim){


    setInterval(()=>{


        sim.animate(

            [

                {

                    transform:
                    "scale(1)"

                },


                {

                    transform:
                    "scale(1.08)"

                },


                {

                    transform:
                    "scale(1)"

                }


            ],

            {

                duration:1200

            }


        );


    },2000);



}




// ===============================
// CORAÇÕES QUANDO ABRIR A CARTA 💌
// ===============================


function coracoesCarta(){


    for(
        let i = 0;
        i < 50;
        i++
    ){



        const heart =
            document.createElement(
                "div"
            );



        heart.innerHTML =
            "❤️";



        heart.style.position =
            "fixed";



        heart.style.left =
            "50%";



        heart.style.top =
            "50%";



        heart.style.fontSize =
            Math.random()*20+15+"px";



        heart.style.zIndex =
            "9999";



        document.body.appendChild(
            heart
        );



        const destinoX =
            (Math.random()-0.5)*700;



        const destinoY =
            (Math.random()-0.5)*700;



        heart.animate(

            [

                {

                    transform:
                    "translate(0,0)",

                    opacity:1

                },


                {

                    transform:
                    `translate(${destinoX}px,${destinoY}px)`,

                    opacity:0

                }


            ],

            {

                duration:1500,

                easing:"ease-out"

            }


        );



        setTimeout(()=>{


            heart.remove();


        },1500);



    }


}





abrirCarta.addEventListener(
    "click",
    ()=>{


        setTimeout(()=>{


            coracoesCarta();



        },500);



    }
);




// ===============================
// MOBILE - MELHOR EXPERIÊNCIA 📱
// ===============================


function ajustarTela(){



    const card =
        document.querySelector(
            ".card"
        );



    if(!card){

        return;

    }



    if(
        window.innerWidth < 500
    ){


        card.style.padding =
            "25px";



        card.style.width =
            "90%";



    }



}



window.addEventListener(
    "resize",
    ajustarTela
);



ajustarTela();




// ===============================
// BOTÕES COM FEEDBACK VISUAL
// ===============================


document
.querySelectorAll("button")
.forEach(
    botao=>{


        botao.addEventListener(
            "click",
            ()=>{


                botao.style.opacity =
                    "0.8";


                setTimeout(()=>{


                    botao.style.opacity =
                        "1";


                },150);



            }
        );



    }
);




// ===============================
// CONFETE FINAL 🎉
// ===============================


function confeteFinal(){


    const cores = [

        "#ff4f94",

        "#ff7aa8",

        "#ffd1df",

        "#ffffff",

        "#ffcc00"

    ];



    for(
        let i = 0;
        i < 80;
        i++
    ){



        const confete =
            document.createElement(
                "span"
            );



        confete.style.position =
            "fixed";



        confete.style.width =
            "10px";



        confete.style.height =
            "10px";



        confete.style.background =
            cores[
                Math.floor(
                    Math.random()
                    *
                    cores.length
                )
            ];



        confete.style.left =
            Math.random()*100+"vw";



        confete.style.top =
            "-20px";



        confete.style.zIndex =
            "9999";



        confete.style.borderRadius =
            "50%";



        document.body.appendChild(
            confete
        );



        confete.animate(

            [

                {

                    transform:
                    "translateY(0) rotate(0deg)"

                },


                {

                    transform:
                    `translateY(110vh) rotate(720deg)`

                }


            ],

            {

                duration:
                Math.random()*3000+2000,

                easing:
                "linear"

            }

        );



        setTimeout(()=>{


            confete.remove();


        },5000);



    }


}



// quando chegar na carta completa

document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        const paginaFinal =
            document.getElementById(
                "page6"
            );



        if(paginaFinal){


            const observador =
                new MutationObserver(
                    ()=>{


                        if(
                            paginaFinal
                            .classList
                            .contains("active")
                        ){


                            confeteFinal();


                            observador.disconnect();


                        }


                    }
                );



            observador.observe(

                paginaFinal,

                {

                    attributes:true,

                    attributeFilter:[
                        "class"
                    ]

                }

            );


        }


    }
);




// ===============================
// FIM DO PROJETO ADRIELE ❤️
// ===============================


// Tudo pronto.
// O site agora possui:
// ✔ navegação
// ✔ corações
// ✔ explosões
// ✔ botão NÃO
// ✔ progresso
// ✔ escolhas
// ✔ envelope
// ✔ carta
// ✔ animações finais