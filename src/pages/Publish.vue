<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <!-- 发布二手商品 -->
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >立即发布</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Publish",
  data() {
    return {
      form: {
        name: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入商品描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$Http.publish(this.form, true);
          console.log(res);
        } else {
          this.$message({
            message: "请正确填写信息",
            type: "error",
            duration: 1000
          });
          return false;
        }
      });
    }
  }
};
</script>

<style scoped></style>
