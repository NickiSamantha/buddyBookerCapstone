<template>
  <div class="container-fluid section">
    <div class="container">
      <h2 class="text-center  pt-2">Admin</h2>
      <!-- Bootstrap tabs  -->
      <!-- <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" id="sitters-tab" data-bs-toggle="tab" href="#sitters" role="tab" aria-controls="sitters" aria-selected="true">Sitters</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" id="users-tab" data-bs-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="false">Users</a>
        </li>
      </ul> -->
<!-- Bootstrap Tabs Content -->
<div class="tab-content" id="myTabContent">
<!-- <div class="tab-pane fade show active" id="sitters" role="tabpanel" aria-labelledby="sitters-tab"> -->
         
      <div class="row table-responsive">
        <div class="row justify-content-between">
          <h2>
            <span>
              <button
                type="button"
                class="addbtn rounded-1 m-3"
                data-bs-toggle="modal"
                data-bs-target="#products"
              >
                +
              </button>
            </span>
            Sitters
          </h2>
          <!-- Add sitter Modal -->
          <div
            class="modal fade"
            id="products"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="productsLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="productsLabel">
                    Add New Sitter
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <input
                      type="text"
                      v-model="newProduct.firstName"
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      v-model="newProduct.lastName"
                      placeholder="Last Name"
                      required
                    />
                    <input
                      type="text"
                      v-model="newProduct.qualification"
                      placeholder="Qualification"
                      required
                    />
                    <input
                      type="text"
                      v-model="newProduct.imageURL"
                      placeholder="Image"
                      required
                    />
            
                    <input
                      type="text"
                      v-model="newProduct.dayOfWeek"
                      placeholder="Available day"
                      required
                    />
                    <input
                      type="text"
                      v-model="newProduct.startTime"
                      placeholder="Start Time "
                      required
                    />
                    <input
                      type="text"
                      v-model="newProduct.endTime"
                      placeholder="End Time "
                      required
                    />
                    <input
                      type="text"
                      v-model="newProduct.Reviews"
                      placeholder="Reviews "
                      required
                    />
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="closeModal"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="closeModal"
                        @click="createSitter"
                      >Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-sm table-hover text-center">
          <thead>
            <tr>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Qualification</td>
              <td>Image</td>
              <td>Day Of Week</td>
              <td>Start Time </td>
              <td>End Time</td>
              <td>Review</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(sitter, sitID) in sitters" :key="sitID">
              <td>{{ sitter.sitID }}</td>
              <td>{{ sitter.firstName }}</td>
              <td>{{ sitter.lastName }}</td>
              <td >
                 {{ sitter.qualification }}
              </td>
              <td >
                <img
              :src="sitter.imageURL"
              loading="lazy"
              class="img-fluid img"
              :alt="sitter.firstName"
            />
              </td>
              <td>{{ sitter.dayOfWeek }}</td>
              <td>{{ sitter.startTime }}</td>
              <td>{{ sitter.endTime }}</td>
              <td>{{ sitter.Reviews }}</td>
              <td>
                <button
                  type="button"
                  class="functionbtn bi bi-trash rounded-1"
                  @click="deleteSitter(sitter.sitID)"
                > Delete </button>
                <button
                  type="button"
                  class="functionbtn bi bi-pen rounded-1"
                  data-bs-toggle="modal"
                  :data-bs-target="`#editP${sitter.sitID}`"
                > Edit </button>

                <!-- Edit Sitter Modal -->
                <div
                  class="modal fade"
                  :id="`editP${sitter.sitID}`"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  :aria-labelledby="`editP${sitter.sitID}`"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1
                          class="modal-title fs-5"
                          :id="`editP${sitter.sitID}`"
                        >
                          Edit Details
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        > Close</button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <input
                            type="text"
                            v-model="sitter.firstName"
                            placeholder="First Name"
                            required
                          />
                          <input
                            type="text"
                            v-model="sitter.lastName"
                            placeholder="Last Name"
                            required
                          />
                          <input
                            type="text"
                            v-model="sitter.qualification"
                            placeholder="Qualification"
                            required
                          />
                          <input
                            type="image"
                            class="img"
                            v-model="sitter.imageURL"
                            
                            placeholder="Image"
                            required
                          />
                          <input
                            type="text"
                            v-model="sitter.dayOfWeek"
                            placeholder="Day of week"
                            required
                          />
                          <input
                            type="text"
                            v-model="sitter.startTime"
                            placeholder="startTime"
                            required
                          />
                          <input
                            type="text"
                            v-model="sitter.endTime"
                            placeholder="endTime"
                            required
                          />
                          <input
                            type="text"
                            v-model="sitter.Reviews"
                            placeholder="Reviews"
                            required
                          />
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="closeModal"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class=""
                              @click="editSitter(sitter)"
                            >Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
      <!-- User Tab -->

      <!-- <div class="tab-pane fade show active" id="users" role="tabpanel" aria-labelledby="users-tab"> -->
         
      <div class="row table-responsive">
        <div class="row justify-content-between">
          <h2>
            <span>
              <button
                type="button"
                class="addbtn rounded-1 m-3 text-center"
                data-bs-toggle="modal"
                data-bs-target="#users"
              >
                +
              </button>
            </span>
            Users
          </h2>
          <!-- Add User Modal -->

          <div
            class="modal fade"
            id="users"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="usersLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="usersLabel">Add New User</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form>
                    <input
                      type="text"
                      v-model="newUser.firstName"
                      placeholder="First Name"
                      required
                    />
                    <input
                      type="text"
                      v-model="newUser.lastName"
                      placeholder="Last Name"
                      required
                    />
                    <input
                      type="text"
                      v-model="newUser.emailAdd"
                      placeholder="Email Address"
                      required
                    />
                    <input
                      type="password"
                      v-model="newUser.pwd"
                      placeholder="Password"
                      required
                    />
                    <input
                      type="address"
                      v-model="newUser.address"
                      placeholder="Enter your address"
                      required
                    />
                    <select v-model="newUser.role" 
                    placeholder="Select your role" required>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                
                   
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="closeModal"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="" @click.prevent="addUser" > Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-sm table-hover text-center">
          <thead>
            <tr>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>Password</td>
              <td>Address</td>
              <td>Role</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, userID) in users" :key="userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.emailAdd }}</td>
              <td>{{ user.pwd }}</td>
              <td>{{ user.address }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button
                  type="button"
                  class="functionbtn bi bi-trash rounded-1"
                  @click="deleteUser(user.userID)"
                > Delete </button>
                <button
                  type="button"
                  class="functionbtn bi bi-pen rounded-1"
                  data-bs-toggle="modal"
                  :data-bs-target="`#edit${user.userID}`"
                >Edit</button>

                <!--Edit User Modal -->
                <div
                
                  class="modal fade"
                  :id="`edit${user.userID}`"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  :aria-labelledby="`edit${user.userID}`"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" :id="`edit${user.userID}`">
                          Edit User
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form>
                         
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
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                          </select>
                          
                          <div
                            class="modal-footer d-flex justify-content-center"
                          >
                            <button
                              type="button"
                              class="closeModal"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class=""
                              @click="editUser(user)"
                            >Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <!-- </div> -->
  </div>
  </div>
<!-- </div> -->

</template>
<script>
import { mapState, mapActions } from "vuex";
import { toast } from "vue3-toastify";
// import { register } from 'register-service-worker';
export default {
  data() {
    return {
      newProduct: {
        firstName: "",
        lastName:"",
        qualification: "",
        imageURL: "",
        dayOfWeek: "",
        startTime:"",
        endTime:"",
        Reviews: "",
      },
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
    ...mapState(["users", "sitters"]),
  },
  methods: {
    ...mapActions([
      "fetchUsers",
      "fetchSitters",
      "register",
      "addSitter",
      "editUser",
      "editSitter",
      "deleteUser",
      "deleteSitter",
    ]),
    async createSitter() {
      try {
        if (
          this.newProduct.firstName == "" ||
          this.newProduct.lastName == "" ||
          this.newProduct.qualification == "" ||
          this.newProduct.imageURL == "" ||
          this.newProduct.dayOfWeek == "" ||
          this.newProduct.startTime == "" ||
          this.newProduct.endTime == "" ||
          this.newProduct.Reviews == ""
        ) {
          console.log("someting empty");
          toast.error(`Empty field! please fill in all fields.`, {
            autoClose: 2000,
            position: "bottom-center",
          });
        } else {
          await this.addSitter(this.newProduct);
          this.newProduct = {
            firstName: "",
        lastName:"",
        qualification: "",
        imageURL: "",
        dayOfWeek: "",
        startTime:"",
        endTime:"",
        Reviews: "",
          };
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: "bottom-center",
        });
      }
    },
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
    async deleteUser(userID) {
      try {
        this.$store.dispatch("deleteUser", userID).then(() => {
          this.fetchUsers();
        });
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: "bottom-center",
        });
      }
    },
    async deleteSitter(sitID) {
      try {
        this.$store.dispatch("deleteSitter", sitID).then(() => {
          this.fetchSitters();
        });
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: "bottom-center",
        });
      }
    },
    editUser(user) {
      try {
        console.log(user);
        this.$store.dispatch("editUser", user).then(() => {
          this.fetchUsers();
        });
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: "bottom-center",
        });
      }
    },
    editSitter(sitter) {
      try {
        console.log(sitter);
        this.$store.dispatch("editSitter", sitter).then(() => {
          this.fetchSitters();
        });
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
    this.$store.dispatch("fetchSitters");
  },
};
</script>

<style scoped>



* {
  color: #070707;
}
h1 {
  color: #0a0a0a;
  
}
h2 {
  padding-inline: 0;
}
.floatingDisplay {
  position: fixed;
  top: 4rem;
  left: 0%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  overflow-y: auto;
}
.img {
    width: 38rem;
    max-width: 100%;
  }
a {
  background: #818181;
  transition: background 0.3s, color 0.3s;
  /*   &:focus {
      border: 2px solid #E9E9E9;
    } */
}
a:hover {
    background: #181818;
    color: #e9e9e9;
  }

.extraPadding {
  padding-inline: 2rem;
}
input,
select {
  height: 1.8rem;
  margin-block: 0.5rem;
  justify-content: center;
  
  padding-inline: 1rem;

}
.closeModal {
  height: 1.8rem;
  margin-block: 0.5rem;
  margin-inline: 0;
  justify-content: center;
  background-color: #b9beb3;
  width: 100%;

}
.modal-footer {
  padding-inline: 0;
}
form,
.modal-footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.addbtn {
  width: 3rem;
  background: #818181;
  transition: background 0.4s, color 0.3s;

}
.functionbtn {
  background: #818181;
  transition: background 0.4s, color 0.3s;
  margin: 0.2rem;
}
.table,
th {
  background-color: #fafafa;
}
</style>
