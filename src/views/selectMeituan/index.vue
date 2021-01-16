<template>
  <div class="toubu">
    <div class="block">
      <span class="demonstration">查询信息</span>
      <el-cascader
        v-model="values"
        :options="options"
        :props="props"
        collapse-tags
        clearable
        placeholder
        separator=">>>"
      />
    </div>
    <el-button type="primary" @click="handleSelect">查询</el-button>
  </div>
</template>

<script>
import { getMtInfo } from '@/api/select'
export default {
  data() {
    return {
      values: null,
      options: [],
      props: { expandTrigger: 'hover', multiple: true }
    }
  },
  created() {
    getMtInfo().then(res => {
      this.options = res.data
    })
  },
  methods: {
    handleSelect() {
      getMtInfo().then(res => {
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
.toubu {
  margin: 100px auto;
  text-align: center;
}
</style>
