<template>
  <div class="container p-4 min-w-full min-h-screen bg-gray-200">
    <!-- Tambahkan router-view di sini -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  sockets: {
    // Untuk mendengarkan ketika ada event "connect / connection" dari server
    connect: function () {
      console.log("connected", this.$socket);
    },
    // Untuk mendengarkan ketika ada event "disconnect / disconnection" dari server
    disconnect: function () {
      console.log("disconnected", this.$socket);
    },
  },
};
</script>

<style></style>
