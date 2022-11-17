// l'utente cliccando un bottone genererà una griglia 10x10 con dei numeri da 1 a 100, l'utente cliccando su di esse le colorerà di azzurro

// Manipolazione DOM
const container = document.getElementById("container");
const genera = document.getElementById("play");
const difficolta = document.getElementById("difficolta");
const reset = document.getElementById("reset");
let elements = document.getElementsByClassName("box");
const punteggio = document.getElementById("punteggio");

// Dichiariazione variabili
let esploso = false;
let score = 0;


// Array
let arrNum = [];

difficolta.value = "facile";

// Bottone genera
genera.addEventListener("click",
    function(){

        // Controllo difficoltà
        if (difficolta.value === "facile"){

            creaBox(100, "facile");

        } else if (difficolta.value === "normale"){

            creaBox(81, "normale");

        } else if (difficolta.value === "difficile"){

           creaBox(49, "difficile");
        }
    }
)

// Bottone Reset
reset.addEventListener("click",
    function(){
        location.reload();
    }
)

// Funzioni

// Funzione scelta modalità
function creaBox(nBox, modalita){
     // Rendere visibile container
     container.style.display = "flex";

     // Stampiamo le celle
    for(let i = 1; i <= nBox; i++){
        const box = document.createElement("div");
        box.classList.add("box");
        box.classList.add(modalita);
        container.append(box);
        box.innerHTML = i;
        arrNum = bombNumber(1, 100, 16)


        // Click sui numeri
        box.addEventListener("click",
            function(){

                // Se non è esploso allora
                if (esploso === false){

                    // Se clicchi sulla cella "bomba" perdi
                    if (arrNum.includes(i)){
                        box.classList.add("bomba");
                        esploso = true;

                    }  else if (box.classList[2] != "safe") {
                        // ALtrimenti Se la cella selezionata non lo è già
                        box.classList.add("safe");
                        score += 1;
                        punteggio.innerHTML = "Punteggio: " + score;

                        // Se tutte le celle safe sono selezionate vinci
                        if (score === nBox - arrNum.length){
                            alert("Hai vinto!")
                        }
                    } 

                } else if (esploso === true){
                    score = 0;
                    alert("Hai perso! Resetta la parita per continuare");
                }   
            }
        )
    }
}

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
