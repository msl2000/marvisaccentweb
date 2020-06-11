<template>
  <div class="main-layout h100v w100h d-flex">
    <leftbar />
    <nuxt />
  </div>
</template>
<script>
import Leftbar from "./app/navigation/Leftbar";
export default {
    components: {
        Leftbar
    }
}
</script>