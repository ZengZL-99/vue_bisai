<template>
  <div class="dashboard-container">
    欢迎使用商户数据检测平台
  </div>
</template>

<script>
import { test } from '@/api/user'
export default {
  name: 'Dashboard',
  methods: {
    get_test() {
      test()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.img_2 {
  width: 1920px;
  height: 1080px;
  padding-right: 50px;
}
</style>
