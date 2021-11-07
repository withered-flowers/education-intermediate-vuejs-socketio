<template>
  <!-- Login Page -->
  <div class="login-page">
    <div
      class="
        flex flex-col
        gap-2
        min-h-minus-nav
        place-content-center
        text-center
      "
    >
      <h1 class="text-3xl font-semibold">Welcome to Maricet</h1>
      <form action="#" class="flex flex-col place-items-center">
        <label for="username" class="p-2">Please enter your Username</label>
        <input
          type="text"
          name="username"
          class="
            p-2
            m-2
            border-2 border-gray-200
            rounded-xl
            focus:outline-none focus:ring focus:border-blue-200
            w-60
          "
          id="username"
          placeholder="Username"
        />
        <button
          class="
            bg-blue-200
            hover:bg-blue-300 hover:outline-none hover:ring
            shadow-xl
            px-4
            py-2
            rounded-full
            mt-2
          "
        >
          Let's Chat
        </button>
      </form>
    </div>
  </div>
  <!-- End of Login Page -->
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<style></style>
