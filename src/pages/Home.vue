<template>
  <el-container>
    <el-header height="80">
      <el-menu router mode="horizontal">
        <el-submenu :index="'1'">
          <template slot="title">用户名：{{userInfo.username}}</template>
          <el-menu-item @click="logout">注销</el-menu-item>
        </el-submenu>
        <el-menu-item index="/product/cart">购物车</el-menu-item>
        <el-menu-item index="/product/order">我的订单</el-menu-item>
        <template v-if="userInfo.admin">
          <el-menu-item index="/admin">后台管理</el-menu-item>
        </template>
        <el-button  @click="logout">登出</el-button>
        <el-button type="primary" @click="addProduct">新增商品</el-button>
      </el-menu>
    </el-header>
    <el-main>
      <!-- 商品列表 -->
      
      <!--  商品部分  -->
      <el-row>
        <el-col :span="5.5" v-for="product in products" :key="product.id"
                :offset="1">
          <div @click="toProductDetail(product.id, product.count)">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="product.picUrl"
                   class="image">
              <div style="padding: 14px;">
                <div style="font-weight: bolder">{{product.name}}</div>
                <br>
                <div style="font-size: smaller">{{product.desc}}</div>
                <br>
                <div>售价：<span style="color: red">{{product.price}}</span>元</div>
                <div>余量：<span style="color: red">{{product.count}}</span></div>
                <div class="bottom clearfix">
                  <el-button type="text" class="button" @click.stop="addToProductCart(product.id, product.count)">
                    加入购物车
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import qs from 'qs';

  export default {
    name: 'Home.vue',
    data() {
      return {
        userInfo: {},
        products: {},
      };
    },
    methods: {
      toProductDetail(productId, productCount) {
        this.$router.push({
          name: 'productDetail',
          params: {
            productId: productId,
          },
        });
      },
      //将商品加入到购物车中
      async addToProductCart(productId, productCount) {
        if (productCount <= 0) {
          this.$alert('无库存');
          return;
        }
        let res = await this.$api.post('/api/order/cart/add', qs.stringify({
          product_id: productId,
          count: 1,
        }));
        if (res.code === 0) {
          this.$message({
            message: '加入购物车成功',
            type: 'success',
          });
        } else {
          this.$message({
            message: res.message,
            type: 'error',
          });
        }
        console.log(res);
      },
      addProduct() {
        this.$router.push({
          name: 'addProduct',
        });
      },
      logout() {
        localStorage.removeItem('userInfo');
        this.$router.push({
          name: 'login',
        });
      },
      async getProductsList() {
        let res = await this.$api.get('/api/product/list');
        console.log(res);
        this.products = res.data;
      },
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!this.userInfo) {
        this.$router.push({
          name: 'login',
        });
      }
      this.getProductsList();
    },
  };
</script>

<style scoped>
  .el-header {
    line-height: 80px;
  }
  .el-header button{
    float: right;
    margin-right: 50px;
    margin-top: 10px;
  }
  .el-col-offset-1 {
    margin-left: 6.16667%;
    margin-top: 2%
}
.el-menu.el-menu--horizontal {
    border-radius: 5px;
}

  .image {
    width: 235px;
    height: 235px;
  }
</style>