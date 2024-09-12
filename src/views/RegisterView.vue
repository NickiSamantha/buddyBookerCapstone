<template>
    <!-- Registration Form -->
<section id="register">
  <div class="container">
    <h1 class="fs-4">Register New User</h1>
    <form @submit.prevent="addUser"> <!-- Form element with submit handler -->
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          v-model="newUser.firstName"
          class="form-control"
          placeholder="First Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model="newUser.lastName"
          class="form-control"
          placeholder="Last Name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="emailAdd" class="form-label">Email Address</label>
        <input
          type="email"
          id="emailAdd"
          v-model="newUser.emailAdd"
          class="form-control"
          placeholder="Email Address"
          required
        />
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Password</label>
        <input
          type="password"
          id="pwd"
          v-model="newUser.pwd"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input
          type="text"
          id="address"
          v-model="newUser.address"
          class="form-control"
          placeholder="Enter your address"
          required
        />
      </div>
      <div class="mb-3">
        <label for="role" class="form-label">Role</label>
        <select id="role" v-model="newUser.role" class="form-select" required>
          <option value="" disabled>Select your role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</section>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  import { toast } from "vue3-toastify";
  // import { register } from 'register-service-worker';
  export default {
    data() {
      return {
        newUser: {
          firstName: "",
          lastName: "",
          emailAdd: "",
          pwd: "",
          address:"",
          role: "",
          
        },
      };
    },
    components: {},
    computed: {
      ...mapState(["users"]),
    },
    methods: {
      ...mapActions([
      
        "register",
       
      ]),
   
       addUser() {
        try {
           this.register(this.newUser);
          this.newUser = {
            firstName: "",
            lastName: "",
            address: "",
            role: "",
            emailAdd: "",
            pwd: "",
          };
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: "bottom-center",
          });
        }
      },
  
     
    },
    mounted() {
      this.$store.dispatch("fetchUsers");

    },
  };
  </script>
  
  <style scoped>
  .register {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"],
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #28a745;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .message {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 4px;
  }
  
  .success {
    color: green;
    border: 1px solid green;
  }
  
  .error {
    color: red;
    border: 1px solid red;
  }
  </style>
  