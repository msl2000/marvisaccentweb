<template>
  <div class="p-4">
    <div>
      <h1>Dashboard</h1>
     
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  components: {
    // Logo
  },
  data() {
    return {
      form: {
        username: null,
        password: null,
        remember: false
      }
    }
  }
}
</script>
