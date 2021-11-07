<template>
  <!-- Home Page -->
  <div class="home-page">
    <!-- NavBar Section -->
    <nav
      class="
        bg-blue-100
        min-w-full
        rounded-full
        py-2
        px-4
        shadow-xl
        flex flex-row
        justify-between
      "
    >
      <!-- Left NavBar -->
      <h1 class="text-xl font-semibold ml-2">Maricet</h1>
      <!-- Right NavBar -->
      <div class="my-auto mr-2 flex flex-row gap-2">
        <h1>
          Welcome, <span class="font-semibold text-sm">{{ currentUser }}</span>
        </h1>
        <a href="#" class="underline text-blue-500" @click="logoutHandler"
          >Logout</a
        >
      </div>
    </nav>
    <!-- End of NavBar Section -->

    <!-- Content Section -->
    <div class="flex flex-rows gap-2 mt-4 min-h-minus-nav">
      <!-- Left Channel -->
      <div class="bg-yellow-100 p-2 shadow-md rounded-md w-3/12">
        <h1 class="font-semibold border-2 border-gray-400 rounded-xl p-2 mb-4">
          List of Channel
        </h1>
        <ul class="border-2 p-2 border-gray-400 rounded-xl">
          <li class="font-semibold text-blue-500">Channel 1</li>
          <li>Channel 2</li>
          <li>Channel 3</li>
        </ul>
      </div>

      <!-- Right Chat Log -->
      <div class="bg-green-100 p-2 shadow-md rounded-md w-9/12">
        <h1 class="font-semibold border-2 border-gray-400 rounded-xl p-2 mb-4">
          ChatBox - [Channel No]
        </h1>
        <div class="flex flex-col" style="height: 81vh">
          <div
            class="
              border-2 border-gray-400
              rounded-xl
              p-2
              mb-2
              h-5/6
              overflow-auto
              flex flex-col
            "
          >
            <!-- Chat Content -->
            <!-- <div class="p-4 min-w-full text-right">
              <div class="font-semibold">Name1</div>
              <div>Chat1</div>
            </div>
            <div class="p-4 min-w-full text-left">
              <div class="font-semibold">Name2</div>
              <div>Chat2</div>
            </div>
            <div class="p-4 min-w-full text-right">
              <div class="font-semibold">Name1</div>
              <div>Chat3</div>
            </div> -->
            <div
              class="p4-min-w-full"
              :class="[chat.user === currentUser ? 'text-right' : 'text-left']"
              v-for="(chat, idx) in chats"
              :key="chat.user + idx"
            >
              <div class="font-semibold">{{ chat.user }}</div>
              <div>{{ chat.message }}</div>
            </div>
          </div>
          <div class="border-2 border-gray-400 rounded-xl p-2 h-1/6">
            <textarea
              class="
                resize-none
                border-2 border-gray-200
                rounded-xl
                min-w-full min-h-full
                p-2
                focus:outline-none focus:ring focus:border-blue-200
              "
              v-model="chatMessage"
              placeholder="Insert chat here and press enter"
              @keyup.enter="sendMessage"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- End of Content Section -->
  </div>
  <!-- End of Home Page -->
</template>

<script>
export default {
  name: "ChatPage",
  computed: {
    // Untuk mengambil nama currentUser yang ada di state
    currentUser() {
      return this.$store.state.currentUser;
    },
    chats() {
      return this.$store.state.chats;
    },
  },
  data() {
    return {
      chatMessage: "",
    };
  },
  methods: {
    sendMessage() {
      this.$store.dispatch("sendMessage", this.chatMessage);
      this.chatMessage = "";
    },
    logoutHandler() {
      this.$store.commit("SET_CURRENTUSERNAME", "");
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
