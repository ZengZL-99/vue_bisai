<template>
  <div>
    <el-button type="primary" @click="handleClick">主要按钮</el-button>
    <div ref="chart" style="width: 600px;height:400px;" />
    <div ref="chartmap" style="width: 600px;height:400px;" />
  </div>
</template>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=GYqucKgQD6kmLmICzoglATNBV3RITmqq"></script>
<script>
import { getinfo } from '@/api/visualMeituan'
import 'echarts/extension/bmap/bmap'
import { loadBMap }  from '@/components/baidu/map'

export default {
  name: 'HotspotmapMeituan',
  data() {
    return {
      points: null
    }
  },
  created() {
    this.handleClick()
    console.log("created", this.points);
  },
  mounted() {
    this.drawChart()
    console.log('运行mounted')
    loadBMap("GYqucKgQD6kmLmICzoglATNBV3RITmqq").then(() => {
       // 配置option
      this.drawMap()
		})
  },
  methods: {
    handleClick() {
      getinfo().then(res => {
        // this.points = res.data
        console.log("handleClick之前", this.points);
        this.points = [].concat.apply([], res.data.map(track => {
          //console.log('wwwwwpoints', res.data)
          return track.map(seg => {
            //console.log('seg.coord.concat', seg.coord.concat[1])
            return seg.coord.concat([1])
          })
        }/*
         for (let i = 0; i < res.data.length; i++) {
          this.points.push(res.data[i])
        }*/
        ))
        console.log("handleClick之后", this.points);
      })
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.chart)

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      myChart.setOption(option)
    },
    drawMap() {
      this.handleClick()
      const myChartMap = this.$echarts.init(this.$refs.chartmap)
      console.log('opionsMap之前', this.points)
      const optionsMap = {
        animation: false,
        bmap: {
          center: [120.13066322374, 30.240018034923],
          zoom: 14,
          roam: true
        },
        visualMap: {
          show: false,
          top: 'top',
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red']
          }
        },
        series: [{
          type: 'heatmap',
          coordinateSystem: 'bmap',
          data: this.points,
          pointSize: 5,
          blurSize: 6
        }]
      }
      console.log('points-------', this.points)
      myChartMap.setOption(optionsMap)
      var bmap = myChartMap.getModel().getComponent('bmap').getBMap()
      bmap.addControl(new BMap.MapTypeControl())
    }

  }
}
</script>

<style scope>

</style>
