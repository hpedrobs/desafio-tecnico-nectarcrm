import { createStore } from 'vuex'

const state = {
    tasks: [],
}

const getters = {
    getTasks: (state) => state.tasks,
    getTaskById: (state) => (id) => state.tasks.find((t) => t.id === id),
    getTasksByStatus: (state) => (status) => {
        return state.tasks.filter((task) => task.status === status)
    },
    getDependencies: (state) => (taskId) => {
        const task = state.tasks.find((t) => t.id === taskId)
        return task ? task.dependencies : []
    },
    getTasksWithoutDependencies: (state) => (taskId) => {
        // Filtra as tarefas que não são dependências da tarefa especificada
        const task = state.tasks.find((t) => t.id === taskId)
        if (!task) return []

        return state.tasks.filter(
            (t) =>
                t.id !== taskId &&
                !t.dependencies.includes(taskId) &&
                !task.dependencies.includes(t.id)
        )
    },
    canTaskBeCompleted: (state) => (taskId) => {
        const task = state.tasks.find((t) => t.id === taskId)
        if (!task.dependencies) return true
        else if (!task) return false
        // Verifica se todas as dependências da tarefa estão concluídas
        return task.dependencies.every((depId) => {
            const depTask = state.tasks.find((t) => t.id === depId)
            return depTask ? depTask.status === 'Concluída' : false
        })
    },
}

const mutations = {
    addTask(state, task) {
        if (!task.name) return

        state.tasks.push({ ...task, dependencies: [] })
    },
    addDependency(state, { taskId, dependencyId }) {
        const task = state.tasks.find((t) => t.id === taskId)
        if (task && !task.dependencies.includes(dependencyId)) {
            task.dependencies.push(dependencyId)
        }
    },
    removeDependency(state, { taskId, dependencyId }) {
        const task = state.tasks.find((t) => t.id === taskId)
        if (task && Array.isArray(task.dependencies)) {
            const index = task.dependencies.indexOf(dependencyId)
            if (index !== -1) {
                task.dependencies.splice(index, 1)
            }
        }
    },
    editTask(state, updatedTask) {
        const index = state.tasks.findIndex(
            (task) => task.id === updatedTask.id
        )
        if (index !== -1) state.tasks.splice(index, 1, updatedTask)
    },
    deleteTask(state, taskId) {
        const index = state.tasks.findIndex((task) => task.id === taskId)
        if (index !== -1) {
            // Remover a tarefa das dependências de outras tarefas
            state.tasks.forEach((task) => {
                if (task.dependencies) {
                    const dependencyIndex = task.dependencies.indexOf(taskId)
                    if (dependencyIndex !== -1) {
                        task.dependencies.splice(dependencyIndex, 1)
                    }
                }
            })

            // Agora remover a tarefa da lista de tarefas
            state.tasks = state.tasks.filter((task) => task.id !== taskId)
        }
    },
}

const actions = {
    addTask({ commit }, task) {
        commit('addTask', task)
    },
    addDependency({ commit }, { taskId, dependencyId }) {
        commit('addDependency', { taskId, dependencyId })
    },
    removeDependency({ commit }, { taskId, dependencyId }) {
        commit('removeDependency', { taskId, dependencyId })
    },
    editTask({ commit }, task) {
        commit('editTask', task)
    },
    deleteTask({ commit }, taskId) {
        commit('deleteTask', taskId)
    },
}

const store = createStore({
    state,
    getters,
    mutations,
    actions,
})

export default store
