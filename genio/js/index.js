let sequenciaCPU = [];
let turnoAux, velocidadeNivel, turnoAtual, nivel_jogo, qtdTurnos, qtdVidasInicial, qtdVidasAtual, totalPontos = 0, maxPontosPorTurno = 100;
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

verde.addEventListener('click', (event) => {
  if (vezJogador){
    checaCor(1);
  }
})

vermelho.addEventListener('click', (event) => {
  if (vezJogador){
    checaCor(2);
  }
})

amarelo.addEventListener('click', (event) => {
  if (vezJogador){
    checaCor(3);
  }
})

azul.addEventListener('click', (event) => {
  if (vezJogador){
    checaCor(4);
  }
})

function escolheNivel(){
  nivel_jogo = document.getElementById('nivel_jogo').value;
  localStorage.setItem('nivel_jogo', document.getElementById('nivel_jogo').value);
  if(nivel_jogo == 1){
    velocidadeNivel = 1100
    qtdTurnos = 5
    qtdVidasInicial = 5
  }
  else if(nivel_jogo == 2)
  {
    velocidadeNivel = 900
    qtdTurnos = 10
    qtdVidasInicial = 3
  }
  else if(nivel_jogo == 3){
    velocidadeNivel = 700
    qtdTurnos = 15
    qtdVidasInicial = 2
  }
}

function pontuacao(){
  if(turnoAtual == 1){
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
  document.getElementById("vidas").innerHTML = "Vidas: " + qtdVidasInicial;
  for (var i = 0; i < 20; i++){
    sequenciaCPU.push(Math.floor(Math.random() * 4) + 1);//criando a sequencia a ser clicada
//sequenciaCPU.push(1)
  }
  pontuacao();
  iniciaTurno();
}

function limpaVar(){
  sequenciaCPU = [];
  turnoAux = 0;
  turnoAtual = 1;
  maxPontosPorTurno = 100;
  totalPontos = 0;
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

function esperaCor(numeroCor){//mudar o nome da função
  clearColor();
    console.log('acertou cor ' + numeroCor + ': ' + turnoAux + ': ' + sequenciaCPU[turnoAux])
    turnoAux++;
    if(turnoAux == turnoAtual){
      console.log('aumentando sequencia')
      if (turnoAtual > qtdTurnos) 
        ganhouGame();
      else{
        turnoAtual++;
        iniciaTurno(); 
      }
    }
    vezJogador = true;
}

function checaCor(numeroCor){
  vezJogador = false;//bloqueia outro clique do jogador, já que o listenar não vai chamar a função checaCor enquanto não desbloquear
  if (numeroCor != sequenciaCPU[turnoAux]){
    qtdVidasAtual--;
    maxPontosPorTurno = maxPontosPorTurno -15;
    if(qtdVidasAtual == 0)
      Game();
    else{
      turnoContador.innerHTML = "NAO!";
      piscaCores();
      console.log('pisca')
      setTimeout(() => {
        iniciaTurno();
        vezJogador = true;
      }, 800);
     }
  }
  else{
    cor(numeroCor);
    setTimeout(esperaCor, 500, numeroCor);
  }
}

function iniciaTurno(){
  turnoAux = 0;
  turnoContador.innerHTML = turnoAtual;
  setTimeout(mostraCor, 800, 0); //nao lembro qual variável tinha o tempo entre uma cor e outra da sequencia
  clearColor();
}

function mostraCor(indice){
  clearColor();
  setTimeout(() => {
    if (indice==turnoAtual){
      vezJogador=true;
    }
    else {
      console.log('mostrando cor ' + sequenciaCPU[indice])
       cor(sequenciaCPU[indice]);
       setTimeout(mostraCor, velocidadeNivel, (indice+1)); //chamada recursiva num futuro próximo??!! kkkk
    }
  }, 300);
}

function ganhouGame(){
  piscaCores();
  turnoContador.innerHTML = "WIN!";//botar em portugues, para isso vai ter que aumentar visor
  vezJogador = false;
}

function Game(){//qd vence o jogo limpa as cores, mas qd perde não
  piscaCores();
  turnoContador.innerHTML = "LOSE!";//botar em portugues, para isso vai ter que aumentar visor
  vezJogador = false;
}