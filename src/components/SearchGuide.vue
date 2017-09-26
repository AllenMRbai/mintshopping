<template>
<div>
    <div style="height:46px;"></div>
    <div class="btn_pannel">
		<div class="pannel_top flex_betwen">
			<h4>历史搜索</h4>
			<div class="clear_btn" @click="clearHistory"><img src="../assets/common_close_fill_grey.png"></div>
		</div>
		<ul class="pannel_btns flex_start">
			<li v-for="(history,index) in historys" :key="index" @click="goTo(history)">{{ history }}</li>
		</ul>
	</div>

	<div class="btn_pannel">
		<div class="pannel_top">
			<h4>热门推荐</h4>
		</div>
		<ul class="pannel_btns flex_start">
			<li v-for="(hot,index) in hots" :key="index" @click="goTo(hot)">{{ hot }}</li>
		</ul>
	</div>	

</div>
    
</template>

<script>

export default {
  name:'Guide',
  data () {
    return {
		historys:['机械硬盘','固态硬盘','CPU','巧克力'],
		hots:['电竞鼠标','机械键盘','男士七分短裤','丁香']
    }
  },
  methods:{
	  clearHistory(){
		  let historys=localStorage.getItem('historys');
		  if(historys==null){
			historys=localStorage.setItem('historys','[]');
		  }
		  let phistorys=JSON.parse(historys);
		  phistorys.splice(0,phistorys.length);
          localStorage.setItem('historys',JSON.stringify(phistorys));
          this.historys.splice(0,this.historys.length);
	  },
	  getHistroy(){
		  this.historys.splice(0,this.historys.length);
		  let historys=localStorage.getItem('historys');
		  if(historys==null){
			historys=localStorage.setItem('historys','[]');
		  }
		  let phistorys=JSON.parse(historys);
		  let len=phistorys.length
		  for(let i=0;i<len;i++){
			  this.historys.push(phistorys[i]);
		  }
	  },
	  goTo(kword){
		  this.$emit('go-to',kword)
	  }

  },
  computed:{

  },
  created(){
		//获得历史搜索
		this.getHistroy();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*预视界面*/
.btn_pannel{
	padding: 8px 10px;
	margin-top: 8px;
	padding-bottom: 2px;
}
.pannel_top{
	height: 30px;
}
.pannel_top h4{
	font-size: .75rem;
	color: #bdbdbd;
}
.pannel_top .clear_btn{
	width: 30px;
	height: 30px;
	padding: 4px;
}
.pannel_btns{
	flex-wrap: wrap; 
}
.pannel_btns li{
	font-size: .7rem;
	color: #414141;
	background-color: #f5f5f5;
	padding: 0 18px;
	height: 34px;
	line-height:34px;
	border-radius: 17px;
	margin-top: 12px;
	margin-right: 12px;
}

</style>
