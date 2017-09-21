<template>
<div>
    <div style="height:46px;"></div>
    <div class="btn_pannel">
		<div class="pannel_top flex_betwen">
			<h4>历史搜索</h4>
			<div class="clear_btn"><img src="../assets/common_close_fill_grey.png"></div>
		</div>
		<ul class="pannel_btns flex_start">
			<li>巧克力</li>
			<li>碎花群</li>
			<li>口红</li>
			<li>黑色高跟鞋</li>
			<li>笔记本</li>
			<li>男士七分裤子</li>
			<li>cpu</li>
			<li>短袖</li>
		</ul>
	</div>

	<div class="btn_pannel">
		<div class="pannel_top">
			<h4>热门推荐</h4>
		</div>
		<ul class="pannel_btns flex_start">
			<li>短裤男</li>
			<li>桂林米线</li>
			<li>小米电视</li>
			<li>连衣裙</li>
		</ul>
	</div>	

</div>
    
</template>

<script>

export default {
  name:'Guide',
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
/*预视界面*/
.btn_pannel{
	padding: 8px 10px;
	margin-top: 8px;
	padding-bottom: 2px;
}
.pannel_top{
	height: 30px;
}
.pannel_top h4{
	font-size: .75rem;
	color: #bdbdbd;
}
.pannel_top .clear_btn{
	width: 30px;
	height: 30px;
	padding: 4px;
}
.pannel_btns{
	flex-wrap: wrap; 
}
.pannel_btns li{
	font-size: .7rem;
	color: #414141;
	background-color: #f5f5f5;
	padding: 0 18px;
	height: 34px;
	line-height:34px;
	border-radius: 17px;
	margin-top: 12px;
	margin-right: 12px;
}


</style>
