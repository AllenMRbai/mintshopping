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
//订单详情
import OrderDetail from '@/pages/OrderDetail'
import SuccessTrade from '@/pages/SuccessTrade'
import WaitingForPayment from '@/pages/WaitingForPayment'
import WaitingForShipment from '@/pages/WaitingForShipment'
import HasShipped from '@/pages/HasShipped'
import SuccessPurchase from '@/pages/SuccessPurchase'
import SuccessPayment from '@/pages/SuccessPayment'
//注册 登录 修改
import SignPage from '@/pages/SignPage'
import SignIn from '@/pages/SignIn'
import SignUp1 from '@/pages/SignUp1'
import SignUp2 from '@/pages/SignUp2'
import Alter1 from '@/pages/Alter1'
import Alter2 from '@/pages/Alter2'
//搜索页面
import Search from '@/pages/Search'
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
//物流详情
import Logistics from '@/pages/Logistics'
//个人中心其他
import TheOther from '@/pages/TheOther'
import Help from '@/pages/Help'
import QRcode from '@/pages/QRcode'

Vue.use(Router)

let router= new Router({
  //使用H5的history模式
  mode:'history',
  //记录滚动高度，并滚动到对应的高度
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log()
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  //路由配置
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
          component:Me,
          // meta: { requiresAuth: true }
        }
      ]
    },
    //订单 4页面
    {
      path:'/orders',
      component:OrderPage,
      children:[
        {
          path:'allOrders',
          name:'AllOrders',//所有订单
          component:AllOrders,
          meta: { requiresAuth: true }
        },
        {
          path:'pendingPayment',
          name:'PendingPayment',//待付款
          component:PendingPayment,
          meta: { requiresAuth: true }
        },
        {
          path:'pendingShipment',
          name:'PendingShipment',//待发货
          component:PendingShipment,
          meta: { requiresAuth: true }
        },
        {
          path:'shipped',
          name:'Shipped',//已发货
          component:Shipped,
          meta: { requiresAuth: true }
        },
      ]
    },
    //订单详情
    {
      path:'/orderDetail',
      component:OrderDetail,
      children:[
        {
          path:'successTrade',
          name:'SuccessTrade',//交易成功
          component:SuccessTrade,
          meta: { requiresAuth: true }
        },
        {
          path:'waitingForPayment',
          name:'WaitingForPayment',//待支付
          component:WaitingForPayment,
          meta: { requiresAuth: true }
        },
        {
          path:'waitingForShipment',
          name:'WaitingForShipment',//待发货
          component:WaitingForShipment,
          meta: { requiresAuth: true }
        },
        {
          path:'hasShipped',
          name:'HasShipped',//已发货
          component:HasShipped,
          meta: { requiresAuth: true }
        },
        {
          path:'successPurchase',
          name:'SuccessPurchase',//确认收货时的详情页
          component:SuccessPurchase,
          meta: { requiresAuth: true }
        },
        {
          path:'successPayment',
          name:'SuccessPayment',//购买商品支付成功时的详情页
          component:SuccessPayment,
          meta: { requiresAuth: true }
        }
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
      name:'Search',
      component:Search,
      
    },
    //商品详情页
    {
      path:'/productDetail/:productId',
      name:'DetailPage',
      component:DetailPage
    },
    //结算页面
    {
      path:'/settlement/:productId/:options',
      name:'Settlement',
      component:Settlement,
      meta: { requiresAuth: true }
    },
    //支付页面
    {
      path:'/payment/:orderId/:price',
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
          component:ManageAddress,
          meta: { requiresAuth: true }
        },
        {
          path:'addAddress/:id/:name/:mobile/:address/:province/:city/:area/:provinceN/:cityN/:areaN',
          name:'AddAddress',//添加地址
          component:AddAddress,
          meta: { requiresAuth: true }
        },
        {
          path:'addAddress/:id',
          name:'AddAddress',//添加地址
          component:AddAddress,
          meta: { requiresAuth: true }
        }
      ]
    },
    //物流管理
    {
      path:'/logistics',
      name:'Logistics',
      component:Logistics
    },
    //个人中心其他
    {
      path:'/theOther',
      component:TheOther,
      children:[
        {
          path:'help',
          name:'Help',//帮助页面
          component:Help
        },
        {
          path:'QRcode',
          name:'QRcode',//关注二维码
          component:QRcode
        }
      ]
    }
  ]
})

let auth=new Object();
auth.loggedIn=function(){
  let token=localStorage.getItem('token');
  return token;
}
//当跳转到配置了路由元信息的页面，需要先判断用户是否登录，未登录的界面将重定向到登录页面
router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    //console.log('这是来着index的跳转'+!auth.loggedIn())
    if (!auth.loggedIn()) {
      next({
        path: '/sign/signIn',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router;

