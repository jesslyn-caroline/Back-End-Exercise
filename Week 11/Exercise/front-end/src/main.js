import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';


import App from './App.vue'; 

import UserList from './components/UserList.vue';
import UserCreate from './components/UserCreate.vue';
import UserUpdate from './components/UserUpdate.vue';

// Define routes 
const routes = [
  {
    name: 'UserList',
    path: '/',
    component: UserList,
  },
  {
    name: 'CreateUser',
    path: '/create',
    component: UserCreate,
  },
  {
    nama: 'UserUpdate',
    path: '/update/:id',
    component: UserUpdate,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router); 
app.mount('#app');