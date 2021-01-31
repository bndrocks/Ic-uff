let sequenciaCPU = [], sequenciaClicada = [];
let turnoAux, ganhou, perdeu, turnoAtual, correto, vezCPU, nivel_jogo, intervaloId,qtdTurnos,qtdVidasInicial,qtdVidasAtual, totalPontos = 0, i = 0, maxPontosPorTurno = 100;
let som = true;
let vezJogador = false;

const turnoContador = document.getElementById("turno");
const verde = document.getElementById("verde");
const vermelho = document.getElementById("vermelho");
const amarelo = document.getElementById("amarelo");
const azul = document.getElementById("azul");
const start = document.getElementById("jogar");

/*
JOGO BUGA QD CLICA MT RAPIDO
*/

start.addEventListener('click',play,false);

/*function clicouVerde(){ tentativa frustrada q buga igual o listener(lembra de botar o onclick nela no html)
  if (vezJogador){
    sequenciaClicada.push(1);
    checa();
    cor(1);
    if(!ganhou){
      setTimeout(() => {//tempo para apagar a cor após ter sido clicada
        clearColor();
      }, 300);
    }
  }
}*/

verde.addEventListener('click', (event) => {//tem como juntar todos esses Listeners em um só? 
  //Pensei em tirar o click e botar de volta dps p tirar o click rapido
  //verde.removeEventListener('click', (event) => {
  //})
  if (vezJogador){
    sequenciaClicada.push(1);
    checa();
    cor(1);
    if(!ganhou){
      setTimeout(() => {//tempo para apagar a cor após ter sido clicada
        clearColor();
      }, 300);
    }
  }
})

vermelho.addEventListener('click', (event) => {
  if (vezJogador){
    sequenciaClicada.push(2);
    checa();
    cor(2);
    if(!ganhou){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

amarelo.addEventListener('click', (event) => {
  if (vezJogador) {
    sequenciaClicada.push(3);
    checa();
    cor(3);
    if(!ganhou){
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

azul.addEventListener('click', (event) => {
  if (vezJogador){
    sequenciaClicada.push(4);
    checa();
    cor(4);
    if(!ganhou) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})


function escolheNivel(){
  nivel_jogo = document.getElementById('nivel_jogo').value;
  localStorage.setItem('nivel_jogo', document.getElementById('nivel_jogo').value);
}

function velocidade(){//fiz esta e as 2 proximas funções separadas. acha melhor juntar ao menos as 2 proximas?
  if(nivel_jogo == 1)
    intervaloId = setInterval(gameTurno, 1100);
  else if(nivel_jogo == 2)
    intervaloId = setInterval(gameTurno, 900);
  else if(nivel_jogo == 3)
    intervaloId = setInterval(gameTurno, 650);
}

function turnos(){
  if(nivel_jogo == 1)
    qtdTurnos = 1
  else if(nivel_jogo == 2)
    qtdTurnos = 10
  else if(nivel_jogo == 3)
    qtdTurnos = 15
}

function vidas(){
  if(nivel_jogo == 1)
    qtdVidasInicial = 5
  else if(nivel_jogo == 2)
    qtdVidasInicial = 3
  else if(nivel_jogo == 3)
    qtdVidasInicial = 2
  qtdVidasAtual = qtdVidasInicial;
    document.getElementById("vidas").innerHTML = "Vidas: " + qtdVidasInicial;
}

function pontuacao(){
  console.log("pontuacao(): " + sequenciaClicada.length)
  if(sequenciaClicada.length == 0){
    totalPontos = 0;
  }
  else
    totalPontos += maxPontosPorTurno;
  document.getElementById("pontuacao").innerHTML = "Pontuação = " + totalPontos;
}

function play(){
  turnoContador.innerHTML = 1;
  limpaVar();
  escolheNivel();
  for (var i = 0; i < 20; i++){
    sequenciaCPU.push(Math.floor(Math.random() * 4) + 1);//criando a sequencia a ser clicada
//sequenciaCPU.push(1)
  }
  vezCPU = true;
  velocidade();
  turnos();
  vidas();
  pontuacao();
}

function limpaVar(){
  perdeu = false;
  ganhou = false;
  sequenciaCPU = [];
  sequenciaClicada = [];
  turnoAux = 0;
  turnoAtual = 1;
  correto = true;
  maxPontosPorTurno = 100;
  totalPontos = 0;
}

function gameTurno(){
  vezJogador = false;
  if(turnoAux == turnoAtual){
    clearInterval(intervaloId);
    vezCPU = false;
    clearColor();
    vezJogador = true;
    start.addEventListener('click', play, false);
  }
  if(vezCPU){
    if(qtdVidasAtual != 0){
      start.removeEventListener('click', play, false);
      clearColor();
      setTimeout(() => {
      cor(sequenciaCPU[turnoAux]);//começa mandando a posição [0] do array sequenciaCPU
      turnoAux++;
      }, 200);
    }
    /*else{
      clearInterval(intervaloId);
    }*/
  }
}

function clearColor(){
  verde.style.backgroundColor = "darkgreen";
  vermelho.style.backgroundColor = "darkred";
  amarelo.style.backgroundColor = "goldenrod";
  azul.style.backgroundColor = "darkblue";
}

function piscaCores(){
  verde.style.backgroundColor = "lightgreen";
  vermelho.style.backgroundColor = "tomato";
  amarelo.style.backgroundColor = "yellow";
  azul.style.backgroundColor = "lightskyblue";
}

function cor(numero){
  if (som){
    if(numero == 1){
      var audio = document.getElementById("clipe1");
      verde.style.backgroundColor = "lightgreen";
    }
    else if(numero == 2){
      var audio = document.getElementById("clipe2");
      vermelho.style.backgroundColor = "tomato";
    }
    else if(numero == 3){
      var audio = document.getElementById("clipe3");
      amarelo.style.backgroundColor = "yellow";
    }
    else if(numero == 4){
      var audio = document.getElementById("clipe4");
      azul.style.backgroundColor = "lightskyblue";
    }
    audio.play();
  }
  som = true;
}

function checa(){
  if (sequenciaClicada.length == qtdTurnos && correto){
    ganhouGame();
  }
  
  if (sequenciaClicada[sequenciaClicada.length - 1] !== sequenciaCPU[sequenciaClicada.length - 1] && !perdeu){
    correto = false;
    qtdVidasAtual--;
    maxPontosPorTurno = maxPontosPorTurno - 15;
    if(qtdVidasAtual == 0)
      perdeuGame();
    else{
      piscaCores();
      turnoContador.innerHTML = "NAO!";
      setTimeout(() => {
        turnoContador.innerHTML = turnoAtual;
        clearColor();
        vezCPU = true;
        turnoAux = 0;//está na função limpaVar. 
        sequenciaClicada = [];//está na função limpaVar
        correto = true;//está na função limpaVar
        velocidade();
      }, 800);
    }
  }
  
  if (turnoAtual == sequenciaClicada.length && correto && !ganhou){
    pontuacao();
    turnoAtual++;
    sequenciaClicada = [];//está na função limpaVar
    turnoAux = 0;//está na função limpaVar. Deveria fazer outra função só c essas 2 já q elas repetem? pra diminuir codigo
    vezCPU = true;
    turnoContador.innerHTML = turnoAtual;
    velocidade();
  }

  document.getElementById("vidas").innerHTML = "Vidas: " + qtdVidasAtual;
}

function ganhouGame(){
  piscaCores();
  turnoContador.innerHTML = "WIN!";//botar em portugues, para isso vai ter que aumentar visor
  vezJogador = false;
  ganhou = true;
}

function perdeuGame(){//qd vence o jogo limpa as cores, mas qd perde não
  piscaCores();
  turnoContador.innerHTML = "LOSE!";//botar em portugues, para isso vai ter que aumentar visor
  vezJogador = false;
  perdeu = true;
  //limpaVar();
  //start.addEventListener('click',play,false);
}