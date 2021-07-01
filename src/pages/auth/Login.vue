<template>

  <el-row>
    <el-col :span="12" :offset="6">
      <div class="form-wrap">
        <h1>二手交易市场</h1>
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px">
          <el-form-item prop="username">
            <p>用户名 :</p><el-input
                type="text"
                v-model="form.username"
                placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <p>密码 :</p><el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('loginForm')" :disabled="disabled"
                       :style="btnStyle">登录
            </el-button>
            <el-button @click="() => this.$router.push({'name': 'register'})">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        disabled: false,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        },
      };
    },
    methods: {
      async onSubmit(formName) {
        // 进行基本校验
        this.$refs[formName].validate(async valid => {
          if (valid) {
            let res =  await this.$api.post("/api/user/login", this.form);
            this.disabled = true;
            console.log(res);
            if (res.code !== 0) {
              this.$message({
                message: res.message,
                type: 'error',
                duration: 2000,
                onClose: () => {
                  this.disabled = false;
                },
              });
            } else {
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  let saveData = res.data.user
                  saveData.token = res.data.Authorization
                  localStorage.setItem('userInfo', JSON.stringify(saveData));
                  this.disabled = true;
                  this.$router.push('/');
                },
              });
            }
            return false;
          } else {
            this.$message({
              message: '请正确填写信息',
              type: 'error',
              duration: 1000,
            });
            return false;
          }
        });
      },
    },
    computed: {
      btnStyle() {
        if (this.disabled) {
          return {backgroundColor: '#eeeeee'};
        }
      },
    },
    created() {
      // 如果已经登录，则直接跳转到主页
      let userInfo = JSON.parse(localStorage.getItem("userInfo"))
      if (userInfo && userInfo.id) {
        this.$router.push("/")
      }
    }
  };
</script>

<style scoped>
.el-button+.el-button {
    margin-left: 174px;
}
.el-col-offset-6 {
    margin-left: 25%;
    margin-top:10% ;
    margin-bottom: 21%;
}
.el-row{
      
      margin-left: 600px;
      
}
h1{
    
    font-size: 2.2em;
    text-align: right;
    font-weight: 900;
    font-size: 3.25em;
    margin-bottom: 30px;
    color: #fff;
    text-shadow: 2px 3px 0px #898999;
    line-height: 1.2;
}
.el-form-item p{
  color:#fff;
  font-size:20px;
  height: 30px;
  margin-top:0px;

  
}
.el-form-item__content {
    line-height: 0px;
    position: relative;
    font-size: 14px;
}

  .form-wrap {
   
    max-width: 500px;
    width: 400px;
    margin: auto;
  }
  
</style>
