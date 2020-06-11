<template>
  <div class="leftbar-layout h100v">
    <mini-logo />
    <div class="menu d-flex flex-column w-100">
      <div class="menu-item w-100" v-for="(item, index) in items" :key="index">
        <a :href="item.href" class="d-flex align-items-center justify-content-center h-100 flex-column">
          <i class="far" :class="item.icon" />
          <!-- <b class="text-muted" style="font-size:0.65rem;">{{item.name}}</b> -->
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import MiniLogo from '~/components/system/MiniLogo'
export default {
  components: {
    MiniLogo
  },
  data() {
    return {
      items: [
        {
          name: 'Dashboard',
          href: '/dashboard',
          icon: 'fa-tachometer-alt-fast'
        },
         {
          name: 'Orders',
          href: '/',
          icon: 'fa-ballot-check'
        },
        {
          name: 'Invoices',
          href: '/',
          icon: 'fa-receipt'
        },
        {
          name: 'Deliveries',
          href: '/',
          icon: 'fa-truck-loading'
        },
        {
          name: 'Products',
          href: '/products',
          icon: 'fa-inventory'
        },
        {
          name: 'Customers',
          href: '/',
          icon: 'fa-smile-wink'
        },
        {
          name: 'Suppliers',
          href: '/',
          icon: 'fa-user-alt'
        },
        {
          name: 'Warehouse',
          href: '/',
          icon: 'fa-warehouse-alt'
        },
      ]
    }
  }
}
</script>