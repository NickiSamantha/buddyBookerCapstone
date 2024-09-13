import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies()

// const getRole = () => {
//   return cookies.get('role'); 
// };

const isAuthenticated = () => {
  return !!cookies.get('LegitUser');
};

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter(to, from, next) {
      isAuthenticated() ? next() : next({ name: 'login' });
    },
    component: HomeView
    
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter(to, from, next) {
      isAuthenticated() ? next() : next({ name: 'login' });
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sitters',
    name: 'sitters',
    beforeEnter(to, from, next) {
      isAuthenticated() ? next() : next({ name: 'login' });
    },
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
path: '/profile',
name:'profile',
beforeEnter(to, from, next) {
  isAuthenticated() ? next() : next({ name: 'login' });
},
component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter()  {
      cookies.remove('LegitUser')
      
        router.push({name: 'login'})
        // location.reload()

    }
  },
  {
    path: '/register',
    name: 'Register' , 
    component: () => import('../views/RegisterView.vue')

  },
  {
    path: '/reachUs',
    name: 'reachUs',
    beforeEnter(to, from, next) {
      isAuthenticated() ? next() : next({ name: 'login' });
    },
    component: () => import('@/views/ReachUs.vue')
  },
  {
    path: '/:id/bookings',
    name: 'bookings',
    beforeEnter(to, from, next) {
      isAuthenticated() ? next() : next({ name: 'login' });
    },
    component: () => import('../views/BookingsView.vue') 

  },
  {
    path: '/admin',
    name: 'admin',
    // beforeEnter(to, from, next) {
    //   const role = getRole();
    //   if (isAuthenticated() && role === 'admin') {
    //     next();
    //   } else {
    //     next({ name: 'home' });
    //   }
    // },
    beforeEnter(to, from, next) {
      isAuthenticated() ? next() : next({ name: 'login' });
    },
    component: () => import('../views/AdminView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
