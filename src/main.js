import {createApp} from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import router from "./router";
import {UseComponent} from "./components";
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css'
// import uploader from 'vue-simple-uploader'


export const app = createApp(App)
app.use(ElementPlus)
app.use(router)
// app.use(uploader)
UseComponent(app)

app.mount('#app')
