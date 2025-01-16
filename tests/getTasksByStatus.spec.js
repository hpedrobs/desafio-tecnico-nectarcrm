import { describe, beforeEach, it, expect } from 'vitest'
import store from '@/store'
import { randomUUID } from 'crypto'

describe('Listar Tarefas por Status', () => {
    beforeEach(() => {
        store.replaceState({
            tasks: [],
        })
    })

    it('deve listar todas as tarefas com status "Pendente"', () => {
        const task1 = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste 1.',
            status: 'Pendente',
            dependencies: [],
        }
        const task2 = {
            id: randomUUID(),
            name: 'Tarefa 2',
            description: 'Tarefa Teste 2.',
            status: 'Concluída',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        const tasksPendente = store.getters.getTasksByStatus('Pendente')
        expect(tasksPendente).toHaveLength(1)
        expect(tasksPendente[0]).toEqual(task1)
    })

    it('deve listar todas as tarefas com status "Concluída"', () => {
        const task1 = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste 1.',
            status: 'Pendente',
            dependencies: [],
        }
        const task2 = {
            id: randomUUID(),
            name: 'Tarefa 2',
            description: 'Tarefa Teste 2.',
            status: 'Concluída',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        const tasksConcluida = store.getters.getTasksByStatus('Concluída')
        expect(tasksConcluida).toHaveLength(1)
        expect(tasksConcluida[0]).toEqual(task2)
    })

    it('deve listar todas as tarefas com status "Em andamento"', () => {
        const task1 = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste 1.',
            status: 'Em andamento',
            dependencies: [],
        }
        const task2 = {
            id: randomUUID(),
            name: 'Tarefa 2',
            description: 'Tarefa Teste 2.',
            status: 'Concluída',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        const tasksEmAndamento = store.getters.getTasksByStatus('Em andamento')
        expect(tasksEmAndamento).toHaveLength(1)
        expect(tasksEmAndamento[0]).toEqual(task1)
    })

    it('deve retornar uma lista vazia quando não houver tarefas com o status "Em andamento"', () => {
        const task1 = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste 1.',
            status: 'Pendente',
            dependencies: [],
        }
        const task2 = {
            id: randomUUID(),
            name: 'Tarefa 2',
            description: 'Tarefa Teste 2.',
            status: 'Concluída',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        const tasksEmAndamento = store.getters.getTasksByStatus('Em andamento')
        expect(tasksEmAndamento).toHaveLength(0)
    })
})
