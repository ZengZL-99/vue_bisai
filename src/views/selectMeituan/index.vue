<template>
  <div>
    <el-button type="primary" @click="handleSelect">查询</el-button>
  </div>
</template>

<script>
import { get_mt_info } from '@/api/select'
export default {
  data(){
    return {
      data: []
    }
  },
  methods: {
    handleSelect(){
      get_mt_info().then(response => {
          
      })
    }
  } 
}
</script>


<style scoped>

</style>