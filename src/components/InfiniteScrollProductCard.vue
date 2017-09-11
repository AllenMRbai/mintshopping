<template>
  <div class="product_card_box canload_box" id="product-card"><!-- 可加载盒子 -->
        <!-- 加载内容盒子 -->
        <div 
            class="flex_box flex_betwen load_content_box" 
            v-if="haveProducts" 
            v-infinite-scroll="loadMore" 
            :infinite-scroll-disabled="loading" 
            infinite-scroll-distance="40">

            <div class="product_card" v-for="card in cards" :key="card.id">
                <div class="pro_pic"><img v-lazy.product-card="card.pic"></div>
                <div class="pro_name">{{ card.proName }}</div>
                <h3>￥<span>{{ card.price }}</span></h3>
            </div> 
            
        </div>
        <!-- 缺省页面 -->
        <div class="default_page hidden" v-else>
            <h2>没找到任何商品！</h2>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productCard',
  props:{
      'cards':{
            type:Array,
            default:[
                    {proName:"江南古韵床上纯棉十件套被套整套床单枕头凉席卡了按时缴费啊是就",price:156,pic:'../../static/img/product.jpeg',id:'asdf456546465'} 
                ]
        }
  },

  data(){
      return {
        loading:false,//若为真，则无限滚动不会被触发 默认为false
      }
  },
  methods:{
    loadMore() {
        console.log("emit load")
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
/*可加载的产品卡片*/

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
</style>
