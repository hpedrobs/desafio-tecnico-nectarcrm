import { describe, beforeEach, it, expect } from 'vitest'
import store from '@/store'
import { randomUUID } from 'crypto'

describe('Adicionar Tarefa', () => {
    beforeEach(() => {
        store.replaceState({
            tasks: [],
        })
    })

    it('deve adicionar uma tarefa com sucesso', () => {
        const newTask = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Teste Tarefa.',
            status: 'Pendente',
            dependencies: [],
        }

        store.dispatch('addTask', newTask)

        const task = store.getters.getTaskById(newTask.id)
        expect(task).toEqual(newTask)
    })

    it('não deve adicionar uma tarefa sem um nome', () => {
        const invalidTask = {
            name: '',
            description: 'Tarefa Inválida.',
            status: 'Pendente',
        }

        store.dispatch('addTask', invalidTask)

        const tasks = store.getters.getTasks
        expect(tasks).toHaveLength(0)
    })
})
