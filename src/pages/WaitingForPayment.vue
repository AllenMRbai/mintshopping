<template>
<div>
<div class="type_bar flex_betwen">
    <ul>
        <li>等待买家付款</li>
        <li class="tips" v-if="list.minutes<0">订单已过期</li>
        <li class="tips" v-else>剩余 {{ list.minutes }}分钟 {{ list.seconds }}秒</li>
    </ul>
    <div class="pic">
        <img src="../assets/orderBanner_2.png">
    </div>
</div>
<order-content :detail='list'></order-content>

<div class="operate_bar">
	<div class="flex_end line_top flex_box">
        <div class="btn grey_fill" v-if="list.minutes<0">去付款</div>
        <div class="btn red_fill" v-else @click="goPay">去付款</div>
	</div>
</div>

<div style="height:60px;"></div>
</div>
    
</template>

<script>
import OrderContent from '@/components/OrderContent'
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'WaitingForPayment',
  components:{
      OrderContent
  },
  data () {
    return {
        list:null,
        nowTime:0
    }
  },
  methods:{
      getList(){
          this.list=JSON.parse(decodeURIComponent(this.$route.params.list));
      },
      countDown(list){
			//console.log(list===this.orders[i])
			return new Promise((resolve,reject)=>{
				//let mi=list.minutes;
				//let se=list.seconds;
				setTimeout(()=>{
					//console.log(list.minutes)
					if(list.minutes<0){
						return;
					}
					let countD=setInterval(()=>{
						//console.log(list.seconds)
						if(list.seconds===0){
							list.seconds=59;
							list.minutes--;
							if(list.minutes===-1){
								clearInterval(countD);
							}
						}else{
							list.seconds--;
						}
					},1000)
				},0);

			})
			
		},
		formatDuring(mss,list){//格式化时间为xx分xx秒
			//console.log(mss)
			if(mss<=0){
				list.minutes=-1;
				list.seconds=-1;
				return;
			}
			var minutes=parseInt(mss/(1000*60));
			//console.log(minuteds)
			var seconds=parseInt(mss%(1000*60)/1000);
			//console.log(secondds)
			list.minutes=minutes;
			list.seconds=seconds;	
        },
        goPay(){
           this.$router.push({
                path:`/payment/${this.list.ID}/${this.list.GoodsPrice+this.list.Freight}`
            }) 	
        },
        /*
        **将时间字符串拆分为 年 月 日 时 分 秒 毫秒
        **（因为手机端的new Date('2017-10-11T09:38:00')的是间是GTM的时间，和本地时间相差8小时，所以需要该步处理）
        **返回 Array [年，月，日，时，分，秒，毫秒]
        **参数 String 类似'2017-10-11T09:38:00'
        */
        toLocalTime2(str){
            let y=str.slice(0,4)//年
            let mon=+str.slice(5,7)-1//月
            let d=str.slice(8,10)//日
            let h=str.slice(11,13)//时
            let m=str.slice(14,16)//分
            let s=str.slice(17,19)//秒
         
            return [y,mon,d,h,m,s]
        },
        
  },
  created(){
      //获得参数内的list
      this.getList();
      //格式化minutes和seconds
      this.nowTime=new Date().getTime();

      let localT=this.toLocalTime2(this.list.Created)
	  let created=new Date(localT[0],localT[1],localT[2],localT[3],localT[4],localT[5]).getTime()+20*60*1000
      let mss=created-this.nowTime;
      this.formatDuring(mss,this.list)
      
      //开始倒计时
      this.countDown(this.list)
      
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
.operate_bar .btn.red_fill{
    color: #fff;
    background-color: #f10949;
    border:none;
}
.operate_bar .btn.grey_fill{
    color: #fff;
    background-color: #cccccc;
    border:none;
}

</style>
