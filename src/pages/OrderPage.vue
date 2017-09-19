<template>
<div>
    <!--头部导航 -->
    <div class="top_bar">
		<ul class="flex_box flex_around line_bottom">
			<router-link tag="li" :to="nav.link" :class="{active:pageNow===nav.EnglishName}" v-for="(nav,index) in navLists" :key="index" replace>{{ nav.ChineseName }}</router-link>
		</ul>
		<div class="red_segment" :class="pageNow"></div>
	</div>

    <transition name="fade" mode="out-in" appear>
        <keep-alive> 
            <router-view></router-view>
        </keep-alive>
    </transition>

    
</div>
    
</template>

<script>

export default {
  name: 'OrderPage',
  data () {
    return {
      pageNow:'allorders',
      navLists:[
          {EnglishName:'allorders',ChineseName:'全部订单',link:'/orders/allOrders'},
          {EnglishName:'pendingpayment',ChineseName:'待付款',link:'/orders/pendingPayment'},
          {EnglishName:'pendingshipment',ChineseName:'待发货',link:'/orders/pendingShipment'},
          {EnglishName:'shipped',ChineseName:'已发货',link:'/orders/shipped'}
      ]
    }
  },
  methods:{

  },
  computed:{

  },
  beforeUpdate(){
      //获得当前路由的name
      this.pageNow=this.$route.name.toLocaleLowerCase(); 
      console.log(this.$route.name.toLocaleLowerCase())
  },
  created(){
      //获得当前路由的name
      this.pageNow=this.$route.name.toLocaleLowerCase();  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}

/* 头部导航 */
.top_bar{
	width: 100%;
	width: 100vw;
	height: 46px;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index:100;
}
.top_bar .flex_box{
	width: 100%;
	width: 100vw;
	height: 100%;
}
.top_bar .flex_box li{
	width: 25vw;
	text-align: center;
	color: #636363;
}
.top_bar .flex_box li.active{
	color: #fc0449;
	font-weight: bold;
}
.top_bar .red_segment{
	background-color: #fc0449;
	width: 30px;
	height: 3px;
	position: absolute;
	left: 0;
	margin-left:-15px;
	bottom: 0;
    transition: all .4s;
}
.top_bar .red_segment.allorders{
	transform: translateX(12.5vw);
}
.top_bar .red_segment.pendingpayment{
	transform: translateX(37.5vw);
}
.top_bar .red_segment.pendingshipment{
	transform: translateX(62.5vw);
}
.top_bar .red_segment.shipped{
	transform: translateX(87.5vw);
}
</style>
