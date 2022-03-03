import {createApp} from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import router from "./router";
import {UseComponent} from "./components";

export const app = createApp(App)
app.use(ElementPlus)
app.use(router)

UseComponent(app)

app.mount('#app')
