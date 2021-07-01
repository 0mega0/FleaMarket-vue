<template>
  <div>
    <div class = "order_head">
          <span style="color:#fff;font-size:20px;height: 30px;margin-top:0px;">订单详情</span>
          <el-button style="float: right; padding: 3px" type="info" @click="() => this.$router.push({name: 'home'})">返回首页</el-button>
        </div>
    <el-collapse>
      <template v-for="(order_record, index) in order_records" >
        <el-collapse-item :title="index | titleFilter(order_record.itemCount)" :name="index" :key="index">
          <div v-for="(item, index) in order_record.items" :key="index">
            
            <img :src="item.product.picUrl" alt="" style="float: left">
            <div style="float: left;margin-left:200px; " >
               <p>{{options[item.status]['label']}}</p>
                <p>下单时间：{{order_record.createTime}}</p>
                <p>商品名称：{{item.product.name}}</p>
                <p>购买数量：{{item.itemCount}}</p>
                <p>总价：{{item.itemCount * item.product.price}}</p>  
            </div>
            <div style="float: left;margin-left:200px; " >
                <p>商品描述：{{item.product.desc}}</p>
                <el-button :disabled="item.status >= 1" type="primary" @click="send_out(order_record.id)" style="margin-top:50px;">发货</el-button>
                <el-button :disabled="item.status === 2" type="success" @click="get_in(order_record.id)" style="margin-left:150px;">收货</el-button>
            </div>
          </div>
           
        </el-collapse-item>
      </template>
     
    </el-collapse>
    
  </div>
</template>

<script>
import qs from 'qs';
  export default {
    name: 'Order',
    data() {
      return {
        order_records: [],
         currentTime1:"",
         currentTime2:"",
         timer: "",
        options: [
    {
        value: "0",
        label: "未发货"
    },
    {
        value: "1",
        label: "已发货"
    },
    {
        value: "2",
        label: "已收货"
    }
  ],
        submissionFlag: false
      };
    },
   computed:{
    computedSiteType(){
        return function(siteType){
            return this.options[siteType]['label']
        }
    },
},
    methods: {
    
 
       //当前时间:
 
       

   async send_out(productId){
     
      console.log(productId)
        let res = await  this.$api.post("/api/order/updateOrderStatus", qs.stringify({
          new_status: 1,
          order_id: productId}), true);
        this.$message('已发货，请刷新页面');
        
        
    },
    async get_in(productId){
      console.log(productId)
        let res = await  this.$api.post("/api/order/updateOrderStatus", qs.stringify({
          new_status: 2,
          order_id: productId}), true);
         this.$message('已确认收货物，请刷新页面');
        
    
        
    }
    
   

    },
    filters: {
      titleFilter(val) {
        return "订单编号：" + val;
      },
       
    },
    
    async created() {
      let res = await this.$api.get('/api/order/record');
      console.log(res);
      this.order_records = res.data
    },
  };
</script>

<style scoped>
.order_head{
  width: 1400px;
  height: 30px;
 
}
img {
  width: 235px;
  height: 235px;
}
.el-collapse-item p{
  color:#fff;
  font-size:20px;
  height: 30px;
  margin-top:0px;  
}
.el-collapse-item p{
  color: black;
}
</style>