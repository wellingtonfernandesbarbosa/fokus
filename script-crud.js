const btnAdicionartarefa = document.querySelector(".app__button--add-task");
const formAdicionarTarefa = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");
const listaTarefas = document.querySelector(".app__section-task-list");
const btnCancelar = document.querySelector(".app__form-footer__button--cancel");
const tarefaEmAndamento = document.querySelector(".app__section-active-task-description");

const btnRemoverTodas = document.querySelector('#btn-remover-todas')
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
const atualizarTarefas = () => {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

const criarElementoTarefa = (tarefa) => {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000 svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
  `;
  const paragrafo = document.createElement("p");
  paragrafo.classList.add("app__section-task-list-item-description");
  paragrafo.textContent = `${tarefa.descricao}`;
  
  
  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");
  const imagemBotao = document.createElement("img");
  imagemBotao.setAttribute("src", "/imagens/edit.png");
  
  botao.addEventListener('click', () => {
    const novaDescricao = prompt("Qual a nova descrição da tarefa? ")
    if (novaDescricao) {
      tarefa.descricao = novaDescricao;
      paragrafo.textContent = novaDescricao;
      atualizarTarefas();
    }
  })
  
  botao.append(imagemBotao);
  li.append(svg);
  li.append(paragrafo);
  li.append(botao);

  if (tarefa.completa) {
    li.classList.remove('app__section-task-list-item-active');
    li.classList.add('app__section-task-list-item-complete');
    botao.setAttribute('disabled', true);
  } else {
    li.onclick = () => {
      tarefaEmAndamento.textContent = '';
      document.querySelectorAll('.app__section-task-list-item').forEach(element => {
        element.classList.remove("app__section-task-list-item-active")
      })
  
      if (tarefaSelecionada == tarefa) {
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
        return;
      }
  
      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;
      tarefaEmAndamento.textContent = tarefa.descricao;
      li.classList.add('app__section-task-list-item-active');
    }
  }


  return li;
};

btnAdicionartarefa.addEventListener("click", () => {
  formAdicionarTarefa.classList.toggle("hidden");
});

formAdicionarTarefa.addEventListener("submit", (event) => {
  event.preventDefault();
  const tarefa = { descricao: textArea.value };
  tarefas.push(tarefa);

  const elementoTarefa = criarElementoTarefa(tarefa);
  listaTarefas.append(elementoTarefa);

  atualizarTarefas();
  textArea.value = "";
  formAdicionarTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);
  listaTarefas.append(elementoTarefa);
});

btnCancelar.addEventListener('click', () => {
  textArea.value = "";
  formAdicionarTarefa.classList.add("hidden");
})

document.addEventListener('FocoFinalizado', () => {
  if (tarefaSelecionada && tarefaSelecionada) {
    liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
    liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
    liTarefaSelecionada.querySelector('button').setAttribute('disabled', true);
    tarefaSelecionada.completa = true;
    atualizarTarefas();
  }  
})

const removerTodasTarefas = (removerTodas) => {
  let seletor = ".app__section-task-list-item";
  if (removerTodas) {
    document.querySelectorAll(seletor).forEach(tarefa => tarefa.remove());
    tarefas = [];
  } else {
    seletor = ".app__section-task-list-item-complete";
    document.querySelectorAll(seletor).forEach(tarefa => tarefa.remove());
    tarefas = tarefas.filter(tarefa => !tarefa.completa)
  }
  atualizarTarefas();
}

btnRemoverConcluidas.onclick = () => removerTodasTarefas(false)
btnRemoverTodas.onclick = () => removerTodasTarefas(true);
