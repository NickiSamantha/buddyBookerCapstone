import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import AOS from 'aos';
import 'aos/dist/aos.css';


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'



createApp(App).use(store).use(router).mount('#app')
AOS.init();