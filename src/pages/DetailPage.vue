<template>
<div>
	<!-- 产品图片和简介 -->
    <div class="pro_pic_box">
        <router-link tag="div" to="/search" class="search_btn"><img src="../assets/common_search_white.png"></router-link>
        <img :src="productDetail.Pic">
    </div>
    <div class="pro_detail_box">
        <div class="pro_name">{{ productDetail.Title }}</div>
        <div class="zhu_currency">可获得<span>{{ productDetail.Price }}</span>猪币</div>
        <div class="sale_box flex_betwen">
            <h3>￥<span>{{ productDetail.Price }}</span></h3>
            <h4>销量&nbsp;<span>{{ productDetail.Sales_num }}</span></h4>
        </div>
    </div>

    <!-- 子导航 -->
    <div class="sub_nav_box">
        <div class="sub_nav flex_betwen">
            <div class="btn" v-for="(subNav,index) in subNavs" :key="index" :class="{'active':nowPage==index}" @click="changePage(index)">
				{{ subNav.ChineseName }}
			</div>
        </div>
    </div>

	<div class="sub_page" v-show="nowPage==0"><!-- 商品详情page -->
		<div class="detail_pic_box">
			<img v-for="(pic,index) in proDetPics" :key="index" v-lazy="pic">
		</div>
	</div>
	<div class="sub_page" v-show="nowPage==1"><!-- 购物须知page -->
		
	</div>
	<div class="sub_page" v-show="nowPage==2"><!-- 相似商品卡片 -->
		<product-card :cards='similarProduct'></product-card>
	</div>

    <!-- 商品推荐 -->
    <div class="recommend_title">
        <h2>商品推荐</h2>
        <div class="back_line flex_center">
            <div class="did_line"></div>
            <div class="no_line"></div>
            <div class="did_line"></div>
        </div>
    </div>
    <product-card :cards='productRecomend'></product-card><!-- 商品推荐卡片 -->
	

    <div style="height: 46px;"></div>

    <!-- 底部交易bar -->
    <div class="bottom_bar line_top">
        <div class="flex_bar flex_betwen">
            <div></div>
            <div class="btn buy_btn" @click="togglePurchasePanel">立即购买</div>
        </div>
    </div>

    <!-- 回到顶部按钮 -->
    <div class="gotop_btn" @click="goToTop" v-show="showToToP"><img src="../assets/common_totop_black.png"></div>

    <!-- 交易面板 -->
    <div class="black_mask_200" v-show="showPurchasePanel" @click="closePurchasePanel"></div>
    <div class="purchase_pannel" v-show="showPurchasePanel">
        <div class="close" @click="closePurchasePanel"><img src="../assets/common_close_stroke_grey.png"></div>
        <div class="top flex_betwen">
            <div class="pic_box">
                <div class="frame"><img :src="productDetail.Pic"></div>
            </div>
            <div class="detail">
                <h3>￥<span>126</span></h3>
                <div class="choice"><span>已选：</span>{{ optsString }}</div>
            </div>
        </div>
        <div class="middle">
            <div class="cell" :class="{'line_bottom':index!==(options.length-1)}" v-for="(opt,index) in options" :key="index">
                <div class="type_title">{{ opt.Name }}</div>
                <ul class="types_box flex_start">
                    <li v-for="(data,index) in opt.Data" :key="index" :class="{'active':index===opt.selectedIndex}" @click="doSelection(index,opt)">{{ data }}</li>
                </ul>
            </div>
        </div>
        <div class="bottom" @click="ensureBuy">确定</div>
    </div>
   


</div>
    
</template>

<script>
import ProductCard from '@/components/ProductCard';

export default {
  name:'DetailPage',
  components:{
	  ProductCard
  },
  data () {
    return {
		subNavs:[
			{EnglishName:'DetailPicture',ChineseName:'商品详情'},
			{EnglishName:'ShoppingGuid',ChineseName:'购物须知'},
			{EnglishName:'SimilarGoods',ChineseName:'相似商品'}
		],
		nowPage:0,//子页面的当前页面索引 0表示商品详情 1表示购物须知 2表示相似商品
		showPurchasePanel:false,//是否打开购买面板
		productId:'',
		productDetail:{},//ajax请求的商品详情
		showToToP:false,
		proDetPics:[],//ajax请求的商品图片
		productRecomend:[],//ajax请求的商品推荐
		similarProduct:[],//相似商品
		options:[],//商品选项
		optsString:''
    }
      
  },
  computed:{
	  param(){//产品id
		  return this.$route.params.productId;
	  }
  },
  methods:{
	  changePage(ind){
		  this.nowPage=ind;
	  },
	  togglePurchasePanel(){
		  this.showPurchasePanel=!this.showPurchasePanel;
	  },
	  closePurchasePanel(){
		  this.showPurchasePanel=false;
	  },
	  getGoodsInfo(){
		  this.proDetPics.splice(0,this.proDetPics.length);
		  this.$http.get(`http://api.lingkuaiyou.com/Goods/GetGoodsInfo?id=${this.productId}`)
		  .then((data)=>{
			  let body=JSON.parse(data.bodyText);
			  this.productDetail=JSON.parse(data.bodyText).data;
			  this.productDetail.TaoBao_details='';
			  console.log(this.productDetail)
			  console.log('啊啊啊')

			  console.log(this.productDetail)
			  //获得并处理购买选项
			  this.options.splice(0,this.options.length);//同页跳转会复用对象，因此需要清空
			  //this.selected.splice(0,this.options.length);//清空已选择的选项
			  let opts=JSON.parse(this.productDetail.Options);
			  let optsL=opts.length;

			  for(let i=0;i<optsL;i++){
				  opts[i].selectedIndex=0;
				  this.options.push(opts[i]);
			  }
			  this.selectedString();
			  //console.log(this.options)
			  

			  //获得并处理商品详情图片
			  let str=body.data.TaoBao_details;
			  let reg=/src="([^"\r\n]*)"/g;
			  let result;
			  while((result=reg.exec(str))!=null){
				RegExp.lastIndex=result.index
				this.proDetPics.push(result[1]);
			  }
			  //console.log(body.data.TaoBao_details)
		  })
		  .catch((err)=>{
			  console.log(err);
		  })
	  },
	  getProductRecomend(){//获得推荐商品
		  this.$http.get(`http://api.lingkuaiyou.com/Goods/GetGoodsList?pageSize=4`)
		  .then((data)=>{
			  let body=JSON.parse(data.bodyText);
			  this.productRecomend=body.data.DataList;
			  //console.log(this.productRecomend)
			  //console.log(body.data.TaoBao_details)
		  })
		  .catch((err)=>{
			  console.log(err);
		  })
	  },
	  getSimilarProduct(){//获得相似商品
		  this.$http.get(`http://api.lingkuaiyou.com/Goods/GetGuessYouLike?id=${this.$route.params.productId}`)
		  .then((data)=>{
			  let body=JSON.parse(data.bodyText);
			  this.similarProduct=body.data.DataList;
			  //console.log(body)
			  //console.log(body.data.TaoBao_details)
		  })
		  .catch((err)=>{
			  console.log(err);
		  })
	  },
	  goToTop(){
		  document.body.scrollTop=0;
	  },
	  doSelection(ind,opt){//选择选项商品选项
		opt.selectedIndex=ind;
		this.selectedString();
	  },
	  selectedString(){//产品选项字符串
		let len=this.options.length;
		let tem='';
		for(let i=0;i<len;i++){
			let opt=this.options[i];
			tem+=opt.Data[opt.selectedIndex]+'，'
		}
		tem=tem.slice(0,-1);
		this.optsString=tem;
	  },
	  selectedStringKey(){//带键值的产品选项字符串
		let len=this.options.length;
		let tem='';
		for(let i=0;i<len;i++){
			let opt=this.options[i];
			tem+=opt.Name+'：'+opt.Data[opt.selectedIndex]+'，'
		}
		tem=tem.slice(0,-1);
		return tem;
	  },
	  ensureBuy(){
		let optString=encodeURIComponent(this.selectedStringKey());
		let prodetail=encodeURIComponent(JSON.stringify(this.productDetail));

		this.$router.push({
		  path:`/settlement/${prodetail}/${optString}`
		})
	  }
  },
  watch: {
    '$route' (to, from) {
      this.productId=this.$route.params.productId;
	  this.getGoodsInfo();//获得商品详情数据
	  this.getProductRecomend();//获得商品推荐数据
	  this.getSimilarProduct();//获得相似商品
	  console.log('不好意思，我也触发了')
    }
  },
  created(){
     //获得当前路由的name
	 this.productId=this.$route.params.productId;
	 this.getGoodsInfo();//获得商品详情数据 和选项列表
	 this.getProductRecomend();//获得商品推荐数据
	 this.getSimilarProduct();//获得相似商品
	 document.body.onscroll=()=>{
		 if(document.body.scrollTop>300){
			 this.showToToP=true;
		 }else{
			 this.showToToP=false;
		 }
	 }

  }
     


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
/*商品简介*/
.pro_pic_box{
	width: 100%;
	width: 100vw;
	height: 100vw;
	position: relative;
}
.pro_pic_box .search_btn{
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: rgba(0,0,0,.6);
	position: absolute;
	right:10px;
	top: 10px;
	padding:10px; 
}
.pro_pic_box .search_btn img{
	width: 100%;
	height: 100%;
}
.pro_detail_box{
	background-color: #fff;
	padding: 10px;
	padding-bottom: 4px;
}
.pro_detail_box .pro_name{
	font-size: 16px;
	color: #383838;
	line-height: 22px;
	height: 44px;
	overflow: hidden;
}
.pro_detail_box .zhu_currency{
	font-size: 14px;
	color: #b2b2b2;
}
.pro_detail_box .zhu_currency span{
	color: #f9a109;
}
.pro_detail_box .sale_box{
	margin-top: 15px;
	align-items: flex-end;
}
.pro_detail_box .sale_box h3{
	font-weight: normal;
	color: #fc0449;
	font-size: 22px;
}
.pro_detail_box .sale_box h4{
	font-weight: normal;
	color: #c7c7c7;
	font-size: 14px;
}


/*子页面导航*/
.sub_nav_box{
	padding: 2px 12px;
	background-color: #fff;
	margin-top: 15px;
}
.sub_nav_box .sub_nav{

}
.sub_nav_box .sub_nav .btn{
	color:#4f4f4f; 
	padding:9px 4px;
	padding-bottom: 4px;
	border-bottom: 3px solid #fff;
}
.sub_nav_box .sub_nav .btn.active{
	border-bottom: 3px solid #000;
	color: #000;
	font-weight: bold
}
/*商品详情page*/
.detail_pic_box img{
	width: auto;
	height: auto;
	max-width:100%;
	margin:0 auto;
}

/*商品推荐*/
.recommend_title{
	position: relative;
	background-color: #fff;
	margin-top: 24px;
	padding:8px 0;
}
.recommend_title h2{
	font-size: 16px;
	text-align: center;
}
.recommend_title .back_line{
	width: 100%;
	height: 1px;
	width: 100vw;
	position: absolute;
	top: 20px;
	left: 0;
}
.recommend_title .back_line .did_line{
	width: 20vw;
	height: 1px;
	background-color:#f0f0f0; 
}
.recommend_title .back_line .no_line{
	width: 100px;
	height: 1px;
}


/*底部交易bar*/
.bottom_bar{
	position: fixed;
	bottom:0;
	left: 0;
	width: 100%;
	width: 100vw;
	height: 46px;
	background-color: #fff;
	z-index: 100;
}
.bottom_bar .flex_bar{
	width: 100%;
	height: 100%;
}
.bottom_bar .buy_btn{
	color: #fff;
    background-image: -webkit-linear-gradient(351deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    background-image: -o-linear-gradient(351deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    background-image: linear-gradient(81deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    width: 40%;
    width: 40vw;
    height: 100%;
    line-height: 46px;
    text-align: center;
}

/*回到顶部*/
.gotop_btn{
	width: 36px;
	height: 36px;
	position: fixed;
	bottom: 58px;
	right: 8px;
	background-color: #fff;
	opacity: .7;
	border-radius: 50%;
	box-shadow: -0.717px 1.867px 8px 0px rgba(32, 32, 32, 0.3);
	padding: 5px;
	z-index: 100;
}


/*购买选项面板*/
.black_mask_200{
	background-color: rgba(0,0,0,.6);
	width: 100%;
	height: 100%;
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 200;
}
.purchase_pannel{
	width: 100%;
	width: 100vw;
	background-color:#fff;
	position:fixed;
	left: 0;
	bottom: 0;
	z-index: 201  
}
.purchase_pannel .close{
	width: 40px;
	height: 40px;
	padding: 6px;
	position: absolute;
	right: 0;
	top: 0;
}
.purchase_pannel .top{
	width: 100vw;
	padding: 0 3vw;
	flex:1;
	align-items: flex-end;
}
.purchase_pannel .top .pic_box{
	width: 30vw;
	height: 18vw;
	position: relative;
}
.purchase_pannel .top .frame{
	width: 30vw;
	height: 30vw;
	position: absolute;
	left: 0;
	bottom: 0;
	background: #fff;
	border:1px solid #cccccc;
	border-radius: 4px;
	padding: 2px;
}
.purchase_pannel .top .detail{
	width: 64vw;
	height: 18vw;
	padding-left: 6px;
	padding-top: 5px;
}
.purchase_pannel .top .detail h3{
	color: #fa073c;
	font-size: 16px;
	
}
.purchase_pannel .middle{
	margin-top: 8px;
	margin-bottom:2px;
	padding:0 2vw;
	width: 100vw;
	height: 76vw;
	overflow-x: hidden;
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;
	padding-bottom: 12px;
}
.purchase_pannel .middle .cell{
	padding: 6px 3px;
}
.purchase_pannel .middle .type_title{
	color: #333333;
	font-size: 16px;
	margin-bottom: 14px;
}
.purchase_pannel .middle .types_box{
	flex-wrap: wrap;
}
.purchase_pannel .middle .types_box li{
	color: #333333;
	padding:0 10px;
	height: 32px;
	line-height: 32px;
	margin-right:24px;
	background-color:#f5f5f5; 
	min-width: 50px;
	text-align: center;
	margin-bottom: 18px;
}
.purchase_pannel .middle .types_box li.active{
	background-color: #fa0729;
	color: #fff;
}
.purchase_pannel .bottom{
	width: 100%;
	height: 44px;
	line-height: 44px;
	color: #fff;
	text-align: center;
	font-size: 15px;
	background-color: #fa073c;
}

</style>
