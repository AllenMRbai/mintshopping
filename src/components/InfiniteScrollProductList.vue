<template>
  <div class="product_list_box canload_box" ><!-- 可加载盒子 -->
        <!-- 加载内容盒子 -->
        <div 
            class="load_content_box" 
            v-infinite-scroll="loadMore" 
            v-show='!noProduct'
            :infinite-scroll-disabled="loading" 
            infinite-scroll-distance="100">

            <router-link tag="div" :to="`/productDetail/${list.ID}`" class="product_list flex_betwen" v-for="list in lists" :key="list.ID">
				<div class="pro_pic flex_center"><img v-lazy.product-card="list.Pic"></div>
				<div class="right_box flex_betwen">
					<div class="pro_name">{{ list.Title }}</div>
					<div class="right_bottom flex_betwen">
						<h3>￥<span>{{ list.Price }}</span></h3>
						<h4>销量&nbsp;<span>{{ list.Sales_num }}</span></h4>
					</div>
				</div>
			</router-link> 
            
        </div>
        <!-- 缺省页面 -->
        <div  v-show='noProduct'>
            <div class="default_pic"><img src="../assets/default_nogoods.png"></div>
		    <div class="default_title">没找到你搜索的商品</div>
        </div>
		<div class="load_tips" v-show='!noProduct'>
            <div v-if='!noMore'>正在加载中...</div>
            <div v-else>没有更多商品了</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productLists',
  props:{
      'lists':{
            type:Array,
		},
	  'loading':{
          type:Boolean,
          default:false//若为真，则无限滚动不会被触发 默认为false
      },
      'noMore':{//没有更多商品 true表示没有更多商品了， false表示还可以加载
          type:Boolean
      },
      'noProduct':{//没有商品  true表示一个商品也没有，false表示有商品 或还在请求中，默认为false
          type:Boolean,
          default:false
      }
      
  },

  data(){
      return {

      }
  },
  methods:{
    loadMore() {
        this.$emit('load-more')
    }
  },
  computed:{
      haveProducts(){
          return this.lists.length>0;
      }
  }
}
</script>

<style scoped>
/* 缺省页面 */
.default_pic{
	width: 70%;
	margin:0 auto;
	margin-top:4vh;
	opacity: .7;
}
.default_title{
	text-align: center;
	color: #c0c1c2;
	font-size: 16px;
}
/*列表式产品*/
.load_content_box{
    background-color: #fff;
}
.load_content_box .product_list{
	align-items: flex-start;
	flex: 1;
	border-bottom: 1px solid #e6e6e6; 
}
.load_content_box .pro_pic{
	width:34vw;
	height: 34vw;
	background-color: #f0f0f0;
}
.load_content_box .pro_pic img{
    width: auto;
    height: auto;
    margin:auto auto;
    max-width: 100%;
    min-width: 40%;
    display: block;
}
.load_content_box .right_box{
	flex:1;
	flex-direction: column;
	align-items: flex-start;
	width: 66vw;
	height: 34vw;
}
.load_content_box .right_box .pro_name{
	font-size: 15px;
	line-height: 20px;
	height: 40px;
	overflow: hidden;
	color: #383838;
	padding: 0 8px;
}
.load_content_box .right_box h3{
	margin-top: 10px;
	color: #fc0449;
	font-size: 14px;
	font-weight: normal;
}
.load_content_box .right_box h3 span{
	font-size: 24px;
}
.load_content_box .right_box h4{
	margin-top: 10px;
	color: #cccccc;
	font-size: 14px;
	font-weight: normal;
}
.load_content_box .right_bottom{
	width: 66vw;
	padding: 0 8px;
	align-items: flex-end;
}
.load_animation{
	background-color: #eaeaea;
	text-align: center;
	padding:6px 0;
	font-size: 14px;
}
/* 加载提示 */
.load_tips{
    background-color: #fff;
    height: 30px;
    text-align: center;
    font-size: 14px;
    color: #999999;
    line-height: 30px;
}
/* 缺省页面 */
.default_page{
    height: 30px;
    text-align: center;
    line-height: 30px;
}
</style>
