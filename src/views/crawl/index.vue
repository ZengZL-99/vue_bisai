<template>
  <div class="s-center">
    <div class="block">
      <span class="demonstration">折叠展示Tag</span>
      <el-cascader
        v-model="values"
        :options="options"
        :props="props"
        collapse-tags
        clearable
        size="medium"
        @change="handleChange"
      />
    </div>
    <button @click="handelCategories">查询</button>
    <el-button type="primary" round @click="handleValues">查看values</el-button>
  </div>
</template>

<script>
import { get_categories } from '@/api/crawl'
export default {
  name: 'Crawl',
  data() {
    return {
      props: { expandTrigger: 'hover', multiple: true },
      options: [],
      values: null
    }
  },
  methods: {
    handelCategories() {
      get_categories().then(res => {
        console.log('res???', res.data)
        this.options = res.data
      })
    },
    handleValues() {
      console.log('values', this.values)
    },
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>

<style scoped>
.s-center{
  margin: 100px auto;
  text-align: center;
}
</style>
