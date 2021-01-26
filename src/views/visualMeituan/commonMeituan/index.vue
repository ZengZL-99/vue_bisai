<template>
  <div class="spatialSampling">
    <div id="map" />
    <div id="map_container" />
  </div>

</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      map: {},
      heatmapOverlay: '',
      points: [
        { 'lng': 123.418261, 'lat': 41.921984, 'count': 50 },
        { 'lng': 123.423332, 'lat': 41.916532, 'count': 51 },
        { 'lng': 123.419787, 'lat': 41.930658, 'count': 15 },
        { 'lng': 123.418455, 'lat': 41.920921, 'count': 40 },
        { 'lng': 123.418843, 'lat': 41.915516, 'count': 100 },
        { 'lng': 123.42546, 'lat': 41.918503, 'count': 6 },
        { 'lng': 123.423289, 'lat': 41.919989, 'count': 18 },
        { 'lng': 123.418162, 'lat': 41.915051, 'count': 80 },
        { 'lng': 123.422039, 'lat': 41.91782, 'count': 11 },
        { 'lng': 123.41387, 'lat': 41.917253, 'count': 7 },
        { 'lng': 123.41773, 'lat': 41.919426, 'count': 42 },
        { 'lng': 123.421107, 'lat': 41.916445, 'count': 4 },
        { 'lng': 123.417521, 'lat': 41.917943, 'count': 27 },
        { 'lng': 123.419812, 'lat': 41.920836, 'count': 23 },
        { 'lng': 123.420682, 'lat': 41.91463, 'count': 60 },
        { 'lng': 123.415424, 'lat': 41.924675, 'count': 8 },
        { 'lng': 123.419242, 'lat': 41.914509, 'count': 15 },
        { 'lng': 123.422766, 'lat': 41.921408, 'count': 25 },
        { 'lng': 123.421674, 'lat': 41.924396, 'count': 21 },
        { 'lng': 123.427268, 'lat': 41.92267, 'count': 1 },
        { 'lng': 123.417721, 'lat': 41.920034, 'count': 51 },
        { 'lng': 123.412456, 'lat': 41.92667, 'count': 7 },
        { 'lng': 123.420432, 'lat': 41.919114, 'count': 11 },
        { 'lng': 123.425013, 'lat': 41.921611, 'count': 35 },
        { 'lng': 123.418733, 'lat': 41.931037, 'count': 22 },
        { 'lng': 123.419336, 'lat': 41.931134, 'count': 4 },
        { 'lng': 123.413557, 'lat': 41.923254, 'count': 5 },
        { 'lng': 123.418367, 'lat': 41.92943, 'count': 3 },
        { 'lng': 123.424312, 'lat': 41.919621, 'count': 100 },
        { 'lng': 123.423874, 'lat': 41.919447, 'count': 87 },
        { 'lng': 123.424225, 'lat': 41.923091, 'count': 32 },
        { 'lng': 123.417801, 'lat': 41.921854, 'count': 44 },
        { 'lng': 123.417129, 'lat': 41.928227, 'count': 21 },
        { 'lng': 123.426426, 'lat': 41.922286, 'count': 80 },
        { 'lng': 123.421597, 'lat': 41.91948, 'count': 32 },
        { 'lng': 123.423895, 'lat': 41.920787, 'count': 26 },
        { 'lng': 123.423563, 'lat': 41.921197, 'count': 17 },
        { 'lng': 123.417982, 'lat': 41.922547, 'count': 17 },
        { 'lng': 123.426126, 'lat': 41.921938, 'count': 25 },
        { 'lng': 123.42326, 'lat': 41.915782, 'count': 100 },
        { 'lng': 123.419239, 'lat': 41.916759, 'count': 41 },
        { 'lng': 123.417185, 'lat': 41.929123, 'count': 11 },
        { 'lng': 123.417237, 'lat': 41.927518, 'count': 9 },
        { 'lng': 123.417784, 'lat': 41.915754, 'count': 47 },
        { 'lng': 123.420193, 'lat': 41.917061, 'count': 52 },
        { 'lng': 123.422735, 'lat': 41.915619, 'count': 100 },
        { 'lng': 123.418495, 'lat': 41.915958, 'count': 46 },
        { 'lng': 123.416292, 'lat': 41.931166, 'count': 9 },
        { 'lng': 123.419916, 'lat': 41.924055, 'count': 8 },
        { 'lng': 123.42189, 'lat': 41.921308, 'count': 11 },
        { 'lng': 123.413765, 'lat': 41.929376, 'count': 3 },
        { 'lng': 123.418232, 'lat': 41.920348, 'count': 50 },
        { 'lng': 123.417554, 'lat': 41.930511, 'count': 15 },
        { 'lng': 123.418568, 'lat': 41.918161, 'count': 23 },
        { 'lng': 123.413461, 'lat': 41.926306, 'count': 3 },
        { 'lng': 123.42232, 'lat': 41.92161, 'count': 13 },
        { 'lng': 123.4174, 'lat': 41.928616, 'count': 6 },
        { 'lng': 123.424679, 'lat': 41.915499, 'count': 21 },
        { 'lng': 123.42171, 'lat': 41.915738, 'count': 29 },
        { 'lng': 123.417836, 'lat': 41.916998, 'count': 99 },
        { 'lng': 123.420755, 'lat': 41.928001, 'count': 10 },
        { 'lng': 123.414077, 'lat': 41.930655, 'count': 14 },
        { 'lng': 123.426092, 'lat': 41.922995, 'count': 16 },
        { 'lng': 123.41535, 'lat': 41.931054, 'count': 15 },
        { 'lng': 123.413022, 'lat': 41.921895, 'count': 13 },
        { 'lng': 123.415551, 'lat': 41.913373, 'count': 17 },
        { 'lng': 123.421191, 'lat': 41.926572, 'count': 1 },
        { 'lng': 123.419612, 'lat': 41.917119, 'count': 9 },
        { 'lng': 123.418237, 'lat': 41.921337, 'count': 54 },
        { 'lng': 123.423776, 'lat': 41.921919, 'count': 26 },
        { 'lng': 123.417694, 'lat': 41.92536, 'count': 17 },
        { 'lng': 123.415377, 'lat': 41.914137, 'count': 19 },
        { 'lng': 123.417434, 'lat': 41.914394, 'count': 43 },
        { 'lng': 123.42588, 'lat': 41.922622, 'count': 27 },
        { 'lng': 123.418345, 'lat': 41.919467, 'count': 8 },
        { 'lng': 123.426883, 'lat': 41.917171, 'count': 3 },
        { 'lng': 123.423877, 'lat': 41.916659, 'count': 34 },
        { 'lng': 123.415712, 'lat': 41.915613, 'count': 14 },
        { 'lng': 123.419869, 'lat': 41.931416, 'count': 12 },
        { 'lng': 123.416956, 'lat': 41.925377, 'count': 11 },
        { 'lng': 123.42066, 'lat': 41.925017, 'count': 38 },
        { 'lng': 123.416244, 'lat': 41.920215, 'count': 91 },
        { 'lng': 123.41929, 'lat': 41.915908, 'count': 54 },
        { 'lng': 123.422116, 'lat': 41.919658, 'count': 21 },
        { 'lng': 123.4183, 'lat': 41.925015, 'count': 15 },
        { 'lng': 123.421969, 'lat': 41.913527, 'count': 3 },
        { 'lng': 123.422936, 'lat': 41.921854, 'count': 24 },
        { 'lng': 123.41905, 'lat': 41.929217, 'count': 12 },
        { 'lng': 123.424579, 'lat': 41.914987, 'count': 57 },
        { 'lng': 123.42076, 'lat': 41.915251, 'count': 70 },
        { 'lng': 123.425867, 'lat': 41.918989, 'count': 8 }
      ]
    }
  },
  mounted() {
    console.log('mapv', mapv)
    var map = new BMap.Map('map', {
      enableMapClick: false
    }) // 创建Map实例
    map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5) // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    var randomCount = 300

    var data = []

    var citys = [
      '北京',
      '天津',
      '上海',
      '重庆',
      '石家庄',
      '太原',
      '呼和浩特',
      '哈尔滨',
      '长春',
      '沈阳',
      '济南',
      '南京',
      '合肥',
      '杭州',
      '南昌',
      '福州',
      '郑州',
      '武汉',
      '长沙',
      '广州',
      '南宁',
      '西安',
      '银川',
      '兰州',
      '西宁',
      '乌鲁木齐',
      '成都',
      '贵阳',
      '昆明',
      '拉萨',
      '海口'
    ]

    // 构造数据
    while (randomCount--) {
      var cityCenter = mapv.utilCityCenter.getCenterByCityName(
        citys[parseInt(Math.random() * citys.length)]
      )
      data.push({
        geometry: {
          type: 'Point',
          coordinates: [
            cityCenter.lng - 2 + Math.random() * 4,
            cityCenter.lat - 2 + Math.random() * 4
          ]
        },
        count: 30 * Math.random()
      })
    }

    var dataSet = new mapv.DataSet(data)

    var options = {
      fillStyle: 'rgba(255, 50, 50, 0.6)',
      shadowColor: 'rgba(255, 50, 50, 1)',
      shadowBlur: 30,
      globalCompositeOperation: 'lighter',
      methods: {
        click: function(item) {
          console.log(item)
        }
      },
      size: 5,
      // updateImmediate: true,
      draw: 'simple'
    }

    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options)
  },
  methods: {
  }
}
</script>

<style scope lang="scss">
.spatialSampling {
  width: 100%;
  height: 1000px;
  border: 1px solid red;
  #map {
    width: 80%;
    height: 80%;
  }
}

</style>
