<template>
        <div class="container">
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
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex';
const store = useStore();

const payload = reactive({
    emailAdd: "",
    pwd: ""
})
function loginUser() {
    store.dispatch('login', payload)
}

</script>

<style scoped>


.login-container {
    max-width: 100%;
    width: 100%;
    max-width: 400px;
   
    margin: 0 auto;
    padding: 20px;

}

h1 {
    font-size: 1.5rem;
    
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
   
}


@media (max-width: 576px) {
    .login-container {
        padding: 10px;
        margin: 10px;
    }

    h1 {
        font-size: 1.25rem;
     
    }

    input,
    button {
        padding: 10px;
    }
}
</style>