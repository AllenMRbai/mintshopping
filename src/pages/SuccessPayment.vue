<template>
<div>

<div class="type_bar flex_betwen">
    <ul>
        <li>买家已付款</li>
        <li class="tips">您的包裹正整装待发</li>
    </ul>
    <div class="pic">
        <img src="../assets/orderBanner_4.png">
    </div>
</div>
<product-card></product-card>

</div>
    
</template>

<script>
import ProductCard from '@/components/ProductCard'
// /orderDetail/successPayment
export default {
  name: 'SuccessPayment',
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
</style>
