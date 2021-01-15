<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ name }}</div>
    <button @click="get_test">测试</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { test } from '@/api/user'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    get_test(){
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
</style>
