<template>
    <div class="container-fluid">
      <div class="row">
        <h2 class="display-2">Sitter Details</h2>
      </div>
      <div class="row justify-content-center mt-5" v-if="sitter">
        <div class="row mb-3">
        <router-link to="/sitters" class="back-button">
          &larr; Go Back
        </router-link>
      </div>
        <CardComp>
          <template #cardHeader>
            <img
              :src="sitter.imageURL"
              loading="lazy"
              class="img-fluid"
              :alt="sitter.firstName"
            />
          </template>
          <template #cardBody>
            <h5 class="card-title fw-bold">{{ sitter.firstName }} {{ sitter.lastName }} </h5>
            <p class="lead">
            </p>
            <p class="lead">
              <span class="text-tertiary fw-bold">Qualification</span>:{{
                sitter.qualification
              }}
            </p>
            <p class="lead">
              <span class="text-tertiary fw-bold">Availability</span> : {{ sitter.dayOfWeek }}
              {{ sitter.startTime }} {{ sitter.endTime }}

            </p>
            <p class="lead">
              <span class="text-tertiary fw-bold"> Review</span> : {{ sitter.Reviews }}

            </p>
            <div class="button-wrapper">
 <button class="cute-button" @click="addToCart(sitter)">
Book Now
 </button>
            </div>
          </template>
        </CardComp>
      </div>
      <div v-else>
        <Spinner />
      </div>
    </div>
  </template>
  
  <script setup>
  import { useStore } from "vuex";
  import { computed, onMounted } from "vue";
  import Spinner from "../components/Spinner.vue";
  import CardComp from "../components/CardComp.vue";
import { useRoute } from "vue-router";
  const store = useStore();
  const route = useRoute();
  const sitter = computed(() => store.state.sitter);

  const addToCart = (game) => {
    store.dispatch('toCart', game)
  }
  onMounted(() => {
    store.dispatch("fetchSitter", route.params.id)
  });

  </script>
  
  <style scoped>
  
  .card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  .card {
    transition: all 0.3s ease-in-out;
  }
  .container-fluid {
    background-color: #d6d6d6;
  }
  .cute-button {
    background-color: #000000; /* Pink color */
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-family: 'Arial', sans-serif;
    border-radius: 15px; 
    cursor: pointer;
    transition: all 0.3s ease;  
    text-align: center;
    display: inline-block;
    text-decoration: none;
}

.cute-button:hover {
    background-color: #363435;  
    transform: scale(1.05); 
}

.cute-button:active {
    background-color: #4d4b4b; 
    transform: scale(0.95); 
}

.back-button {
  background-color: #101110; 
  color: white;
  border: none;
  padding: 15px 20px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
}

.back-button:hover {
  background-color: #626763; /* Slightly darker green for hover effect */
}

.back-button:active {
  background-color: #949694; /* Even darker green for active state */
  transform: scale(0.95); /* Slightly shrink the button on click */
}
  </style>