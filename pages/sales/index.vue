<template>
  <div class="d-flex h-100 content-width border-left">
    <div class="listview flex-grow-1 d-flex flex-column overflow-hidden">
      <div class="listview-navigation border-bottom d-flex p-3 align-items-center">
        <h1 class="mr-3 mb-0">Sales</h1>
        <el-input style="flex: 0 0 350px" placeholder="Search sales" v-model="search" clearable @clear="applySearch">
          <el-button slot="append" icon="el-icon-search" @click="applySearch"></el-button>
        </el-input>
      </div>
      <div class="listview-header p-3 border-bottom">
        <div class="d-flex align-items-center">
          <el-select
            style="width: 340px;"
            size="small"
            class="mr-2"
            v-model="selected_filters.customers"
            placeholder="Customers"
            multiple
            filterable
          >
            <el-option
              v-for="item in customers"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            style="width: 340px;"
            size="small"
            class="mr-2"
            v-model="selected_filters.employees"
            placeholder="Employees"
            multiple
            filterable
          >
            <el-option
              v-for="item in employees"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            class="mr-2"
            size="small"
            v-model="selected_filters.range"
            type="daterange"
            range-separator="-"
            start-placeholder="Start date"
            end-placeholder="End date"
          ></el-date-picker>
          <el-button size="small" @click="applyFilters">Apply Filters</el-button>
        </div>
      </div>
      <div class="listview-content position-relative">
        <sales-table />
      </div>
    </div>
  </div>
</template>

<script>
import SalesTable from './SalesTable'
import { mapGetters, mapActions } from 'vuex'
export default {
  mounted() {
    this.loadFilters()
    this.loadSalesData()
  },
  computed: {
    ...mapGetters({
      loaded: 'sales/getLoaded',
      customers: 'filters/getCustomers',
      employees: 'filters/getEmployees'
    }),
    filters: function() {
      return [
        {
          name: 'Divisions',
          filter: 'divisions',
          type: 'checkbox',
          values: this.divisions
        },
        {
          name: 'Clubs',
          filter: 'clubs',
          type: 'checkbox',
          values: this.clubs
        }
      ]
    }
  },
  data() {
    return {
      selected_filters: {
        customers: [],
        employees: [],
        range: ''
      },
      search: null
    }
  },
  methods: {
    ...mapActions({
      loadSalesData: 'sales/loadSalesData',
      applySalesFilter: 'sales/applySalesFilter',
      searchSales: 'sales/searchSales',
      loadFilters: 'filters/loadFilters'
    }),
    applyFilters() {
      this.applySalesFilter({
        filters: {
          customers: this.selected_filters.customers,
          employees: this.selected_filters.employees,
          range: this.selected_filters.range
        }
      })
    },
    applySearch() {
      this.searchSales({
        search: this.search
      })
    }
  },
  components: {
    SalesTable
  }
}
</script>
