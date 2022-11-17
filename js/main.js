// l'utente cliccando un bottone genererà una griglia 10x10 con dei numeri da 1 a 100, se clicca sulla cella giusta diventerà blu e guadagnerà un punto, altrimenti diventa rossa e perderà

// Manipolazione DOM
const container = document.getElementById("container");
const genera = document.getElementById("play");
const punteggio = document.getElementById("punteggio");
const esito = document.getElementById("esito");

// Dichiariazione variabili
let esploso = false;
let score = 0;

// Array
let arrNum = [];

// Bottone genera
genera.addEventListener("click",
    function(){

        // Azzeramenti vari
        genera.innerHTML = "Reset"
        container.innerHTML = "";
        score = 0;
        punteggio.innerHTML = "Punteggio: " + score
        esito.innerHTML = "";
        esploso = false;
        arrNum = [];
        arrNum = bombNumber(1, 100, 16);

         // Rendere visibile container
        container.style.display = "flex";

        // Stampiamo le celle
        for(let i = 1; i <= 100; i++){
            const box = document.createElement("div");
            box.classList.add("box");
            container.append(box);
            box.innerHTML = i;


            // Click sui numeri
            box.addEventListener("click",
                function(){

                    // Se non è esploso allora
                    if (esploso === false){

                        // Se clicchi sulla cella "bomba" perdi
                        if (arrNum.includes(i)){
                            box.classList.add("bomba");
                            esploso = true;
                            score = 0;
                            esito.innerHTML = "Hai Perso!"

                        }  else if (box.classList[1] != "safe") {
                            // ALtrimenti Se la cella selezionata non lo è già
                            box.classList.add("safe");
                            score += 1;
                            punteggio.innerHTML = "Punteggio: " + score;

                            // Se tutte le celle safe sono selezionate vinci
                            if (score === 100 - arrNum.length){
                                esito.innerHTML = "Hai Vinto!"
                            }
                        }  
                    }  
                }
            )
        }        
    }
)

// Funzioni

// Funzione per generare numero random
function numRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione che genera dei numeri casuali unici da attribuire alle bombe
function bombNumber (numMin, numMax, quantity){
    while (arrNum.length < quantity){
        let num = numRandom(numMin, numMax);
        if (!arrNum.includes(num)){
            arrNum.push(num);
        }
    }
    return arrNum;
}
