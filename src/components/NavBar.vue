<template>
    <nav class="navbar navbar-expand-lg sticky-top NavBar">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img
            src="https://nickisamantha.github.io/allImages/images/bblogo.png"
            alt="logo"
            class="btn img-fluid"
            loading="lazy"
          />
        </router-link>
  
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                Home</router-link>
            </li>
  
            <li class="nav-item">
              <router-link class="nav-link" to="/about">
                About</router-link>
            </li>
  
            <li class="nav-item">
              <router-link class="nav-link" to="/sitters">Sitters</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/:id/bookings">Bookings</router-link>
            </li>
            <li class="nav-item" v-if="user?.value && user.value.role === 'admin'">
            <router-link class="nav-link" to="/admin">
              Admin
            </router-link>
          </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/reachUs">Reach us</router-link>
            </li>
<!-- Based on authentication  -->
            
            <ul class="nav-item" v-if="!user?.value"
          
            >
            <router-link class="nav-link" to="/bookings" >
              <i class="fa-solid fa-user"></i>
            </router-link>
            <router-link class="nav-link btn" to="/logout">
               Logout 
             </router-link>
          </ul>
        
          <ul class="nav-item" v-else>
             <router-link class="nav-link" to="/login">Login</router-link>
            <router-link class="nav-link" to="/register">Sign Up</router-link>
           
          </ul>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import {computed} from 'vue';
  import {useStore} from 'vuex';
  // import { useRouter } from 'vue-router';
  import {useCookies} from 'vue3-cookies';
  const {cookies} = useCookies()
      export default {
          name : 'NavComp' ,
          setup() {
            const store = useStore();
            // const router = useRouter();
            const user =  computed(()=> store.state?.user || cookies.get('LegitUser'))  
            const isAdmin =computed( () => !store.state.user?.role === 'admin');
            const isAuthenticated = computed( () => !!store.state.user?.token);
                // Debugging the authentication status
                console.log("=========User=======");
    console.log( user?.value);
    console.log("=========isAdmin=======");
    console.log(isAdmin.value);
    //         const logout = () => {
    //           cookies.remove('LegitUser')
    //           router.push('/login');
    // };
            return {
                isAdmin, 
                isAuthenticated,
                // logout,
                user
            };
          },
      };
  </script>
  
  <style>
   img[alt='logo'] {
    width: 5rem ;
    border: 1px solid  #9b9998;
    cursor: pointer;
} 

.NavBar{
    background-color: #d9d9d9;
}
.nav-link i {
  margin-right: 0.5rem;
}
  
  </style>