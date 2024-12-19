import { createApp } from 'vue'

import App from './App.vue'
import FoodItem from './components/FoodItems.vue'

const app = createApp(App)
app.component('food-item', FoodItem)
app.mount('#app')