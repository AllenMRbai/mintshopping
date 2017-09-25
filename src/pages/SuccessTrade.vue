<template>
<div>
<div class="type_bar flex_betwen">
    <ul>
        <li>交易成功</li>
    </ul>
    <div class="pic">
        <img src="../assets/orderBanner_0.png">
    </div>
</div>
<order-content></order-content>
<div class="operate_bar">
	<div class="flex_end line_top flex_box">
		<div class="btn black">查看物流</div>
        <div class="btn black">申请售后</div>
	</div>
</div>
</div>
    
</template>

<script>
import OrderContent from '@/components/OrderContent'

export default {
  name: 'SuccessTrade',
  components:{
      OrderContent
  },
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
/* 头部订单详情分类banner */
.type_bar{
    background-image: -webkit-linear-gradient( 171deg, rgb(249,9,54) 0%, rgb(253,3,79) 100%);
    width: 100vw;
    height: 120px;
    flex:1;
    padding:0 10px;
}

.type_bar ul{
    flex:1;
}
.type_bar  ul li{
    color: #fff;
    font-size: 16px;
    line-height: 22px;
    padding-left:10px; 
}
.type_bar  ul .tips{
    font-size: 14px;
}
.type_bar .pic{
    width:120px;
    height: 120px;

}

/*底部bar*/
.operate_bar{
	background-color:#fff;
	width: 100%;
	width: 100vw;
	height: 50px;
	position: fixed;
	left: 0;
	bottom: 0;
}
.operate_bar .flex_box{
	width: 100%;
	height: 100%;
	padding:0 6px;
}
.operate_bar .btn{
	height: 28px;
	line-height: 28px;
	width: 66px;
	margin:0 8px;
	border:1px solid #b2b2b2;
	color: #666666;
	border-radius: 4px;
	text-align: center;
	font-size: 14px;
}
.operate_bar .btn.red{
	border:1px solid #f10949;
	color: #f10949;
}
</style>
