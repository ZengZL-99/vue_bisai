<template>
  <div class="toubu">
    <div class="select_main">
      <div class="block">
        <div class="btn_all">
          <el-input v-model="input" prefix-icon="el-icon-search" placeholder="请输入相关信息名称查询" />
          <div class="chaxun_btn">
            <el-button type="primary" @click="handleSelect">查询</el-button>
          </div>
          <div class="daochu_btn">
            <download-excel
              class="export-excel-wrapper"
              :data="tableData"
              :fields="json_fields"
              name="filename.xls"
            >
              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
              <el-button type="primary" @click="handleExcel">导出EXCEL</el-button>
            </download-excel>
          </div>
        </div>
      </div>
      <div class="se-bd">

        <el-form ref="form" :model="{form}" label-width="80px">
          <el-form-item label="企业名称:">
            <p>{{ form.name }}</p>
          </el-form-item>
          <el-form-item label="统一社会信用代码:">
            <div>{{ form.socialCreditCode }}</div>
          </el-form-item>
          <el-form-item label="注册日期">
            <div>{{ form.approvalDate }}</div>
          </el-form-item>
          <el-form-item label="核准日期">
            <div>{{ form.foundDate }}</div>
          </el-form-item>
          <el-form-item label="经营情况">
            <div>{{ form.regStatus }}</div>
          </el-form-item>
          <el-form-item label="联系方式">
            <div>{{ form.phone }}</div>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import { getQccData } from '@/api/select'
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
      form: {},
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
        addr: 'addr' // 支持嵌套属性
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

  methods: {
    handleSelect() {
      console.log('undefined', this.inptu === undefined)
      console.log('length', this.values.length === 0)
      console.log('input', this.input === '')
      if (this.input === undefined || this.input.trim() === '') {
        Message.warning({
          message: '请选择输入查询的区域!'
        })
      } else {
        getQccData(this.input).then(res => {
        /* for (let i = 0; i < 100; i++) {
          this.tableData.push(res.data[i])
        }*/
          this.form = res.data
          // this.tableData = res.data
          console.log('数据', this.form)
          this.total = this.tableData.length
        }).then(() => {
          Message.success({
            message: '查询成功！'
          })
        })
      }
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

<style scoped lang='scss'>

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
  position: relative;
  .el-form {
    position: absolute;
    margin: 100px;
  }
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
