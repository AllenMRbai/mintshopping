<template>
<div class="result_page">
    <div style="height:86px;"></div>
    <!-- 筛选条 -->
	<div class="filter_bar">
		<div class="filter_box flex_betwen">
			<div class="left_box flex_betwen">
				<div class="filter flex_center" :class="{'active':isSorts}" @click="toggleSortBox">
					<p>{{ sortName }}</p><div class="triangle_down"></div>
				</div>
				<div class="filter" :class="{'active':!isSorts}" @click="setSalePri">
					<p>销量优先</p>
				</div>
			</div>
			<div class="filter flex_center" @click="toggleRegionBox" :class="{'active':screenOut.min||screenOut.max}">
				<p>筛选</p><div class="icon"></div>
			</div>
		</div>
	</div>

    <!-- 排序界面 -->
	<div class="black_mask_50" v-show="showSortBox || showRegionBox" @click="closeAllBox"></div><!-- z-index50黑色遮罩 -->
	<!-- z-index60排序面板 -->
	<div class="sort_box" v-show="showSortBox">
		<div class="sort_list flex_betwen line_bottom" 
            v-for="(sort,index) in sorts" 
            :key="index"
            :class="{'active':screenOut.type===sort}" @click="setSortPri(sort)">
			<p>{{ sort }}</p><div class="icon"></div>
		</div>
	</div>
	<!-- z-index60筛选面板 -->
	<div class="sieve_box" v-show="showRegionBox">
		<h3>价格区间</h3>
		<div class="price_region flex_betwen">
			<input type="number" id="minPrice" placeholder="最低价" v-model="minPrice" onKeypress="javascript:if([43,45,46].some(function(a){return a==event.keyCode;}))event.returnValue = false;">
			<div class="grey_cross_bar"></div>
			<input type="number" id="maxPrice" placeholder="最高价" v-model="maxPrice" onKeypress="javascript:if([43,45,46].some(function(a){return a==event.keyCode;}))event.returnValue = false;">
		</div>
		<div class="btns_box flex_around">
			<div class="btn orange" id="resetBtn" @click="reRegion">重置</div>
			<div class="btn red" id="identifyBtn" @click="startRegion">确定</div>
		</div>	
	</div>
    <infinite-scroll-product-list :lists='productLists' :loading='stopLoad' :no-more='noMore' @load-more='loadMore(keyWord)'></infinite-scroll-product-list>
</div>
    
</template>

<script>
import InfiniteScrollProductList from '@/components/InfiniteScrollProductList';

export default {
  name:'SearchReasult',
  components:{
      InfiniteScrollProductList
  },
  props:{
      'keyWord':{
          type:String
      }
  },
  data () {
    return {
        screenOut:{
            type:"综合排序",
            min:"",
            max:""
        },
        minPrice:"",
        maxPrice:"",
        sorts:[
            "综合排序",
            "价格由高到低",
            "价格由低到高"
        ],
        showSortBox:false,
		showRegionBox:false,
		pageIndex:1,
	    stopLoad:false,//用来判断现在是否可以加载,true表示停止加载
	    noMore:false,//true表示没有更多商品了
		productLists:[]//产品lists    
    }
  },
  computed:{
      isSorts(){
          var asd=this.sorts.some((a)=>{
              return a===this.screenOut.type;
          })
          return asd;
      },
      sortName(){
          if(this.isSorts){
              return this.screenOut.type
          }else{
              return "综合排序"
          }
      }
  },
  methods:{
      setSalePri(){
          this.screenOut.type="销量优先";
          this.closeAllBox();
          this.initPriRegion();//初始化价格区间
          this.commonSearch();//重新搜索排序
      },
      setSortPri(type){
           this.screenOut.type=type;
           this.closeAllBox();
            this.initPriRegion();//初始化价格区间
           this.commonSearch();//重新搜索排序
      },
      toggleSortBox(){
          this.showSortBox=!this.showSortBox;
          this.showRegionBox=false;
      },
      toggleRegionBox(){
          this.showRegionBox=!this.showRegionBox;
          this.showSortBox=false;
      },
      closeAllBox(){
          this.showRegionBox=false;
          this.showSortBox=false;
      },
      startRegion(){
          var temp;
          if(this.maxPrice!==''){
              if(this.minPrice>this.maxPrice){
                temp=this.minPrice;
                this.minPrice=this.maxPrice;
                this.maxPrice=temp;
            }
          }
          this.screenOut.min=this.minPrice;
          this.screenOut.max=this.maxPrice;
          this.closeAllBox();
          this.commonSearch();//重新搜索排序
      },
      reRegion(){
          this.screenOut.min="";
          this.screenOut.max="";
          this.minPrice="";
          this.maxPrice="";
          this.closeAllBox();
          this.commonSearch();//重新搜索排序
	  },
	  loadMore(kword){
		if(this.noMore){//没有更多商品的时候，不能发送请求
			return;
		}
		if(this.stopLoad){//停止加载的时候，不能发送请求
			return;
        }
        //console.log('我没在偷懒')
        let sortMap={
            '综合排序':0,
            '销量优先':1,
            '价格由低到高':2,
            '价格由高到低':3
        }
		this.stopLoad=true;//开启停止加载，防止恶性加载
		this.$http.get(`http://api.lingkuaiyou.com/Goods/GetGoodsList?name=${kword}&pageIndex=${this.pageIndex}&state=${sortMap[this.screenOut.type]}&startpri=${this.screenOut.min}&endpri=${this.screenOut.max}`)//${sortMap[this.screenOut.type]}
		.then((data)=>{
			let body=JSON.parse(data.bodyText)
			console.log(body)
			if( body.result ){
				let productLists=body.data.DataList;
				let len=productLists.length;
				if(len>0){
					for(let i=0;i<len;i++){
						this.productLists.push(productLists[i]);
					}
					this.pageIndex++;
					this.stopLoad=false;
					//console.log(this.pageIndex);
				}else{
					this.noMore=true;//表示没有更多商品了
				}
			}else{//没有更多商品了
				this.stopLoad=true;//阻止继续加载
				this.noMore=true;//表示没有更多商品了
			}
		},(err)=>{
			console.log(err);
		})
      },
      initPage(){//初始化页面的页码和是否可加载
        this.pageIndex=1;
	    this.stopLoad=false;//用来判断现在是否可以加载,true表示停止加载
        this.noMore=false;//true表示没有更多商品了
		this.productLists.splice(0,this.productLists.length)//产品lists
      },
      initType(){//初始化排序
          this.screenOut.type="综合排序";
          this.screenOut.min='';
          this.screenOut.max='';
      },
      commonSearch(){//给排序和筛选用的
          this.$emit('sort-search');
          this.initPage();
          this.loadMore(this.keyWord);
      },
      initPriRegion(){//重新排序的时候需要重置筛选
          this.screenOut.min='';
          this.screenOut.max='';
          this.minPrice="";
          this.maxPrice="";
      }

  },
  watch: {
    keyWord(){
        this.initType();
        this.initPage();
        this.loadMore(this.keyWord);
    }
  },
  created(){
      this.initType();
      this.initPage();
      this.loadMore(this.keyWord);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.result_page{
    width: 100%;
    height: 100%;
    width: 100vw;
    height: 100vw;
    position: relative;
    z-index:1;
}

/*筛选条*/
.filter_bar{
	position: fixed;
	width: 100%;
	width: 100vw;
	left: 0;
	top:46px;
	height: 40px;
	border-bottom: 1px solid #e6e6e6;
	padding: 0 10px;
	background-color: #fff;
	z-index: 100;
}

.filter_bar .left_box{
	border-right: 1px solid #e6e6e6;
	flex:1;
	padding-right: 8px;
	margin-right: 8px;
}
.filter_bar .filter{
	height: 40px;
	line-height: 40px;
	padding: 0 18px;
	color: #999999;
}
.filter_bar .filter.active p{
	color: #000;
	font-weight: bold;
}
.filter .triangle_down{
	margin-top: 2px;
	margin-left: 2px;
	width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #959595;

}
.filter.active .triangle_down{
    border-top: 6px solid #000;
}

.filter .triangle_top{
	margin-top: -2px;
	margin-left: 2px;
	width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 6px solid #959595;

}
.filter.active .triangle_top{
    border-bottom: 6px solid #000;
}

.filter .icon{
	width: 18px;
	height: 18px;
	background-image: url('../assets/common_filter_grey.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	margin-left: 1px;
}
.filter.active .icon{
	background-image: url('../assets/common_filter_black.png');
}
@media only screen and (max-width: 350px){
	.filter_bar .left_box{
		padding-right: 8px;
		margin-right: 8px;
	}
	.filter_bar .filter{
		padding: 0 10px;
	}

}

/*z-index为50的黑色遮罩*/
.black_mask_50{
	width: 100%;
	height: 100vh;
	width: 100vw;
	position: fixed;
	top:0;
	left: 0;
	background-color: rgba(0,0,0,.6);
}
/*z-index为60的排序面板*/
.sort_box{
	background-color: #fff;
	width: 100%;
	width: 100vw;
	position: fixed;
	top: 86px;
	left: 0;
	padding:0 10px;
	z-index: 60;
}
.sort_box .sort_list{
	font-size: 14px;
	height: 44px;
	line-height: 44px;
	color: #999;
	padding: 0 8px;

}
.sort_box .sort_list .icon{
	background-image: url(../assets/common_hook_black.png);
	background-size: 100% 100%;
	background-repeat: no-repeat;
	background-position: 0 18px;
	width: 18px;
	height: 18px;
}
.sort_box .sort_list.active .icon{
	background-position: 0 0;
}
.sort_box .sort_list.active p{
	font-size: 14px;
	color: #000;
	font-weight: bold;
}
/*z-index为60的筛选面板*/
.sieve_box{
	width: 100%;
	width: 100vw;
	position: fixed;
	top: 86px;
	left: 0;
	background-color: #fff;
	padding:10px;
}
.sieve_box h3{
	font-size: 14px;
	color: #b3b3b3;
	font-weight: normal;
}
.sieve_box .price_region{
	margin-top: 10px;
	background-color: #f0f0f0;
	padding: 10px 16px;
}
.sieve_box .price_region input{
	text-align: center;
	color: #333333;
	font-size: 16px;
	height: 40px;
	border-radius: 4px;
	border-top: 1px solid #cccccc; 
	width: 35vw;
}
.sieve_box .grey_cross_bar{
	width: 8vw;
	height: 4px;
	background-color: #cccccc;
}
.sieve_box .btns_box{
	margin-top: 28px;
}

.sieve_box .btn{
	font-size: 14px;
	color: #fff;
	background-color: #707070;
	border-radius: 4px;
	height: 40px;
	line-height: 40px;
	width: 25vw;
	text-align: center;
}
.sieve_box .btn.orange{
	background-color: #333333;
}
.sieve_box .btn.red{
	background-color: #fc0449;
}
</style>
