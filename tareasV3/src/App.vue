<script setup lang="ts">
// Módulos Vue
import { computed } from 'vue'
// Componentes
import Auth from '@/components/Auth.vue'
import PasswordReset from '@/components/PasswordReset.vue'
import TodoList from '@/components/TodoList.vue'
import Loading from '@/components/Loading.vue'
import Footer from '@/components/Footer.vue'
// Utilidades
import { getParameterByName } from './lib/helpers' 
import { userSession, handleLogout } from '@/vuetils/useAuth'

const showPasswordReset = computed(() => {
  const requestType = getParameterByName("type", location.href);
  return requestType === "recovery";
});

</script>
<template>
  <div id="app" class="w-full h-full flex flex-col justify-center bg-gray-300">
    <div
      v-if="showPasswordReset"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <PasswordReset />
    </div>
    <div
      v-else-if="userSession === null"
      class="w-full h-full flex flex-col justify-center items-center p-4"
    >
      <Auth />
    </div>
    <div v-else class="w-full h-full flex flex-col justify-center items-center p-4 max-w-sm m-auto">
      <Suspense>
        <template #default>
          <div>
            <TodoList />
            <button class="btn-black w-full mt-12" @click="handleLogout">
              Cerrar sesión
            </button>
          </div>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
    </div>
    <Footer />
  </div>
</template>


