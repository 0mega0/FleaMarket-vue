import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Http from "./api";

Vue.config.productionTip = false;
Vue.prototype.$Http = Http;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
  
});
