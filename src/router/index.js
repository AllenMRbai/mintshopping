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
import Alter from '@/pages/Alter'


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
      // name:'SignPage',
      component:SignPage,
      children:[
        {
          path:'signIn',
          name:'SignIn',
          component:SignIn
        },
        {
          path:'signUp1',
          name:'SignUp1',
          component:SignUp1
        },
        {
          path:'signUp2',
          name:'SignUp2',
          component:SignUp2
        },
        {
          path:'alter',
          name:'Alter',
          component:Alter
        }
      ]
    }


  ]
})
