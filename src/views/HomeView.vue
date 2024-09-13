<template>
  <div class="container-fluid">
    <div class="row">
      <div class="hero"
      data-aos="fade-right"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
      <div class="hero-content">
        <h1 class="display-2"
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-delay="300"
        >Welcome to BuddyBooker 
        </h1>
        <i>Your Trusted Babysitting Solution</i>
        <router-link to="/sitters" class="btn btn-secondary match">Find your sitter</router-link>
    
      </div>
     </div>
   </div>

  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
   
  },
  computed: {
  
  },
  mounted() {
}
}
</script>
<style>
.match {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}
.hero {
  background: url('https://nickisamantha.github.io/allImages/images/bblogo.png') no-repeat center center;
  background-size: contain ; 
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(9, 9, 9);
  text-align: center;
  transition : opacity 1s ease-in-out;
  font-family: '';
}
.hero-content{
  text-align: center;
}

.hero h1 , .hero i {
  background-color: rgba(209, 186, 186, 0.5);
  padding: 20px;
  transition : opacity 1s ease-in-out;
  display:block;
  margin: 0;
  padding: 0;
}
.container-fluid{
  background-color: #d9d9d9;
}
</style>
