<template>
    <footer class="footer container-fluid fixed-bottom ">
    <div class="row">
        <p class="lead">Nicki Abels Copyright &copy;
            <span>{{cYear}}</span>
        </p>
    </div>
</footer>

</template>

<script>
export default {
      name: "FooterComp",
      data () {
          return{
              cYear: new Date ().
              getUTCFullYear()
          }
      },

  }
</script>

<style>
.footer {
    background-color: #d9d9d9;
}
.lead {
   
}

</style>