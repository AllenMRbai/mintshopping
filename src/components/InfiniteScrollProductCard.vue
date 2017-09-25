<template>
  <div class="product_card_box canload_box" id="product-card"><!-- 可加载盒子 -->
        <!-- 加载内容盒子 -->
        <div 
            class="flex_box flex_betwen load_content_box" 
            v-if="haveProducts" 
            v-infinite-scroll="loadMore" 
            :infinite-scroll-disabled="loading" 
            infinite-scroll-distance="0">

            <router-link tag="div" :to="`/productDetail/${card.ID}`" class="product_card" v-for="card in cards" :key="card.ID">
                <div class="pro_pic"><img v-lazy.product-card="card.Pic"></div>
                <div class="pro_name">{{ card.Title }}</div>
                <h3>￥<span>{{ card.Price }}</span></h3>
            </router-link> 
            
        </div>
        <!-- 缺省页面 -->
        <div class="default_page" v-else>
            <h2>没找到任何商品！</h2>
        </div>
        <div class="load_tips">
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
  },
  watch:{
      loading(){
          //console.log(`loading为${this.loading} cards的长度${this.cards.length}`)
      }
  }
}
</script>

<style scoped>
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
.load_tips{
    background-color: #fff;
    height: 30px;
    text-align: center;
    font-size: 15ox;
    line-height: 30px;
}
.default_page{
    height: 30px;
    text-align: center;
    line-height: 30px;
}
</style>
