<template>
  <div class="product_card_box canload_box" id="product-card"><!-- 可加载盒子 -->
        <!-- 加载内容盒子 -->
        <div 
            class="flex_box flex_betwen load_content_box" 
             v-show='!noProduct' 
            v-infinite-scroll="loadMore" 
            :infinite-scroll-disabled="loading" 
            infinite-scroll-distance="200">

            <router-link tag="div" :to="`/productDetail/${card.ID}`" class="product_card" v-for="card in cards" :key="card.ID">
                <div class="pro_pic flex_center"><img v-lazy.product-card="card.Pic"></div>
                <div class="pro_name">{{ card.Title }}</div>
                <h3>￥<span>{{ card.Price }}</span></h3>
            </router-link> 
            
        </div>
        <!-- 缺省页面 -->
        <div  v-show='noProduct'>
            <div class="default_pic"><img src="../assets/default_nogoods.png"></div>
		    <div class="default_title">没找到商品</div>
        </div>
        <div class="load_tips" v-show='!noProduct'>
            <div v-if='!noMore'>正在加载中...</div>
            <div v-else>没有更多商品了</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productCard',
  props:{
      'cards':{
            type:Array
        },
      'loading':{
          type:Boolean,
          default:false//若为真，则无限滚动不会被触发 默认为false
      },
      'noMore':{
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
          return this.cards.length>0;
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

.pro_pic img{
    width: auto;
    height: auto;
    margin:auto auto;
    max-width: 100%;
    display: block;
}
/*可加载的产品卡片*/
.pro_pic image[lazy=loading] {
  width: 20px;
  height: 20px;
  margin: auto;
}
.load_content_box{
	width: 96%;
	width: 96vw;
	margin:0 auto;
}
.product_card_box .flex_box{
	flex: 1;
	flex-wrap: wrap;

}
.product_card_box .product_card{
	/* flex:0 0 49%; */
	width: 47.5vw;
	border:1px solid #eaeaea;
	margin-bottom: 4px;
	padding-bottom: 6px;
	overflow: hidden;
}
.product_card .pro_pic{
	width: 47.5vw;
	height: 47.5vw;
	background-color: #f0f0f0;
	overflow: hidden;
	margin-bottom: 3px;
}
.product_card .pro_name{
	padding: 0 4px;
	font-size: 12px;
	color: #3d3d3d;
	line-height: 15px;
	height: 30px;
	overflow: hidden;
}
.product_card h3{
	margin-left: 4px;
	margin-top: 8px;
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
