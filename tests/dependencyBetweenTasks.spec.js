import { describe, beforeEach, it, expect } from 'vitest'
import store from '@/store'
import { randomUUID } from 'crypto'

describe('Dependências entre Tarefas', () => {
    beforeEach(() => {
        store.replaceState({
            tasks: [],
        })
    })

    it('deve adicionar uma tarefa como dependente de outra', () => {
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
            status: 'Pendente',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        store.dispatch('addDependency', {
            taskId: task1.id,
            dependencyId: task2.id,
        })

        const dependencies = store.getters.getDependencies(task1.id)
        expect(dependencies).toHaveLength(1)
        expect(dependencies[0]).toEqual(task2.id)
    })

    it('deve verificar se a tarefa pode ser concluída quando todas as dependências estiverem concluídas', () => {
        const task1 = {
            id: randomUUID(),
            name: 'Tarefa 1',
            description: 'Tarefa Teste 1',
            status: 'Pendente',
            dependencies: [],
        }
        const task2 = {
            id: randomUUID(),
            name: 'Task 2',
            description: 'Tarefa Teste 2',
            status: 'Concluída',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        store.dispatch('addDependency', {
            taskId: task1.id,
            dependencyId: task2.id,
        })

        const canComplete = store.getters.canTaskBeCompleted(task1.id)
        expect(canComplete).toBe(true)
    })

    it('não deve permitir que uma tarefa seja concluída se a dependência estiver pendente', () => {
        const task1 = {
            id: randomUUID(),
            name: 'Task 1',
            description: 'Tarefa Teste 1',
            status: 'Pendente',
            dependencies: [],
        }
        const task2 = {
            id: randomUUID(),
            name: 'Task 2',
            description: 'Tarefa Teste 2',
            status: 'Pendente',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        store.dispatch('addDependency', {
            taskId: task1.id,
            dependencyId: task2.id,
        })

        const canComplete = store.getters.canTaskBeCompleted(task1.id)
        expect(canComplete).toBe(false)
    })

    it('deve remover uma dependência de uma tarefa', () => {
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
            status: 'Pendente',
            dependencies: [],
        }

        store.dispatch('addTask', task1)
        store.dispatch('addTask', task2)

        store.dispatch('addDependency', {
            taskId: task1.id,
            dependencyId: task2.id,
        })

        let dependencies = store.getters.getDependencies(task1.id)
        expect(dependencies).toHaveLength(1)
        expect(dependencies[0]).toEqual(task2.id)

        store.dispatch('removeDependency', {
            taskId: task1.id,
            dependencyId: task2.id,
        })

        dependencies = store.getters.getDependencies(task1.id)
        expect(dependencies).toHaveLength(0)
    })
})
