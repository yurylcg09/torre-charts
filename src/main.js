import Vue from "vue";
import App from "./App.vue";
//import "@/assets/css/tailwind.css";
import Chart from "chart.js";
import Chartick from "vue-chartkick";
import { VueSpinners } from "@saeris/vue-spinners";

Vue.use(VueSpinners);
Vue.use(Chartick.use(Chart));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
