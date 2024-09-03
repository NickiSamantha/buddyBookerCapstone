<template>
<div>
  <NavComp /> 
  <main>
    <router-view />
  </main>
  <FooterComp class="mt-auto"></FooterComp>
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
