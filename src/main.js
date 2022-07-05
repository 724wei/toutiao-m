import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import ToutiaoIcon from "@/components/TouTiaoIcon.vue";
import Vant from "vant";
import "vant/lib/index.less";
import "amfe-flexible";

Vue.use(Vant);
Vue.component("ToutiaoIcon", ToutiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
