<template>
<div>

    <transition name="fade" mode="out-in" appear>
        <!-- <keep-alive>  -->
            <router-view></router-view>
        <!-- </keep-alive> -->
    </transition>

    <!-- 导航 -->
	<nav>
		<ul class="nav_bar_box line_top flex_around">
			<router-link v-for="(nav,index) in navLists" :key="index" :class="{active:(pageNow===nav.EnglishName)}" tag="li" :to='nav.link'>
				<div class="nav_icon" :class="nav.EnglishName"></div>
				<p>{{ nav.ChineseName }}</p>
			</router-link>
		</ul>
	</nav>


</div>
    
</template>

<script>

export default {
  //name: 'MainPage',
  data () {
    return {
      pageNow:'mall',
      navLists:[
          {EnglishName:'mall',ChineseName:'首页',link:'/'},
          {EnglishName:'classify',ChineseName:'分类',link:'/classify/01'},
          {EnglishName:'me',ChineseName:'我',link:'/me'}
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
	  //console.log(this.$route.name.toLocaleLowerCase())
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
  transition: opacity .2s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}


nav{
	width: 100%;
	width: 100vw;
	height: 50px;
	position: fixed;
	left: 0;
	bottom: 0;
    z-index:100;
}

/*底部导航*/
.nav_bar_box{
	width: 100%;
	height: 100%;
	background-color: #fff;
}
.nav_bar_box li{
	margin-top: 2px;
	width:16vw;
}
.nav_bar_box .nav_icon{
	width: 20px;
	height: 20px;
	margin:0 auto;
	background-image:url(../assets/nav_log.jpg);
	background-repeat: no-repeat;
	background-size: 100% auto;
}
.nav_bar_box li .mall{
	background-position: 0% 0%;
}
.nav_bar_box li.active .mall{
	background-position: 0% 20%;
}

.nav_bar_box li .classify{
	background-position: 0% 40%;
}
.nav_bar_box li.active .classify{
	background-position: 0% 60%;
}

.nav_bar_box li .me{
	background-position: 0% 80%;
}
.nav_bar_box li.active .me{
	background-position: 0% 100%;
}

.nav_bar_box li p{
	font-size: 12px;
	color: #999999;
	text-align: center;
}
.nav_bar_box li.active p{
	color: #fc0449;
}

</style>
