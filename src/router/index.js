import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '@/pages/auth/Register';
import Login from '@/pages/auth/Login';
import Home from '@/pages/Home';
import AddProduct from '@/pages/product/AddProduct';
import Cart from '@/pages/product/Cart';
import AdminHome from '@/pages/admin/AdminHome';
import Check from '@/pages/admin/Check';
import User from '@/pages/admin/User';
import Order from '@/pages/product/Order';
import ProductDetail from '@/pages/product/ProductDetail';

Vue.use(VueRouter);

const routes = [
  // auth 模块
  {
    path: '/auth/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
  },
  // 主页
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // 添加商品
  {
    path: '/product/add',
    name: 'addProduct',
    component: AddProduct,
  },
  {
    path: '/product/cart',
    name: 'cart',
    component: Cart,
  },
  {
    path: "/product/order",
    name: 'order',
    component: Order
  },
  {
    path: '/product/detail/:productId',
    name: 'productDetail',
    component: ProductDetail
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: AdminHome,
    children: [
      {
        path: 'check',
        component: Check,
      },
      {
        path: 'user',
        component: User
      }
    ],
    meta: {
      requireAuth: true,
    },
  },
];

let router = new VueRouter({
  routes,
});

export default router;
