// l'utente cliccando un bottone genererà una griglia in base alla difficoltà scelta, se clicca sulla cella giusta diventerà blu e guadagnerà un punto, altrimenti diventa rossa e perderà

// Manipolazione DOM
const container = document.getElementById("container");
const genera = document.getElementById("play");
const difficolta = document.getElementById("difficolta");
const reset = document.getElementById("reset");
const punteggio = document.getElementById("punteggio");
let elements = document.getElementsByClassName("box");
const esito = document.getElementById("esito");

// Dichiariazione variabili
let esploso = false;
let score = 0;


// Array
let arrNum = [];

difficolta.value = "";



// Bottone genera
genera.addEventListener("click",
    function(){

        // Controllo difficoltà
        if (difficolta.value === ""){
            alert("Inserisci difficoltà per giocare");

        } else{
            azzera();
            sceltaDifficolta();
        }   
    }
)

// Funzioni

// Funzione scelta modalità
function creaBox(nBox, modalita){

    difficolta.addEventListener("change",
        function(){
            azzera();
            sceltaDifficolta();
        }        
    )

     // Rendere visibile container
     container.style.display = "flex";

     // Stampiamo le celle
    for(let i = 1; i <= nBox; i++){
        const box = document.createElement("div");
        box.classList.add("box");
        box.classList.add(modalita);
        container.append(box);
        box.innerHTML = i;

        
        // Click sui numeri
        box.addEventListener("click",
            function(){

                // Se non è esploso allora
                if (esploso === false){

                    // Se clicchi sulla cella "bomba" perdi
                    if (arrNum.includes(i)){  
                        // Mostriamo tutte le bombe
                        for (let i = 0; i < nBox; i++){
                            if (arrNum.includes(i)){
                                elements[(i - 1)].classList.add("bomba");
                            }
                        }
                        esito.classList.add("sconfitta");
                        esito.innerHTML = "Hai Perso!"
                        esploso = true;
                        score = 0;

                    // ALtrimenti Se la cella selezionata non lo è già
                    }  else if (box.classList[2] != "safe") {
                        box.classList.add("safe");
                        score += 1;
                        punteggio.innerHTML = "Punteggio: " + score;

                        // Se tutte le celle safe sono selezionate vinci
                        if (score === nBox - arrNum.length){
                            esito.classList.add("vittoria");
                            esito.innerHTML = "Hai Vinto!";
                            
                        }
                    }    
                }
            }       
        )
    }
}

// Funzione per la scelta della difficoltà
function sceltaDifficolta(){
    // Controllo difficoltà
    if (difficolta.value === "facile"){

        creaBox(100, "facile");

        } else if (difficolta.value === "normale"){

        creaBox(81, "normale");

        } else if (difficolta.value === "difficile"){

        creaBox(49, "difficile");
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

// Funzioni per azzerare valori o output
function azzera(){
    genera.innerHTML = "Reset"
    container.innerHTML = "";
    esito.innerHTML = "";
    esploso = false;
    score = 0;
    punteggio.innerHTML = "Punteggio: " + score;
    arrNum = [];
    arrNum = bombNumber(1, 100, 16);
}