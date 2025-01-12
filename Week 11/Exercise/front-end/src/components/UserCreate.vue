<template>
  <div>
    <form>
      <div class="mb-5">
        <label
          for="user-name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User name</label
        >
        <input
          type="text"
          id="user-name"
          v-model="user_name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="user-email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User email</label
        >
        <input
          type="text"
          id="user-email"
          v-model="user_email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="user-address"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User address</label
        >
        <input
          type="text"
          id="user-address"
          v-model="user_address"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="user-phone"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >User phone</label
        >
        <input
          type="text"
          id="user-phone"
          v-model="user_phone"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      <button
        class="w-fit h-fit px-4 py-2 rounded-md bg-emerald-300 text-white text-md font-semibold"
        @click="saveUser"
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserCreate",

  data() {
    return {
      user_name: "",
      user_email: "",
      user_address: "",
      user_phone: ""
    };
  },

  methods: {
    async saveUser() {
      event.preventDefault();
      try {
        await axios.post(`http://localhost:3001/api/users`, {
          user_name: this.user_name,
          user_email: this.user_email,
          user_address: this.user_address,
          user_phone: this.user_phone
        });

        this.user_name = "";
        this.user_email = "";
        this.user_address = "";
        this.user_phone = "";

        this.$router.push("/");

      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
