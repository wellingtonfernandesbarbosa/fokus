# Fokus

Fokus é um projeto fictício e sem fins comerciais desenvolvido como parte do curso na Alura. O projeto visa auxiliar na otimização da produtividade, permitindo que os usuários se concentrem nas tarefas importantes.

![Tela do Fokus](./imagens/screenshot.png)

## Conteúdo

- [Visão Geral](#visão-geral)
- [Como Usar](#como-usar)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do TypeScript](#configuração-do-typescript)
- [Instalação](#instalação)
- [Compilação](#compilação)
- [Licença](#licença)

## Visão Geral

O projeto consiste em uma aplicação web que oferece funcionalidades relacionadas à gestão do tempo, foco em tarefas e organização de atividades diárias. Ele inclui timers para diferentes contextos, uma lista de tarefas e opções para gerenciar e personalizar as atividades.

## Como Usar

1. Faça o download ou clone o repositório.
2. Abra o arquivo `index.html` em um navegador web.

## Tecnologias Utilizadas

- HTML
- CSS
- JavaScript
- [Reset CSS](https://meyerweb.com/eric/tools/css/reset/)
- [Google Fonts](https://fonts.google.com/)

## Configuração do TypeScript

O projeto utiliza o TypeScript para fornecer uma experiência de desenvolvimento mais robusta. Abaixo estão algumas das configurações do `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "commonjs",
    "strict": true,
    "noUnusedParameters": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noEmitOnError": true
  }
}
```

## Instalação

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina. Em seguida, execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

## Compilação

Para compilar o projeto TypeScript, utilize o seguinte comando:

```bash
npm --watch
```

Este comando irá transpilar os arquivos TypeScript para JavaScript de acordo com as configurações definidas no `tsconfig.json`.

## Licença

Este projeto é distribuído sob a [Licença MIT](LICENSE).
