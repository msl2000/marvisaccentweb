<template>
  <div class="p-4 w-100">
    <el-card class="box-card w-100 mb-3">
      <div class="d-flex align-items-center w-100 mb-3">
        <h3 class="mb-0">Sales past 30 days</h3>
        <el-date-picker
          class="mx-3"
          size="small"
          @change="apply"
          v-model="date"
          :type="filter_by"
          :format="format"
          placeholder="Pick a month"
        ></el-date-picker>
        <div class="flex-grow-1 d-flex justify-content-end">
          <template>
            <el-select @change="apply" size="small" v-model="filter_by" placeholder="Filter By">
              <el-option
                v-for="item in filter_by_options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </div>
      </div>
      <bar-chart :options="options" :chart-data="statistics"></bar-chart>
    </el-card>
    <div class="row align-items-center">
      <div
        class="p-5 col-lg-6 col-sm-pull-12 col-sm-12 h-100 d-flex flex-column justify-content-center align-items-center h-100"
      >
        <h1>Accent Group Coding Challenge</h1>
        <h3 class="text-muted">FrontEnd: VueJS(Using NuxtJS)</h3>
        <h3 class="text-muted">Database: MYSQL</h3>
        <h3 class="text-muted">Database: MYSQL</h3>
      </div>
      <div class="col-lg-6 col-sm-push-12 col-sm-12">
        <el-card class="box-card w-100">
          <h3>Sales Leaderboard</h3>
          <ul class="list-group list-group-flush">
            <li
              class="list-group-item d-flex justify-content-between"
              v-for="employee in employees"
              :key="employee.attributes.name"
            >
              <span>{{employee.attributes.name}}</span>
              <b>
                <i class="fad fa-dollar-sign mr-2" />
                {{employee.attributes.sums}}
              </b>
            </li>
          </ul>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BarChart from '~/components/charts/BarChart'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      date: '',
      filter_by: 'month',
      filter_by_options: [
        {
          name: 'Month',
          value: 'month'
        },
        {
          name: 'Year',
          value: 'year'
        }
      ]
    }
  },
  mounted() {
    this.date = new Date()
    this.date.setMonth(this.date.getMonth() - 1)
    this.init({
      date: this.date,
      filter_by: this.filter_by
    })
    this.loadEmployees()
  },
  computed: {
    ...mapGetters({
      statistics: 'statistics/getStatistics',
      employees: 'employees/getEmployees'
    }),
    format: function() {
      if (this.filter_by === 'month') return 'MMM yyyy'
      else return 'yyyy'
    }
  },
  methods: {
    ...mapActions({
      init: 'statistics/init',
      applyFilters: 'statistics/applyFilters',
      loadEmployees: 'employees/loadEmployees'
    }),
    apply() {
      var format = 'YYYY/MM/DD HH:mm:ss ZZ'
      var zone = 'Australia/Sydney'
      this.applyFilters({
        filters: {
          filter_by: this.filter_by,
          date: moment.tz(this.date, zone).format(format)
        }
      })
    }
  }
}
</script>
