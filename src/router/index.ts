import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RandomDataMatrixPage from '../views/RandomDataMatrixPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/random-datamatrix',
    name: 'RandomDataMatrix',
    component: RandomDataMatrixPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
