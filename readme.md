# Implementasi SocketIO pada VueJS Client

## Table of Content:
1. [Prasyarat](#prasyarat)
1. [Intro SocketIO](#intro-socketio)
1. [Langkah Pembuatan](#langkah-pembuatan)
    - [Inisialisasi - VueJS](#inisialisasi---vuejs)
    - [Modifikasi Template Starter](#modifikasi-template-starter)
    - [Memecah File Template](#memecah-file-template)
    - [Menambahkan Router](#menambahkan-router)
    - [Selesai Modifikasi Starter Template](#selesai-modifikasi-starter-template)
    - [Memulai SocketIO - Server](#memulai-socketio---server)
    - [Memulai SocketIO - Client](#memulai-socketio---client)
1. [Referensi](#referensi)

Pada pembelajaran ini

### Prasyarat:
- Mengerti dasar pembuatan backend nodejs dengan Express
- Mengerti dasar dari VueJS
- Mengerti penggunaan Vue Router dan VueX
- Sudah menginstall nodejs dan package `@vue/cli`

### Intro SocketIO
Diambil dari situs socket.io sendiri, Socket.IO adalah sebuah pustaka yang bisa menyediakan komunikasi yang *real-time*, dua arah, dan berbasis event antara browser dan server.

Sehinggga dari kata kata di atas, dapat diketahui bahwa Socket.IO ini sendiri terdiri dari:
- Sebuah NodeJS Server
- Sebuah Pustaka JavaScript untuk Browser / NodeJS Client.

Untuk referensi lebih detailnya, bisa dicoba baca pada tautan ini yah https://socket.io/docs/

Contoh implementasi dari SocketIO sendiri ini misalnya adalah pada sesuatu yang berhubungan dengan *real time*, misalnya chat apps.

Nah, jadi pada pembelajaran ini kita akan mencoba untuk mengimplementasikan Socket.IO ini pada NodeJS Server (berbasis Express) dan NodeJS Client (berbasis VueJS) dalam bentuk aplikasi chatting yah !

**Disclaimer**:  
Pada pembelajaran ini, Langkahnya benar benar dibuat dari NOL yah, namun, bagi yang ingin langsung mempelajari SocketIO nya saja, bisa langsung skip ke langkah [Memulai SocketIO - Server](#memulai-socketio---server) yah !

### Langkah Pembuatan
#### Inisialisasi - VueJS
1. `vue create .`
1. Generate project in current directory? `(Y)es`
1. Please pick a preset: `Manually select features`
1. Check the features needed for your project:
    - Babel
    - Router
    - Vuex
    - Linter / Formatter
1. Choose a version of Vue.js: `2.x`
1. Use history mode for router? `(Y)es`
1. Pick a linter / formatter config: `ESLint with error prevention only`
1. Pick additional lint features: `Lint on save`
1. Where do you prefer placing config? `In dedicated config files`
1. Save this as a preset for future projects? `(N)o`
1. Menunggu selesai mengunduh file yang ada
1. Menambahkan tailwind dengan `vue add tailwind`
1. Generate tailwind.config.js? `minimal`
1. Menunggu selesai generate file tambahan

#### Modifikasi Template Starter
Selanjutnya kita akan memodifikasi file yang ada sehingga bisa sesuai dengan apa yang akan dibuat pada pembelajaran kali ini.
1. Menghapus file `src/components/HelloWorld.vue`
1. Menghapus file `src/views/About.vue` dan `src/views/Home.vue`
1. Memodifikasi file `src/router/index.js` menjadi sebagai berikut:
    ```js
    ...
    // Bagian ini dikomen saja karena sudah tidak digunakan lagi
    // import Home from '../views/Home.vue'

    // Routes dikosongkan saja karena nanti kita akan menambahkan routes
    // seiring pembelajaran ini
    const routes = [];

    ...
    ```
1. Membuka file `tailwind.config.js`
1. Menambahkan konfigurasi berikut pada `theme` -> `extend`
    ```js
    module.exports = {
      ...
      theme: {
        extend: {
          minHeight: {
            'minus-nav': '90vh',
          },
        },
      },
      ...
    ```
1. Membuka pada browser tautan berikut `https://play.tailwindcss.com/sq9f022muH`
1. Membuka file `src/App.vue`
1. Copy seluruh html yang ada pada `play tailwindcss` ke dalam tag `template` pada file `src/App.vue` dan kosongkan tag `<style>` yang ada di `src/App.vue`.
1. Menjalankan dan melihat apa yang terjadi pada starter template ini dengan menggunakan perintah `npm run serve`
1. Apabila semuanya tercopy dan termodifikasi dengan baik, hasil tampilan saat ini adalah sebagai berikut:   
<!-- ![Screenshot Image](assets/image01.png) -->

#### Memecah File Template
1. Membuat dua buah file pada folder `src/views` dengan nama `LoginPage.vue` dan `ChatPage.vue`
1. Pada `LoginPage.vue` dan `ChatPage.vue`, buatlah sebuah struktur awal dari VueJS Component sebagai berikut: 
    ```html
    <template>
      
    </template>

    <script>
    export default {

    }
    </script>

    <style>

    </style>
    ```
1. Melakukan cut dari `src/App.vue`, pada bagian dengan tanda `<!-- Login Page -->` sampai dengan `<!-- End of Login Page -->` dan paste ke dalam `src/views/LoginPage.vue`, sekaligus menambahkan pada tag `<script>` pada file `src/views/LoginPage.vue` sehingga menjadi seperti di bawah
    ```js
    export default {
      name: "LoginPage",
    };
    ```
1. Melakukan cut dari `src/App.vue` pada bagian dengan tanda `<!-- Home Page -->` sampai dengan `<!-- End of Home Page -->` dan paste ke dalam `src/views/ChatPage.vue`, sekaligus menambahkan pada tag `<script>` pada file `src/views/ChatPage.vue` sehingga menjadi seperti di bawah
    ```js
    export default {
      name: "ChatPage",
    };
    ```
1. Apabila semuanya tercopy dengan baik, hasil tampilan saat ini adalah berupa layar abu abu saja.

#### Menambahkan Router
1. Membuka file `src/router/index.js` dan memodifikasi file sehingga menjadi seperti di bawah.
    ```js
    import Vue from "vue";
    import VueRouter from "vue-router";
    // import Home from "../views/Home.vue";

    // Import page yang sudah dibuat
    import LoginPage from "../views/LoginPage.vue";
    import ChatPage from "../views/ChatPage.vue";

    Vue.use(VueRouter);

    const routes = [
      // Deklarasi routes untuk home / chat page
      {
        path: "/",
        name: "Chat",
        component: ChatPage,
      },
      // Deklarasi routes untuk login page
      {
        path: "/login",
        name: "Login",
        component: LoginPage,
      },
    ];

    const router = new VueRouter({
      mode: "history",
      base: process.env.BASE_URL,
      routes,
    });

    // Navigation Guard supaya bisa masuk ke Login Page terlebih dahulu
    router.beforeEach((to, from, next) => {
      // Pada saat orang sudah login, namanya akan disimpan pada localStorage juga
      // sebagai penanda apakah sudah masuk atau belum
      if (!localStorage.getItem("username") && to.name === "Chat") {
        // Apabila belum ada, akan dipaksa menuju halaman Login
        next({ name: "Login" });
      } else {
        next();
      }
    });

    export default router;
    ```
1. Membuka file `src/App.vue` dan menambahkan `<router-view>` di dalam `<div class="container ...">`
    ```html
    <template>
      <div class="container p-4 min-w-full min-h-screen bg-gray-200">
        <!-- Tambahkan router-view di sini -->
        <router-view></router-view>
      </div>
    </template>
    ```
1. Apabila semuanya tercopy dengan baik, hasil tampilan saat ini seharusnya sudah menjadi sama seperti yang awal template kita tadi, namun tanpa halaman chatnya. (hanya halaman login saja)
<!-- ![Screenshot Image](assets/image01.png) -->

#### Selesai Modifikasi Starter Template
Sampai pada tahap ini artinya kita sudah sampai pada tahap dimana kita siap untuk mempelajari socketio pada pembelajaran kali ini.

#### Memulai SocketIO - Server
Selanjutnya kita akan membuat SocketIO server sederhana terlebih dahulu, yang bisa mengetahui ketika ada seorang user yang terkoneksi ke socketio server yang dibuat.

1. Membuat sebuah folder yang terpisah dari client yang sudah dibuat sebelumnya (mis: `server`)
1. Membuat sebuah file dengan nama `app.js`
1. Menginisialisasi project dengan `npm init -y`
1. Menginstall package yang dibutuhkan dengan `npm i express cors socket.io`
1. Menginstall package dev yang dibutuhkan dengan `npm i -D nodemon`
1. Membuka kembali file `app.js` dan menambahkan kode berikut
    ```js
    const express = require("express");
    // Di sini kita akan menggunakan HTTP untuk mengikat express dan socketio
    // dalam satu tempat yang sama
    const { createServer } = require("http");
    const { Server } = require("socket.io");

    const app = express();
    const httpServer = createServer(app);
    // Ini adalah instance Socket.IO yang akan digunakan
    const io = new Server(httpServer, {
      // Pada SocketIO versi 4 ke atas, harus mendefinisikan CORS
      cors: {
        origin: "*",
      }
    });

    // ini adalah "event" khusus socket io
    // Terjadi ketika ada koneksi ke socket io
    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      // Ini adalah event yang terjadi ketika user
      // terputus dari socket io
      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });

      // Ini adalah custom event buatan kita sendiri
      // Server akan mendengar ketika client mentrigger event ini
      socket.on("customEventFromClient", (payload) => {
        console.log("Terima payload: ", payload);

        // Server akan mengirimkan kembalian ke client
        // Dengan nama event customEventFromServer
        socket.emit("customEventFromServer", "Kembalian server");
      });
    });

    // listen http server pada port 3000
    httpServer.listen(3000, () => {
      console.log("Listening on port 3000");
    });
    ```
1. Menjalankan kode di atas dengan `npx nodemon app.js`

Sampai di sini kita sudah membuat server yang dapat mengetahui ketika ada seseorang terkoneksi dan terputus dari server kita.

Selanjutnya kita akan memodifikasi client sehingga dapat menggunakan server socketio yang sudah dibuat ini.

#### Memulai SocketIO - Client

[Standard Components]

Sekarang kita akan mencoba untuk mengimplementasikan penggunakan SocketIO pada client.

Untuk VueJS sendiri, sudah ada sebuah pustaka yang akan memudahkan kita dalam menggunakan SocketIO client atau istilahnya adalah `wrapper` SocketIO untuk VueJS. Pustaka ini bernama `vue-socket.io-extended` dan untuk referensinya dapat dilihat pada tautan berikut https://www.npmjs.com/package/vue-socket.io-extended

1. Membuka kembali folder client
1. Menginstall package yang dibutuhkan terlebih dahulu dengan cara `npm i vue-socket.io-extended socket.io-client`
1. Membuka file `src/main.js` untuk menambahkan inisialisasi Socket.IO
    ```js
    import Vue from "vue";
    import App from "./App.vue";
    import router from "./router";
    import store from "./store";
    import "./assets/tailwind.css";

    // Inisialisasi SocketIO
    import VueSocketIOExt from "vue-socket.io-extended";
    import { io } from "socket.io-client";

    // Instance SocketIO dengan koneksi ke server
    const socket = io("http://localhost:3000");

    Vue.config.productionTip = false;

    // Tambahkan pada "middleware" Instance Vue
    Vue.use(VueSocketIOExt, socket)

    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
    ```
1. Membuka kembali file `src/App.vue` dan menambahkan `<script>` untuk menggunakan SocketIO pada VueJS
    ```js
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
        // Untuk mendengarkan ketika ada custom event "customEvent" dari server
        customEventFromServer: function (payload) {
          console.log("customEventFromServer", payload);
        },
      },
      // Misalnya di sini kita menggunakan lifecycle created untuk mengirimkan event
      // "customEventFromClient" ke server
      created() {
        this.$socket.client.emit("customEventFromClient", {
          message: "Halo from client",
        });
      },
    };
    </script>
    ```
1. Menjalankan server dengan `npx nodemon app.js` dan menjalankan client dengan `npm run serve`, dan lihatlah hasilnya pada console log baik pada browser maupun pada terminal (untuk server). Apabila sampai tahap ini sudah benar, maka seharusnya pada terminal server dan client akan muncul tulisan berikut:
    ```sh
    # SERVER (terminal)
    A user connected <socket.id>
    Terima payload: { message: 'Halo from client' }

    # CLIENT (browser)
    connected <instance socket.io>
    customEventFromServer Kembalian Server
    ```

Sampai di titik ini artinya kita sudah belajar untuk menggunakan SocketIO pada VueJS.

Namun karena kita di sini sudah menggunakan VueX, bagaimanakah cara baiknya dalam menintegrasikan SocketIO ini dengan VueX yang ada?

[VueX]

1. Membuka kembali file `src/main.js` dan memodifikasi kode agar bisa menggunakan store pada Socket.IO
    ```js
    // Modifikasi kode dengan menambahkan store
    Vue.use(VueSocketIOExt, socket, { store });
    ```
1. Membuka kembali file `src/App.vue` dan memodifikasi tag `<script>` yang ada
    ```js
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
    };
    </script>
    ```
1. Selanjutnya kita akan membaca dokumentasi dari Vue Socket.IO Extended. Pada dokumentasi ini, diberitahukan CARA PENULISAN mutation ataupun action berdasarkan nama event yang ingin didengar dari server.
    | Server Event |	Mutation           |	Action             |
    | ------------ | ------------------- | --------------------|
    | chat message | SOCKET_CHAT MESSAGE | socket_chatMessage  |
    | chat_message | SOCKET_CHAT_MESSAGE | socket_chatMessage  |
    | chatMessage  | SOCKET_CHATMESSAGE  | socket_chatMessage  |
    | CHAT_MESSAGE | SOCKET_CHAT_MESSAGE | socket_chatMessage  |
1. Berdasarkan kode yang dibuat sebelumnya, kita memiliki beberapa event yang harus didengar, dan beberapa event yang harus dikirimkan, yaitu:
    - Dengar: `connect`, `disconnect`, dan `customEventFromServer`
    - Kirim: `customEventFromClient`
1. Membuat kode pada VueX `src/store/index.js` sebagai berikut:
    ```js
    ...
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
    ```
1. Memodifikasi kembali pada `src/App.vue` menjadi sebagai berikut:
    ```js
    export default {
      name: "App",
      created() {
        this.$store.dispatch("sendCustomEventToServer", {
          message: "Halo from client",
        });
      },
    };
    ```
Sampai di sini artinya kita sudah selesai untuk menggabungkan VueX dan SocketIO secara sederhana pada VueJS.

Selanjutnya kita akan membuat aplikasi `Maricet` ini agar bisa berjalan dengan baik yah !

[Start Making Maricet]

1. Mari kita buat gambaran kasar dari aplikasi `Maricet` ini terlebih dahulu. Alur dari aplikasi ini adalah:
    - User akan mengunjungi apps ini, kemudian meng-inputkan username yang dimiliki.
    - Setelah diinput, username akan dikirimkan ke server dan akan disimpan di dalam localStorage dengan nama `username`.
    - Setelah itu, User akan diarahkan ke halaman Chat Room, dimana User bisa melakukan Chat dengan user lainnya.
    - Pada saat User menekan tombol enter pada text area yang ada di halaman Chat Room, maka akan mengirimkan pesan tersebut ke server dan akan di"blast" ke User lainnya yang sedang menggunakan aplikasi ini juga.
1. Membuka file server `app.js` dan menambahkan kode berikut:
    ```js
    ...

    let arrOfUsers = [];
    let arrOfChats = [];
    ...

    // di dalam socket.io io.on("connection")
    socket.on("setUsername", (payload) => {
      arrOfUsers.push({
        username: payload,
        status: "online",
      });

      console.log(arrOfUsers);
    });
    ...
    ```
1. Membuka file client `src/views/LoginPage.vue` dan menambahkan sebuah v-on:submit-prevent pada form dengan nama `submitUsernameHandler`, menambahkan sebuah v-model pada input `username` dengan nama `username` dan menambahkan methods yang diisi sebagai berikut:
    ```js
    <script>
    export default {
      name: "LoginPage",
      data() {
        return {
          username: "",
        };
      },
      methods: {
        submitUsernameHandler() {
          localStorage.setItem("username", this.username);
          this.$store.dispatch("setUsername", this.username);
          this.$router.push("/");
        },
      },
    };
    </script>
    ```
1. Membuka file client `src/store/index.js` dan menambahkan sebuah state dengan nama `currentUser`, sebuah mutation dengan nama `SET_CURRENTUSER` dan sebuah action dengan nama `setUsername`
    ```js
    state: {
      currentUser: "",
    },
    mutations: {
      SET_CURRENTUSER(state, user) {
        state.currentUser = user;
      },
    },
    actions: {
      setUsername({ commit }, payload) {
        commit("SET_CURRENTUSER", payload);
        this._vm.$socket.client.emit("setUsername", payload);
      },
    }
    ```
1. Sampai pada tahap ini artinya kita sudah berhasil untuk mengimplementasikan list of user ke sisi server. selanjutnya kita akan membuat Chat nya !
1. Membuka file client `src/views/ChatPage.vue`, dan menambahkan kode untuk menampilkan state `currentUser` dari store
    ```html
      <!-- Modifikasi line ini untuk menambahkan {{ currentUser }} -->
      <h1>
        Welcome, <span class="font-semibold text-sm">{{ currentUser }}</span>
      </h1>
    ```
    ```js
    <script>
    export default {
      name: "ChatPage",
      computed: {
        // Untuk mengambil nama currentUser yang ada di state
        currentUser() {
          return this.$store.state.currentUser;
        },
      },
    };
    </script>
    ```
1. Membuka file client `src/views/ChatPage.vue`, dan menambahkan kode untuk:
    - Menambahkan v-model pada text area dengan nama `chatMessage`
    - Menambahkan v-on:keyup.enter pada text area dengan nama `sendMessage`
    - Menambahkan data dengan nama `chatMessage`
    - Mengimplementasikan method `sendMessage`
    ```js
    <script>
    ...
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
      },
    ...
    </script>
    ```
1. Membuka file client `src/store.index.js` dan menambahkan kode untuk:
    - Menambahkan state `chats`
    - Menambahkan mutation `SOCKET_RECEIVEMESSAGEFROMSERVER`
    - Menambahkan action `sendMessage`
    ```js
    state: {
      ...
      chats: [],
    },
    mutations: {
      ...
      // Ini hanyalah sebuah contoh saja dimana server socketio
      // bisa langsung memanggil mutation
      // untuk mengubah state yang ada
      SOCKET_RECEIVEMESSAGEFROMSERVER(state, chats) {
        console.log("Chats from server", chats);
        state.chats = chats;
      },
    },
    actions: {
      ...
      sendMessage(_, payload) {
        this._vm.$socket.client.emit("sendMessageToServer", {
          user: this.state.currentUser,
          // trim untuk menghilangkan enter di akhir
          message: payload.trim(),
        });
      },
    }
    ```
1. Membuka file server `app.js` dan mengimplementasikan event `sendMessageToServer` di dalam `io.on('connection')`
    ```js
    ...
    // Ini adalah custom event buatan kita sendiri
    // Untuk menerima message yang dikirim dari client
    socket.on("sendMessageToServer", (payload) => {
      arrOfChats.push(payload);

      // Server akan mengembalikan respon ke client berupa
      // Seluruh chat yang ada

      // Pehatikan di sini kita menggunakan io, bukan socket,
      // untuk menargetkan seluruh client yang sedang ada
      // terhubung ke server
      io.emit("receiveMessageFromServer", arrOfChats);
    });
    ...
    ```
1. Membuka file client `src/views/ChatPage.vue` dan menambahkan kode untuk:
    - Mengcomment section `<!-- Chat Content -->`
    - Menambahkan v-for untuk menampilkan `chats`
    - Menambahkan v-on click pada anchor `Logout` dengan nama `logoutHandler`
    - Menambahkan computed untuk mengambil state `chats` dari store
    - Menambhakann methods `logoutHandler`
    ```html
    ...
    <!-- Right NavBar -->
    <div class="my-auto mr-2 flex flex-row gap-2">
      <h1>
        Welcome, <span class="font-semibold text-sm">{{ currentUser }}</span>
      </h1>
      <a href="#" class="underline text-blue-500" @click="logoutHandler"
        >Logout</a
      >
    </div>
    ...

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
    ``` 
    ```js
    ...
    computed: {
      ...
      chats() {
        return this.$store.state.chats;
      },
    },
    methods: {
      ...,
      logoutHandler() {
        this.$store.commit("SET_CURRENTUSERNAME", "");
        localStorage.clear();
        this.$router.push("/login");
      },
    }
    ```
Sampai di sini apabila kita menjalankan kode kita kembali, maka kita sudah bisa melihat (khususnya dengan 2 browser yang berbeda), bahwa antar user dalam browser yang berbeda tersebut sudah bisa melakukan chat satu sama lainnya, dan tampilannya ini secara "realtime", menakjubkan bukan?

Selamat mempelajari ini lebih lanjut yah !

Masih cukup banyak yang bisa diekplorasi dari sini yah, misalnya:
- Pembagian Room / Channel dari orang yang sedang login, sehingga chatnya bisa ada "kamar" yang berbeda
- Menampilkan / mensortir date dan time dari chat yang dikirim
- Menggunakan database untuk menyimpan data data yang ada lainnya.
- dst.

Selamat mencoba !

### Referensi
- https://socket.io/docs/v4/
- https://socket.io/docs/v4/server-initialization#with-express
- https://www.npmjs.com/package/vue-socket.io-extended