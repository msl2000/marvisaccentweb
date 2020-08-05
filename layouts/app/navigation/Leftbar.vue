<template>
  <div class="leftbar-layout h100v d-flex flex-column">
    <div class="menu d-flex flex-column w-100 flex-grow-1 mt-2">
      <div class="menu-item w-100" v-for="(item, index) in items" :key="index">
        <nuxt-link :to="item.href">
          <a class="d-flex align-items-center justify-content-center h-100 flex-column">
            <i class="fad" :class="item.icon" />
            <b class="text-muted mt-2" style="font-size:0.55rem;">{{item.name}}</b>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'fa-tachometer-alt-fast'
        },
        {
          name: 'Sales',
          href: '/sales',
          icon: 'fa-ballot-check'
        },
      ]
    }
  }
}
</script>

<style >

</style>