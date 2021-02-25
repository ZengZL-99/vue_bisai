<template>
  <div class="main">
    <div id="hd_bar" ref="mybar" class="hd_bar" />
    <div id="myareaCount" class="hd_pie" />
    <div id="myscoreData" class="hd_pie" />
  </div>

</template>

<script>
import { getAreaMark, getAreaCount, getScoreData } from '@/api/visualMeituan'
export default {
  name: 'App',
  data() {
    return {
      markSeriesData: [],
      markLegendData: [],
      areaCount: [],
      phoneSeriesData: [],
      phoneLegendData: [],
      scoreData: [],
      oneScoreData: []
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
    this.reqMarkaData()
    this.reqScoreData()
    this.reqAreaData()
  },
  methods: {
    reqMarkaData() {
      /*
      getDataAll().then(res => {
        console.log(Object.keys(res.data[0]))
        res.data[0]['alyMark'].forEach(el => {
          this.markSeriesData.push(el.meanMark)
          this.markLegendData.push(el.areaName)
        })
        this.areaCount = res.data[0].alyArea
        this.scoreData = res.data[0].alyScore
      })*/

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
        this.scoreData = res.data[0].score_list
        console.log(res.data[0].score_list)
        this.oneScoreData = res.data[1].one_score_list
        console.log(res.data[1])
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
        yAxis: {
          axisLine: {
            show: false // y轴线消失
          },
          axisTick: {
            show: false // y轴坐标点消失
          }
        },
        series: [{
          name: '评论数',
          type: 'bar',
          itemStyle: {
            color: 'SkyBlue',
            // borderRadius: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 10
          },
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
          left: 'center',
          top: '2%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          left: 'center',
          bottom: '2%'
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
          left: 'center',
          top: '2%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '2%',
          left: 'center'
        },
        series: [
          {
            name: '分布',
            type: 'pie',
            selectedMode: 'single',
            radius: ['20%', '35%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: this.oneScoreData
          },
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
.main {
  div {
    margin-bottom: 40px;
  }
}
</style>
