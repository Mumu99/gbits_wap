import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "./router";
// 引入样式重置
import "./style/reset.css";
import "./style/jq.css";

import * as API from "./api";
// Vue.prototype.$bus = new Vue();
Vue.prototype.$API = API;
Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  render: h => h(App)
}).$mount("#app");
