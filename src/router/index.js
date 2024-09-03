import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sitters',
    name: 'sitters',
    component: () => import('../views/SittersView.vue')
  },
  {
    path:'/sitters/:id',
    name:'sitter',
    component : () => import('../views/SitterView.vue')
  },
  {
    path: '/login' ,
    name: 'login' , 
    component : () => import( '../views/LoginView.vue')
  } , 
  {
    path: '/register',
    name: 'Register' , 
    component: () => import('../views/RegisterView.vue')

  },
  {
    path: '/reachUs',
    name: 'reachUs',
    component: () => import('@/views/ReachUs.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router