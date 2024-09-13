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
            <li class="nav-item" v-if="isAdmin">
              
            <router-link class="nav-link" to="/admin">
              Admin
            </router-link>
          </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/reachUs">Reach us</router-link>
            </li>
<!-- Based on authentication  -->
<li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/profile">
              <i class="fa-solid fa-user"></i>
            </router-link>
          </li>

          <li class="nav-item" v-if="isAuthenticated">
            <router-link @click="logout()" class="nav-link btn" to="/logout">
              Logout
            </router-link>
          </li>
         <!-- Login button visible only when not authenticated -->
         <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link btn" to="/login">
              Login
            </router-link>
          </li>
       
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import {computed, ref, watch} from 'vue';
  import {useStore} from 'vuex';
  // import { useRouter } from 'vue-router';
  import {useCookies} from 'vue3-cookies';
  const {cookies} = useCookies()
      export default {
          name : 'NavComp' ,
          setup() {
            const store = useStore();
            // const router = useRouter();
            const loading = ref(true)

          const user = computed(() => store.state?.user || cookies.get('LegitUser'));
          const isAdmin = computed(() => user?.value?.result?.role === 'admin');
          const isAuthenticated = computed(() => !!store.state.user?.token);
                // Debugging the authentication status
                console.log("=========User=======");
    console.log(user?.value);
    console.log("=========isAdmin=======");
    console.log(isAdmin.value);
            const logout = async () => {
               cookies.remove('LegitUser')
              location.reload()
      window.location.href = '/login'; 
              // router.push('/login');
    };
    watch(user, () => {
      if (user.value) {
        loading.value = false ; 
      }
    })
            return {
                isAdmin, 
                isAuthenticated,
                logout,
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