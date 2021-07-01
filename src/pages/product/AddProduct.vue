<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <!-- 发布二手商品 -->
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          
          <el-form-item prop="name">
            <p>商品名称 :</p>
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item  prop="desc">
            <p>内容描述 :</p>
            <el-input v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item  prop="price">
            <p>商品价格 :</p>
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item  prop="counts">
            <p>数量 :</p>
            <el-input v-model="form.count"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
                action="http://localhost:8080/api/upload"
                ref="upload"
                list-type="picture"
                :auto-upload="true"
                :limit="1"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                :data="form">
              <el-button size="small">点击上传商品图片</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
            >发布审核
            </el-button>
            <el-button  @click="cancel"
            >取消发布
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'AddProduct',
    data() {
      return {
        form: {
          name: '',
          desc: '',
          price: '',
          picUrl: '',
          count: ''
        },
        rules: {
          name: [{required: true, message: '请输入商品名称', trigger: 'blur'}],
          desc: [{required: true, message: '请输入商品描述', trigger: 'blur'}],
          price: [{required: true, message: '请输入商品价格', trigger: 'blur'}],
          count: [{required: true, message: '请输入商品数量', trigger: 'blur'}],
        },
      };
    },
    methods: {
      uploadSuccess(response, file, fileList) {
        this.$message({
          message: "文件上传成功",
          type: "success"
        })
        this.form.picUrl = "http://localhost:8080" + response.data.url
      },
      uploadError(err, file, fileList) {
        this.$message({
          message: '文件上传错误',
          type: 'error',
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let res = await this.$api.post('/api/product/add', this.form);
            console.log(res);
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '商品添加成功，等待后台进行审核',
                duration: 1000,
                onClose: () => {
                  this.$router.push('/');
                },
              });
            }
          } else {
            this.$message({
              message: '请正确填写信息',
              type: 'error',
              duration: 1000,
            });
            return false;
          }
        });
      },cancel() {
        this.$router.push("/");
      }
    },
  };
</script>

<style scoped>
.el-form-item p{
  color:#fff;
  font-size:20px;
  height: 30px;
  margin-top:0px;


  
}
</style>