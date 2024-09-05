<template>
    <div class="container vh-100">
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
              <!-- {{ sitter.reviewText}} -->
            </p>
            <p class="lead">
              <span class="text-tertiary fw-bold">Qualification</span>:{{
                sitter.qualification
              }}
            </p>
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
  </style>