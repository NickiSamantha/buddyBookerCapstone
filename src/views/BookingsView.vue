<template>
    <div class="my-5 vh-100 ">
    <h1 class="mb-4 text-center">Your Bookings</h1>

    <!-- Table to display bookings -->
    <div v-if="cartItems && cartItems.length" class="table-responsive bcolor m-5">
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
              <button class="btn btn-danger btn-sm mb-2" @click="confirmDelete(item.id)">
                Delete
              </button>
            
      
              <button class="btn btn-primary btn-sm mb-2" @click="editItem(item)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div colspan="4" class="payment-notice">
            <p><strong>Please note:</strong> Payment for services will be collected after the service has been completed to ensure your satisfaction.</p>
          </div>
      <button class="btn btn-warning btn-sm mb-2 " @click="confirmDeleteAll">Delete All</button>
     
      <button class="btn btn-primary btn-sm mb-2 " @click="confirmProceedToPurchase">Book Now </button>
     

       
    </div>
    <!-- Show message if the cart is empty -->
    <div v-else>
        <p class="text-center">You have no bookings, book a sitter.</p>
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
                 @click="editingItem = null"
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
                <button type="submit" class="btn btn-primary up">Update</button>
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
    const cartData = cookies.get('cart');
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
    cookies.set('cart', JSON.stringify(store.state.cart), "1h");
  };
  

  // Remove an item from the cart
const removeItem = (itemId) => {
  store.commit('removeFromCart', itemId);
  updateCookies();
};
// Remove all items from the cart
const removeAllItems = () => {
  store.commit('setCart', []);
  cookies.remove('cart_null'); 
};
// Confirm deletion of an item
const confirmDelete = async (itemId) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085D6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });
  if (result.isConfirmed) {
    removeItem(itemId);
    Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
  }
};
// Confirm deletion of all items
const confirmDeleteAll = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this! All items will be deleted.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000',
    cancelButtonColor: '#000',
    confirmButtonText: 'Yes, delete all!',
    cancelButtonText: 'Cancel'
  });
  if (result.isConfirmed) {
    removeAllItems();
    Swal.fire('Deleted!', 'All items have been deleted.', '💔').then(() => {
     
      // Optionally redirect to checkout page or refresh
      // window.location.href = '/:id/bookings'; 
    });
  }
};
// Confirm and proceed to purchase
const confirmProceedToPurchase = async () => {
  const result = await Swal.fire({
    title: 'Proceed to Purchase',
    text: "Are you sure you want to book now? ",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#000',
    cancelButtonColor: '#d33',
    confirmButtonText: '👍!',
    cancelButtonText: '👎'
  });
  if (result.isConfirmed) {
    cookies.remove('cart')
    Swal.fire('Thank you for your booking!', '😁').then(() => {
      
      window.location.href = '/sitters'; 
    });
  }
};
// Load cart items on component mount

  
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
    store.commit("updateCartItem", editingItem.value); // Update the cart item in Vuex store
    updateCookies(); // Update cookies with the new cart state
    editingItem.value = null; // Close the modal
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
  /* background-color: #333; */
  /* color: #fff; */
  padding: 1rem;
  text-align: center;
}

main {
  padding: 1rem;
}

#booking-list {
  /* background: #d6d6d6; */
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.booking-item {
  /* border-bottom: 1px solid #ddd; */
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
  background-color: #f2cdcd;
  color: black;
}
/* .bcolor{
  background-color: #7dd9e7dd;
} */

 .close {
  margin-left: auto;
 }
 .up{
 margin: 5px;
 }
 .btn-sm {
margin: 5px;
 }
 .payment-notice {
  background-color: #f9f9f9;
  color: #555;
  border-top: 1px solid #ddd;
}
</style>
