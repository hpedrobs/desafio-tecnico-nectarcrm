import { describe, beforeEach, it, expect } from 'vitest'
import store from '@/store'
import { randomUUID } from 'crypto'

describe('Editar Tarefa', () => {
    beforeEach(() => {
        store.replaceState({
            tasks: [],
        })
    })

    it('deve editar uma tarefa com sucesso', () => {
        const task = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste.',
            status: 'Pendente',
        }

        store.dispatch('addTask', task)

        const updatedTask = {
            ...task,
            name: 'Tarefa 1 atualizada.',
            status: 'Concluída',
        }

        store.dispatch('editTask', updatedTask)

        const taskFromStore = store.getters.getTaskById(task.id)
        expect(taskFromStore).toEqual(updatedTask)
    })

    it('não deve editar uma tarefa que não existe', () => {
        const updatedTask = {
            id: randomUUID(),
            name: 'Tarefa inexistente',
            description: 'Esta tarefa não existe.',
            status: 'Pendente',
        }

        store.dispatch('editTask', updatedTask)

        const taskFromStore = store.getters.getTaskById(updatedTask.id)
        expect(taskFromStore).toBeUndefined()
    })
})
