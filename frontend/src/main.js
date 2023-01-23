import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'normalize.css'
import './style.css'
import App from './App.vue'
import router from './routes'


const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.use(router);
app.use(pinia)
app.mount('#app')
