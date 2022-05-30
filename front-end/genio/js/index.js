let sequenciaCPU = [];
let click = 0, turnoAux, velocidadeNivel, turnoAtual, nivel_jogo, qtdTurnos, qtdVidasInicial, qtdVidasAtual, totalPontos = 0, maxPontosPorTurno = 100;
let som = true;
let vezJogador = false;
const turnoContador = document.getElementById("turno");
const verde = document.getElementById("verde");
const vermelho = document.getElementById("vermelho");
const amarelo = document.getElementById("amarelo");
const azul = document.getElementById("azul");
const start = document.getElementById("jogar");

function instrucao(){
  click++;
  console.log(click)
  if(click % 2 == 1){
      document.getElementById('h2').style.display = 'inline';
  }
  else
  {
      document.getElementById('h2').style.display = 'none';
  }
}

start.addEventListener('click',play,false);

verde.addEventListener('click', (event) => {
  if (vezJogador == true){
    checaCor(1);
  }
})

vermelho.addEventListener('click', (event) => {
  if (vezJogador == true){
    checaCor(2);
  }
})

amarelo.addEventListener('click', (event) => {
  if (vezJogador == true){
    checaCor(3);
  }
})

azul.addEventListener('click', (event) => {
  if (vezJogador == true){
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
  qtdVidasAtual = qtdVidasInicial;
}

function pontuacao(){
  if(turnoAtual == 1){
    totalPontos = 0;
  }
  else
    totalPontos += maxPontosPorTurno;
  document.getElementById("pontuacao").innerHTML = "Pontuação = " + totalPontos;
  salvarPontuacao(totalPontos)
}

function play(){
  turnoContador.innerHTML = 1;
  limpaVar();
  escolheNivel();
  document.getElementById("vidas").innerHTML = "Vidas: " + qtdVidasInicial;
  for (var i = 0; i < 20; i++){
    sequenciaCPU.push(Math.floor(Math.random() * 4) + 1);//criando a sequencia a ser clicada
//sequenciaCPU.push(1) //só pra agilizar testes com uma cor somente
  }
  pontuacao();
  vezJogador = false;
  iniciaTurno();
}

function limpaVar(){
  sequenciaCPU = [];
  turnoAux = 0;
  turnoAtual = 1;
  maxPontosPorTurno = 100;
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

function checaCor(numeroCor){
  vezJogador = false;//bloqueia outro clique do jogador, já que o listener não vai chamar a função checaCor enquanto não desbloquear
  if(numeroCor != sequenciaCPU[turnoAux]){
    qtdVidasAtual--;
    document.getElementById("vidas").innerHTML = "Vidas: " + qtdVidasAtual;
    maxPontosPorTurno = maxPontosPorTurno - 15;
    if(qtdVidasAtual == 0){
      maxPontosPorTurno = 0;
      perdeuGame();
    }
    else{
      //cor(0);
      turnoContador.innerHTML = "NAO!";
      piscaCores();
      setTimeout(() => {
        iniciaTurno();
      }, 800);
    }
  }
  else{
    cor(numeroCor);
    setTimeout(esperaCor, 200);
  }
}

function esperaCor(){
  clearColor();
  turnoAux++;
    vezJogador = true;
    if(turnoAux == turnoAtual){
      vezJogador = false;
      if (turnoAtual == qtdTurnos) 
        ganhouGame();
      else{
        turnoAtual++;
        pontuacao();
        iniciaTurno();
      }
    }
}

function iniciaTurno(){
  turnoAux = 0;
  vezJogador = false;
  turnoContador.innerHTML = turnoAtual;
  setTimeout(mostraCor, 800, 0);
  clearColor();
}

function mostraCor(indice){
  clearColor();
  vezJogador = false;
  setTimeout(() => {
    if (indice == turnoAtual){
      vezJogador = true;
    }
    else {
      vezJogador = false;
      cor(sequenciaCPU[indice]);
      setTimeout(mostraCor, velocidadeNivel, (indice+1));
    }
  }, 300);
}

function ganhouGame(){
  vezJogador = false;
  pontuacao();
  piscaCores();
  turnoContador.innerHTML = "GANHOU!";
  setTimeout(clearColor, 600, 0);
  limpaVar();
}

function perdeuGame(){
  vezJogador = false;
  pontuacao();
  piscaCores();
  turnoContador.innerHTML = "PERDEU!";
  setTimeout(clearColor, 600, 0);
  limpaVar();
}

function salvarPontuacao(pontuacao){
  let data = {};
  data.pontuacao = pontuacao;
  //data.jogo = 'genio';
  data.aluno = localStorage.getItem('id');//`62801aca27932c027cf94ad6`
  axios.post('http://localhost:3003/pontuacao/usuario', data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}