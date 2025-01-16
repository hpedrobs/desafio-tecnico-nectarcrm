<template>
    <v-container class="ma-0 pa-0">
        <v-row class="d-flex align-center mb-4" no-gutters>
            <v-col cols="12">
                <v-select v-model="selectedStatus" :items="statusOptions" label="Filtrar por Status"
                    @change="filterTasks"></v-select>
            </v-col>
        </v-row>

        <v-row class="ga-3" v-if="filteredTasks.length" no-gutters>
            <v-col cols="12" v-for="task in filteredTasks" :key="task.id">
                <TaskCard :task="task" @task-deleted="filterTasks" />
            </v-col>
        </v-row>

        <v-row v-else no-gutters>
            <v-col>
                Nenhuma tarefa encontrada para o status selecionado.
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import TaskCard from "./TaskCard.vue"

export default {
    components: {
        TaskCard,
    },
    data() {
        return {
            selectedStatus: "Todos",
            filteredTasks: [],
            statusOptions: ["Todos", "Pendente", "Em andamento", "Concluída"],
        }
    },
    computed: {
        ...mapGetters(["getTasks"]),
    },
    methods: {
        filterTasks() {
            if (this.selectedStatus === "Todos") {
                this.filteredTasks = this.getTasks
            } else {
                this.filteredTasks = this.getTasks.filter(task => task.status === this.selectedStatus)
            }
        },
    },
    watch: {
        selectedStatus() {
            this.filterTasks()
        },
    },
    mounted() {
        this.filterTasks()
    },
}
</script>
