<template>
  <div class="product_list_box canload_box" ><!-- 可加载盒子 -->
        <!-- 加载内容盒子 -->
        <div 
            class="load_content_box" 
            v-if="haveProducts" 
            v-infinite-scroll="loadMore" 
            :infinite-scroll-disabled="loading" 
            infinite-scroll-distance="40">

            <router-link tag="div" :to="`/productDetail/${list.id}`" class="product_list flex_betwen" v-for="list in lists" :key="list.id">
				<div class="pro_pic"><img v-lazy.product-card="list.pic"></div>
				<div class="right_box flex_betwen">
					<div class="pro_name">{{ list.proName }}</div>
					<div class="right_bottom flex_betwen">
						<h3>￥<span>{{ list.price }}</span></h3>
						<h4>销量&nbsp;<span>{{ list.sale }}</span></h4>
					</div>
				</div>
			</router-link> 
            
        </div>
        <!-- 缺省页面 -->
        <div class="default_page" v-else>
            <h2>没找到任何商品！</h2>
        </div>
    </div>
</template>

<script>
export default {
  name: 'productLists',
  props:{
      'lists':{
            type:Array,
            default:[
                    {proName:"江南古韵床上纯棉十件套被套整套床单枕头凉席卡了按时缴费啊是就",price:156,sale:230,pic:'../../static/img/product.jpeg',id:'asdf456546465'} 
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
          return this.lists.length>0;
      }
  }
}
</script>

<style scoped>
/*列表式产品*/
.load_content_box{}
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
</style>
