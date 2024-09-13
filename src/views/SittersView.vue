<template>
    <div class="container-fluid ">
      <div class="row"
      data-aos="fade-right"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
        <h2 class="display-2 text-center"
        
        >Meet Our Sitters</h2>
        <p class="text-center p-4">We’re pleased to introduce our team of experienced and reliable babysitters. Each of them is ready to provide exceptional care for your children. Below, you'll find a brief introduction to each babysitter along with their base hourly rates.</p>
      </div>
     

<div class="row bbys p-3" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="300">
        <h1>Our Babysitters</h1>
        <div class="babysitter text-center ">
            <h2>Nikita</h2>
            <p><strong>Base Hourly Rate:</strong> R15</p>
            <p><strong>Experience:</strong> 5 years of experience in early childhood education and care.</p>
            <p><strong>Specialties:</strong> Infant care, tutoring, and engaging activities.</p>
            <h2>Melanie</h2>
            <p><strong>Base Hourly Rate:</strong> R17</p>
            <p><strong>Experience:</strong> 3 years of experience with children of all ages, including special needs.</p>
            <p><strong>Specialties:</strong> Outdoor activities, creative projects, and bedtime routines.</p>
            <h2>Gillian</h2>
            <p><strong>Base Hourly Rate:</strong> R16</p>
            <p><strong>Experience:</strong> 4 years of experience working with young children and teens.</p>
            <p><strong>Specialties:</strong> Homework help, arts and crafts, and meal preparation.</p>
            <h2>Amy</h2>
            <p><strong>Base Hourly Rate:</strong> R14</p>
            <p><strong>Experience:</strong> 6 years of experience in childcare and mentoring.</p>
            <p><strong>Specialties:</strong> Sports and physical activities, and educational games.</p>
        </div>
     </div>
<!-- search input -->
<div class="row m-5 mt-5">
      <div class="col-md-6 mx-auto text-center mb-4">

    <input v-model="searchQuery" type="text"
      class="form-control" placeholder="Search by Name or Qualification"/>
      </div>
</div>

    <!-- Display Sitters or Spinner -->
    <div v-if="isLoading">
      <Spinner />
    </div>
    <div  v-else >
      <div v-if="filteredSitters">
        <div class="row gap-2 justify-content-center">
          <CardComp
          v-for="sitter in filteredSitters"
          :key="sitter.sitID"
          data-aos="fade-down"
          data-aos-anchor-placement="top-bottom"
          data-aos-delay="index * 1000"
        >
          <template #cardHeader>
            <img
              :src="sitter.imageURL"
              loading="lazy"
              class="img-fluid img"
              :alt="sitter.firstName"
            />
          </template>
          <template #cardBody>
            <h5 class="card-title fw-bold">{{ sitter.firstName }}</h5>
            <p class="lead">
              <span class="text-tertiary fw-bold">Qualification</span>: {{ sitter.qualification }}
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
       
      </div>
      <div v-else>
     <Spinner/>
    </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { useStore } from "vuex";
  import { computed,ref,  onMounted } from "vue";
  import Spinner from "../components/Spinner.vue";
  import CardComp from "../components/CardComp.vue";
  const store = useStore();
  const searchQuery = ref('');

  const sitters = computed(() => store.state.sitters);

  const filteredSitters = computed(() => {
  if (!searchQuery.value) return sitters.value;

  const query = searchQuery.value.toLowerCase();
  return sitters.value.filter(sitter =>
    sitter.firstName.toLowerCase().includes(query) ||
    sitter.qualification.toLowerCase().includes(query)
  );
  });
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
  .img{
    width: 5rem ;
   border: 1px solid  #e8d9cd;
   cursor: pointer;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.babysitter {
    margin-bottom: 20px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    
}

.babysitter:last-child {
    border-bottom: none;
}
.bbys{
  background-color: #e1ea6a;
  padding: 5px;
}
  </style>