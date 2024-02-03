"use strict";
let estadoInicial = {
    tarefas: [],
    tarefaSelecionada: null,
    editando: false
};
const selecionarTarefa = (estado, tarefa) => {
    return {
        ...estado,
        tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa
    };
};
const adicionarTarefa = (estado, tarefa) => {
    return {
        ...estado,
        tarefas: [...estado.tarefas, tarefa]
    };
};
const deletar = (estado) => {
    if (estado.tarefaSelecionada) {
        const tarefas = estado.tarefas.filter(tarefa => tarefa != estado.tarefaSelecionada);
        return { ...estado, tarefas, tarefaSelecionada: null, editando: false };
    }
    else {
        return estado;
    }
};
const deletarTodas = (estado) => {
    return { ...estado, tarefas: [], tarefaSelecionada: null, editando: false };
};
const deletarTodasConcluidas = (estado) => {
    const tarefas = estado.tarefas.filter(tarefa => tarefa.concluida == false);
    return { ...estado, tarefas, tarefaSelecionada: null, editando: false };
};
const editarTarefa = (estado, tarefa) => {
    return { ...estado, editando: !estado.editando, tarefaSelecionada: tarefa };
};
const atualizarTarefa = (estado, descricao) => {
    const tarefas = estado.tarefas.map(tarefa => {
        if (tarefa.descricao == estado.tarefaSelecionada?.descricao) {
            tarefa.descricao = descricao;
        }
        return tarefa;
    });
    return { ...estado, tarefas, tarefaSelecionada: null, editando: false };
};
const atualizarUI = () => {
    const taskIconSvg = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF" />
        <path
            d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
            fill="#01080E" />
    </svg>
  `;
    const ulTask = document.querySelector('.app__section-task-list');
    const formAddTask = document.querySelector('.app__form-add-task');
    const btnAddTask = document.querySelector('.app__button--add-task');
    const textarea = document.querySelector('.app__form-textarea');
    const labelTarefaAtiva = document.querySelector('.app__section-active-task-description');
    const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
    const btnDeleteTask = document.querySelector('.app__form-footer__button--delete');
    const btnDeletarConcluidas = document.querySelector('#btn-remover-concluidas');
    const btnDeletarTodas = document.querySelector('#btn-remover-todas');
    textarea.textContent = estadoInicial.tarefaSelecionada ? estadoInicial.tarefaSelecionada.descricao : null;
    if (ulTask) {
        ulTask.innerHTML = '';
    }
    if (!btnAddTask) {
        throw new Error('Botão de adicionar tarefa não encontrado');
    }
    if (!btnDeleteTask) {
        throw new Error('Botão de deletar não foi encontrado');
    }
    if (!formAddTask) {
        throw Error('Formulário não encontrado');
    }
    if (!textarea) {
        throw new Error('Textarea não encontrada');
    }
    if (!labelTarefaAtiva) {
        throw new Error('Campo de tarefa selecionada não encontrado');
    }
    if (!btnCancelar) {
        throw Error('Botão cancelar não encontrado');
    }
    if (!btnDeletarConcluidas) {
        throw Error('Botão deletar tarefas concluídas não encontrado');
    }
    if (!btnDeletarTodas) {
        throw Error('Botão deletar todas as tarefas não encontrado');
    }
    if (estadoInicial.editando && estadoInicial.tarefaSelecionada) {
        formAddTask.classList.remove('hidden');
        textarea.value = estadoInicial.tarefaSelecionada.descricao;
    }
    else {
        formAddTask.classList.add('hidden');
        textarea.value = '';
    }
    btnAddTask.onclick = () => {
        formAddTask.classList.toggle('hidden');
    };
    btnDeleteTask.onclick = () => {
        estadoInicial = deletar(estadoInicial);
        formAddTask.classList.add('hidden');
        atualizarUI();
    };
    btnCancelar.onclick = () => {
        formAddTask.classList.add('hidden');
        textarea.value = '';
    };
    btnDeletarConcluidas.onclick = () => {
        estadoInicial = deletarTodasConcluidas(estadoInicial);
        atualizarUI();
    };
    btnDeletarTodas.onclick = () => {
        estadoInicial = deletarTodas(estadoInicial);
        atualizarUI();
    };
    formAddTask.onsubmit = (event) => {
        event.preventDefault();
        let descricao = textarea.value;
        if (!estadoInicial.editando) {
            estadoInicial = adicionarTarefa(estadoInicial, {
                descricao,
                concluida: false
            });
        }
        else if (estadoInicial.editando) {
            estadoInicial = atualizarTarefa(estadoInicial, descricao);
        }
        atualizarUI();
    };
    estadoInicial.tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item');
        const svgIcon = document.createElement('svg');
        svgIcon.innerHTML = taskIconSvg;
        const paragraph = document.createElement('p');
        paragraph.classList.add('app__section-task-list-item-description');
        paragraph.textContent = tarefa.descricao;
        const button = document.createElement('button');
        button.classList.add('app_button-edit');
        const editIcon = document.createElement('img');
        editIcon.setAttribute('src', '/imagens/edit.png');
        button.appendChild(editIcon);
        if (tarefa.concluida) {
            button.setAttribute('disabled', 'true');
            li.classList.add('app__section-task-list-item-complete');
        }
        button.onclick = () => {
            textarea.value = tarefa.descricao;
            formAddTask.classList.remove('hidden');
        };
        if (tarefa == estadoInicial.tarefaSelecionada) {
            if (!tarefa.concluida) {
                li.classList.add('app__section-task-list-item-active');
            }
        }
        li.appendChild(svgIcon);
        li.appendChild(paragraph);
        li.appendChild(button);
        li.addEventListener('click', () => {
            estadoInicial = selecionarTarefa(estadoInicial, tarefa);
            atualizarUI();
        });
        li.onclick = () => {
            if (!tarefa.concluida) {
                labelTarefaAtiva.textContent = tarefa.descricao;
            }
        };
        editIcon.onclick = (event) => {
            if (!tarefa.concluida) {
                event.stopPropagation();
                estadoInicial = editarTarefa(estadoInicial, tarefa);
                atualizarUI();
            }
        };
        ulTask?.appendChild(li);
    });
};
document.addEventListener("FocoFinalizado", () => {
    if (estadoInicial.tarefaSelecionada) {
        estadoInicial.tarefaSelecionada.concluida = true;
        atualizarUI();
    }
});
atualizarUI();
