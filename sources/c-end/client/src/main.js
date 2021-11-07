import Vue from "vue";
// Inisialisasi SocketIO
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

// Instance SocketIO dengan koneksi ke server
const socket = io("http://localhost:3000");

Vue.config.productionTip = false;

Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
