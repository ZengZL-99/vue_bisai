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
  created() {
    get_categories().then(res => {
      this.options = res.data
    })
  },
  methods: {
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
