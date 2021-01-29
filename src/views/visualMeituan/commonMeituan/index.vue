<template>
  <div class="main">
    <div id="hd_bar" ref="mybar" class="hd_bar" />
    <div id="hd_pie" ref="mypie" class="hd_pie" />
  </div>

</template>

<script>
import { get_area_mark, get_area_count } from '@/api/visualMeituan'
export default {
  name: 'App',
  data() {
    return {
      mark_seriesData: [],
      mark_legendData: []
    }
  },
  watch: {
    'mark_seriesData': function() {
      this.$nextTick(() => {
        this.myEcharts()
      })
    }
  },
  beforeMount() {
    this.get_data()
  },
  methods: {
    get_data() {
      get_area_mark().then(res => {
        res.data.forEach(el => {
          this.mark_seriesData.push(el.meanMark)
          this.mark_legendData.push(el.areaName)
        })
      })
    },
    myEcharts() {
      console.log('嗡嗡嗡', this.legendData)
      console.log('zzz', this.seriesData)
      var myPie = this.$echarts.init(document.getElementById('hd_bar'))
      var option = {
        title: {
          text: '各区域平均评论数',
          left: 'center'
        },
        tooltip: {},
        legend: {
          data: ['评论数'],
          left: 'right'
        },
        xAxis: {
          type: 'category',
          data: this.mark_legendData
        },
        yAxis: {},
        series: [{
          name: '评论数',
          type: 'bar',
          data: this.mark_seriesData// [795, 278, 379, 60, 464, 179, 197, 14, 678, 68, 173, 513, 128, 398, 331, 294, 218, 98, 136, 295, 731, 1589, 148, 190, 223, 228, 82, 284]
        }]
      }
      myPie.setOption(option)
    }
  }
}
</script>

<style scope lang="scss">

.hd_bar, .hd_pie {
  width: 1000px;
  height: 500px;
}
</style>
