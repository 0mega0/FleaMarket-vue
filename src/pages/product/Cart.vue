<template>
  <el-row>
    <el-col>
      <el-card>
        <div slot="header" class="clearfix">
          <span>购物车详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="() => this.$router.push({name: 'home'})">返回首页</el-button>
        </div>
        <el-row v-for="(cart, index) in carts" :key="index">
          <el-col :span="6">
            <img style="height: 235px;width: 235px;" :src="cart.product.picUrl" alt="">
          </el-col>
          <el-col :span="6">
            <div>
              <div>商品名称: {{cart.product.name}}</div>
              <div>商品描述: {{cart.product.desc}}</div>
              <div>商品余量: {{cart.product.count}}</div>
            </div>
          </el-col>
          <el-col :span="6">
            数量：<el-input-number v-model="cart.count" :min="0" :max="cart.product.count"></el-input-number>
          </el-col>
          <el-col :span="6">
            <el-button size="small" type="primary" @click="buyProduct(cart, cart.count)">购买</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div>
              <el-button type="primary" @click="deleteCart">清空购物车</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'Cart',
    data() {
      return {
        count: 0,
        carts: [],
      };
    },
    async created() {
      await this.initData();
    },
    methods: {
      async initData() {
        let res = await this.$api.get('/api/order/cart/get-all');
        console.log(res)
        if (res.code === 0) {
          this.carts = res.data;
          // this.$message({
          //   type: "success",
          //   message: "获取购物车信息成功"
          // })
        } else {
          this.$message({
            type: 'error',
            message: '获取购物车信息失败',
          });
        }
      },
      async buyProduct(cart, count) {
        let cartId = cart.id
        console.log(cartId)
        // TODO: 改变购物车中的数量
        let res = await this.$api.post("/api/order/cart/change-count", qs.stringify({
          count: count,
          cart_id: cartId,
        }))
        let  res3 = await this.$api.post("/api/order/cart/remove-one", qs.stringify({
          cart_id: cartId
        }))
        let res2 = await this.$api.post("/api/order/buy-one", qs.stringify({
          product_id: cart.product.id,
          item_count: count
        }));
        this.$message({
          message: "购买成功",
          type: "success"
        })
        await this.initData()
      },
      async deleteCart() {
        let res = await this.$api.post('/api/order/cart/remove-all');
        console.log(res);
        if (res.code === 0) {
          await this.initData();
          this.$message({
            type: 'success',
            message: '清空购物车成功',
            duration: 1000,
          });
        } else {
          this.$message({
            type: 'error',
            message: '清空购物车失败',
          });
        }
      },
    },
  };
</script>

<style scoped>
</style>