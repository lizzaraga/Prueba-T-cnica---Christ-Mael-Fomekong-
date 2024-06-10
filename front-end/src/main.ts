import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from "./app.router.ts";
import Axios from 'axios'

Axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL


createApp(App)
    .use(router)
    .mount('#app')
