<template>
  <div class="box-wrap">
    <div class="box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>商品详情</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="() => this.$router.push({name: 'home'})">返回首页</el-button>
        </div>
        <div>
          <img src="" alt="">
          <div>
            <img style="width: 235px;height: 235px;" :src="product.picUrl" alt="">
            <div class="name">
              产品名称：{{ product.name }}
            </div>
            <div>
              产品描述：{{ product.desc }}
            </div>
            <div class="price">
              产品单价：{{ product.price }}元
            </div>
            <div class="total-price">
              产品总价：{{ total_price }}元
            </div>
            <div>商品余量：{{product.count}}</div>
            <div>
              购买数量：<el-input-number v-model="item_count" :min="0" :max="product.count"></el-input-number>
            </div>
            <div>
              <el-button type="primary" @click="buyProduct">购买</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: 'ProductDetail',
    data() {
      return {
        product: {},
        item_count: 0,
      };
    },
    computed: {
      total_price() {
        return this.product.price * this.item_count;
      },
    },
    async created() {
      let productId = this.$route.params.productId;
      if (!productId) {
        await this.$router.push({
          path: '/',
        });
      }
      let res = await this.$api.get("/api/product/", {
        params: {
          productId: productId
        }
      });
      this.product = res.data;
    },
    methods: {
      async doBuyProduct() {
        let res = await this.$api.post("/api/order/buy-one", qs.stringify({
          product_id: this.product.id,
          item_count: this.item_count
        }));
        console.log(res);
        if (res.code === 0) {
          if (res.data.total_price !== this.total_price) {
            this.$message({
              message: '购买失败',
              type: 'error',
            });
          } else {
            this.$message({
              message: '购买成功',
              type: 'success',
            });
          }
        }
      },
      buyProduct() {
        if (this.product.count <= 0) {
          this.$alert("该商品已售罄")
          return
        }
        this.$confirm('您当前购买的商品总价为：' + this.total_price + '元', {
          confirmButtonText: '点击支付',
          cancelButtonText: '取消支付',
        }).then(() => {
          this.doBuyProduct();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消支付',
          });
        });
      },
    },
  };
</script>

<style scoped>
  .box-wrap {
    width: 100%;
  }

  .box {
    width: 800px;
    margin: 0 auto;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>