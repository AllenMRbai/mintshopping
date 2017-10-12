<template>

<div class="cards_pannel">
    <div class="blacnk_space" style="height: 46px;"></div>

	<div 
		v-infinite-scroll="loadMore"
		infinite-scroll-disabled="loading"
		infinite-scroll-distance="10"
		class="cards_box">
		
		<div class="card" v-for="(card,index) in orders" :key="card.ID">
			<div class="pro_detail_pannel" @click='goToDetail(card)'>
				<div class="flex_box flex_betwen">
					<div class="pic"><img v-lazy="card.GoodsPic"></div>
					<div class="right_box">
						<div class="pro_name">{{ card.GoodsName }}</div>
						<div class="zhu_currency">可获得<span>{{ card.GoodsPrice }}</span>猪币</div>
						<div class="choice">{{ card.GoodsOption }}</div>
					</div>
				</div>
			</div>
			<!-- 待付款 -->
			<div class="line_top flex_end bottom" v-if="card.Status===0">
				<div class="tips" v-if="card.minutes==-1">已过期</div>
				<div class="tips" v-else>剩余 {{ card.minutes }}分 {{ card.seconds }}秒</div>
				<div class="btn fill_grey" v-if="card.minutes==-1">去付款</div>
				<div class="btn fill_red" v-else @click="goPay(card)">去付款</div>
			</div>
			<div class="status" v-if="card.Status===0">待付款</div>

			<!-- 待发货 -->
			<div class="line_top flex_end bottom" v-if="card.Status===1">
				<div class="tips">等待发货中</div>
			</div>
			<div class="status" v-if="card.Status===1">待发货</div>

			<!-- 已发货 -->
			<div class="line_top flex_end bottom" v-if="card.Status===2">
				<div class="btn" @click="goExpress(card)">查看物流</div>
				<div class="btn stroke_red">确认收货</div>
			</div>
			<div class="status" v-if="card.Status===2">已发货</div>

			<!-- 交易成功 -->
			<div class="line_top flex_end bottom" v-if="card.Status===3">
                <div class="btn" @click="goExpress(card)">查看物流</div>
				<div class="btn">申请售后</div>
			</div>
			<div class="status" v-if="card.Status===3">交易成功</div>

		</div><!-- card -->
		
	</div><!-- cards_box -->
    <!-- 缺省页面 -->
    <div  v-show='noProduct'>
        <div class="default_pic"><img src="../assets/default_noorders.png"></div>
        <div class="default_title">您还没有相关的订单</div>
    </div>
    <div class="load_tips" v-show='!noProduct'>
        <div v-if='!noMore'>正在加载中...</div>
        <div v-else>已经到底了</div>
    </div>

</div>
    
</template>

<script>

export default {
  name: 'InfiniteScrollOrderList',
  props:{
      'orders':{
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
      },
      'nowTime':{//表示用户打开页面的UTF毫秒事件
          type:Number
      },
  },
  data () {
    return {

    }
  },
  methods:{
        /*
        **加载更多，向父组件发射load-more事件
        */
		loadMore() {
            this.$emit('load-more')
        },

        /*
        **以下是各类订单的详情跳转
        **0待付款    1待发货     2已发货    3交易完成   10交易关闭
        **参数 list 当前列表的model  
        */
		goToDetail(list){
            console.log(list)
            let li=encodeURIComponent(JSON.stringify(list))
            //console.log(li)
            if(list.Status===0){//待付款
                this.$router.push({
                    path:`/orderDetail/waitingForPayment/${li}`
                })
            }else if(list.Status===1){//待发货
                this.$router.push({
                    path:`/orderDetail/waitingForShipment/${li}`
                })
            }else if(list.Status===2){//已发货
                this.$router.push({
                    path:`/orderDetail/hasShipped/${li}`
                })
            }else if(list.Status===3){//交易完成
                this.$router.push({
                    path:`/orderDetail/successTrade/${li}`
                })
            }else if(list.Status===10){//交易关闭

            }
        },
        /*
        **以下是各类订单的按钮
        **参数 list 当前列表的model  
        */
		goPay(list){//待付款  去付款
           this.$router.push({
                path:`/payment/${list.ID}/${list.GoodsPrice+list.Freight}`
            }) 	
        },
        goExpress(list){//    查看物流
            let pic=encodeURIComponent(list.GoodsPic)
            this.$router.push(`/logistics/${list.ID}/${pic}`)	
        }

  },
  created(){

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
/* 加载提示 */
.load_tips{
    height: 30px;
    text-align: center;
    font-size: 14px;
    color: #999999;
    line-height: 30px;
}

/* 订单卡 */
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
.cards_pannel .card .bottom .fill_grey{
	color: #fff;
	border:none;
	background-color: #cccccc;
}

/*商品详情面板*/
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
