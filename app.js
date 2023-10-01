
let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumero();
let tentativas = 1;

function alterarTextos(tag, texto) {
    document.querySelector(tag).innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    alterarTextos('h1', 'Jogo do número secreto');
    alterarTextos('p', 'Tente adivinhar o número entre 1 e 10');
}
exibirMensagemInicial();


function botaoChutar() {
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto) {
        alterarTextos('h1', 'Você acertou!!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        alterarTextos('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecreto) {
            alterarTextos('p', 'número secreto é menor.');
            alterarTextos('h1', 'tente de novo.');
        } else {
            alterarTextos('p', 'número secreto é maior.');
            alterarTextos('h1', 'tente de novo.');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if(quantidadeElementosLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}


function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}


function reiniciarJogo() {
    numeroSecreto = gerarNumero();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

