<template>
    <div class="my-5">
    <h1 class="mb-4">Your Bookings</h1>

    <!-- Table to display bookings -->
    <div v-if="cartItems && cartItems.length" class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Day of Week</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.dayOfWeek }}</td>
            <td>{{ item.startTime }}</td>
            <td>{{ item.endTime }}</td>
            <td>
              <button class="btn btn-danger btn-sm" @click="confirmDelete(item)">
                Delete
              </button>
              <button class="btn btn-primary btn-sm" @click="editItem(item)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" @click="proceedToPurchase">
        Proceed to Purchase
      </button>
    </div>
    <div v-else>
      <p class="text-muted">Your cart is empty.</p>
    </div>
  
      <!-- Edit modal -->
      <div
        v-if="editingItem"
        ref="editModalRef"
        class="modal fade"
        id="editModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">Edit Item</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateItem">
                <div class="form-group">
                  <label for="dayOfWeek">Day of Week:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="dayOfWeek"
                    v-model="editingItem.dayOfWeek"
                  />
                </div>
                <div class="form-group">
                  <label for="startTime">Start Time:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="startTime"
                    v-model="editingItem.startTime"
                  />
                </div>
                <div class="form-group">
                  <label for="endTime">End Time:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="endTime"
                    v-model="editingItem.endTime"
                  />
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed, ref, nextTick } from "vue";
  import { useStore } from "vuex";
  import { useCookies } from "vue3-cookies";
  import Swal from "sweetalert2";
  
  const store = useStore();
  const { cookies } = useCookies();
  const cartItems = computed(() => store.state.cart);
  
  const loadCartFromCookies = () => {
    const cartData = cookies.get("cart");
    if (cartData) {
      try {
        const parsedCart = JSON.parse(cartData);
        store.commit("setCart", parsedCart);
      } catch (error) {
        console.error("Failed to parse cart data from cookies", error);
        store.commit("setCart", []);
      }
    } else {
      store.commit("setCart", []);
    }
  };
  
  const updateCookies = () => {
    cookies.set("cart", JSON.stringify(store.state.cart), "1d");
  };
  
  const proceedToPurchase = () => {
    // Handle the proceed to purchase logic, like navigating to checkout page
    console.log("Proceeding to purchase");
  };
  
  const removeItem = (item) => {
    store.commit("removeFromCart", item.id);
    updateCookies();
  };
  
  const confirmDelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d6d6d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      removeItem(item);
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    }
  };
  
  const editingItem = ref(null);
  const editModalRef = ref(null);
  const updatedItem = ref({});
  
  const editItem = (item) => {
    editingItem.value = { ...item };
    updatedItem.value = { ...item };
    nextTick(() => {
      if (editModalRef.value) {
        editModalRef.value.style.display = "block";
        editModalRef.value.classList.add("show");
      } else {
        console.error("Modal element not found");
      }
    });
  };
  
  const updateItem = () => {
    try {
      store.commit("updateCartItem", updatedItem.value);
      updateCookies();
      if (editModalRef.value) {
        editModalRef.value.style.display = "none";
        editModalRef.value.classList.remove("show");
      }
      editingItem.value = null;
      updatedItem.value = {};
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };
  
  // Load cart items on component mount
  onMounted(() => {
    loadCartFromCookies();
  });
  </script>
  

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

main {
  padding: 1rem;
}

#booking-list {
  background: #d6d6d6;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.booking-item {
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
}

.booking-item:last-child {
  border-bottom: none;
}

.booking-item h3 {
  margin: 0 0 0.5rem;
}

.booking-item p {
  margin: 0;
}

button {
  background-color: #797474;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #151515;
}
</style>
