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
