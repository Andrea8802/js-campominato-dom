// l'utente cliccando un bottone genererà una griglia 10x10 con dei numeri da 1 a 100, l'utente cliccando su di esse le colorerà di azzurro

// Manipolazione DOM
const container = document.getElementById("container");
const genera = document.getElementById("play");
const difficolta = document.getElementById("difficolta");
const reset = document.getElementById("reset");
let elements = document.getElementsByClassName("box");

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
        arrNum = bombNumber(1, 100, 16);

        // Click sui numeri
        box.addEventListener("click",
            function(){
                console.log(i);
                if(arrNum.includes(i)){
                    box.classList.add("bomba");
                } else{
                    box.classList.add("safe");
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
