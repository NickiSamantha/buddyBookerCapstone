<template>
    <div class="container-fluid">
      <div class="row">
        <h2 class="display-2">Our Sitters</h2>
      </div>
      <div class="row gap-2 justify-content-center" v-if="sitters">
        <CardComp v-for="sitter  in sitters" :key="sitter.sitID">
          <template #cardHeader>
            <img
              :src="sitter.imageURL"
              loading="lazy"
              class="img-fluid"
              :alt="sitter.firstName"
            />
          </template>
          <template #cardBody>
            <h5 class="card-title fw-bold">{{ sitter.firstName }} </h5>
            <p class="lead">
              <span class="text-tertiary fw-bold">Qualification</span>: {{
                sitter.qualification
              }}
            </p>
            <div class="button-wrapper">
  <router-link
                :to="{ name: 'sitter', params: { id: sitter.sitID } }"
                class="btn btn-dark"
                > 
                View Profile
            </router-link>
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
  const store = useStore();
  const sitters = computed(() => store.state.sitters);
  onMounted(() => {
    store.dispatch("fetchSitters")
    console.log("fetchSitters");
  });
  </script>
  
  <style scoped>
  
  
  .card:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  .button-wrapper button,
  .card {
    transition: all 0.3s ease-in-out;
  }
  
  
  </style>