<script setup lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { ref } from 'vue'
import Todo from '@/components/Todo.vue'
import { allTodos, fetchTodos, addTodo } from '@/vuetils/useTodo'
import { userSession } from '@/vuetils/useAuth'

await fetchTodos()

const task = ref('')

async function insertTask() {
  // Guard for short task descriptions which will fail db policy.
  if (task.value.length <= 3) {
    alert('Please make your task a little more descriptive')
    return
  }
  // Type check to ensure user is still logged in.
  if (userSession?.value === null) {
    alert('Please log in again')
    return
  }
  try {
    // Try and write the data to the database.
    const todo = await addTodo({ user_id: userSession.value.user.id, task: task.value })

    // If there was no response, don't do anything.
    if (!todo) {
      return
    }
    // Otherwise, push the response into allTodos.
    allTodos.value.push(todo)

    // Reset input field.
    task.value = ''
  } catch (err) {
    console.error('Unknown error when adding todo', err)
  }
}
</script>

<template>
  <div class="w-full">
    <h1 class="mb-12 text-center font-bold text-6xl">Mis Tareas</h1>
    <div class="flex gap-2 my-2">
      <input
        v-model="task"
        class="rounded w-full p-2"
        type="text"
        placeholder="Cosas que debo de hacer"
      />
      <button @click="insertTask()" class="btn-black">
        Añadir
      </button>
    </div>

    <div class="bg-white shadow overflow-hidden rounded-md">
      <ul v-for="(todo, index) in allTodos" :key="index">
        <Todo :todo="todo" />
      </ul>
    </div>
  </div>
</template>


