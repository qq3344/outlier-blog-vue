import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import BreakPoint from './utils/break-point'

console.log(BreakPoint)

const store = createPinia()
const app = createApp(App)
app.use(store)
app.use(BreakPoint)
app.mount('#app')
