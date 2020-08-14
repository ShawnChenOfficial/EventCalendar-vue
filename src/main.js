import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import bootstrap vue
import "bootstrap-vue/dist/bootstrap-vue.css";
import { BootstrapVue } from "bootstrap-vue";
import { BadgePlugin } from "bootstrap-vue";
import { IconsPlugin } from "bootstrap-vue";
import { CardPlugin } from "bootstrap-vue";
import { FormPlugin } from "bootstrap-vue";
import { ToastPlugin } from "bootstrap-vue";
//pdf gen
import htmlToPdf from "./utils/pdf_gen.js";
//import other utils

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(BadgePlugin);
Vue.use(IconsPlugin);
Vue.use(CardPlugin);
Vue.use(FormPlugin);
Vue.use(ToastPlugin);

//use pdf gen
Vue.use(htmlToPdf);
//use other public utils
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
