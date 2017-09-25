<template>
<div>
	
    <!-- <fake-search-head></fake-search-head> -->
    <!-- 头部 -->
	<header>
		<div class="search_bar_box red_bar_box flex_center">
			<div class="follow_btn">关注</div>
			<router-link class="search_bar" tag="div" to="/search/guide">输入你想要搜索的东西</router-link>
			<router-link class="search_btn" tag="div" to="/search/guide"><img src="../assets/common_search_white.png"></router-link>
		</div>
	</header>

    <!-- 主体 -->
	<main>
		<div class="top_blank_space" style="height: 46px;"></div><!-- 顶部空白 -->

		<mt-swipe :auto="5000" style="height:100px;">
			<mt-swipe-item><img src="../assets/mall_banner.jpg"></mt-swipe-item>
			<mt-swipe-item><img src="../assets/mall_banner.jpg"></mt-swipe-item>
			<mt-swipe-item><img src="../assets/mall_banner.jpg"></mt-swipe-item>
		</mt-swipe>

		<!-- 菜单页面 -->
		<div class="manu_box">
			<ul class="manu flex_around">
				<li v-for="(classify,index) in classifies" :key="index">
					<div class="manu_pic" :class="'pic_0'+index"></div>
					<p>{{ classify.name }}</p>
				</li>
			</ul>
		</div>
		
		<!-- 精选 -->
		<div class="selected_box">
			<div class="news_box flex_betwen">
				<div class="title_pic"><img src="../assets/mall_newsTitle.jpg"></div>
				<div class="line_vertical"></div>
				<div class="news_content">
					<div class="news_list">新手快速上手，教你如何更省</div>
					<div class="news_list">新手快速上手，教你如何更省如何如何如何</div>
				</div>
			</div>
			<div class="dot_line"></div>
			<div class="selects flex_betwen">
                <div class="select" v-for='(select,index) in selects' :key='index' :class="[{'border_right':select.lineRight},{'border_bottom':select.lineBottom}]">
					<h3>{{ select.title }}</h3>
					<p>{{ select.title2 }}</p>
					<div class="select_bottom flex_betwen">
						<div class="show_pic"><img :src="'../../static/img/mall_menu_'+index+'.jpg'"></div>
						<div class="show_pic"><img :src="'../../static/img/mall_menu_0'+index+'.jpg'"></div>
					</div>			
				</div>

			</div>
		</div>
		
		<div class="special_subject"><img src="../assets/special_subjuct.jpg"></div><!-- banner2 -->
		
		<!-- 可加载的卡片式产品列表 -->
		<infinite-scroll-product-card :cards='productCards' :loading='stopLoad' :no-more='noMore' @load-more='loadMore'></infinite-scroll-product-card>

		<div class="bottom_blank_space" style="height: 50px;"></div><!-- 底部空白 -->
	</main>

</div>
    
</template>

<script>
import Vue from 'vue'
import InfiniteScrollProductCard from '@/components/InfiniteScrollProductCard.vue';

export default {
  name: 'mall',
  components:{
	  InfiniteScrollProductCard
  },
  data () {
    return {
      classifies:[
          {name:'女装'},
          {name:'男装'},
          {name:'鞋包'},
          {name:'日用品'},
          {name:'更多分类'}
      ],
      selects:[
          {title:'营养美食',title2:'营养补充，活力一整天',lineRight:true,lineBottom:true},
          {title:'电竞标配',title2:'有了它，轻松上王者',lineRight:false,lineBottom:true},
          {title:'9.9元专区',title2:'最爱逛的小商品商城',lineRight:true,lineBottom:false},
          {title:'人气推荐',title2:'这里有最火爆的商品',lineRight:false,lineBottom:false},
	  ],
	  pageIndex:1,
	  stopLoad:false,//用来判断现在是否可以加载,true表示停止加载
	  noMore:false,//true表示没有更多商品了
	  productCards:[]
    }
  },
  methods:{
	loadMore(){
		if(this.noMore){
			return;
		}
		if(this.stopLoad){
			return;
		}
		this.stopLoad=true;
		this.$http.get(`http://api.lingkuaiyou.com/Goods/GetGoodsList?pageIndex=${this.pageIndex}&pageSize=12`)
		.then((data)=>{
			let body=JSON.parse(data.bodyText)
			console.log('发送ajax')
			//console.log(body.result);
			//console.log('这是本次传过来的商品个数'+body.data.DataList.length)
			if( body.result ){
				let productLists=body.data.DataList;
				let len=productLists.length;
				if(len>0){
					for(let i=0;i<len;i++){
						this.productCards.push(productLists[i]);
					}
					this.pageIndex++;
					this.stopLoad=false;
					console.log(this.pageIndex);
				}else{
					this.noMore=true;//表示没有更多商品了
				}
			}else{//没有更多商品了
				this.stopLoad=true;//阻止继续加载
				this.noMore=true;//表示没有更多商品了
			}
		},(err)=>{
			console.log(err);
		})
	}
  },
  created:function(){
	  this.loadMore();
	  	 
  },
  mounted(){
	  this.$nextTick(function () {
			console.log('<-- 页面打开')
	  console.log('pageIndex='+this.pageIndex)
	  console.log('body的高度高度'+document.body.scrollTop)
	  console.log('页面打开-->')
		})
	  
	  
  }
//   deactivated(){
// 	  console.log('没有被缓存')
//   },
//   activated(){
// 	   console.log('已经缓存')
//   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.allen{
	background-color: red;
	color: #fff;
	width: 50vw;
	height: 50px;
	text-align: center
}
header{
	width: 100%;
	width: 100vw;
	height: 46px;
	position: fixed;
	left: 0;
	top:0;
    z-index: 100;
}
main{
	background-color: #fff;
}

/*商城红色的头部*/
.search_bar_box{
	width: 100%;
	height: 100%;
	flex:1;
	padding: 0 8px;
}
.search_bar_box.red_bar_box{
    background-image: -webkit-linear-gradient(81deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    background-image: -o-linear-gradient(81deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    background-image: linear-gradient(171deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
}
.search_bar_box.red_bar_box .follow_btn{
	color: #fff;
	width: 36px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	margin-right: 6px;
}
.search_bar_box.red_bar_box .search_bar{
	height: 36px;
	border-bottom: 1px solid #fff;
	font-size: 16px;
	text-align: center;
	line-height: 28px;
	padding-top: 8PX;
	color: #fff;
	flex:1;
}
.search_bar_box .search_btn{
	width: 36px;
	height: 36px;
	margin-left: 6px;
	padding: 7px;
}

/*banner*/
/* .banner{width: 100vw;} */
/*菜单*/
.manu_box{
	padding:8px 0;		
}

.manu li{
	width: 16vw;
}
.manu .manu_pic{
	margin:0 auto;
	width: 40px;
	height: 40px;
	width: 14vw;
	height: 14vw;
	border-radius: 50%;
	margin-bottom: 4px;
	background-image: url(../assets/mall_nav.jpg);
	background-repeat: no-repeat;
	background-size:100% auto;
}
.manu p{
	font-size: .6rem;
	color: #333;
	text-align: center;
}

.manu .manu_pic.pic_00{
	background-position: 0% 0%;
}
.manu .manu_pic.pic_01{
	background-position: 0% 25%;
}
.manu .manu_pic.pic_02{
	background-position: 0% 50%;
}
.manu .manu_pic.pic_03{
	background-position: 0% 75%;
}
.manu .manu_pic.pic_04{
	background-position: 0% 100%;
}

/*menu*/
.selected_box{
	width:96%;
	width:96vw;
	margin:0 auto;
	border:1px solid #eaeaea;
	flex:1;
}
.selected_box .title_pic{
	margin:10px 10px;
	width: 76px;
	height:35px;
}
.selected_box .title_pic img{
	width: 100%;
	height: 100%;
}
.selected_box .line_vertical{
	width: 1px;
	background-color: #eaeaea;
	height: 40px;
}
.selected_box .news_content{
	flex:1;
	overflow: hidden;
	padding-left: 8px;
	padding-right: 8px;
	height: 36px;
	margin:10px 0;
}
.selected_box .news_list{
	text-align: left;
	font-size: 14px;
	line-height: 18px;
	color: #333333;
	max-height:36px;
	overflow: hidden; 
}
.selects{
	flex:1;
	flex-wrap: wrap;
}
.select{
	flex:0 0 50%;
	background-color: #fff;
	padding:5px;
	padding-bottom: 0;
}
.select h3{
	font-size: 14px;
	color: #3e3e3e;
}
.select p{
	font-size: 12px;
	color: #818181;
	margin-top: 0px;
}

.show_pic{
	width: 18vw;
	height: 18vw;
	padding:5px;
}
.border_right{border-right: 1px solid #ebebeb;}
.border_bottom{border-bottom: 1px solid #ebebeb;}

/*专题*/
.special_subject{
	width: 96vw;
	margin:6px auto;

}

</style>
