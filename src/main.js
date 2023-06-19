import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "./assets/styles.scss";
import "ant-design-vue/dist/antd.css";
createApp(App).use(router).use(store).mount("#app");
