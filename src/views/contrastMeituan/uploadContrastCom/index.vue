<template>
  <div class="single-main">
    <el-upload
      ref="upload"
      class="upload-demo"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="editForm.fileList"
      :http-request="getFile"
      :before-upload="beforeUploadFile"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadFile">数据比对</el-button>
      <div slot="tip" class="el-upload__tip">只能上传excel的文件,且文件大小不超过10M</div>
    </el-upload>
    <div class="single-tb">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        height="650"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="企业名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="socialCredit"
          label="统一社会信用代码"
          align="center"
          width="180"
        />
        <el-table-column
          prop="tag"
          label="预警状态"
          width="100"
          align="center"
          :filters="filtersData"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i :class="handleIcon(scope.row.statusCode)" />
          </template>
        </el-table-column>
        <el-table-column
          prop="regStatus"
          label="经营状态"
          align="center"
          width="180"
        />
        <el-table-column
          prop="time"
          label="时间"
          align="center"
          width="120"
        />
        <el-table-column
          prop="addr"
          label="地址"
          header-align="center"
        />

        <!--
        <el-table-column
          prop="date"
          label="日期"
          width="180"
          align="center"
        />-->
      </el-table>
    </div>
  </div>
</template>

<script>
import { upContrastCom } from '@/api/contrastMeituan'

export default {
  data() {
    return {
      input: null,
      tableData: [],
      editForm: {
        file: {},
        fileList: []
      },
      filtersData: [
        { text: '正常', value: '20' },
        { text: '警告', value: '10' },
        { text: '错误', value: '00' }
      ]
    }
  },
  methods: {
    handleIcon(status) {
      if (status === '00') {
        return 'el-icon-error'
      } else if (status === '20') {
        return 'el-icon-success'
      } else if (status === '10') {
        return 'el-icon-warning'
      } else if (status === '01') {
        return 'el-icon-message-solid'
      }
    },
    filterTag(value, row) {
      console.log('value', value)
      console.log('row', row)
      return row.statusCode === value
    },
    handleRemove(file, fileList) { // 	 文件列表移除文件时的钩子
      console.log('执行了handleRemove', file, fileList)
    },
    handlePreview(file) { // 点击文件列表中已上传的文件时的钩子
      console.log('执行了handlePreview', file)
    },
    beforeUploadFile(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'xlsx' && extension !== 'xls') {
        this.$refs.upload.clearFiles()
        this.$message.warning('只能上传excel的文件')
      }
      if (size > 10) {
        this.$refs.upload.clearFiles()
        this.$message.warning('文件大小不得超过10M')
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    getFile(item) {
      console.log(item.file)
      this.editForm.file = item.file
    },
    uploadFile() {
      if (this.editForm.file.name === undefined) {
        console.log(this.$refs)
        this.$refs.upload.clearFiles()
        this.$message.warning('请选择文件name')
        return
      }
      const extension = this.editForm.file.name.substring(this.editForm.file.name.lastIndexOf('.') + 1)
      const size = this.editForm.file.size / 1024 / 1024
      if (extension !== 'xlsx' && extension !== 'xls') {
        this.$refs.upload.clearFiles()
        this.$message.warning('请选择excle类型的文件')
        return
      }
      if (size > 10) {
        this.$refs.upload.clearFiles()
        this.$message.warning('请选择大小小于10M的文件')
        return
      }
      const formData = new FormData()
      formData.append('fileName', this.editForm.file.name)
      formData.append('file', this.editForm.file)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      console.log(formData)

      upContrastCom(formData, config).then(res => {
        this.tableData = []
        res.data.forEach(el => {
          this.tableData.push({
            'name': el.coNameX,
            'statusCode': el.statusCode,
            'addr': el.addrX,
            'socialCredit': el.socialCredit,
            'regStatus': el.regStatusX,
            'time': el.approvalDateX
          })
          this.tableData.push({
            'name': el.coNameY,
            'statusCode': el.statusCode,
            'addr': el.addrY,
            'socialCredit': el.socialCredit,
            'regStatus': el.regStatusY,
            'time': el.approvalDateY
          }
          )
        })
      })
      /*
      this.editForm.file = {}
      this.editForm.fileList = []*/
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
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

.el-icon-error {
  color: rgb(247, 137, 137);
  font-size: 20px;
}

.el-icon-success {
  color: rgb(103, 194, 58);
  font-size: 20px;
}

.el-icon-warning {
  color: rgb(235, 181, 99);
  font-size: 20px;
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
