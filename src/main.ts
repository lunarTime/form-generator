import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/app/providers/router'
import store from '@/entities/form/model/store'
import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
