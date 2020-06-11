<template>
  <div class="d-flex w-100 h-100">
    <div class="object-group-list border-right p-4">
      <h1>Products</h1>
    </div>
    <div class="listview flex-grow-1 d-flex flex-column">
      <div class="listview-navigation border-bottom d-flex p-3">
        <el-input style="flex: 0 0 330px" placeholder="Search products"></el-input>
        <div class="h-100 flex-grow-1 d-flex justify-content-start align-items-start">
            <el-tag class="ml-2" size="small" effect="plain">Status <i class="fal fa-chevron-down ml-2"/></el-tag>
        </div>
      </div>
      <div class="listview-header d-flex border-bottom"></div>
      <div class="listview-content flex-grow-1"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
