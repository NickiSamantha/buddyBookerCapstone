<template>
<div class="wrapper">
  <NavComp /> 
  <main>
    <router-view />
  </main>
  <FooterComp></FooterComp>
</div>
</template>

<script>
import NavComp from './components/NavBar.vue'
import FooterComp from './components/Footer.vue'

export default {
  components: {
    NavComp,
    FooterComp
  },
};
</script>

<style>

</style>
