<template>
<div class="search_page">
    <header class="line_bottom">
		<div class="search_bar_box white_bar_box flex_center ">
			<div class="follow_btn">关注</div>
            <label class="search_bar">
                <input type="text" placeholder="输入你想搜索的东西">
            </label>
			<router-link class="search_btn" tag="div" to="/search/searchResult"><img src="../assets/common_search_black.png"></router-link>
		</div>
	</header>

    <transition appear>
        <keep-alive> 
            <router-view></router-view>
        </keep-alive>
    </transition>

</div>
    
</template>

<script>


export default {
  data () {
    return {

    }
  },
  methods:{

  },
  computed:{

  },
  beforeUpdate(){
      //获得当前路由的name
	//   this.pageNow=this.$route.name.toLocaleLowerCase();
	  //console.log(this.$route.name.toLocaleLowerCase())
  },
  created(){
      //获得当前路由的name
    //   this.pageNow=this.$route.name.toLocaleLowerCase();  
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

.search_page{
    width: 100%;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}

/*商城白色的头部*/
header{
  height: 46px;
  width: 100%;
  width: 100vw;
  position: fixed;
  top:0;
  left: 0;
  z-index: 100;
}
.search_bar_box{
	width: 100%;
	height: 100%;
	flex:1;
	padding: 0 8px;
}
.search_bar_box.white_bar_box{
    background-color: #f9f9f9;
}
.search_bar_box.white_bar_box .follow_btn{
	color: #444444;
	width: 36px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	margin-right: 6px;
}
.search_bar_box.white_bar_box .search_bar{
	height: 35px;
	border-bottom: 1px solid #444444;
	flex:1;
}
.search_bar_box.white_bar_box .search_bar input{
    height: 100%;
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 20px;
    padding:0 10px;
    padding-top: 6px;
    background-color: #f9f9f9;
    color:#333333;
}
.search_bar_box .search_btn{
	width: 36px;
	height: 36px;
	margin-left: 6px;
	padding: 7px;
}
</style>
