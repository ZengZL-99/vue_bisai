<template>
  <div class="spatialSampling">
    <el-button type="primary" @click="handleClick">主要按钮</el-button>
    <div id="map_container" />
  </div>
</template>
<script>
// import { getinfo, beijing } from '@/api/visualMeituan'
import { mapvgl, BMapGL } from 'vue-mapvgl'
import 'echarts/extension/bmap/bmap'
var bmapgl = new BMapGL.Map('map_container')
var point = new BMapGL.Point(116.403748, 39.915055)
bmapgl.centerAndZoom(point, 17)

// 2. 创建MapVGL图层管理器
var view = new mapvgl.View({
  map: bmapgl
})

// 3. 创建可视化图层，并添加到图层管理器中
var layer = new mapvgl.PointLayer({
  color: 'rgba(50, 50, 200, 1)',
  blend: 'lighter',
  size: 2
})
view.addLayer(layer)

// 4. 准备好规范化坐标数据
var data = [{
  geometry: {
    type: 'POINT',
    coordinates: [116.403748, 39.915055]
  }
}]

// 5. 关联图层与数据，享受震撼的可视化效果
layer.setData(data)
export default {
  name: 'HotspotmapMeituan'

}
</script>

<style scope lang="scss">

</style>
