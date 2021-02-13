var canvas;//o elemento canvas sobre o qual desenharemos
var ctx;//o "contexto" da canvas que será utilizado (2D ou 3D)
const WIDTH = 500;//largura da área retangular
const HEIGHT = 500;//altura da área retangular
const imagemBalao = document.getElementById('balao');
const imagemCenario = document.getElementById('cenario');
const imagemBalaoEstourado = document.getElementById('balaoEstourado');
var timerBalao = 0;
var timerTela = 0;
var i = 0, k = 0, erro = 0, n, m, materia, operacao, simbolo, resultado, respostaCerta, retorno;
//const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//const palavras = [['C','A','S','A'],['O','V','O'],['B','O','L','A']];
const alfabeto = ['O','V'];
const palavras = [['O','V','O']];
const numeros = ['1','2','3','4','5','6','7','8','9','10'];
var letrasCertas = [], numerosClicados = [], baloes = [], clique = [];

/*
    BUG: baloes ainda printam em cima de baloes ja existentes na tela e clique em baloes na msm area
    Ter baloes de varias cores, so pegar a imagem sendo svg e programar as cores(ver se dá pra botar uma cor pra cada numero dif)
    otimizar Portugues, pode demorar mt a aparecer as letras necessarias p preencher a palavra corretamente
*/

function escolheMateria() {
    if (document.getElementById('materia').value == 2){
        document.getElementById('operacaoBold').style.display = 'inline';
        document.getElementById('operacao').style.display = 'inline';
    }
    if (document.getElementById('materia').value == 1){
        document.getElementById('operacaoBold').style.display = 'none';
        document.getElementById('operacao').style.display = 'none';
    }
    localStorage.setItem('materia', document.getElementById('materia').value)
}

function escolheNivel(){
    localStorage.setItem('nivel_jogo', document.getElementById('nivel_jogo').value)
}

function escolheOperacao(){
    localStorage.setItem('operacao', document.getElementById('operacao').value)
}

function gerenciaJogo(){
    iniciaCanvas();
    canvas.addEventListener('click',estoura,false);
    document.getElementById('reinicia').style.display = 'inline';
    document.getElementById('iniciar').style.display = 'none';
}

function iniciaCanvas(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    materia = document.getElementById('materia').value;
    criaTela();
    iniciaJogo();
}

function criaTela(){
    ctx.rect(0, 0, WIDTH, HEIGHT);
    ctx.drawImage(imagemCenario,0,0);
    /*if(materia == 1)//usar esses ifs caso a imagem mude de uma materia para outra
        ctx.drawImage(imagemCenario,0,0);
    else if(materia == 2)
        ctx.drawImage(imagemCenario,0,0);//imagem de quadro negro
    else if(materia == 3)
        ctx.drawImage(imagemCenario,0,0);//imagem de laboratorio ou quadro negro msm, e ao inves de baloes podem ser erlenmeyers*/
}

function iniciaJogo(){
    let nivel_jogo = document.getElementById('nivel_jogo').value;
    if(materia == 1)
        escolhePalavra();
    else if(materia == 2){
        operacao = document.getElementById('operacao').value;
        geraResultado();
    }
    imprimeInicial();
    if(nivel_jogo == 1) { //1 fácil 
        timerBalao = setInterval(desenhaBaloes, 1500); 
        timerTela = setInterval(limpaTela, 16999);
	}
    
	if(nivel_jogo == 2) { //2 normal
        timerBalao = setInterval(desenhaBaloes, 1000);
        timerTela = setInterval(limpaTela, 4999);
	}
	
	if(nivel_jogo == 3) { //3 difícil
        timerBalao = setInterval(desenhaBaloes, 400);
        timerTela = setInterval(limpaTela, 2999);
    }
}

function reiniciaJogo(){
    document.getElementById('info').innerHTML = null;
    clearInterval(timerBalao);
    clearInterval(timerTela);
    limpaVar()
    limpaTela();
    materia = document.getElementById('materia').value;
    iniciaJogo();
    canvas.addEventListener('click',estoura,false);
}

function limpaVar(){
    clique.length = 0
    erro = 0
    retorno = 1
    letrasCertas.length = 0;
    i = 0;
    document.getElementById("clique").innerHTML =  null
    document.getElementById("clique-erros").innerHTML =  null
    document.getElementById("feedback").innerHTML =  null
    document.getElementById("erro").innerHTML = null
}

function limpaTela(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);//remove a tela do canvas
    criaTela();
    if(i == 50)
        i = 0;//qd limpar a tela gerar um vetor com 50 numeros garantindo que as parcelas estejam dentro do vetor, na função de mostrar balao basta pegar o proximo numero do vetor(i)
}

function gameOver(){
    erro = 0;
    canvas.removeEventListener('click', estoura,false);
    clearInterval(timerBalao);
    clearInterval(timerTela);
}

function randomCoord(){//Gera coordenadas aleatórias para os balões
    let x = Math.floor(Math.random() * (WIDTH - 36));//o 36 é para a imagem não ser desenhada fora do canvas
    let y = Math.floor(Math.random() * (HEIGHT - 36));
    let res = {x:x, y:y};
    return res;
}

function desenhaBaloes(){
    if(materia == 1)
        baloes[i] = {letra: insereLetra(), coordenadas: randomCoord()};
    else if(materia == 2){
        baloes[i] = {numero: insereNumero(), coordenadas: randomCoord()};
    }
    ctx.drawImage(imagemBalao,baloes[i].coordenadas.x,baloes[i].coordenadas.y);
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "white";
    if(materia == 1)
        ctx.fillText(baloes[i].letra,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].letra).width/2,baloes[i].coordenadas.y + 22);
    else if(materia == 2){
        if(operacao == 4){
            if(i == 10 || i == 30){
                let resultado = n * m;
                baloes[i].numero = resultado;
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
            }
            else
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
        }
        else if(operacao == 5){
            if(i == 10 || i == 30){
                if(n > m){
                let resultado = n / m;
                baloes[i].numero = resultado;
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
                }
                else{
                    let resultado = m / n;
                    baloes[i].numero = resultado;
                    ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
                }
            }
            else
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
        }
        else{
            if(i == 20 || i == 40){ //Força a inserção do primeiro número envolvido na operação matemática
                baloes[i].numero = n;
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
            }
            else if(i == 30 || i == 45){//Força a inserção do segundo número envolvido na operação matemática
                baloes[i].numero = m;
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
            }
            else
                ctx.fillText(baloes[i].numero,baloes[i].coordenadas.x + 14 - ctx.measureText(baloes[i].numero).width/2,baloes[i].coordenadas.y + 22);
        }
    }
    i++;
    k++;
}

var estoura = function estouraBalao(event){//Cuida dos cliques nos balões
    let xVal = event.pageX;
    let yVal = event.pageY;
    let canvasX = document.getElementById('canvas').offsetLeft;
    let canvasY = document.getElementById('canvas').offsetTop;
    for(let j = 0; j < k; j++){
        if((xVal > (baloes[j].coordenadas.x + canvasX) && xVal < (baloes[j].coordenadas.x + canvasX + 28)) && (yVal > (baloes[j].coordenadas.y + canvasY) && yVal < (baloes[j].coordenadas.y + canvasY + 36))){
            ctx.drawImage(imagemBalaoEstourado,baloes[j].coordenadas.x,baloes[j].coordenadas.y);
            if(materia == 1){
                let cor = comparaLetra(baloes[j].letra)
                imprimeClique(baloes[j].letra, cor)
            }
            else if(materia == 2){
                comparaNumero(baloes[j].numero)
                imprimeClique(baloes[j].numero, null)
            }
        }   
    }
}

function imprimeInicial(){
    if(materia == 1){
        let palavraescolhida = respostaCerta.join('')
        document.getElementById("info").innerHTML =  'A palavra escolhida é: ' + palavraescolhida;   //`A palavra escolhida é: ${palavraescolhida}`
    }
    else if(materia == 2){
        if(operacao == 4 || operacao == 5){
            let str1  = m + simbolo + n + " = <img src = 'imagens/balao_pequeno_interrogacao.png'>";
            let str2  = n + simbolo + m + " = <img src = 'imagens/balao_pequeno_interrogacao.png'>";
            if(m >= n)
                document.getElementById("info").insertAdjacentHTML('beforeend', str1);
            else
                document.getElementById("info").insertAdjacentHTML('beforeend', str2);
        }
        else{
            let str = "<img src = 'imagens/balao_pequeno_interrogacao.png'>" + simbolo + "<img src = 'imagens/balao_pequeno_interrogacao.png'>" + ' = ' + resultado;
            document.getElementById("info").insertAdjacentHTML('beforeend', str);
        }
    }
}

function imprimeClique(balaoclicado, cor){
    clique.push(balaoclicado);    
    if(materia == 1){
    let h = document.createElement("h2"); 
    let letra, divClique;
    if(cor == 'red'){
        if(erro > 1 || erro == 0)
            balaoclicado = `-${balaoclicado}`;
        divClique = document.getElementById("clique-erros");
    }
    else{
       divClique = document.getElementById("clique");
    }
    letra = document.createTextNode(balaoclicado); 
    h.appendChild(letra);
    h.style.color = cor;
    divClique.insertAdjacentElement("beforeend", h);
    }
    else{
        if(operacao == 4 || operacao == 5){
            let str1  = m + simbolo + n + ' = ' + balaoclicado;
            let str2  = n + simbolo + m + ' = ' + balaoclicado;
            if(m >= n)
                document.getElementById("info").innerHTML = str1;
            else
                document.getElementById("info").innerHTML = str2;
        }
        else{
            if(clique.length < 2)    
                document.getElementById("info").innerHTML = clique[0] + simbolo + ' _ ' + ' =  ' + resultado;
            else
                document.getElementById("info").innerHTML = clique[0] + simbolo + clique[1] + ' =  ' + resultado;
        }
    }
    if(erro == 3)
        gameOver();
}

function imprimeAcerto(){
    document.getElementById("feedback").style.color = 'snow'
    document.getElementById("feedback").style.textAlign = 'center'
    document.getElementById("feedback").innerHTML =  'Parabéns!!! Você acertou!'
    document.getElementById("erro").innerHTML = null
}

function imprimeErros(){
    document.getElementById("feedback").style.color = 'snow'
    if(erro > 2){
        document.getElementById("feedback").style.textAlign = 'center'
        document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
        document.getElementById("erro").innerHTML = null
    }
    else{
        document.getElementById("erro").style.color = 'red'
        document.getElementById("feedback").style.textAlign = 'left'
        document.getElementById("feedback").innerHTML = 'Quantidade de erros: &nbsp;'
        document.getElementById("erro").innerHTML = erro
    }
}

//Funções da matéria Português

function insereLetra(){
    let z = Math.floor(Math.random() * (alfabeto.length));
    return alfabeto[z];
}

function escolhePalavra(){
    let z = Math.floor(Math.random() * (palavras.length));
    respostaCerta = palavras[z];
}

//retornando a cor, imprime acerto ou erro, preenche letras acertadas
function comparaLetra(letra){
    let indice = letrasCertas.length
    let cor
    if(respostaCerta[indice] == letra){
        letrasCertas.push(letra)
        cor = 'snow'
        if(letrasCertas.length == respostaCerta.length){
            imprimeAcerto()
            gameOver()
            setTimeout(reiniciaJogo,3000)            
        }
    }
    else{
        cor = 'red'
        erro++;
        imprimeErros()
        if(erro == 3)
            gameOver()
    }
    return cor;
}

//Funções da matéria Matemática

function insereNumero(){ //Insere numero de 1 a 10 ou de 1 a 100 nos balões
    if(operacao == 4 || operacao == 5)
        var o = Math.floor(Math.random() * 100)+1;
    else
        var o = Math.floor(Math.random() * (numeros.length))+1;
    return o;
}

function geraResultado(){//olhar essa função, ta bugada
    n = Math.floor(Math.random() * (numeros.length))+1;
    m = Math.floor(Math.random() * (numeros.length))+1;
    if(operacao == 1){
        simbolo = ' + ';
        resultado = n + m;
    }
    else if(operacao == 2){
        simbolo = ' - ';
        if(n>m){
            resultado = n - m;
        }
        else{
            resultado = m - n;
        }
    }
    else if(operacao == 3){
        simbolo = ' * ';
        resultado = n * m;
    }
    else if(operacao == 4){
        simbolo = ' * ';
    }
    else{
        simbolo = ' / ';
        n = Math.floor(Math.random() * 100)+1;
        m = Math.floor(Math.random() * 100)+1;
        if((n > m && n % m != 0) || (m > n && m % n != 0))
            geraResultado();
    }
}

function comparaNumero(numero){
    if(operacao == 4){
        if((n*m)==numero){
            imprimeAcerto()
            gameOver()
            setTimeout(reiniciaJogo,3000)
        }
        else{
            gameOver();
            document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
        }
    }
    else if(operacao == 5){
        if(n >= m){//otimizar aqui
            if((n / m) == numero){
                imprimeAcerto()
                gameOver()
                setTimeout(reiniciaJogo,3000);
            }
            else{
                gameOver();
                document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
            }
        }
        else if(m >= n){
            if((m / n) == numero){
                imprimeAcerto();
                gameOver()
                setTimeout(reiniciaJogo,3000);
            }
            else{
                gameOver();
                document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
            }
        }
    }
    else{
        numerosClicados.push(numero);
        if(numerosClicados.length == 2){
            let ok = false;
            if(operacao == 1)
                ok = ((numerosClicados[0] + numerosClicados[1]) == resultado);
            else if(operacao == 2)
                ok = ((numerosClicados[0] - numerosClicados[1]) == resultado);
            else if(operacao == 3)
                ok = ((numerosClicados[0] * numerosClicados[1]) == resultado);
            if(ok){
                imprimeAcerto();
                numerosClicados.length = 0;
                gameOver();
                setTimeout(reiniciaJogo,3000);
                }
            else{
                document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
                numerosClicados.length = 0;
                gameOver();
            }
        }
    }
}