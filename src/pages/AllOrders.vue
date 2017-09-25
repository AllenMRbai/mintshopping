<template>

<div class="cards_pannel">
    <div class="blacnk_space" style="height: 46px;"></div>
    <div class="card">
        <router-link tag='div' to="/orderDetail/waitingForShipment" class="pro_detail_pannel">
            <div class="flex_box flex_betwen">
                <div class="pic"><img src="../../static/img/product.jpeg"></div>
                <div class="right_box">
                    <div class="pro_name">爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定</div>
                    <div class="zhu_currency">可获得<span>126</span>猪币</div>
                    <div class="choice">颜色：绿色，尺寸：L</div>
                </div>
            </div>
        </router-link>
        <div class="line_top flex_end bottom">
            <div class="tips">等待发货中</div>
        </div>
        <div class="status">待发货</div>
    </div>
    
    <div class="card">
        <router-link tag='div' to="/orderDetail/hasShipped" class="pro_detail_pannel">
            <div class="flex_box flex_betwen">
                <div class="pic"><img src="../../static/img/product.jpeg"></div>
                <div class="right_box">
                    <div class="pro_name">爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定</div>
                    <div class="zhu_currency">可获得<span>126</span>猪币</div>
                    <div class="choice">颜色：绿色，尺寸：L</div>
                </div>
            </div>
        </router-link>
        <div class="line_top flex_end bottom">
            <div class="btn">查看物流</div>
            <div class="btn stroke_red">确认收货</div>
        </div>
        <div class="status">已发货</div>
    </div>

    <div class="card">
        <router-link tag='div' to="/orderDetail/SuccessTrade" class="pro_detail_pannel">
            <div class="flex_box flex_betwen">
                <div class="pic"><img src="../../static/img/product.jpeg"></div>
                <div class="right_box">
                    <div class="pro_name">爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定</div>
                    <div class="zhu_currency">可获得<span>126</span>猪币</div>
                    <div class="choice">颜色：绿色，尺寸：L</div>
                </div>
            </div>
        </router-link>
        <div class="line_top flex_end bottom">
            <div class="btn">申请售后</div>
        </div>
        <div class="status">交易成功</div>
    </div>

    <div class="card">
        <router-link tag='div' to="/orderDetail/waitingForPayment" class="pro_detail_pannel">
            <div class="flex_box flex_betwen">
                <div class="pic"><img src="../../static/img/product.jpeg"></div>
                <div class="right_box">
                    <div class="pro_name">爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定</div>
                    <div class="zhu_currency">可获得<span>126</span>猪币</div>
                    <div class="choice">颜色：绿色，尺寸：L</div>
                </div>
            </div>
        </router-link>
        <div class="line_top flex_end bottom">
            <div class="tips">剩余 <span>20</span>分 <span>50</span>秒</div>
            <div class="btn fill_red">去付款</div>
        </div>
        <div class="status">待付款</div>
    </div>

</div>
    
</template>

<script>

export default {
  name: 'AllOrders',
  data () {
    return {
        orders:[
            {pic:'../../static/product.jpeg',type:'待发货',name:'爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定',price:'126',options:[{key:'颜色',value:'绿色'},{key:'尺寸',value:'L'}]},
            {pic:'../../static/product.jpeg',type:'已发货',name:'爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定',price:'126',options:[{key:'颜色',value:'绿色'},{key:'尺寸',value:'L'}]},
            {pic:'../../static/product.jpeg',type:'交易成功',name:'爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定',price:'126',options:[{key:'颜色',value:'绿色'},{key:'尺寸',value:'L'}]},
            {pic:'../../static/product.jpeg',type:'待付款',name:'爱空间的恢复健康爱的经费和爱空间的划分按揭客户爱神的箭好发见大家肯定',price:'126',options:[{key:'颜色',value:'绿色'},{key:'尺寸',value:'L'}]}
        ]
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

.cards_pannel .card{
	background-color: #fff;
	position: relative;
	margin-bottom: 10px;
}
.cards_pannel .card .status{
	color: #6104fc;
	font-size: 14px;
	position: absolute;
	right: 10px;
	top:10px;
}
.cards_pannel .card .bottom{
	height: 40px;
}
.cards_pannel .card .bottom .btn{
	color: #666666;
	border:1px solid #b2b2b2;
	border-radius: 4px;
	height: 28px;
	line-height:28px;
	text-align: center;
	font-size: 14px;
	margin:0 8px;
	width: 66px;
}
.cards_pannel .card .bottom .tips{
	color: #999999;
	font-size: 14px;
	margin:0 8px;
}
.cards_pannel .card .bottom .stroke_red{
	color: #f10949;
	border:1px solid #f10949;
}
.cards_pannel .card .bottom .fill_red{
	color: #fff;
	border:none;
	background-color: #f10949;
}

/*商品面板*/
.pro_detail_pannel{
	background-color: #fff;
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
	padding-right:60px;
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

</style>
