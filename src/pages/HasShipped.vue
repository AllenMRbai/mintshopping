<template>
<div>
<div class="type_bar flex_betwen">
    <ul>
        <li>卖家已发货</li>
        <li class="tips">剩余 <span>6</span>天 <span>6</span>时自动确认</li>
    </ul>
    <div class="pic">
        <img src="../assets/orderBanner_3.png">
    </div>
</div>
<order-content :detail='list'></order-content>

<div class="operate_bar">
	<div class="flex_end line_top flex_box">
		<div class="btn black" @click="checkExpress">查看物流</div>
		<div class="btn red">确认收货</div>
	</div>
</div>
<div style="height:60px;"></div>
</div>
    
</template>

<script>
import OrderContent from '@/components/OrderContent'

export default {
  name: 'HasShipped',
  components:{
      OrderContent
  },
  data () {
    return {
        list:null
    }
  },
  methods:{
    getList(){
        this.list=JSON.parse(decodeURIComponent(this.$route.params.list));
    },
    checkExpress(){
        let pic=encodeURIComponent(this.list.GoodsPic)
        this.$router.push(`/logistics/${this.list.ID}/${pic}`)
    }
  },
  created(){
      //获得参数内的list
      this.getList();
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
.type_bar  ul .tips span{
    font-size: 16px;
    font-weight: bold;
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
