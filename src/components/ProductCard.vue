<template>


<div class="product_card_box"><!-- 不可加载盒子 -->
    <!-- 加载内容盒子 -->
    <div class="flex_box flex_betwen cantload_content_box">
        <div class="product_card">
            <div class="pro_pic"><img src="../assets/product.jpeg"></div>
            <div class="pro_name">江南古韵床上纯棉十件套被套整套床单枕头凉席卡了按时缴费啊是就</div>
            <h3>￥<span>156</span></h3>
        </div>
        <div class="product_card">
            <div class="pro_pic"><img src="../assets/product.jpeg"></div>
            <div class="pro_name">江南古韵床上纯棉十件套被套整套床单枕头凉席卡了按时缴费啊是就</div>
            <h3>￥<span>156</span></h3>
        </div>
        <div class="product_card">
            <div class="pro_pic"><img src="../assets/product.jpeg"></div>
            <div class="pro_name">江南古韵床上纯棉十件套被套整套床单枕头凉席卡了按时缴费啊是就</div>
            <h3>￥<span>156</span></h3>
        </div>
        <div class="product_card">
            <div class="pro_pic"><img src="../assets/product.jpeg"></div>
            <div class="pro_name">江南古韵床上纯棉十件套被套整套床单枕头凉席卡了按时缴费啊是就</div>
            <h3>￥<span>156</span></h3>
        </div>
        
    </div>
</div>

    
</template>

<script>

export default {
  name:'SimilarGoods',
  components:{
	  
  },
  data () {
    return {

    }
      
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*产品卡片*/
.product_card_box{
	background-color:#fff; 		
}
.cantload_content_box{
	width: 96%;
	width: 96vw;
	margin:0 auto;
}
.product_card_box .flex_box{
	flex: 1;
	flex-wrap: wrap;

}
.product_card_box .product_card{
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
	color: #fc0449;
}

</style>
