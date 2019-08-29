<template>
  <div style="background:#fff;padding:20px">
    <el-row>
      <el-col :span="24">
        <div class="title-box">表单列表</div>
      </el-col>
    </el-row>
    <el-row class="content-box">
      <el-col :span="24" style="height: 40px;line-height: 40px;">
        <el-button type="primary" size="small" @click="showAddFormBtn">新增表单</el-button>
      </el-col>
      <el-col :span="24" style="margin-top: 20px">
        <template>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="title" label="名称"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="checkBtn(scope.row)">编辑</el-button>
                <el-button
                  type="text"
                  size="small"
                  style="margin-left: 20px"
                  @click="delBtn(scope.row)"
                >
                  <span style="color: #f44;">删除</span>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
      <el-col :span="24">
        <div class="page-box">
          <span>当前第 -</span>
          <span style="color: #f44;">{{page}}</span>
          <span>- 页</span>
          <el-button
            style="margin-left: 20px"
            type="primary"
            size="small"
            @click="changePage(page-1)"
            :disabled="page==1"
          >上一页</el-button>
          <el-button
            style="margin-left: 20px"
            type="primary"
            size="small"
            @click="changePage(page+1)"
            :disabled="pageOver == true"
          >下一页</el-button>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="新增表单" :visible.sync="showAddFormModel">
      <el-form>
        <el-form-item label="表单名称" label-width="120px">
          <el-input v-model="addTitle" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddFormModel = false">取 消</el-button>
        <el-button type="primary" @click="addFormBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "formList",
  data() {
    return {
      tableData: [],
      count: 10,
      offset: 0,
      showAddFormModel: false,

      page: 1,
      pageOver: true,

      addTitle:'',
    };
  },
  methods: {
    /** 分页数据 */
    changePage(page) {},
    /** 获取表单列表 */
    getReportSchemaList(cnt) {
      this.$api.getReportSchemaList(cnt, res => {
        console.log(res);
        if (res.data.rc == this.$util.RC.SUCCESS) {
          this.tableData = this.$util.tryParseJson(res.data.c);
        } else {
          this.tableData = [];
        }
        console.log(this.tableData);
      });
    },

    /** 新增表單*/
    showAddFormBtn() {
      this.showAddFormModel = true;
    },

    addFormBtn() {

    },
    /** 删除表单 */
    delBtn(){

    }
  },
  mounted() {
    let cnt = {
      count: this.count,
      offset: this.offset
    };
    this.getReportSchemaList(cnt);
  }
};
</script>

<style scoped lang="scss">
.title-box {
  width: auto;
  height: 50px;
  line-height: 50px;
  background: #fff;
  padding-left: 20px;
}
.content-box {
  width: auto;
  margin-top: 10px;
  padding: 20px;
  background: #fff;
}

/*分页相关*/
.page-box {
  width: auto;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #666;
}
</style>
