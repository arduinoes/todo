import { createApp } from 'vue'
import App from './App.vue'
import { supabase } from './lib/supabase'
import { userSession } from '@/vuetils/useAuth'
import './assets/tailwind.css'

createApp(App).mount('#app')

supabase.auth.onAuthStateChange((event, session) => {
  userSession.value = session
})
