import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueAwesomePaginate from "vue-awesome-paginate";
import ToastPlugin from 'vue-toast-notification';
import "vue-awesome-paginate/dist/style.css";
import 'vue-toast-notification/dist/theme-bootstrap.css';
import router from './router'
import './axios/axios.js'
import './style.css'
import App from './App.vue'

// createApp(App).mount('#app')

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueAwesomePaginate);
app.use(ToastPlugin);

app.mount('#app')