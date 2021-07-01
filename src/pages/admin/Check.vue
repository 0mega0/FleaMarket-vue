<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="name"
          label="商品名称"
          width="100">
      </el-table-column>
      <el-table-column
          prop="desc"
          label="商品描述"
          width="180">
      </el-table-column>
      <el-table-column
          prop="price"
          label="商品价格" width="100">
      </el-table-column>
      <el-table-column
          label="商品状态"
          width="100">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '未通过' : '已通过' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              :disabled="scope.row.status === 0"
              @click="passStatus(scope.row.id)"
          >审核通过
          </el-button>
          <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status === 1"
              @click="unPassStatus(scope.row.id)"
          >审核不通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import qs from 'qs';
  export default {
    name: 'Check',
    data() {
      return {
        tableData: [],
      };
    },
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        let res = await this.$api.get("/api/admin/product/get-all");
        console.log(res);
        this.tableData = res.data;
      },
      async passStatus(productId) {
        console.log('productId' + productId)
        let res = await  this.$api.post("/api/admin/product/check", qs.stringify({
          status: 0,
          product_id: productId}), true);
        if (res.code === 0) {
          this.$message({
            message: '审核通过',
            type: 'success',
          });
          this.getData()
        }
      },
      async unPassStatus(productId) {
        let res = await  this.$api.post("/api/admin/product/check", qs.stringify({status: 1, product_id: productId}), true);
        if (res.code === 0) {
          this.$message({
            message: '审核不通过',
            type: 'success',
          });
          this.getData()
        }
      },
    },
  };
</script>

<style scoped>

</style>