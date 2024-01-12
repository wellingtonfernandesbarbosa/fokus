const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const toggleMusica = document.querySelector('.toggle-checkbox');
const startStopBt = document.querySelector('#start-pause');
const textTimer = document.querySelector('#text-timer');
const simbolTimer = document.querySelector('.app__card-primary-butto-icon');
const timer = document.querySelector('#timer');
const sessaoTarefa = document.querySelector('.app__section-task-content');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;
const playSong = new Audio('./sons/play.wav');
const pauseSong = new Audio('./sons/pause.mp3');
const timerSong = new Audio('./sons/beep.mp3');

let tempoInicial = 1500;
let intervalId = null;

function zerarInterval() {
  clearInterval(intervalId);
  intervalId = null;
}

const contagemRegressiva = () => {
  mostrarTimer();
  if (tempoInicial > 0) {
    tempoInicial--;
    return;
  } else {
    if (html.getAttribute('data-contexto') == 'foco'){
      const event = new CustomEvent('FocoFinalizado');
      document.dispatchEvent(event);
    }
    timerSong.play();
    textTimer.textContent = 'Começar';
    simbolTimer.setAttribute("src", "./imagens/play_arrow.png");
    zerarInterval();
    return;
  }
}

startStopBt.addEventListener('click', () => {
  if (intervalId) {
    pauseSong.play();
    textTimer.textContent = 'Começar';
    simbolTimer.setAttribute('src', './imagens/play_arrow.png')
    zerarInterval();
    return;
  }

  if (tempoInicial == 0) {
    tempoInicial = 1500;
  }

  playSong.play();
  textTimer.textContent = "Pausar";
  simbolTimer.setAttribute("src", "./imagens/pause.png");
  intervalId = setInterval(contagemRegressiva, 1000);
})


focoBt.addEventListener('click', () => {
  tempoInicial = 1500;
  alterarContexto('foco');
  focoBt.classList.add('active');
  sessaoTarefa.classList.remove('hidden');
});

curtoBt.addEventListener('click', () => {
  tempoInicial = 300;
  alterarContexto('descanso-curto');
  curtoBt.classList.add('active');
  sessaoTarefa.classList.add('hidden');
});

longoBt.addEventListener('click', () => {
  tempoInicial = 900;
  alterarContexto('descanso-longo')
  longoBt.classList.add('active');
  sessaoTarefa.classList.add('hidden');
});

function alterarContexto(contexto) {
  mostrarTimer();
  html.setAttribute('data-contexto', contexto);
  imagem.setAttribute('src', `./imagens/${contexto}.png`);

  botoes.forEach((botao) => {
    botao.classList.remove('active')
  })

  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `
      Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `
      break;

    case 'descanso-curto':
      titulo.innerHTML = `
      Que tal dar uma respirada?<br />
      <strong class="app__title-strong">Faça uma pausa curta!
      `
      break;
    
    case 'descanso-longo':
      titulo.innerHTML = `
      Hora de voltar à superfície.<br />
      <strong class="app__title-strong">Faça uma pausa longa.`
      break;
    
    default:
      break;
  }
}

toggleMusica.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
})

const mostrarTimer = () => {
  const time = new Date(tempoInicial  * 1000);
  const formattedTime = time.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  timer.innerHTML = `${formattedTime}`
}

mostrarTimer();