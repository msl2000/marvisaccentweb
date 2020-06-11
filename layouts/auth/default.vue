<template>
  <div class="container">
    <div class="d-flex m-auto auth-base h-100 flex-column justify-content-between align-items-center">
      <div class="w-100 p-3 mt-4 text-center">
          <logo />
      </div>
      <div class="p-3 px-5 text-left w-100">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/system/Logo"
export default {
  components: {
    Logo
  }
}
</script>

<style scoped>
.auth-base {
    width: 500px;
}
</style>