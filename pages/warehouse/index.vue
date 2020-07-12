<template>
  <div class="d-flex h-100 content-width border-left">
    <div class="listview flex-grow-1 d-flex flex-column overflow-hidden">
      <div class="listview-navigation border-bottom d-flex p-3 align-items-center">
        <h1 class="mr-3 mb-0">Suppliers</h1>
        <el-input style="flex: 0 0 350px" placeholder="Search suppliers">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="h-100 flex-grow-1 d-flex justify-content-end align-items-center">
          <button class="btn btn-tranparent" @click="filters_toggled = !filters_toggled">
            <small>
              <el-badge :value="active_filters.length" :max="99" class="item">
                <i class="fas fa-filter px-1" />
              </el-badge>
            </small>
          </button>
          <el-dropdown trigger="click">
            <button class="btn btn-transparent">
              <i class="fas fa-eye-slash" />
            </button>
            <el-dropdown-menu slot="dropdown" width="500" class="p-3">
              <div style="width: 270px">
                <h3 class="mb-2">Displayed Information</h3>
                <el-checkbox-group class="d-flex flex-column mt-1" v-model="checkList">
                  <el-checkbox label="Name"></el-checkbox>
                  <el-checkbox label="SKU"></el-checkbox>
                  <el-checkbox label="Barcode"></el-checkbox>
                  <el-checkbox label="Available"></el-checkbox>
                  <el-checkbox label="On Hand"></el-checkbox>
                  <el-checkbox label="Incoming"></el-checkbox>
                  <el-checkbox label="Pending Orders"></el-checkbox>
                  <el-checkbox label="Sold"></el-checkbox>
                  <el-checkbox label="Self Price"></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
          <button class="btn btn-tranparent">
            <i class="fal fa-plus" />
          </button>
        </div>
      </div>
      <slide-up-down :active="active_filters.length > 0 || filters_toggled" :duration="400">
        <div class="listview-header p-3 border-bottom">
          <div v-if="filters_toggled">
            <el-select
              size="small"
              class="mr-2"
              v-model="value"
              placeholder="Supplier"
              allow-create
              filterable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select size="small" class="mr-2" v-model="value" placeholder="Status">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div v-else>
            <el-tag
              class="mr-2 mt-1 rounded"
              v-for="filter in active_filters"
              :key="filter.name"
              closable
              type="info"
              effect="plain"
              @close="handleClose(filter)"
            >{{filter.name}}</el-tag>
          </div>
        </div>
      </slide-up-down>
      <div class="listview-content position-relative">
        <el-table
          ref="multipleTable"
          :data="tableData"
          @selection-change="handleSelectionChange"
          size="medium"
        >
          <el-table-column fixed type="selection" width="55"></el-table-column>
          <el-table-column property="image" label fixed width="60">
            <template slot-scope="scope">
              <el-avatar shape="square" size="small" :src="scope.row.image"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column property="name" label="Company Name" fixed width="250" sortable>
            <template slot-scope="scope">
              <a class="text-primary pointer">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column property="contact_person" label="Contact Person" sortable width="200"></el-table-column>
          <el-table-column property="contact_email" label="Contact Email" width="200"></el-table-column>
          <el-table-column property="cc_email" label="CC Email" show-overflow-tooltip width="200">
              <template slot-scope="scope">
                  <span v-for="email in scope.row.cc_email">{{email}}, </span>
            </template>
          </el-table-column>
           <el-table-column property="contact_phone" label="Contact Phone" width="200"></el-table-column>
           <el-table-column property="location" label="Location" sortable width="200"></el-table-column>
           <el-table-column property="address" label="Address" width="270"></el-table-column>
           <el-table-column property="payment_term" label="Payment Term" width="150"></el-table-column>
           <el-table-column property="tax" label="Tax" width="150"></el-table-column>
           <el-table-column property="notes" label="Notes" width="250"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down'
export default {
  data() {
    return {
      checkList: ['selected and disabled', 'Option A'],
      tableData: [{
          image: "https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/roofing-company-logo.jpg",
          name: "Company XYZ",
          contact_person: "John Smith",
          contact_email: "jsmith@test.com",
          cc_email: [
              "testsmith@test.com",
              "dude@test.com"
          ],
          contact_phone: "042222222",
          location: "Sydney, Australia",
          address: "20 XYZ Street, Sydney, NSW 2000",
          payment_term: "",
          tax: "",
          notes: "This is a company"

      }],
      filters_toggled: false,
      active_filters: [
        {
          name: 'IT Managed Services'
        },
        {
          name: 'Shirts'
        },
        {
          name: 'Nike'
        }
      ],
      multipleSelection: [],
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      value: ''
    }
  },
  methods: {
    handleClose(tag) {
      this.active_filters.splice(this.active_filters.indexOf(tag), 1)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  },
  components: {
    SlideUpDown
  }
}
</script>
