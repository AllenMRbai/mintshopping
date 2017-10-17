<template>
<div class="page_content">
  <header class="line_bottom">
		<div class="search_bar_box white_bar_box flex_center ">
			<div class="follow_btn" @click="followUs">关注</div>
			<router-link class="search_bar" tag="div" to="/search">输入你想要搜索的东西</router-link>
			<router-link class="search_btn" tag="div" to="/search"><img src="../assets/common_search_black.png"></router-link>
		</div>
	</header>
  <!-- 主体部分 -->
	<div class="main_body">
		<ul class="left_nav">
			<li 
        v-for="(category,index) in categorys" 
        :class="{'active':nowAt===category.dataId}"
        :key="index" 
        :data-id="category.dataId" 
        @click='changeCategoryPage(category,$event)'>
        {{ category.title }}</li>
		</ul>
		
		<div class="right_box">
      <template v-for="(detCategory,index) in detailedCategorys">
        <div class="title" :key="index">{{ detCategory.title }}</div>
        <ul class="cell_box flex_start" :key="index">
          <li v-for="(list,index) in detCategory.lists" :key="index" :data-keyword="list.keyWords" @click="goSearch(list)">
            <div class="cate_pic"><img :src="list.pic"></div>
            <p>{{ list.title }}</p>
          </li>

        </ul>
			</template>
		</div>
	</div>

  <mt-popup
	v-model="popupVisible"
	position="center">
		<div class="qrcode_box">
			<div class="qrcode"><img src="../assets/commen_qrcode.jpg"></div>
			<p>长按二维码，扫码即可关注我们</p>
		</div>
	</mt-popup>
  
</div>
    
</template>

<script>

export default {
  name: 'classify',
  components:{

  },
  data () {
    return {
      nowAt:'01',//当前二级分类页面对应的一级分类ID号
      categorys:[],
      detailedCategorys:[
        {
          title:'女装',
          lists:[
            {title:'印花连衣裙',pic:'../../static/img/classify_0.jpg',keyWords:'印花连衣裙 女'}, 
            {title:'棉麻连衣裙',pic:'../../static/img/classify_1.jpg',keyWords:'棉麻连衣裙 女'},
            {title:'小西装',pic:'../../static/img/classify_2.jpg',keyWords:'小西装 女'},
            {title:'衬衫',pic:'../../static/img/classify_3.jpg',keyWords:'衬衫 女'},
            {title:'雪纺衫',pic:'../../static/img/classify_4.jpg',keyWords:'雪纺衫 女'},
            {title:'牛仔裤',pic:'../../static/img/classify_5.jpg',keyWords:'牛仔裤 女'}, 
          ]
        }
        
      ],
      popupVisible:false

    }
  },
  methods:{
		//点击三级分类直接跳转搜索
		goSearch(list){
			
			let enc=encodeURI(list.keyWords)
			this.$router.push({
				path:`/doSearch/${enc}`
			})
		},
    changeCategoryPage(ind){
      this.nowAt=ind.dataId;
    },
    followUs(){
      this.popupVisible=true;
    },
		/*
		获得一级菜单
		*/
		getOneLevel(){
			this.$http.get('http://api.lingkuaiyou.com/Goods/GetOneCategoryList').then((data)=>{
				//console.log(data)
				if(data.body.result){
					let lists=data.body.data.DataList;
					let len=lists.length;
					for(let i=0;i<len;i++){
						let li=new Object();
						li.title=lists[i].Name;
						li.dataId=lists[i].ID;
						this.categorys.push(li)
					}
				}else{
					alert(data.body.message)
				}
			})
		},
		/*
		获得二级菜单
		*/
		getTwoLevel(){
			this.detailedCategorys.splice(0)
			this.$http.get(`http://api.lingkuaiyou.com/Goods/GetTwoCategoryList?id=${this.nowAt}`).then((data)=>{
				//console.log(data)
				if(data.body.result){
					let lists=data.body.data.DataList;
					let len=lists.length;
					for(let i=0;i<len;i++){
						let li=new Object();
						li.title=lists[i].Name;
						this.getThreeLevel(li,lists[i].ID)
					}
					//console.log('开心')
					//console.log(this.detailedCategorys)
				}else{
					alert(data.body.message)
				}
			})
		},
		/*
		获得三级菜单
		*/
		getThreeLevel(li,twoID){
			li.lists=[];
			this.$http.get(`http://api.lingkuaiyou.com/Goods/GetThreeCategoryList?id=${twoID}`).then((data)=>{
				//console.log(data)
				//{title:'印花连衣裙',pic:'../../static/img/classify_0.jpg',keyWords:'印花连衣裙 女'},
				//console.log('三级')
				//console.log(data)
				if(data.body.result){
					let lists=data.body.data.DataList;
					let len=lists.length;
					for(let i=0;i<len;i++){
						let sli=new Object();
						sli.title=lists[i].Name;
						sli.pic=lists[i].Pic;
						sli.keyWords=lists[i].SearchName;
						li.lists.push(sli)
					}
					this.detailedCategorys.push(li)
				}else{
					alert(data.body.message)
				}
			})
		},
		/*
		一次性获得二级和三级菜单
		*/
		getTwoAndThree(){
			this.detailedCategorys.splice(0)
			this.$http.get(`http://api.lingkuaiyou.com/Goods/GetTwoAndThreeCategoryList?id=${this.nowAt}`).then((data)=>{
				console.log(data);
				if(data.body.result){
					let lists=data.body.data;
					let len=lists.length;
					for(let i=0;i<len;i++){
						let li=new Object();
						li.title=lists[i].Name;
						li.lists=[];
						let slists=data.body.data[i].data;
						let slen=slists.length;
						for(let o=0;o<slen;o++){
							let sli=new Object();
							sli.title=slists[o].Name;
							sli.pic=slists[o].Pic;
							sli.keyWords=slists[o].SearchName;
							li.lists.push(sli);
						}
						this.detailedCategorys.push(li)
					}
				}else{
					alert(data.body.message)
				}
			})
		}
  },
  created:function(){
		this.nowAt=this.$route.params.dataid;
		this.getOneLevel();
		this.getTwoAndThree();
	},
	watch:{
		nowAt(){
			this.getTwoAndThree()
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 关注二维码 */
.qrcode_box{
	width: 60%;
	width: 60vw;
	padding:20px 10px;
	background-color: #fff;
	border-radius: 8px;
}
.qrcode_box .qrcode{
	width: 50vw;
	height: 50vw;
	margin:0 auto;
	margin-bottom: 10px;
}
.qrcode_box p{
	text-align: center;
	font-size: 14px;
	color: #666666;
}



.page_content{
  background-color: #fff;
  width:100%;
  width: 100vw;
  height: 100vh;
  position: relative;
}
/*商城白色的头部*/
header{
  height: 46px;
  width: 100%;
  width: 100vw;
  position: absolute;
  top:0;
  left: 0;
}
.search_bar_box{
	width: 100%;
	height: 100%;
	flex:1;
	padding: 0 8px;
}
.search_bar_box.white_bar_box{
    background-color: #f9f9f9;
}
.search_bar_box.white_bar_box .follow_btn{
	color: #444444;
	width: 36px;
	height: 36px;
	line-height: 36px;
	text-align: center;
	margin-right: 6px;
}
.search_bar_box.white_bar_box .search_bar{
	height: 36px;
	border-bottom: 1px solid #444444;
	font-size: 16px;
	text-align: center;
	line-height: 28px;
	padding-top: 8PX;
	color: #999999;
	flex:1;
}
.search_bar_box .search_btn{
	width: 36px;
	height: 36px;
	margin-left: 6px;
	padding: 7px;
}

/*左导航*/
.main_body{
	width: 100vw;
	height: 100vh;
}
.main_body .left_nav{
	padding-top: 46px;
	padding-bottom: 50px;
	float: left;
	width: 30vw;
	height: 100vh;
	overflow-x: hidden;
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;
}
.main_body .left_nav li{
	width: 100%;
	background-color: #f7f7f7;
	text-align: center;
	height: 50px;
	line-height:50px;
	margin-bottom: 1px;
}
.main_body .left_nav li.active{
	background-color: #fff;
	border-left: 4px solid #fc0449;
	color: #fc0449;
}

/*分类内容*/
.main_body .right_box{
	width: 70vw;
	height: 100vh;
	padding-top: 46px;
	padding-bottom: 50px;
	overflow-x: hidden;
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;
	float: left;
}
.main_body .right_box .title{
	height: 24px;
	line-height: 24px;
	margin:10px 0;
	font-size: 16px;
	font-weight: bold;
	color: #646466;
	text-align: center;
}
.main_body .right_box .cell_box{
	flex-wrap: wrap;
	align-items: flex-start;
}
.main_body .right_box .cell_box li{
	width: 20vw;
	margin-bottom: 18px;
  margin-left: 2.5vw;
}
.main_body .right_box .cell_box .cate_pic{
	width: 20vw;
	height: 20vw;
	padding: 2px;
}

.main_body .right_box .cell_box p{
	font-size: 12px;
	color: #666666;
	padding: 6px 0;
	margin-top: 3px;
	text-align: center;
}
</style>
