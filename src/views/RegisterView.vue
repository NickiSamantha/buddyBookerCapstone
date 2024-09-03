<template>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="pwd"
            required
            placeholder="Enter your password"
          />
        </div>
  
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            required
            placeholder="Enter your first name"
          />
        </div>
  
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            required
            placeholder="Enter your last name"
          />
        </div>
  
        <div class="form-group">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            v-model="address"
            required
            placeholder="Enter your address"
          />
        </div>
  
        <div class="form-group">
          <label for="role">Role</label>
          <select
            id="role"
            v-model="role"
            required
          >
            <option disabled value="">Select your role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
  
        <button type="submit">Register</button>
      </form>
  
      <div v-if="message" class="message" :class="{'success': isSuccess, 'error': !isSuccess}">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        pwd: '',
        firstName: '',
        lastName: '',
        address: '',
        role: '',
        message: '',
        isSuccess: false,
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await axios.post('/register', {
            emailAdd: this.email,
            pwd: this.pwd,
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            role: this.role,
          });
  
          this.message = response.data.message;
          this.isSuccess = response.data.status === 200;
        } catch (error) {
          this.message = error.response?.data?.message || 'An error occurred.';
          this.isSuccess = false;
        }
      },
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
  