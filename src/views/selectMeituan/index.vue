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
          <el-table-column
            prop="poiId"
            label="商铺ID"
            width="100"
            align="center"
          />
          <el-table-column
            prop="name"
            label="名称"
            width="220"
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
              <el-button type="text" size="small">编辑</el-button>
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
export default {
  data() {
    return {
      values: null,
      options: [],
      props: { expandTrigger: 'hover', multiple: true },
      tableData: [],
      total: null,
      currentPage: 1,
      pageSize: 10,
      input: ''
    }
  },
  created() {
    getMtInfo().then(res => {
      this.options = res.data
    })
  },
  methods: {
    handleSelect() {
      const selectList = []
      for (let i = 0; i < this.values.length; i++) {
        selectList.push(this.values[i][1])
      }
      console.log('列表', selectList)
      getMtData(selectList).then(res => {
        /* for (let i = 0; i < 100; i++) {
          this.tableData.push(res.data[i])
        }*/
        this.tableData = res.data
        console.log('数据', this.tableData)
        this.total = this.tableData.length
      })
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

.chaxun_btn {
  display: inline-block;
}
</style>
