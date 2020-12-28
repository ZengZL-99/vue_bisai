<template>
  <div>
    <button @click="get_data">点击</button>
  </div>
</template>

<script>
import { get_test } from '@/api/test_api'
export default {
  name: 'Test',
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    get_data() {
      get_test().then(response => {
        this.msg = response.data
        alert(this.msg)
      })
    }
  }
}
</script>
