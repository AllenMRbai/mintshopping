<template>
<div>

    <!-- 收货地址面板 -->
    <div class="adress_pannel">
        <div class="top flex_betwen">
            <div class="name">夜猫子</div>
            <div class="phone">1575782451</div>
        </div>
        <div class="bottom flex_betwen">
            <div class="icon_position"><img src="../assets/common_position_grey.png"></div>
            <div class="adress">浙江省宁波市慈溪市古塘街道北三环东路888号联盛大厦1号门 10楼1018</div>
            <div class="icon_go"></div>
        </div>
    </div>

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

</div>
    
</template>

<script>

export default {
  name: 'OrderContent',
  data () {
    return {

    }
  },
  methods:{

  },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*收货地址面板*/
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
</style>
