<template>

<infinite-scroll-order-list :orders='orders' :loading='stopLoad' :no-more='noMore' :no-product='noProduct' :now-time='nowTime' @load-more='loadMore'></infinite-scroll-order-list>
    
</template>

<script>
import InfiniteScrollOrderList from '@/components/InfiniteScrollOrderList';

export default {
  name: 'AllOrders',
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
        nowTime:0,//现在的时间
        
        //test:true
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
			this.$http.get(`http://api.lingkuaiyou.com/Order/GetOrderList?token=${token}&pageIndex=${this.pageIndex}&status=-1`).then(function(data){
				//console.log(data)
				if(data.body.result){//表示订单生成成功
					let lists=data.body.data.DataList;
					//console.log(lists)
					let len=lists.length;

					if(len>0){	
						for(let i=0;i<len;i++){
                            let list=lists[i]
                            if(list.Status===0){
                                let localT=this.toLocalTime2(list.Created)
                                let created=new Date(localT[0],localT[1],localT[2],localT[3],localT[4],localT[5]).getTime()+20*60*1000

                                let mss=created-this.nowTime;

                                // if(i===4){
                                //     let asd=new Date(localT[0],localT[1],localT[2],localT[3],localT[4],localT[5]).getTime()//+20*60*1000
                                //     //alert(list.Created)
                                //     alert(localT[0]+'年'+localT[1]+'月'+localT[2]+'号 T'+localT[3]+':'+localT[4]+':'+localT[5])
                                //     //alert(asd/1000/60/60+' '+new Date(2017,9,10,16,33,54,357)/1000/60/60+' '+this.nowTime/1000/60/60) 
                                // }
                                

                                this.formatDuring(mss,list)//格式化时间
                            }
                            this.orders.push(list)
                            if(list.Status===0){
                                let ind=this.orders.length-1
							    this.countDown(this.orders[ind])
                            }
							
							//console.log(list)
						}
						this.pageIndex++;
						this.stopLoad=false;
						//this.noProduct=false//表示没搜索到商品
					}else{
						this.noMore=true;//表示没有更多商品了
						if(this.orders<1){
							this.noProduct=true//表示没搜索到商品
						}
						//console.log('看下缺省')
						//console.log(this.noProduct)
					}
				}else{//没有更多商品了
					this.stopLoad=true;//阻止继续加载
					this.noMore=true;//表示没有更多商品了
					if(this.orders<1){
						this.noProduct=true//表示没搜索到商品
					}
				}
			}).catch(err=>{
                throw(err)
            })
        },

        /*
        **将时间字符串拆分为 年 月 日 时 分 秒 毫秒
        **（因为手机端的new Date('2017-10-11T09:38:00')的是间是GTM的时间，和本地时间相差8小时，所以需要该步处理）
        **返回 Array [年，月，日，时，分，秒，毫秒]
        **参数 String 类似'2017-10-11T09:38:00'
        */
        // toLocalTime(str){//这个方法在手机的还是有bug。10月10日解析出里的getDate为11日。好TM蛋疼
        //     console.log(str)
        //     let tDate=new Date(str)

        //     let y=tDate.getFullYear()//年
        //     let mon=tDate.getMonth()//月
        //     let d=tDate.getDate()//日
        //     let h=str.match(/T(\d+):/)[1]//时
        //     let m=tDate.getMinutes()//分
        //     let s=tDate.getSeconds()//秒
        //     let mm=tDate.getMilliseconds()//毫秒
        //     console.log([y,mon,d,h,m,s,mm])
            
            
        //     return [y,mon,d,h,m,s,mm]
        // },
        toLocalTime2(str){
            let y=str.slice(0,4)//年
            let mon=+str.slice(5,7)-1//月
            let d=str.slice(8,10)//日
            let h=str.slice(11,13)//时
            let m=str.slice(14,16)//分
            let s=str.slice(17,19)//秒
         
            return [y,mon,d,h,m,s]
        },
		/*
        **这是一个异步的倒计时函数
        **返回 promise对象
        **参数 list 当前列表的model
        */
		countDown(list){
			if(list.minutes<0){
				return;
			}
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

		/*
        **格式化时间为xx分xx秒,用来倒计时 
        **参数 list 当前列表的model
        **     mss 离订单生成后的20分钟的时间差 单位毫秒 
        */
		formatDuring(mss,list){
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
        test(){
            let time='2017-10-10T14:18:00'
            let localT=this.toLocalTime(list.Created)
            let created=new Date(localT[0],localT[1],localT[2],localT[3],localT[4],localT[5],localT[6]).getTime()+20*60*1000
            let mss=created-this.nowTime;

            alert(mss/1000/60/60)

        }
  },
  created(){
      this.nowTime=new Date().getTime();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
