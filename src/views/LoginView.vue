<template>
    <div class="">
        <div class="container-fluid p-md-5 mt-md-4 mb-md-3">
        <div class="row p-5 pb-lg-5 ">
            <div class="login-container p-md-5 mt-md-5">
            <h1 class="text-center">Login</h1>
            <form @submit.prevent="loginUser">
                <div class="form-group">
                    <label for="emailAdd">Email Address</label>
                    <input type="text" id="emailAdd" v-model="payload.emailAdd" required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="pwd" v-model="payload.pwd" required />
                </div>
                <button type="submit">Login</button>
                <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
            </form>
            <h6 class="text-center">
                No Account? <router-link to="/register">Register Here </router-link>
            </h6>
        </div>
        </div>
       
    </div>
    </div>
   
    
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex';
const store = useStore();
// import { useRouter } from 'vue-router';
const payload = reactive({
    emailAdd: "",
    pwd: ""
})
function loginUser() {
    store.dispatch('login', payload)
}
// export default {
//   data() {
//     return {
//       emailAdd: '',
//       pwd: '',
//       errorMessage: ''
//     };
//   },
//   setup() {

//     // const router = useRouter();
//     // const emailAdd = ref('');
//     // const pwd = ref('');
//     const errorMessage = ref('');
//     const payload = reactive({
//         emailAdd: "",
//         pwd: ""
//     })

//     function loginUser(){
//         store.dispatch('login', payload)
//     }

//     // const handleLogin = async () => {
//     //   try {
//     //     const payload = { emailAdd: emailAdd.value, pwd: pwd.value };
//     //     const { message, result } = await store.dispatch('login', payload);

//     //     if (result) {
//     //       emailAdd.value = '';
//     //       pwd.value = '';
//     //        // Redirect based on user role
//     //        if (result.role === 'admin') {
//     //         router.push({ name: 'adminDashboard' });
//     //       } else {
//     //         router.push({ name: 'sitters' });
//     //       }
//     //     } else {
//     //       errorMessage.value = message;
//     //     }
//     //   } catch (error) {
//     //     errorMessage.value = error.message;
//     //     console.error('Login failed:', error);
//     //   }
//     // };

//     return {
//         // emailAdd,
//         // pwd,
//         errorMessage,
//     //   handleLogin,
//       loginUser
//     };
//   }
// };
</script>

<style scoped>
.container-fluid{
    background-color: #d6d6d6;
}
.login-container {
    max-width: 100%;
    width: 100%;
    max-width: 400px;
    /* Adjust as needed */
    margin: 0 auto;
    padding: 20px;
    /* border: 1px solid #ddd;
    border-radius: 5px; */
    background-color: #d6d6d6;
    /* Ensures a good background color */
}

h1 {
    font-size: 1.5rem;
    /* Responsive font size */
    margin-bottom: 20px;
}

h6 {
    margin-top: 20px;
}

.form-group {
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #ee8a8a;
    color: rgb(5, 5, 5);
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.error {
    color: rgb(7, 7, 7);
    font-size: 0.875rem;
    /* Smaller font size for error messages */
}

/* Responsive Styles */
@media (max-width: 576px) {
    .login-container {
        padding: 10px;
        margin: 10px;
    }

    h1 {
        font-size: 1.25rem;
        /* Adjust font size for smaller screens */
    }

    input,
    button {
        padding: 10px;
    }
}
</style>