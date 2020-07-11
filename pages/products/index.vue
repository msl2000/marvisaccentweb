<template>
  <div class="d-flex h-100 content-width">
    <div class="object-group-list border-right p-4">
      <h1 class="mb-5">Products</h1>
      <div class="d-flex flex-column">
        <h3>
          Catalogue
          <i class="ml-2 fal fa-chevron-down" />
        </h3>
        <div class="px-3 d-flex flex-column">
          <span class="mt-2">All</span>
          <span class="mt-2">Clothes</span>
          <span class="mt-2">Pants</span>
        </div>
      </div>
    </div>
    <div class="listview flex-grow-1 d-flex flex-column overflow-hidden">
      <div class="listview-navigation border-bottom d-flex p-3">
        <el-input style="flex: 0 0 350px" placeholder="Search products">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="h-100 flex-grow-1 d-flex justify-content-end align-items-center">
          <button class="btn btn-tranparent" @click="filters_toggled = !filters_toggled">
            <small>
              <el-badge :value="20" :max="99" class="item">
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
      <div class="flex-grow-1 d-flex flex-column listview-content position-relative">
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
          <el-table-column property="name" label="Name" fixed width="250" sortable>
            <template slot-scope="scope">
              <a class="text-primary pointer">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column property="sku" label="SKU" sortable width="250"></el-table-column>
          <el-table-column property="barcode" label="Barcode" sortable width="150"></el-table-column>
          <el-table-column property="available" label="Available" width="150"></el-table-column>
          <el-table-column property="on_hand" label="On Hand" width="150"></el-table-column>
          <el-table-column property="incoming" label="Incoming" width="150"></el-table-column>
          <el-table-column property="pending_orders" label="Pending Orders" width="150"></el-table-column>
          <el-table-column property="sold" label="Sold" width="150"></el-table-column>
          <el-table-column property="self_price" label="Self Price" width="150">
            <template slot-scope="scope">
              <i class="fad fa-dollar-sign" />
              {{scope.row.self_price}}
            </template>
          </el-table-column>
          <el-table-column property="wholesale_price" label="Wholesale Price" width="150">
            <template slot-scope="scope">
              <i class="fad fa-dollar-sign" />
              {{scope.row.wholesale_price}}
            </template>
          </el-table-column>
          <el-table-column property="cost" label="Cost" width="150">
            <template slot-scope="scope">
              <i class="fad fa-dollar-sign" />
              {{scope.row.cost}}
            </template>
          </el-table-column>
          <el-table-column property="tags" label="Tags" width="150">
            <template slot-scope="scope">
              <el-tag size="mini" v-for="(tag, index) in scope.row.tags" :key="index">{{tag}}</el-tag>
            </template>
          </el-table-column>
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
      tableData: [
        {
          image:
            'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/1280x1280/products/478/16879/Bulk_Buy_Plain_slim_fit_Ringer_Tshirt-White_Red__80053.1555070388.jpg?c=2',
          name: 'White T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/460x460/products/909/15534/Kids-Plain-Poly-Fit-Quick_Dry-Tshirt-red__99515.1541591234.jpg?c=2&imbypass=on',
          name: 'Red T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://www.celine.com/on/demandware.static/-/Sites-masterCatalog/default/dw9aa699ca/images/large/2X351501F.25PQ_1_SPR20_461508v2.jpg',
          name: 'Pink T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/1280x1280/products/478/16879/Bulk_Buy_Plain_slim_fit_Ringer_Tshirt-White_Red__80053.1555070388.jpg?c=2',
          name: 'White T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/460x460/products/909/15534/Kids-Plain-Poly-Fit-Quick_Dry-Tshirt-red__99515.1541591234.jpg?c=2&imbypass=on',
          name: 'Red T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://www.celine.com/on/demandware.static/-/Sites-masterCatalog/default/dw9aa699ca/images/large/2X351501F.25PQ_1_SPR20_461508v2.jpg',
          name: 'Pink T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/1280x1280/products/478/16879/Bulk_Buy_Plain_slim_fit_Ringer_Tshirt-White_Red__80053.1555070388.jpg?c=2',
          name: 'White T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://cdn11.bigcommerce.com/s-rxzabllq/images/stencil/460x460/products/909/15534/Kids-Plain-Poly-Fit-Quick_Dry-Tshirt-red__99515.1541591234.jpg?c=2&imbypass=on',
          name: 'Red T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        },
        {
          image:
            'https://www.celine.com/on/demandware.static/-/Sites-masterCatalog/default/dw9aa699ca/images/large/2X351501F.25PQ_1_SPR20_461508v2.jpg',
          name: 'Pink T-Shirt',
          sku: 'sku123123',
          barcode: '342384703',
          available: 200,
          on_hand: 200,
          incoming: 5,
          pending_orders: 2,
          sold: 120,
          self_price: 150,
          wholesale_price: 140,
          cost: 120,
          tags: ['Clothing', 'Winner'],
          category: 'shirt'
        }
      ],
      filters_toggled: false,
      active_filters: [
        {
          name: 'T-Shirts'
        },
        {
          name: 'Shorts'
        },
        {
          name: 'Short in supply'
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
