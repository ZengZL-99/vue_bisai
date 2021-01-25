<template>
  <div id="allmap" />
</template>

<script>
let BMap = {}
let map = {}
export default {
  name: 'App',
  data() {
    return {
      map: {}
    }
  },
  mounted() {
    this.loadJScript()
  },
  methods: {
    loadJScript() {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src =
      'https://api.map.baidu.com/getscript?v=3.0&ak=GYqucKgQD6kmLmICzoglATNBV3RITmqq'
      script.onload = () => {
        this.init()
      }
      document.body.appendChild(script)
    },
    init() {
      BMap = window.BMap
      map = new BMap.Map('allmap')
      map.centerAndZoom(new BMap.Point(118.904, 31.915), 8)
      map.setCurrentCity('南京')
      map.enableScrollWheelZoom(true)
    }
  }
}
</script>

<style scope>
#allmap{
  width: 1000px;
  height: 1000px;
}
</style>
