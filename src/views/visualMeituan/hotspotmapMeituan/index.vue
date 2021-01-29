<template>
  <div class="spatialSampling">
    <el-button type="primary" @click="handleClick">主要按钮</el-button>
    <div id="map_container" />
  </div>
</template>
<script>
import { getinfo, beijing } from '@/api/visualMeituan'
import 'echarts/extension/bmap/bmap'

export default {
  name: 'HotspotmapMeituan',
  data() {
    return {
      points: null
    }
  },
  created() {
    this.handleClick()
  },
  mounted() {
    var map = initMap()

    var point = new BMapGL.Point(113.387456, 23.000406)
    map.centerAndZoom(point, 12)

    var view = new mapvgl.View({
      map: map
    })

    getinfo().then(res => {
      // res = res.result.data[0].bound
      res = res.info.result.data[0].bound
      var data = []
      for (var i = 0; i < res.length; i++) {
        var item = res[i]
        data.push({
          geometry: {
            type: 'Point',
            coordinates: [item[0], item[1]]
          },
          properties: {
            count: item[2]
          }
        })
      }
      console.log('data:', data)
      var heatmap = new mapvgl.HeatmapLayer({
        size: 100, // 单个点绘制大小
        max: 40, // 最大阈值
        height: 0, // 最大高度，默认为0
        unit: 'm', // 单位，m:米，px: 像素
        gradient: { // 对应比例渐变色
          0.25: 'rgba(0, 0, 255, 1)',
          0.55: 'rgba(0, 255, 0, 1)',
          0.85: 'rgba(255, 255, 0, 1)',
          1: 'rgba(255, 0, 0, 1)'
        }
      })
      view.addLayer(heatmap)
      heatmap.setData(data)
      console.log('绘制完成')
    })
  },
  methods: {
    handleClick() {
      getinfo().then(res => {
        this.points = res.data
      })
    }
  }
}
</script>

<style scope lang="scss">
.spatialSampling {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  #map_container {
    width: 100%;
    height: 1200px;
  }
}
</style>
