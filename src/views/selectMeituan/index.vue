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
import { getMtInfo, getMtData } from '@/api/select'
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
      const selectList = []
      for (let i = 0; i < this.values.length; i++) {
        selectList.push(this.values[i][1])
      }
      console.log('列表', selectList)
      getMtData(selectList).then(res => {
        console.log(res)
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
