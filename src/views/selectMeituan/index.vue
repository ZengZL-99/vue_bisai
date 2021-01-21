<template>
  <div class="toubu">
    <div class="block">
      <span class="demonstration">查询信息</span>
      <el-cascader
        v-model="values"
        :options="options"
        :props="props"
        collapse-tags
        clearable
        placeholder
        separator=">>>"
      />
    </div>
    <el-button type="primary" @click="handleSelect">查询</el-button>
    <div class="se-bd">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        stripe
        border
        height="552px"
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
      >
        <div>111</div>
      </el-pagination>
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
      pageSize: 10
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
    }
  }
}
</script>

<style scoped>

.toubu {
  padding: 20px auto;
  text-align: center;
  width: 100%;
  height: 100%;

}
.se-bd {
  margin: 20px 100px;
  text-align: center;
}
</style>
