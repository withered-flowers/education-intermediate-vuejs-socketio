<template>
  <div class="container p-4 min-w-full min-h-screen bg-gray-200">
    <!-- Tambahkan router-view di sini -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  // Comment dari sini karena akan dipindahkan ke VueX Store
  // sockets: {
  //   // Untuk mendengarkan ketika ada event "connect / connection" dari server
  //   connect: function () {
  //     console.log("connected", this.$socket);
  //   },
  //   // Untuk mendengarkan ketika ada event "disconnect / disconnection" dari server
  //   disconnect: function () {
  //     console.log("disconnected", this.$socket);
  //   },
  //   // Untuk mendengarkan ketika ada custom event "customEvent" dari server
  //   customEventFromServer: function (payload) {
  //     console.log("customEventFromServer", payload);
  //   },
  // },
  // // Misalnya di sini kita menggunakan lifecycle created untuk mengirimkan event
  // // "customEventFromClient" ke server
  // created() {
  //   this.$socket.client.emit("customEventFromClient", {
  //     message: "Halo from client",
  //   });
  // },

  created() {
    this.$store.dispatch("sendCustomEventToServer", {
      message: "Halo from client",
    });
  },
};
</script>

<style></style>
