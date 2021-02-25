<template>
  <div class="toubu">
    <div class="select_main">
      <div class="block">
        <div class="btn_all">
          <el-input v-model="input" prefix-icon="el-icon-search" placeholder="请输入相关信息名称查询" />
          <el-cascader
            v-model="values"
            :options="options"
            :props="props"
            collapse-tags
            clearable
            placeholder="分类"
            separator=">>>"
          />
          <div class="chaxun_btn">
            <el-button type="primary" @click="handleSelect">查询</el-button>
          </div>
          <div class="daochu_btn">
            <download-excel
              class="export-excel-wrapper"
              :data="tableData"
              :fields="json_fields"
              name="meituandate.xls"
            >
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button type="primary" @click="handleExcel">导出EXCEL</el-button>
            </download-excel>
          </div>
        </div>
      </div>
      <div class="se-bd">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          stripe
          border
          height="600px"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="50px"
          />
          <!--
          <el-table-column
            prop="poiId"
            label="商铺ID"
            width="100"
            align="center"
          />-->
          <el-table-column
            prop="name"
            label="名称"
            width="220"
            align="center"
          />
          <el-table-column
            prop="time"
            label="获取日期"
            width="120"
            align="center"
          />
          <el-table-column
            prop="addr"
            label="地址"
            header-align="center"
          />
          <el-table-column
            label="操作"
            width="100"
            align="center"
          >

            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">链接</el-button>
              <!---
              <el-button type="text" @click="dialogVisible = true">地图</el-button>
              <el-dialog
                title="百度地图"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <div class="bmap-page-container">
                  <el-bmap vid="bmapDemo" :zoom="zoom" :center="center" class="bmap-demo">
                    <el-bmapv-view :effects="effects">
                      <el-bmapv-circle-layer :visible="visible" :type="type" :size="10" :radius="radius" :data="singleData" />
                    </el-bmapv-view>
                  </el-bmap>
                </div>
              </el-dialog>
              -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { getMtInfo, getMtData } from '@/api/select'
import { Message } from 'element-ui'
/*
import { effect } from 'vue-mapvgl'
const bloomEffect = new effect.BloomEffect({
  threshold: 0.2,
  blurSize: 2.0
})*/
export default {
  data() {
    return {
      values: [],
      options: [],
      props: { expandTrigger: 'hover', multiple: true },
      tableData: [],
      total: null,
      currentPage: 1,
      pageSize: 10,
      input: undefined,
      /*
      dialogVisible: false,
      visible: false,
      effects: [bloomEffect],
      zoom: 14,
      center: [113.272283, 23.1551],
      type: 'bubble',
      radius(size) {
        return size * 2
      },
      singleData: [],
      */ // -----
      json_fields: {
        'name': 'name', // 常规字段
        addr: 'addr', // 支持嵌套属性
        time: 'time',
        shopUrl: 'shopUrl'
        /*
        'Telephone 2': {
          field: 'phone.landline',
          // 自定义回调函数
          callback: value => {
            return `Landline Phone - ${value}`
          }
        }*/
      },
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  created() {
    getMtInfo().then(res => {
      this.options = res.data
    })
  },
  methods: {
    handleSelect() {
      console.log('undefined', this.inptu === undefined)
      console.log('length', this.values.length === 0)
      console.log('input', this.input === '')
      if ((this.input === undefined || this.input.trim() === '') && this.values.length === 0) {
        console.log('wwww')
        Message.warning({
          message: '请选择输入查询的区域!'
        })
      } else {
        console.log('判断成功了')
        const selectList = []
        for (let i = 0; i < this.values.length; i++) {
          selectList.push(this.values[i][1])
        }
        /* if (this.input !== undefined && this.input.trim() !== '') {
          selectList.push(this.input)
        }*/
        console.log('列表', selectList)
        const z = {
          'info': JSON.stringify(selectList),
          'like': this.input
        }
        console.log(z)
        getMtData(z).then(res => {
        /* for (let i = 0; i < 100; i++) {
          this.tableData.push(res.data[i])
        }*/
          this.tableData = res.data
          console.log('数据', this.tableData)
          this.total = this.tableData.length
        }).then(() => {
          Message.success({
            message: '查询成功！'

          })
        })
      }
    },
    handleSizeChange: function(val) {
      this.pageSize = val
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    handleClick(row) {
      // console.log('杀杀杀', row)
      window.open(row.shopUrl)
    },
    handleExcel() {
      if (this.tableData.length === 0) {
        Message.warning({
          message: '请先查询需要导出的数据!'
        }
        )
      }
    }

  }
}
</script>

<style scoped>

.toubu {
  padding: 20px auto;
  text-align: center;
  width: 100%;
  height: 100%
}

.toubu .select_main {
  width: 95%;
  height: 100%;
  margin-left: 2.5%;
  box-shadow: 5px 10px 10px 5px #888888;
  border-radius: 10px;
}
.toubu .block .el-input {
    width: 200px;
}

.se-bd {
  margin: 20px 100px;
  text-align: center;
}
.se-bd .el-pagination {
  padding: 10px 0;
}
.btn_all {
  float: left;
  margin-left: 90px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn_all div {
  margin-left: 10px;
}

.chaxun_btn, .daochu_btn {
  display: inline-block;
}
</style>
