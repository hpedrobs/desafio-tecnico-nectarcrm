import { describe, beforeEach, it, expect } from 'vitest'
import store from '@/store'
import { randomUUID } from 'crypto'

describe('Excluir Tarefa', () => {
    beforeEach(() => {
        store.replaceState({
            tasks: [],
        })
    })

    it('deve excluir uma tarefa com sucesso', () => {
        const task = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste.',
            status: 'Pendente',
        }

        store.dispatch('addTask', task)

        store.dispatch('deleteTask', task.id)

        const taskFromStore = store.getters.getTaskById(task.id)
        expect(taskFromStore).toBeUndefined()
    })

    it('não deve excluir uma tarefa que não existe', () => {
        const noTaskId = randomUUID()

        store.dispatch('deleteTask', noTaskId)

        const tasks = store.getters.getTasks
        expect(tasks).toHaveLength(0)
    })
})
