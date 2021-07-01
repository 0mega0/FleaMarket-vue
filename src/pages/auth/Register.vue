<template>
  <el-row>
    <el-col :span="12" :offset="6">
      <div class="form-wrap">
        <el-form :model="form" :rules="rules" ref="registerForm" label-width="80px">
          
          <el-form-item prop="username">
            <p>新用户名 :</p>
            <el-input
                type="text"
                v-model="form.username"
                placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password" >
            <p>新密码 :</p>
            <el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password_confirm" >
            <p>重复密码 :</p>
            <el-input
                v-model="form.password_confirm"
                placeholder="请重复输入密码"
                type="password"
            ></el-input>
          </el-form-item>


            


          <el-form-item>
            <el-button type="primary" @click="onSubmit('registerForm')"
                       :disabled="disabled"
                       :style="btnStyle">注册
            </el-button>
            <el-button @click="() => this.$router.push({'name': 'login'})">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
  
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        disabled: false,
        form: {
          username: '',
          password: '',
          password_confirm: '',
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          password_confirm: [
            {required: true, message: '请重复输入密码', trigger: 'blur'},
          ],
        },
      };
    },
    methods: {
      
      async onSubmit(formName) {
        // 进行基本校验
        this.$refs[formName].validate(async valid => {
          if (valid) {
            if (this.form.password !== this.form.password_confirm) {
              this.disabled = true;
              this.$message({
                message: '请保持两次输入密码一致',
                type: 'warning',
                duration: 1000,
                onClose: () => {
                  this.disabled = false;
                },
              });
              return false;
            }
            let res = await this.$api.post("/api/user/register", this.form);
            console.log(res);
            this.disabled = true;
            if (res && res.code === 0) {
              this.$message({
                message: '注册成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                  this.$router.push('/auth/login');
                },
              });
            } else {
              this.disabled = false;
              this.$message({
                message: res.message,
                type: 'error',
                duration: 2000,
              });
            }
            return false;
          } else {
            console.log('fail');
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
  };
</script>

<style scoped>


.el-form-item p{
  color:#fff;
  font-size:20px;
  height: 30px;
  margin-top:0px;


  
}
.el-button+.el-button {
    margin-left: 174px;
}

  .form-wrap {
    max-width: 500px;
    width: 400px;
    margin-left: 100px;
    margin-top: 100px;
  }
</style>
