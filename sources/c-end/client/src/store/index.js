import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    // JANGAN menggunakan arrow function
    // karena nanti `this` nya bisa mengarah
    // pada Object yang salah

    // Mendengar event "connect" dari server
    socket_connect() {
      // Perhatikan di sini cara untuk mengakses $socket menjadi
      // berbeda, karena harus menggunakan tambahan _vm
      console.log("connected", this._vm.$socket);
    },
    // Mendengar event "disconnect" dari server
    socket_disconnect() {
      console.log("disconnected", this._vm.$socket);
    },
    // mendengar event "customEventFromServer" dari server
    // Karena di sini kita tidak menggunakan si context pada vuex action
    // maka context diganti _
    socket_customEventFromServer(_, payload) {
      console.log("customEventFromServer", payload);
    },
    // Karena di sini kita akan mengirimkan (emit)
    // dan tidak mendengar event
    // maka tidak menggunakan awalan / prefix socket_
    sendCustomEventToServer(_, payload) {
      this._vm.$socket.client.emit("customEventFromClient", payload);
    },
  },
  modules: {},
});
