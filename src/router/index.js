import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
//主页面 三大页
import Mall from '@/pages/Mall'
import MainPage from '@/pages/MainPage'
import Classify from '@/pages/Classify'
import Me from '@/pages/Me'
//订单 4页面
import OrderPage from '@/pages/OrderPage'
import AllOrders from '@/pages/AllOrders'
import PendingPayment from '@/pages/PendingPayment'
import PendingShipment from '@/pages/PendingShipment'
import Shipped from '@/pages/Shipped'
//注册 登录 修改
import SignPage from '@/pages/SignPage'
import SignIn from '@/pages/SignIn'
import SignUp1 from '@/pages/SignUp1'
import SignUp2 from '@/pages/SignUp2'
import Alter1 from '@/pages/Alter1'
import Alter2 from '@/pages/Alter2'
//搜索页面
import SearchPage from '@/pages/SearchPage'
import Guide from '@/pages/Guide'
import SearchResult from '@/pages/SearchResult'
//商品详情页
import DetailPage from '@/pages/DetailPage'
//结算页面
import Settlement from '@/pages/Settlement'
//支付页面
import Payment from '@/pages/Payment'
//地址管理
import AddAddress from '@/pages/AddAddress'
import ManageAddress from '@/pages/ManageAddress'
import AddressPage from '@/pages/AddressPage'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    //主页面 三大页面
    {
      path:'/',
      // name:'MainPage',
      component:MainPage,
      children:[
        {
          path:'',
          name:'Mall',//首页
          component:Mall
        },
        {
          path:'classify',
          name:'Classify',//分类
          component:Classify
        },
        {
          path:'me',
          name:'Me',//个人中心
          component:Me
        }
      ]
    },
    //订单 4页面
    {
      path:'/orders',
      // name:'OrderPage',
      component:OrderPage,
      children:[
        {
          path:'allOrders',
          name:'AllOrders',//所有订单
          component:AllOrders
        },
        {
          path:'pendingPayment',
          name:'PendingPayment',//待付款
          component:PendingPayment
        },
        {
          path:'pendingShipment',
          name:'PendingShipment',//待发货
          component:PendingShipment
        },
        {
          path:'shipped',
          name:'Shipped',//已发货
          component:Shipped
        },
      ]
    },
    //注册 登录 修改
    {
      path:'/sign',
      component:SignPage,
      children:[
        {
          path:'signIn',
          name:'SignIn',//登录
          component:SignIn
        },
        {
          path:'signUp1',
          name:'SignUp1',//注册 步骤1
          component:SignUp1
        },
        {
          path:'signUp2',
          name:'SignUp2',//注册 步骤2
          component:SignUp2
        },
        {
          path:'alter1',
          name:'Alter1',//修改密码 步骤1
          component:Alter1
        },
        {
          path:'alter2',
          name:'Alter2',//修改密码 步骤2
          component:Alter2
        }
      ]
    },
    //搜索页面
    {
      path:'/search',
      component:SearchPage,
      children:[
        {
          path:'guide',
          name:'Guide',//搜索引导页
          component:Guide
        },
        {
          path:'searchResult',
          name:'SearchResult',//搜索结果页
          component:SearchResult
        }

      ]
    },
    //商品详情页
    {
      path:'/productDetail/:productId',
      name:'DetailPage',
      component:DetailPage
    },
    //结算页面
    {
      path:'/settlement',
      name:'Settlement',
      component:Settlement
    },
    //支付页面
    {
      path:'/payment',
      name:'Payment',
      component:Payment
    },
    //地址管理
    {
      path:'/address',
      component:AddressPage,
      children:[
        {
          path:'',
          name:'ManageAddress',//地址管理
          component:ManageAddress
        },
        {
          path:'addAddress',
          name:'AddAddress',//添加地址
          component:AddAddress
        }
      ]
    }
  ]
})
