import { supabase } from '@/lib/supabase'
import type { Todo } from '../types/global'
import { ref } from 'vue'

const allTodos = ref<Todo[]>([])

// Función obtener tareas
async function fetchTodos() {
  try {
    const { data: todos, error } = await supabase.from('todos').select('*').order('id')

    if (error) {
      console.log('error', error)
      return
    }
    // handle for when no todos are returned
    if (todos === null) {
      allTodos.value = []
      return
    }
    // store response to allTodos
    allTodos.value = todos
    console.log('got todos!', allTodos.value)
  } catch (err) {
    console.error('Error retrieving data from db', err)
  }
}

// Añadir tarea
async function addTodo(todo: Todo): Promise<null | Todo> {
  try {
    const { data, error } = await supabase.from('todos').insert(todo).single()

    if (error) {
      alert(error.message)
      console.error('There was an error inserting', error)
      return null
    }

    console.log('created a new todo')
    return data
  } catch (err) {
    alert('Error')
    console.error('Unknown problem inserting to db', err)
    return null
  }
}

// Marcar tarea realizada
async function updateTaskCompletion(todo: Todo, isCompleted: boolean) {
  try {
    const { error } = await supabase
      .from('todos')
      .update({ is_complete: isCompleted })
      .eq('id', todo.id)
      .single()

    if (error) {
      alert(error.message)
      console.error('There was an error updating', error)
      return
    }

    console.log('Updated task', todo.id)
  } catch (err) {
    alert('Error')
    console.error('Unknown problem updating record', err)
  }
}

// Eliminar tarea
async function deleteTodo(todo: Todo) {
  try {
    await supabase.from('todos').delete().eq('id', todo.id)
    console.log('deleted todo', todo.id)
  } catch (error) {
    console.error('error', error)
  }
}

export { 
  allTodos, 
  fetchTodos, 
  addTodo, 
  updateTaskCompletion, 
  deleteTodo 
}
