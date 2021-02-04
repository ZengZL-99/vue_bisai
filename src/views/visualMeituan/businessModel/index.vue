<template>
  <div class="bmap-page-container">
    <el-bmap vid="bmapDemo" :tilt="60" :zoom="zoom" :center="center" class="bmap-demo">
      <el-bmapv-view>
        <el-bmapv-heat-map-layer :size="600" :gradient="gradient" :data="data" />
      </el-bmapv-view>
    </el-bmap>
  </div>
</template>

<script>
import { getinfo_v2 } from '@/api/visualMeituan'
export default {
  name: 'BmapPage',
  data() {
    return {
      count: 1,
      zoom: 14,
      center: [113.297456, 23.210406],
      tilt: 45,
      gradient: {
        0.0: 'rgb(50, 50, 256)',
        0.1: 'rgb(50, 250, 56)',
        0.5: 'rgb(250, 250, 56)',
        1.0: 'rgb(250, 50, 56)'
      },
      data: []
    }
  },
  mounted() {
    getinfo_v2().then(res => {
      this.data = res.data
    })
  },
  methods: {
  }

}
</script>

<style scope>
.bmap-demo {
  height: 1000px;
}
</style>
