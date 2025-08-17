import { createRouter, createWebHistory } from 'vue-router'

// Import your page components
import Home from '../views/home.vue'
import AboutUs from '../views/aboutUs.vue'
import Contacts from '../views/contacts.vue'
import News from '../views/news.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: AboutUs },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/news', name: 'News', component: News }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
