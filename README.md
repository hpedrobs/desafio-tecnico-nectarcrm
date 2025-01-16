# Desafio Técnico NectarCRM

Este projeto consiste no desenvolvimento de um sistema de gerenciamento de tarefas, com foco em performance, manutenibilidade e escalabilidade, utilizando **Vue.js**. A aplicação permite criar, editar, excluir e gerenciar tarefas com dependências visuais, além de aplicar filtros para facilitar a organização.

## Funcionalidades

-   **Gerenciamento de Tarefas**

    -   Criar tarefas com os campos:
        -   Nome (obrigatório)
        -   Descrição (opcional)
        -   Status: Pendente, Em Andamento, Concluída
    -   Editar tarefas: Nome, descrição e status.
    -   Excluir tarefas.

-   **Listagem e Filtros**

    -   Listar todas as tarefas.
    -   Filtro por status (pendente, em andamento, concluída).

-   **Gestão de Dependências**

    -   Permitir até 3 níveis de dependências entre tarefas.
    -   Vincular tarefas existentes ou criar novas como dependências/sub-dependências.
    -   Concluir uma tarefa apenas quando todas as suas dependências estiverem concluídas.
    -   Visualização gráfica das dependências (diagrama simples com setas).

-   **Atualizações Dinâmicas**

    -   Marcar tarefas como concluídas com atualização automática do status.

-   **Testes Unitários**
    -   Testes criados com **Jest** para garantir o funcionamento correto dos componentes e da lógica de dependências.

## Estrutura do Projeto

O projeto foi desenvolvido com foco em boas práticas de arquitetura, separação de responsabilidades e organização modular. A hierarquia de componentes foi otimizada para garantir performance e facilitar a escalabilidade da aplicação.

### Principais Diretórios

-   `src/components`: Contém os componentes reutilizáveis da aplicação.
-   `src/views`: Contém as páginas principais.
-   `src/store`: Implementação do gerenciamento de estado com Vuex.
-   `tests/unit`: Contém os testes unitários.

## Tecnologias Utilizadas

-   **Frontend**: Vue.js
-   **Testes**: Jest
-   **Gerenciamento de Estado**: Vuex
-   **Estilização**: Vuetify (UI Framework)

## Requisitos

-   Node.js (versão 16 ou superior)
-   npm

## Instalação e Configuração

### Clonar o Repositório

```sh
git clone https://github.com/hpedrobs/desafio-tecnico-nectarcrm.git
cd desafio-tecnico-nectarcrm
```

### Instalar Dependências

```sh
npm install
```

### Rodar o Projeto em Ambiente de Desenvolvimento

```sh
npm run dev
```

### Gerar Build para Produção

```sh
npm run build
```

### Executar Testes Unitários

```sh
npm run test
```
