<template>

<infinite-scroll-order-list :orders='orders' :loading='stopLoad' :no-more='noMore' :no-product='noProduct' :now-time='nowTime' @load-more='loadMore'></infinite-scroll-order-list>
    
</template>

<script>
import InfiniteScrollOrderList from '@/components/InfiniteScrollOrderList';

export default {
  name: 'Shipped',
  components:{
      InfiniteScrollOrderList
  },
  data () {
    return {
		pageIndex:1,//表示当前页码

		//以下为无限滚动盒子的参数
		stopLoad:false,//用来判断现在是否可以加载,true表示停止加载
		noMore:false,//true表示没有更多商品了
		noProduct:false,//true表示没搜索到任何商品，这将会显示缺省页面
		orders:[],//产品lists 
		nowTime:0//现在的时间
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
		loadMore(){
			if(this.noMore){//没有更多商品的时候，不能发送请求
				return;
			}
			if(this.stopLoad){//停止加载的时候，不能发送请求
				return;
			}

			let token=this.getToken();//获取token
			if(!token){//如果没有token就直接跳到登录页面
				this.goSignIn();
				return;
			}

			this.stopLoad=true;//开启停止加载，防止恶性加载
			this.$http.get(`http://api.lingkuaiyou.com/Order/GetOrderList?token=${token}&pageIndex=${this.pageIndex}&status=2`).then(function(data){
				//console.log(data)
				if(data.body.result){//表示订单生成成功
					let lists=data.body.data.DataList;
					console.log(lists)
					let len=lists.length;

					if(len>0){	
						for(let i=0;i<len;i++){
							let list=lists[i]
							this.orders.push(list)
						}
						this.pageIndex++;
						this.stopLoad=false;
					}else{
						this.noMore=true;//表示没有更多商品了
						if(this.orders<1){
							this.noProduct=true//表示没搜索到商品
						}
						console.log('看下缺省')
						console.log(this.noProduct)
					}
				}else{//没有更多商品了
					this.stopLoad=true;//阻止继续加载
					this.noMore=true;//表示没有更多商品了
					if(this.orders<1){
						this.noProduct=true//表示没搜索到商品
					}
				}
			}).catch(err=>{})
		}
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
