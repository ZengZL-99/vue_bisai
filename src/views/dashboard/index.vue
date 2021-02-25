<template>
  <div class="dashboard-container">
    <h1 class="ds-h1">欢迎使用商户数据监测平台</h1>
    <div class="ds-bd">
      <h3 class="bd-h3">功能快捷直达按钮</h3>
      <el-button type="primary" plain @click="reSelect">信息查询</el-button>
      <el-button type="primary" plain @click="reCommon">商户分析</el-button>
      <el-button type="primary" plain @click="reBusinessModel">商家分布人力图</el-button>
      <el-button type="primary" plain @click="reSingleContrast">模糊查询热点图</el-button>
      <el-button type="primary" plain @click="reUploadContrastCom">文件上传对比(企)</el-button>
      <el-button type="primary" plain @click="reUploadContrast">文件上传对比(商)</el-button>
    </div>
    <div class="ds-bd-2">
      <h5>更多功能有待开发.....</h5>
    </div>
  </div>
</template>

<script>
import { test } from '@/api/user'
export default {
  name: 'Dashboard',
  methods: {
    reSelect() {
      this.$router.replace('/example/selectMeituan')
    },
    reCommon() {
      this.$router.replace('/example/visualMeituan/common')
    },
    reBusinessModel() {
      this.$router.replace('/example/visualMeituan/businessModel')
    },
    reSingleContrast() {
      this.$router.replace('/example/visualMeituan/singleContrast')
    },
    reUploadContrastCom() {
      this.$router.replace('/example/contrastMeituan/uploadContrastCom')
    },
    reUploadContrast() {
      this.$router.replace('/example/contrastMeituan/uploadContrast')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    .ds-h1 {
      text-align: center;
    }
    .ds-bd {
      text-align: center;
    }
    .ds-bd-2 {
      text-align: center;
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.img_2 {
  width: 1920px;
  height: 1080px;
  padding-right: 50px;
}
</style>
