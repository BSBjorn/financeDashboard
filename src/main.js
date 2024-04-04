import { createApp } from "vue";
import "@fontsource-variable/nunito-sans";
import "./style.css";

import router from "./router.js";
import App from "./App.vue";

createApp(App).use(router).mount("#app");
