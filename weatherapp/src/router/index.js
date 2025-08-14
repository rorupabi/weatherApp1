import { createRouter, createWebHistory } from 'vue-router'

// Import your page components
import Home from '../pages/home.vue'
import AboutUs from '../pages/aboutUs.vue'
import Contacts from '../pages/contacts.vue'
import News from '../pages/news.vue'

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
