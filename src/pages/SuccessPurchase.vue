<template>
<div>

<div class="type_bar flex_betwen">
    <ul>
        <li>交易成功</li>
        <li class="tips">卖家将收到您的货款</li>
    </ul>
    <div class="pic">
        <img src="../assets/orderBanner_4.png">
    </div>
</div>

<ul class="title_bar flex_center">
    <li class="pic"><img src="../assets/common_lov_red.png"></li><li>猜你喜欢</li>
</ul>
<product-card></product-card>

</div>
    
</template>

<script>
import ProductCard from '@/components/ProductCard'
// /orderDetail/successPurchase
export default {
  name: 'SuccessPurchase',
  components:{
      ProductCard
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

/* 猜你喜欢标题 */
.title_bar{
    background-color: #fff;
    height: 36px;
}
.title_bar .pic{
    width: 22px;
    height: 22px;
    margin-right: 4px;
}
.title_bar li{
    font-size: 16px;
    line-height: 22px;
    color: #fa1947;
}
</style>
