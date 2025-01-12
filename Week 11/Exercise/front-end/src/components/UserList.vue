<template>
  <div class="flex flex-col space-y-1.5">
    <router-link
      to="/create"
      class="w-fit h-fit px-4 py-2 rounded-md bg-emerald-300 text-white text-md font-semibold"
      >Add New</router-link
    >
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">User name</th>
            <th scope="col" class="px-6 py-3">User email</th>
            <th scope="col" class="px-6 py-3">User address</th>
            <th scope="col" class="px-6 py-3">User phone</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.user_id"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.user_name }}
            </th>
            <td class="px-6 py-4">{{ item.user_email }}</td>
            <td class="px-6 py-4">{{ item.user_address }}</td>
            <td class="px-6 py-4">{{ item.user_phone }}</td>

            <td class="px-6 py-4 space-x-2.5">
              <router-link
                :to="`/update/${item.user_id}`"
                class="w-fit h-fit px-4 py-2 rounded-md bg-emerald-300 text-white text-md font-semibold"
                >Edit</router-link
              >
              <button
                class="w-fit h-fit px-4 py-2 rounded-md bg-emerald-300 text-white text-md font-semibold"
                @click="deleteUser(item.user_id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserList",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        this.items = response.data;
      } catch (err) {
        console.log("Error fetching users:", err);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${id}`);
        this.getUsers();
      } catch (err) {
        console.log("Error deleting user:", err);
      }
    },
  },
};
</script>
