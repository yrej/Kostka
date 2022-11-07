/* Konstanty označující objekty stránky */
const mena = document.getElementById("money");
const dice = document.getElementById('dice1');
const result = document.getElementById('result');
const play = document.getElementById('play');
const select = document.getElementById("skin");
/*Rychlost */
const upR1 = document.getElementById("upR1");
const upR2 = document.getElementById("upR2");
const upR3 = document.getElementById("upR3");
/*Štěstí */
const upL1 = document.getElementById("upL1");
const upL2 = document.getElementById("upL2");
const upL3 = document.getElementById("upL3");
/*Peníze */
const upM1 = document.getElementById("upM1");
const upM2 = document.getElementById("upM2");
/**Konec */
const end = document.getElementById("end");

/* Globální proměnné */
let skin = "blue";
let Money = 0;
let hod; 
let hody = []; 
let timer = false;
let delay = 2000;
let luck = 1;
let Mgain = 1;

/* Funkce na změnění barvy kostky*/
select.addEventListener("change", function(e){
    skin = e.target.value;
    console.log(skin);
})

/* Funkce zajišťující animaci */
function animace() {
    hod = Math.round(Math.ceil(Math.random() * 6) * luck);
    while(hod > 6){
        hod -= 1;
    }
    dice.src = `${skin}/kostka${hod}.png`;
}
/*Reakce na kliknutí tlačítka HREJ*/
play.addEventListener('click', function() {
    timer = setInterval(animace, 100);
    play.disabled = true;
    setTimeout(() => {
        clearInterval(timer);
    hody.push(hod);
    result.innerHTML = statistika();
    },delay);
})

function endB(btn){
    btn.style.backgroundColor = "#70f52d";
    btn.style.borderColor = "#70f52d";
    btn.style.color = "black";
    btn.disabled = true;
}

/*funkce na první zvýšení získávání peněz */
upM1.addEventListener("click", function(){
    if(Money >= 60){
        Money -= 60;
        mena.innerText = `${Money} C`;
        Mgain = 1.25;
        upM1.disabled = true;
    }
})

/*funkce na první zvýšení získávání peněz */
upM2.addEventListener("click", function(){
    if(Money >= 140){
        Money -= 140;
        mena.innerText = `${Money} C`;
        Mgain = 1.5;
        upM1.disabled = true;
        upM2.disabled = true;
    }
})

/*Funkce na první vylepšení štěstí kostky*/
upL1.addEventListener("click", function(){
    if(Money >= 40){
        Money -= 40;
        mena.innerText = `${Money} C`;
        luck = 1.1;
        upL1.disabled = true;
        console.log(luck);
    }
})

/*Funkce na první vylepšení štěstí kostky*/
upL2.addEventListener("click", function(){
    if(Money >= 90){
        Money -= 90;
        mena.innerText = `${Money} C`;
        luck = 1.2;
        upL1.disabled = true;
        upL2.disabled = true;
        console.log(luck);
    }
})

/*Funkce na první vylepšení štěstí kostky*/
upL3.addEventListener("click", function(){
    if(Money >= 160){
        Money -= 160;
        mena.innerText = `${Money} C`;
        luck = 1.3;
        upL1.disabled = true;
        upL2.disabled = true;
        upL3.disabled = true;
        console.log(luck);
    }
})

/*Funkce na první vylepšení rychlosti kosty */
upR1.addEventListener("click", function(){
    if(Money >= 20){
        Money -= 20;
        mena.innerText = `${Money} C`;
        delay = 1500;
        upR1.disabled = true;
    }
})

/*Funkce na druhé vylepšení rychlosti kosty */
upR2.addEventListener("click", function(){
    if(Money >= 50){
        Money -= 50;
        mena.innerText = `${Money} C`;
        delay = 1000;
        upR1.disabled = true;
        upR2.disabled = true;
    }
})

/*Funkce na třetí vylepšení rychlosti kosty */
upR3.addEventListener("click", function(){
    if(Money >= 100){
        Money -= 100;
        mena.innerText = `${Money} C`;
        delay = 500;
        upR1.disabled = true;
        upR2.disabled = true;
        upR3.disabled = true;
    }
})

/*Funkce pro zobrazení konce hry */
end.addEventListener("click", function(){
    if(Money >= 300){
        Money = 0;
        mena.innerText = `${Money} C`;
        dice.src = "img/smile.png";
        result.innerHTML = "Thank for Playing";
        endB(play);
        endB(upM1);
        endB(upM2);
        endB(upL1);
        endB(upL2);
        endB(upL3);
        endB(upR1);
        endB(upR2);
        endB(upR3);
        endB(end);
    }
})

/* Funkce pro sečtení všech hodnot v poli hody */
function sum() {
    let suma = 0;
    hody.forEach((value) => {
        suma += value;
    })
    return suma;
}

/* Funkce pro vytvoření statistického výpisu údajů */
function statistika() {
    let vypis = `<h3>Aktuální hod: ${hod}</h3>`;
    vypis += `<p>Počet hodů: ${hody.length}</p>`;
    vypis += `<p>Součet hodů: ${sum()}</p>`;
    vypis += `<p>Průměr hodů: ${(sum() / hody.length).toFixed(2)}</p>`;
    Money += Math.round(hod * Mgain);
    mena.innerText = `${Money} C`;
    console.log(Money);
    play.disabled = false;
    return vypis;
}