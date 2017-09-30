<template>

<div class="cards_pannel">
    <div class="blacnk_space" style="height: 46px;"></div>

	<div class="cards_box">
		
		<div class="card" v-for="(card,index) in orders" :key="card.ID">
			<div class="pro_detail_pannel">
				<div class="flex_box flex_betwen">
					<div class="pic"><img :src="card.GoodsPic"></div>
					<div class="right_box">
						<div class="pro_name">{{ card.GoodsName }}</div>
						<div class="zhu_currency">可获得<span>{{ card.GoodsPrice }}</span>猪币</div>
						<div class="choice">{{ card.GoodsOption }}</div>
					</div>
				</div>
			</div>
			<div class="line_top flex_end bottom">
				<div class="tips">剩余 <span>20</span>分 <span>50</span>秒</div>
				<div class="btn fill_red">去付款</div>
			</div>
			<div class="status">待付款</div>
		</div>

	</div>
    

</div>
    
</template>

<script>

export default {
  name: 'PendingPayment',
  data () {
    return {
		orders:[]
    }
  },
  methods:{
		getToken(){//获得本地的token
			let token=localStorage.getItem('token');
			if(token===null || token===''){
				return false;
			}
			return encodeURIComponent(token);
		},
		goSignIn(){//跳转到登录页面
			this.$router.push({
				path:'/sign/signIn',
				query: { redirect: this.$route.fullPath }
			});//'/sign/signIn'
		},
		getOrders(){//获取订单
			let token=this.getToken();
			if(!token){//如果没有token就直接跳到登录页面
				this.goSignIn();
				return;
			}
			console.log('咯v啊大家好')
				
			this.$http.get(`http://api.lingkuaiyou.com/Order/GetOrderList?token=${token}&status=0`).then(function(data){
				console.log(data.body)
				if(data.body.result){//表示订单生成成功
					let lists=data.body.data.DataList;
					let len=lists.length;
					for(let i=0;i<len;i++){
						this.orders.push(lists[i])
					}
				}else{
					MessageBox('提示', data.body.message);
				}
			}).catch(err=>{})
			
		}
  },
  created(){
	  this.getOrders()
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
