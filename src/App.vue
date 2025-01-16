<template>
    <v-container class="d-flex flex-column align-start ga-3">
        <AddTask />
        <TaskList />
    </v-container>
</template>

<script>
import AddTask from '@/components/AddTask.vue'
import TaskList from '@/components/TaskList.vue'

export default {
    components: {
        AddTask,
        TaskList
    }
}
</script>
