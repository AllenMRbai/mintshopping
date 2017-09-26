<template>
<div class="page_content">
  <header class="line_bottom">
		<div class="search_bar_box white_bar_box flex_center ">
			<div class="follow_btn">关注</div>
			<router-link class="search_bar" tag="div" to="/search">输入你想要搜索的东西</router-link>
			<router-link class="search_btn" tag="div" to="/search"><img src="../assets/common_search_black.png"></router-link>
		</div>
	</header>
  <!-- 主体部分 -->
	<div class="main_body">
		<ul class="left_nav">
			<li 
        v-for="(category,index) in categorys" 
        :class="{'active':nowAt===index}"
        :key="index" 
        :data-id="category.dataId" 
        @click='changeCategoryPage(index,$event)'>
        {{ category.title }}</li>
		</ul>
		
		<div class="right_box">
      <template v-for="(detCategory,index) in detailedCategorys">
        <div class="title" :key="index">{{ detCategory.title }}</div>
        <ul class="cell_box flex_start" :key="index">
          <li v-for="(list,index) in detCategory.lists" :key="index" :data-keyword="list.keyWords">
            <div><img :src="list.pic"></div>
            <p>{{ list.title }}</p>
          </li>

        </ul>
			</template>
		</div>
	</div>

</div>
    
</template>

<script>

export default {
  name: 'classify',
  components:{

  },
  data () {
    return {
      nowAt:0,
      categorys:[
        {title:'为你推荐',dataId:'01'},
        {title:'女装',dataId:'02'},
        {title:'女鞋',dataId:'03'},
        {title:'男装',dataId:'04'},
        {title:'男鞋',dataId:'05'},
        {title:'内衣',dataId:'06'},
        {title:'母婴',dataId:'07'},
        {title:'手机',dataId:'08'},
        {title:'数码',dataId:'09'},
        {title:'家电',dataId:'10'},
        {title:'美妆',dataId:'11'},
        {title:'箱包',dataId:'12'},
        {title:'运动',dataId:'13'},
        {title:'户外',dataId:'14'},
        {title:'家装',dataId:'15'},
        {title:'家纺',dataId:'16'},
        {title:'家居',dataId:'17'},
        {title:'鲜花园艺',dataId:'18'},
        {title:'饰品',dataId:'19'},
        {title:'食物',dataId:'20'},
        {title:'生鲜',dataId:'21'},
        {title:'汽车摩托',dataId:'22'},
        {title:'医药',dataId:'23'},
        {title:'图书',dataId:'24'},
        {title:'通信',dataId:'25'},
        {title:'乐器',dataId:'26'}
      ],
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
        },
        {
          title:'女鞋',
          lists:[
            {title:'平底凉鞋',pic:'../../static/img/classify_6.jpg',keyWords:'平底凉鞋 女'}, 
            {title:'高跟凉鞋',pic:'../../static/img/classify_7.jpg',keyWords:'高跟凉鞋 女'},
            {title:'坡跟凉鞋',pic:'../../static/img/classify_8.jpg',keyWords:'坡跟凉鞋 女'}
          ]
        }

      ]

    }
  },
  methods:{
    changeCategoryPage(ind){
      this.nowAt=ind;
    }
  },
  created:function(){

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
	margin-bottom: 10px;
  margin-left: 2.5vw;
}
.main_body .right_box .cell_box p{
	font-size: 12px;
	color: #333333;
	padding: 6px 0;
	margin-top: 3px;
	text-align: center;
}
</style>
