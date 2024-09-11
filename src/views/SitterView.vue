<template>
    <div class="container-fluid">
      <div class="row">
        <h2 class="display-2">Sitter Details</h2>
      </div>
      <div class="row justify-content-center mt-5" v-if="sitter">
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
 <button @click="addToCart(sitter)">
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
  </style>