<template>
    <v-btn @click="dialog = true" variant="tonal" color="primary">
        Nova Tarefa
    </v-btn>

    <v-dialog v-model="dialog" width="auto">
        <v-card width="500" title="Nova Tarefa">
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="task.name" label="Nome*" :rules="[rules.required]" required />
                    <v-textarea v-model="task.description" label="Descrição" rows="1" />
                    <v-select v-model="task.status" :items="status" label="Status*" :rules="[rules.required]"
                        required />
                </v-form>

                <small class="text-caption text-medium-emphasis">
                    *indica campo obrigatório
                </small>
            </v-card-text>
            <v-divider></v-divider>
            <template v-slot:actions>
                <v-btn text="Fechar" variant="plain" @click="dialog = false" />
                <v-btn text="Criar" variant="tonal" color="primary" :disabled="!valid" @click="handleAddTask" />
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            dialog: false,
            valid: false,
            task: {
                name: '',
                description: '',
                status: 'Pendente'
            },
            status: ["Pendente", "Em andamento", "Concluída"],
            rules: {
                required: (value) => !!value || 'Campo obrigatório',
            },
        }
    },
    computed: {
        ...mapGetters(["getTasks"]),
    },
    methods: {
        ...mapActions(['addTask']),
        handleAddTask() {
            if (this.$refs.form.validate()) {
                const id = this.getTasks.length + 1
                const newTask = { id, ...this.task }
                this.addTask(newTask)
                this.resetForm()
                this.dialog = false
            }
        },
        resetForm() {
            this.task = {
                name: '',
                description: '',
                status: 'Pendente',
            }
            this.$refs.form.resetValidation()
        },
    },
}
</script>
