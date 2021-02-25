<template>
  <div class="single-main">
    <div class="single-input clearfix">
      <el-input
        v-model="input"
        placeholder="请输入店铺名称（模糊）"
        clearable
      />
      <el-button type="primary" @click="handleSingle">查询</el-button>
    </div>
    <div class="single-tb">
      <el-table
        :data="tableData"
        height="250"
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="50px"
        />
        <el-table-column
          prop="name"
          label="商铺名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="addr"
          label="地址"
          header-align="center"
        />
        <el-table-column
          prop="areaName"
          label="区域"
          align="center"
          width="180"
        />
        <el-table-column
          prop="date"
          label="日期"
          width="180"
          align="center"
        />
      </el-table>
    </div>
    <div class="bmap-page-container">
      <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
        <el-bmapv-view :effects="effects">
          <el-bmapv-circle-layer :visible="visible" :type="type" :size="10" :radius="radius" :data="singleData" />
        </el-bmapv-view>
      </el-bmap>
    </div>
  </div>
</template>

<script>
import { singleQuery } from '@/api/contrastMeituan'
import { effect } from 'vue-mapvgl'
const bloomEffect = new effect.BloomEffect({
  threshold: 0.2,
  blurSize: 2.0
})
export default {
  data() {
    return {
      input: null,
      tableData: null,
      visible: false,
      effects: [bloomEffect],
      zoom: 14,
      center: [113.272283, 23.1551],
      type: 'bubble',
      radius(size) {
        return size * 2
      },
      singleData: []
    }
  },
  methods: {
    handleSingle() {
      this.tableData = null
      this.singleData = []
      singleQuery({
        'single': this.input
      }).then(res => {
        this.tableData = res.data.query_list
        console.log(res.data)
        res.data.layer_list.forEach(el => {
          this.singleData.push(el)
        })
        this.visible = true
      })
    }
  }
}
</script>

<style scope lang="scss">
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear:both;
  visibility: hidden;
}

.clearfix {
  /* 触发 hasLayout */
  *zoom: 1;
}

.single-main {
  width: 95%;
  height: 100%;
  margin-left: 2.5%;
  margin-top: 2.5%;
  box-shadow: 5px 10px 10px 5px #888888;
  border-radius: 10px;
  padding: 20px;
  .single-input {
    .el-input {
      width: 200px;
      float: left;
      display: block;
      margin-right: 10px;
    }
    .el-button {
      float: left;
      display: block;
    }
  }
  .single-tb {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .bmap-demo {
    height: 450px;
  }
}

</style>
