<template>
  <div class="leftbar-layout h100v d-flex flex-column">
    <mini-logo />
    <div class="menu d-flex flex-column w-100 flex-grow-1">
      <div class="menu-item w-100" v-for="(item, index) in items" :key="index">
        <nuxt-link :to="item.href">
          <a class="d-flex align-items-center justify-content-center h-100 flex-column">
            <i class="fad" :class="item.icon" />
            <b class="text-muted mt-2" style="font-size:0.55rem;">{{item.name}}</b>
          </a>
        </nuxt-link>
      </div>
    </div>
    <div class="menu d-flex flex-column w-100">
      <div
        slot="reference"
        class="menu-item w-100 d-flex justify-content-center align-items-center"
      >
        <el-popover class="test" placement="right" width="250" trigger="click">
          <div>
            <div class="bg-light p-3 d-flex flex-column">
              <a class="text-primary mb-3">marvisleung@yahoo.com</a>
              <span>Marvis Leung</span>
            </div>
            <div>
              <el-dropdown-item>Settings</el-dropdown-item>
              <el-dropdown-item>Billings</el-dropdown-item>
              <el-dropdown-item>Logout</el-dropdown-item>
            </div>
          </div>
          <el-avatar
            class="pointer"
            slot="reference"
            size="medium"
            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
          ></el-avatar>
        </el-popover>
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
          name: 'Promotions',
          href: '/products',
          icon: 'fa-percent'
        },
        {
          name: 'Customers',
          href: '/',
          icon: 'fa-smile-wink'
        },
        {
          name: 'Suppliers',
          href: '/suppliers',
          icon: 'fa-user-alt'
        },
        {
          name: 'Warehouse',
          href: '/warehouse',
          icon: 'fa-warehouse-alt'
        },
        {
          name: 'eCommerce',
          href: '/commerce',
          icon: 'fa-shopping-cart',
          options: [
            {
              name: 'eBay',
              href: '/commerce/ebay',
              icon: 'fa-ebay'
            },
            {
              name: 'Shopify',
              href: '/commerce/shopify',
              icon: 'fa-shopify'
            },
            {
              name: 'Amazon',
              href: '/commerce/amazon',
              icon: 'fa-ebay'
            }
          ]
        },
        {
          name: 'POS',
          href: '/warehouse',
          icon: 'fa-cash-register'
        }
      ]
    }
  }
}
</script>

<style >

</style>