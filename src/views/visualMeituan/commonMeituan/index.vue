<template>
  <div class="main">
    <div id="hd_bar" ref="mybar" class="hd_bar" />
    <div id="myareaCount" class="hd_pie" />
    <div id="myscoreData" class="hd_pie" />
  </div>

</template>

<script>
import { getAreaMark, getAreaCount, getPhoneCount, getScoreData } from '@/api/visualMeituan'
export default {
  name: 'App',
  data() {
    return {
      markSeriesData: [],
      markLegendData: [],
      areaCount: [],
      phoneSeriesData: [],
      phoneLegendData: [],
      scoreData: []
    }
  },
  watch: {
    'markSeriesData': function() {
      this.$nextTick(() => {
        this.myEcharts()
      })
    },
    'areaCount': function() {
      this.$nextTick(() => {
        this.areaCountEcharts()
      })
    },
    'scoreData': function() {
      this.$nextTick(() => {
        this.scoreDataEcharts()
      })
    }
  },
  beforeMount() {
    this.getData()
    this.reqScoreData()
    this.reqAreaData()
  },
  methods: {
    getData() {
      getAreaMark().then(res => {
        res.data.forEach(el => {
          this.markSeriesData.push(el.meanMark)
          this.markLegendData.push(el.areaName)
        })
      })
      /*
      getPhoneCount().then(res => {
        res.data.forEach(el => {
          this.phoneSeriesData.push()
          this.phoneLegendData.push()
        })
      })*/
    },
    reqAreaData() {
      getAreaCount().then(res => {
        this.areaCount = res.data
      })
    },
    reqScoreData() {
      getScoreData().then(res => {
        this.scoreData = res.data
      })
    },
    myEcharts() {
      var myBar = this.$echarts.init(document.getElementById('hd_bar'))
      const optionBar = {
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
          data: this.markLegendData
        },
        yAxis: {},
        series: [{
          name: '评论数',
          type: 'bar',
          data: this.markSeriesData// [795, 278, 379, 60, 464, 179, 197, 14, 678, 68, 173, 513, 128, 398, 331, 294, 218, 98, 136, 295, 731, 1589, 148, 190, 223, 228, 82, 284]
        }]
      }
      myBar.setOption(optionBar)
    },
    areaCountEcharts() {
      var myareaCount = this.$echarts.init(document.getElementById('myareaCount'))
      const optionAreaCount = {
        title: {
          text: '各个区域的商铺总数',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '商铺分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 20,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.areaCount
          }
        ]
      }
      myareaCount.setOption(optionAreaCount)
    },
    scoreDataEcharts() {
      var myscoreData = this.$echarts.init(document.getElementById('myscoreData'))
      const optionScoreData = {
        title: {
          text: '评分分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '评分分布',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 20,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.scoreData
          }
        ]
      }
      myscoreData.setOption(optionScoreData)
    }
  }
}
</script>

<style scope lang="scss">

.hd_bar{
  margin-top: 20px;
  width: 1000px;
  height: 600px;
  margin-left: 50%;
  right: 500px;
  box-shadow: 5px 10px 10px 5px #888888;
  border-radius: 10px;
}
.hd_pie  {
  margin-top: 20px;
  width: 1000px;
  height: 700px;
  margin-left: 50%;
  right: 500px;
  box-shadow: 5px 10px 10px 5px #888888;
  border-radius: 10px;
}
</style>
