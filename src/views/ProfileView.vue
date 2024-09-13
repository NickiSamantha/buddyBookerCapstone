<template>
    <div class="container">
      <h1 class="account-heading">Manage Your Account</h1>
  
      <div class="user-profile">
        <div class="profile-info" v-for="(user, userID) in users" :key="userID">
          <img src="https://codjoelmayer.github.io/projectImages/images/profile-Image.png" alt="User Avatar" class="avatar" />
          <div class="profile-details">
            <p><strong>First Name:</strong> {{ user.firstName }}</p>
            <p><strong>Last Name:</strong> {{ user.lastName }}</p>
            <p><strong>Email:</strong> {{ user.emailAdd }}</p>
            <p><strong>Address:</strong> {{ user.address }}</p>
            <p><strong>Role:</strong> {{ user.role }}</p>
          </div>
        </div>
  
        <form @submit.prevent="updateUser" class="update-form">
          <h2>Edit Profile</h2>
          <input
            type="text"
            v-model="user.firstName"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            v-model="user.lastName"
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            v-model="user.emailAdd"
            placeholder="Email"
            required
          />
          <input
            type="password"
            v-model="user.pwd"
            placeholder="Password"
            required
          />
          <input
            type="text"
            v-model="user.address"
            placeholder="Address"
            required
          />
          <select v-model="user.role" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
  
          <div class="form-actions">
            <button type="button" class="btn-submit ">Update</button>
            <button type="button" @click="deleteUser" class="btn-delete">Delete Account</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from "vuex";
  import { toast } from "vue3-toastify";
  import { cookies } from "vue3-cookies";
  
  export default {
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          emailAdd: "",
          pwd: "",
          address: "",
          role: "",
          avatar: "https://codjoelmayer.github.io/projectImages/images/profile-Image.png", 
        },
      };
    },
    computed: {
      ...mapState(["users"]),
    },
    methods: {
      ...mapActions([
        "fetchUsers",
        "editUser",
        "deleteUser",
      ]),

      async fetchUserFromCookies() {
      try {
        // Fetch user ID from cookies
        const userId = cookies?.get('LegitUser');
        if (userId) {
          // Fetch user details from your store or API
          const user = this.users.find(user => user.userID === userId);
          if (user) {
            this.user = { ...user };
          } else {
            toast.error('User not found', {
              autoClose: 2000,
              position: "bottom-center",
            });
          }
        } else {
          toast.error('No userID found in cookies', {
            autoClose: 2000,
            position: "bottom-center",
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: "bottom-center",
        });
      }
    },
      async updateUser() {
        try {
          await this.$store.dispatch("editUser", this.user);
          toast.success("Profile updated successfully!", {
            autoClose: 2000,
            position: "bottom-center",
          });
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: "bottom-center",
          });
        }
      },
      async deleteUser() {
        try {
          await this.$store.dispatch("deleteUser", this.user.userID);
          toast.success("Account deleted successfully!", {
            autoClose: 2000,
            position: "bottom-center",
          });
          // Optionally clear cookies or redirect after deletion
          cookies.remove('userID');
          // Redirect or navigate to a different route if needed
        } catch (e) {
          toast.error(`${e.message}`, {
            autoClose: 2000,
            position: "bottom-center",
          });
        }
      },
    },
    mounted() {
      this.fetchUserFromCookies();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .account-heading {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .user-profile {
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .profile-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  .profile-details p {
    margin: 5px 0;
  }
  
  .update-form {
    display: flex;
    flex-direction: column;
  }
  
  .update-form input,
  .update-form select {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .btn-submit,
  .btn-delete {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-submit {
    background-color: #575a58;
    color: white;
  }
  
  .btn-delete {
    background-color: #f0cf80;
    color: rgb(8, 8, 8);
  }
  </style>
  