<template>
    <v-card outlined>
        <v-card-title class="d-flex flex-row">
            {{ task.name }}

            <div class="d-flex align-center ml-auto">
                <div class="d-flex align-center" v-for="(depId, index) in task.dependencies" :key="depId">
                    <span class="text-subtitle-2">{{ getTaskById(depId)?.name }}</span>
                    <ChevronRightIcon v-if="index < task.dependencies.length - 1" style="height: 13px; width: 13px" />
                </div>
            </div>

        </v-card-title>
        <v-card-subtitle>{{ task.description }}</v-card-subtitle>
        <v-card-text>
            Status: <strong>{{ task.status }}</strong>
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" @click="openEditDialog">Editar</v-btn>
            <v-btn color="red" @click="openDeleteDialog">Excluir</v-btn>
            <v-btn color="blue" @click="openDependencyDialog">Gerenciar Dependências</v-btn>
        </v-card-actions>

        <!-- Dialog para editar a tarefa -->
        <v-dialog v-model="editDialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Editar Tarefa</span>
                </v-card-title>
                <v-card-subtitle>
                    <v-text-field v-model="edit.name" label="Nome da Tarefa" outlined dense />
                    <v-textarea v-model="edit.description" label="Descrição" outlined dense />
                    <v-select v-model="edit.status" :items="statusOptions" label="Status" outlined dense />
                </v-card-subtitle>
                <v-card-actions>
                    <v-btn color="grey" @click="closeEditDialog">Cancelar</v-btn>
                    <v-btn color="primary" @click="saveTask">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Dialog de confirmação para exclusão -->
        <v-dialog v-model="deleteDialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Confirmar Exclusão</span>
                </v-card-title>
                <v-card-subtitle>
                    Tem certeza de que deseja excluir esta tarefa?
                </v-card-subtitle>
                <v-card-actions>
                    <v-btn color="grey" @click="closeDeleteDialog">Cancelar</v-btn>
                    <v-btn color="red" @click="removeTask">Excluir</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Dialog para gerenciar dependências -->
        <v-dialog v-model="dependencyDialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Gerenciar Dependências</span>
                </v-card-title>
                <v-card-text>
                    <v-combobox v-model="selectedDependency" :items="availableDependencies" item-title="name"
                        item-value="id" label="Adicionar Dependência" outlined dense persistent-hint return-object
                        single-line multiple />

                    <div v-if="task.dependencies.length > 0">
                        <strong class="mb-3 d-block">Dependências Existentes:</strong>
                        <v-card class="mx-auto" max-width="100%" outlined>
                            <v-list>
                                <v-list-item v-for="depId in task.dependencies" :key="depId">
                                    <div class="d-flex justify-space-between align-center">
                                        {{ getTaskById(depId)?.name }}
                                        <v-btn @click="removeDependency({ taskId: task.id, dependencyId: depId })"
                                            variant="text">
                                            <XMarkIcon style="height: 20px; width: 20px" />
                                        </v-btn>
                                    </div>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </div>

                </v-card-text>
                <v-card-actions>
                    <v-btn color="grey" @click="closeDependencyDialog">Cancelar</v-btn>
                    <v-btn color="primary" :disabled="!selectedDependency"
                        @click="addSelectedDependency">Adicionar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { XMarkIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'

export default {
    components: {
        XMarkIcon,
        ChevronRightIcon,
    },
    props: ["task"],
    data() {
        return {
            edit: {
                name: "",
                description: "",
                status: "",
            },
            editDialog: false,
            deleteDialog: false,
            dependencyDialog: false,
            selectedDependency: null,
            statusOptions: ["Pendente", "Em andamento", "Concluída"],
        }
    },
    computed: {
        ...mapGetters({
            getTaskById: "getTaskById",
            getTasksWithoutDependencies: "getTasksWithoutDependencies",
        }),
        availableDependencies() {
            return this.getTasksWithoutDependencies(this.task.id)
        },
    },
    methods: {
        ...mapActions({
            editTask: "editTask",
            deleteTask: "deleteTask",
            addDependency: "addDependency",
            removeDependency: "removeDependency",
        }),
        openEditDialog() {
            const taskFromStore = this.getTaskById(this.task.id)
            if (taskFromStore) {
                this.edit = { ...taskFromStore }
                this.editDialog = true
            }
        },
        closeEditDialog() {
            this.editDialog = false
        },
        saveTask() {
            this.editTask({ id: this.task.id, ...this.edit })
            this.editDialog = false
        },
        openDeleteDialog() {
            this.deleteDialog = true
        },
        closeDeleteDialog() {
            this.deleteDialog = false
        },
        removeTask() {
            this.deleteTask(this.task.id)
            this.deleteDialog = false
            this.$emit("task-deleted")
        },
        openDependencyDialog() {
            this.dependencyDialog = true
        },
        closeDependencyDialog() {
            this.dependencyDialog = false
        },
        addSelectedDependency() {
            this.selectedDependency.forEach(dep => {
                this.addDependency({
                    taskId: this.task.id,
                    dependencyId: dep.id,
                })
                this.selectedDependency = null
                this.closeDependencyDialog()
            })
        },
        saveDependencies() {
            this.dependencyDialog = false
        },
    },
}
</script>

<style scoped></style>
