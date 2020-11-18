/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
 init();


// dice = Math.floor(Math.random() * 6) + 1; //+1 sitoj vietoj del to, kad tiesiog Math.floor(Math.random() * 6) butu nuo 0 iki 5, bet uz skliaustu pridejus viena, skaiciuoja nuo +1 iki 10
//console.log(dice); suta visa oerkeliam i f-ja evente

//document.querySelector('#current-' + activePlayer).textContent = dice; // #current- + active player gali but tas pats, nes vistiek 0, jeigu pakeisim kintamajam skaiciu i viena tai jau ieskos current player 1. taip pat vietoj textContent galima naudoti innerHTML bet reiktu rasyt pvz .innerHTML = '<em>' + dice + '<em>'. 

//var x = document.querySelector('#current-' + activePlayer).textContent;
//console.log(x);

document.querySelector('.dice').style.display = 'none';

/*
function btn(){
    //do smth
}
btn();

document.querySelector('.button-roll').addEventListener('click', btn); //sitas btn vadinas callback f-ja, kadangi funckija naudoja akitoj funkcijoj kaip argumentas.

document.querySelector('.button-roll').addEventListener('click', function(){
    //do smth here
}); // cia vadinas anonymous f-ja, nes nesivadina niekaip. tokia f-ja gerai, kada ja naudojam unikaliai
*/


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //1. mums reikia dabar random sk.
     var dice = Math.floor(Math.random() * 6) + 1;// math.floor - tai suapvalina sk i didesne puse
    //2. rekia kad rudytu rezultata
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //3. mums reikia ir kad updatintu taskus, bet ne tada kai kailiuku sk lygu 1.
    if(dice !== 1){
        //add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{
        // next player
        nextPlayer();
    }
 }
    
});

document.querySelector('.btn-hold').addEventListener('click', function (){
    if(gamePlaying){
        //1. add current score to global score
    scores[activePlayer] += roundScore; // tas activePlayer tai vietoj to kad rasytumem nuli arba 1, juo lengviau manipuliuot kai zaidejas ismest kaulouka su 1netu
    //2.update Uset Interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];// cia tas active player pats pasikeicia vien del to, kad mes jau padarem ankstesnej funckcijoj kai toogle uzdjom
    //3.check if player won the game
    if(scores[activePlayer] >= 20){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }else{
         nextPlayer();
    }
    //4. Next Player
    }
    
   
});

//DRY principas (Don't Repeat Yourself). tai tiesiog aprašom f-jaa atskirai ir į eventus  iterpiam.

function nextPlayer(){
    // next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active'); sitas nelebai dalykas, nes panaikina pirma zaidejui, bet antram nepanaikina ir negrizta atgal i pirma
        document.querySelector('.dice').style.display = 'none';
    
}

document.querySelector('.btn-new').addEventListener('click', init)// cia callback f-ja bus. nes o kaodel gi ne


function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

/*
function btn(){
    //do smth
}
btn();

document.querySelector('.button-roll').addEventListener('click', btn); //sitas btn vadinas callback f-ja, kadangi funckija naudoja akitoj funkcijoj kaip argumentas.

document.querySelector('.button-roll').addEventListener('click', function(){
    //do smth here
}); // cia vadinas anonymous f-ja, nes nesivadina niekaip. tokia f-ja gerai, kada ja naudojam unikaliai
*/

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
    //pridedam ant galo active klase prie pirmo zaidejo,nes  pirmas zaidejas pradeda zaidimuka
}

