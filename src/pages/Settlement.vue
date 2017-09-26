<template>
<div>
    <!-- 收货地址面板 -->
    <router-link tag="div" to="/address" class="adress_pannel">
        <div class="top flex_betwen">
            <div class="name">{{ addressMessage.name }}</div>
            <div class="phone">{{ addressMessage.phone }}</div>
        </div>
        <div class="bottom flex_betwen">
            <div class="icon_position"><img src="../assets/common_position_grey.png"></div>
            <div class="adress" :class="{'text_center':!addressMessage.haveDefault}">{{ addressMessage.address }}</div>
            <div class="icon_go"><img src="../assets/common_rightarrow_grey.png"></div>
        </div>
    </router-link>
    <div class="color_line"></div>

    <!-- 商品面板 -->
    <div class="pro_detail_pannel">
        <div class="flex_box flex_betwen">
            <div class="pic"><img src="../assets/product.jpeg"></div>
            <div class="right_box">
                <div class="pro_name">爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定</div>
                <div class="zhu_currency">可获得<span>126</span>猪币</div>
                <div class="choice">颜色：绿色，尺寸：L</div>
            </div>
        </div>
    </div>

    <!-- 结算面板 -->
    <div class="settle_pannel">
        <div class="settle_list flex_betwen line_bottom">
            <div class="title">商品金额</div>
            <div class="price">￥126.00</div>
        </div>
        <div class="settle_list flex_betwen line_bottom">
            <div class="title grey">运费</div>
            <div class="price grey">+￥0.00</div>
        </div>
        <div class="settle_list flex_betwen">
            <div class="title">总金额</div>
            <div class="price red">￥126.00</div>
        </div>
    </div>

    <!-- 底部提交bar -->
    <!-- 底部交易bar -->
    <div class="bottom_bar line_top">
        <div class="flex_bar flex_end">
            <div></div>
            <router-link tag="div" to="./payment" class="btn buy_btn">提交订单</router-link>
        </div>
    </div>

</div>
    
</template>

<script>

export default {
  name:'Settlement',
  components:{
	  
  },
  data () {
    return {
	    addressMessage:{
		  phone:'',
		  name:'',
		  address:'点击添加收货地址',
		  haveDefault:false
		},
		
    }
      
  },
  computed:{
	  
  },
  methods:{
	  
  },
  created(){
     //获得当前路由的name
     var asd=this.$route;
     console.log(asd)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*收货地址面板*/
.adress_pannel .bottom .adress.text_center{
	text-align: center;
	font-size: 16px;
	line-height: 60px;
	font-weight: bold;
	color: #666;
	height: 60px;
}
.adress_pannel{
	background-color: #fff;
	width: 100%;
	width: 100vw;
	padding: 10px 0;
}
.adress_pannel .top{
	width: 80vw;
	margin:0 auto;
}
.adress_pannel .top .name{
	max-width: 34vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size:18px;
	color: #051b28;
}
.adress_pannel .top .phone{
	max-width: 44vw;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size:18px;
	color: #051b28;
}
.adress_pannel .bottom{
	margin-top: 8px;
	width: 100%;
	width: 100vw;
	padding: 0 2vw;
}
.adress_pannel .bottom .icon_position{
	width: 8vw;
	padding: 2px;
}
.adress_pannel .bottom .icon_go{
	width: 8vw;
	padding: 6px;
}
.adress_pannel .bottom .adress{
	width: 80vw;
	padding: 0 4px;
	color: #213540;
}
.color_line{
	background-image: url(../assets/color_line.jpg);
	background-repeat: repeat-x;
	background-size: auto 100%;
	width: 100%;
	height: 4px;
}
/*商品面板*/
.pro_detail_pannel{
	background-color: #fff;
	margin-top: 6px;
	padding: 10px 8px;
}
.pro_detail_pannel .flex_box{
	flex:1;
}
.pro_detail_pannel .pic{
	width: 28vw;
	height: 28vw;
}
.pro_detail_pannel .right_box{
	flex:1;
	height: 28vw;
	padding: 0 6px;
}
.pro_detail_pannel .right_box .pro_name{
	font-size: 14px;
	line-height: 20px;
	height: 40px;
	overflow: hidden;
	color: #383838;
}
.pro_detail_pannel .right_box .zhu_currency{
	color: #b2b2b2;
	font-size: 14px;
}
.pro_detail_pannel .right_box .zhu_currency span{
	color: #f9a109;
}
.pro_detail_pannel .right_box .choice{
	color: #999999;
	font-size: 12px;
}

/*结算面板*/
.settle_pannel{
	background-color: #fff;
	margin-top: 8px;
	padding-left: 18px;
	padding-right: 18px;
}
.settle_pannel .settle_list{
	padding:8px 4px;
}
.settle_pannel .settle_list .grey{
	font-size: 14px;
	color: #999999;
}
.settle_pannel .settle_list .red{
	color: #fa083a;
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

</style>
