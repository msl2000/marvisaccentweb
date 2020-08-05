<template>
  <el-table
    height="calc(100vh - 140px)"
    ref="multipleTable"
    :data="sales"
    size="medium"
    v-el-table-infinite-scroll="loadSalesData"
    :empty-text="loaded ? 'No Data' : 'Please wait, loading data...'"
  >
    <el-table-column property="id" label="Reference ID" fixed min-width="200">
      <template slot-scope="scope">
        <a class="text-primary pointer">{{scope.row.id}}</a>
      </template>
    </el-table-column>
    <el-table-column property="product_name" label="Product" min-width="200"></el-table-column>
    <el-table-column property="sales_person" label="Sales Person" min-width="200"></el-table-column>
    <el-table-column property="customer_name" label="Customer Name" min-width="200"></el-table-column>
    <el-table-column property="date" label="Date" show-overflow-tooltip min-width="200">
      <template slot-scope="scope">
        <span>{{scope.row.date | moment("MMMM Do YYYY")}}</span>
      </template>
    </el-table-column>
    <el-table-column property="price" label="Price" show-overflow-tooltip min-width="200">
      <template slot-scope="scope">
        <span>
          <i class="mr-2 fas fa-dollar-sign" />
          {{scope.row.price}}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['loaded'],
  computed: {
    ...mapGetters({
      sales: 'sales/getSales',
    })
  },
  methods: {
    ...mapActions({
      loadSalesData: 'sales/loadSalesData'
    })
  },
  directives: {
    'el-table-infinite-scroll': elTableInfiniteScroll
  }
}
</script>