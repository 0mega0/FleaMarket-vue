<template>
  <el-container style="border: 1px solid #eee;height: 100%">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>商品管理</template>
          <el-menu-item-group>
            <el-menu-item index="/admin/check">商品审核管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>权限管理</template>
          <el-menu-item-group>
            <el-menu-item index="/admin/user">用户权限管理</el-menu-item>
          </el-menu-item-group>
          
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-message"></i>登出</template>
          <el-menu-item-group>
            <el-menu-item index="/auth/login">登出</el-menu-item>
          </el-menu-item-group>
          
        </el-submenu>
      </el-menu>
      
    </el-aside>

    <el-container>
      <el-main>
        <router-view></router-view>
        
      </el-main>
      
    </el-container>
    
  </el-container>
  
</template>

<script>
  export default {
    name: 'AdminHome',
  };
</script>

<style scoped>
.el-main {
    background: #fff;
}

.el-container{
  border-radius: 5px;
  background: #fff;
  width: 1000px;
  margin: auto;
}
</style>