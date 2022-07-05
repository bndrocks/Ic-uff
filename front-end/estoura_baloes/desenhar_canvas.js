var canvas;//o elemento canvas sobre o qual desenharemos
var ctx;//o "contexto" da canvas que será utilizado (2D ou 3D)
const WIDTH = 500;//largura da área retangular
const HEIGHT = 500;//altura da área retangular
const imagemBalao = document.getElementById('balao');
const imagemCenario = document.getElementById('cenario');
const imagemBalaoEstourado = document.getElementById('balaoEstourado');
var timerBalao = 0;
var timerTela = 0;
var bool = 0, click = 0, maxBaloes = 0, auxBaloes = 0, erro = 0, n, m, materia, operacao, simbolo, resultado, respostaCerta, separaResposta, listaCoord = [];
const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var palavras = [];
//const alfabeto = ['O','I','o','i'];
//const palavras = [['o','v','o']];
const numeros = ['1','2','3','4','5','6','7','8','9','10'];
var conteudo = [];
var letrasCertas = [], numerosClicados = [], baloes = [], clique = [];

function adicionaTemas(tema){
    let seletorTema = document.getElementById('tema');
    let option = document.createElement('option');
    option.id = tema._id;
    option.value = tema.tema
    option.innerHTML = tema.tema;
    seletorTema.insertAdjacentElement("beforeEnd",option );
}
function  carregaTemas(){
    const idAluno = localStorage.getItem('id');
    axios.get('http://localhost:3003/aluno/' + idAluno).then((response) => {
        response.data.arquivos.forEach(arquivo => {
            adicionaTemas(arquivo)
            conteudo.push({tema: arquivo.tema, palavras: arquivo.conteudo})
        });
    }).catch((error) => {

    })
}

function instrucao(){
    click++;
    if(click % 2 == 1){
        document.getElementById('h2').style.display = 'inline';
    }
    else
    {
        document.getElementById('h2').style.display = 'none';
    }
}

function escolheMateria(){
    if (document.getElementById('materia').value == 2){
        materia = 2;
        document.getElementById('operacaoBold').style.display = 'inline';
        document.getElementById('operacao').style.display = 'inline';
        //document.getElementById('arquivo').style.visibility = 'hidden';
        document.getElementById('temaContainer').style.display = 'none';
    }
    if (document.getElementById('materia').value == 1){
        materia = 1;
        document.getElementById('operacaoBold').style.display = 'none';
        document.getElementById('operacao').style.display = 'none';
        //document.getElementById('arquivo').style.visibility = 'visible';
        document.getElementById('temaContainer').style.display = 'inline';
    }
    localStorage.setItem('materia', document.getElementById('materia').value)
}

function escolheNivel(){
    localStorage.setItem('nivel_jogo', document.getElementById('nivel_jogo').value)
}

function escolheOperacao(){
    localStorage.setItem('operacao', document.getElementById('operacao').value)
}

function checaArquivo(){
    if(materia == 1 && bool == 0)
        return false;
    else
        return true;
}

function iniciaCanvas(){
    materia = document.getElementById('materia').value;
    let tema = document.getElementById('tema').value;
    palavras = conteudo.find(elem => elem.tema == tema).palavras;
    console.log(palavras)
    //if(checaArquivo() == true){
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        criaTela();
        iniciaJogo();
        canvas.addEventListener('click',estoura,false);
        document.getElementById('reinicia').style.display = 'inline';
        document.getElementById('iniciar').style.display = 'none';
    /*}
    else{
        canvas.style.display = 'none';
        console.log("bota um arquivo ae")
    }*/
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
    randomCoord(11);
    let nivel_jogo = document.getElementById('nivel_jogo').value;
    if(materia == 1){
        escolhePalavra();
    }
    else if(materia == 2){
        operacao = document.getElementById('operacao').value;
        if(operacao == 6)
            operacaoAleatoria();
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

function operacaoAleatoria(){
    operacao = Math.floor(Math.random() * 5) + 1;
}

function reiniciaJogo(){
    document.getElementById('info').innerHTML = null;
    clearInterval(timerBalao);
    clearInterval(timerTela);
    limpaVar()
    limpaTela();
    materia = document.getElementById('materia').value;
    console.log(materia)
    //if(materia == 2 || bool){
        canvas.style.display = 'block';
        iniciaJogo();
    /*}
    else{
        canvas.style.display = 'none';
        console.log("bota um arquivo ae")
    }*/
    canvas.addEventListener('click',estoura,false);
}

function limpaVar(){
    clique.length = 0;
    erro = 0;
    letrasCertas.length = 0;
    maxBaloes = 0;
    document.getElementById("clique").innerHTML =  null;
    document.getElementById("clique-erros").innerHTML =  null;
    document.getElementById("feedback").innerHTML =  null;
    document.getElementById("erro").innerHTML = null;
}

function limpaTela(){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);//remove a tela do canvas
    criaTela();
    for(let j=0; j<maxBaloes; j++){
        delete listaCoord[j].x;
        delete listaCoord[j].y;
    }
    randomCoord(11);
    maxBaloes = 0;
}

function gameOver(){
    erro = 0;
    canvas.removeEventListener('click', estoura,false);
    clearInterval(timerBalao);
    clearInterval(timerTela);
}

function randomCoord(n){//Gera coordenadas aleatórias para os balões
    let x = 10, y = 10, res = {}, vetor = [0.2,1,2,3,4,5,6,7,8,9,10];
    for(let j=0;j<n;j++){
        indice = Math.floor(Math.random() * vetor.length);
        y = vetor[indice] * 45;
        vetor.splice(indice, 1);
        x = Math.floor(Math.random() * (WIDTH - 36));
        res = {x:x, y:y};
        listaCoord[j] = res;
    }
    listaCoord.sort(() => 0.5 - Math.random());
}

function desenhaBaloes(){//criar função de forçar resultado
    auxBaloes ++;
    if(auxBaloes == 50){//serve para forçar que o resultado apareça em algum momento
        auxBaloes = 0;
    }
    if(materia == 1)
        baloes[maxBaloes] = {letra: insereLetra(), coordenadas: listaCoord[maxBaloes]};
    else if(materia == 2){
        baloes[maxBaloes] = {numero: insereNumero(), coordenadas: listaCoord[maxBaloes]};
    }
    ctx.drawImage(imagemBalao,baloes[maxBaloes].coordenadas.x,baloes[maxBaloes].coordenadas.y);
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = "white";
    forçaResultado();
    maxBaloes++;
}

function forçaResultado(){
    if(materia == 1)
        ctx.fillText(baloes[maxBaloes].letra,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].letra).width/2,baloes[maxBaloes].coordenadas.y + 22);
    else if(materia == 2){
        if(operacao == 4){
            if(auxBaloes == 10 || auxBaloes == 30){
                let resultado = n * m;
                baloes[maxBaloes].numero = resultado;
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
            }
            else
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
        }
        else if(operacao == 5){
            if(auxBaloes == 10 || auxBaloes == 30){
                if(n > m){
                let resultado = n / m;
                baloes[maxBaloes].numero = resultado;
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
                }
                else{
                    let resultado = m / n;
                    baloes[maxBaloes].numero = resultado;
                    ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
                }
            }
            else
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
        }
        else{
            if(auxBaloes == 20 || auxBaloes == 40){ //Força a inserção do primeiro número envolvido na operação matemática
                baloes[maxBaloes].numero = n;
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
            }
            else if(auxBaloes == 30 || auxBaloes == 45){//Força a inserção do segundo número envolvido na operação matemática
                baloes[maxBaloes].numero = m;
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
            }
            else
                ctx.fillText(baloes[maxBaloes].numero,baloes[maxBaloes].coordenadas.x + 14 - ctx.measureText(baloes[maxBaloes].numero).width/2,baloes[maxBaloes].coordenadas.y + 22);
        }
    }
}

var estoura = function estouraBalao(event){//Cuida dos cliques nos balões
    let xVal = event.pageX;
    let yVal = event.pageY;
    let canvasX = document.getElementById('canvas').offsetLeft;
    let canvasY = document.getElementById('canvas').offsetTop;
    let j = 0;
    for( j = 0; j < maxBaloes; j++){
        if((xVal > (baloes[j].coordenadas.x + canvasX) && xVal < (baloes[j].coordenadas.x + canvasX + 28)) && (yVal > (baloes[j].coordenadas.y + canvasY) && yVal < (baloes[j].coordenadas.y + canvasY + 36))){
            ctx.drawImage(imagemBalaoEstourado,baloes[j].coordenadas.x,baloes[j].coordenadas.y);
            if(materia == 1){
                let cor = comparaLetra(baloes[j].letra);
                imprimeClique(baloes[j].letra, cor);
            }
            else if(materia == 2){
                comparaNumero(baloes[j].numero);
                imprimeClique(baloes[j].numero, null);
            }
            return 0;
        }   
    }
}

function imprimeInicial(){
    if(materia == 1){
        //let palavraescolhida = respostaCerta.join('')
        document.getElementById("info").innerHTML =  'A palavra escolhida é: ' + respostaCerta;
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
        if(erro > 1 || erro == 0)//so não coloca o hífen quando o erro = 1
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
    document.getElementById("feedback").style.color = 'snow';
    document.getElementById("feedback").style.textAlign = 'center';
    document.getElementById("feedback").innerHTML =  'Parabéns!!! Você acertou! Clique no botão de PLAY para jogar novamente';
    document.getElementById("erro").innerHTML = null;
}

function imprimeErros(){
    document.getElementById("feedback").style.color = 'snow';
    if(erro > 2){
        document.getElementById("feedback").style.textAlign = 'center';
        document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.';
        document.getElementById("erro").innerHTML = null;
    }
    else{
        document.getElementById("erro").style.color = 'red';
        document.getElementById("feedback").style.textAlign = 'left';
        document.getElementById("feedback").innerHTML = 'Quantidade de erros: &nbsp;';
        document.getElementById("erro").innerHTML = erro;
    }
}

//Funções da matéria Português

function insereLetra(){
    let prob = Math.random();
    let z = Math.floor(Math.random() * (alfabeto.length/2));
    if(prob >= 0.2)
        z = z + alfabeto.length/2;
    return alfabeto[z];
}

function escolhePalavra(){
    let z = Math.floor(Math.random() * (palavras.length));
    separaResposta = palavras[z];
    respostaCerta = separaResposta.join('');
}

//retornando a cor, imprime acerto ou erro, preenche letras acertadas
function comparaLetra(letra){
    let indice = letrasCertas.length;
    let cor;
    if(separaResposta[indice] == letra){
        letrasCertas.push(letra);
        cor = 'snow';
        if(letrasCertas.length == separaResposta.length){
            imprimeAcerto();
            gameOver();
        }
    }
    else{
        cor = 'red';
        erro++;
        imprimeErros();
        if(erro == 3)
            gameOver();
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
    else if(operacao == 5){
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
            imprimeAcerto();
            gameOver();
        }
        else{
            gameOver();
            document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
        }
    }
    else if(operacao == 5){
        if(n >= m){//otimizar aqui
            if((n / m) == numero){
                imprimeAcerto();
                gameOver();
            }
            else{
                gameOver();
                document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
            }
        }
        else if(m >= n){
            if((m / n) == numero){
                imprimeAcerto();
                gameOver();
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
                }
            else{
                document.getElementById("feedback").innerHTML =  'Você errou. Se quiser voltar a jogar aperte o botão de PLAY para reiniciar o jogo.'
                numerosClicados.length = 0;
                gameOver();
            }
        }
    }
}