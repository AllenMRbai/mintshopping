<template>
<div class="search_page">
    <header class="line_bottom">
		<div class="search_bar_box white_bar_box flex_center ">
			<div class="follow_btn" @click="followUs">关注</div>
            <label class="search_bar">
                <input type="text" placeholder="输入你想搜索的东西" id="search_input">
            </label>
			<div class="search_btn" @click="searchBtn"><img src="../assets/common_search_black.png"></div>
		</div>
	</header>

    <search-guide v-if="nowPage===0" @go-to='goTo'></search-guide>
    <search-reasult :key-word='keyWord' @sort-search='changeKey' v-else></search-reasult>

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
import SearchGuide from '@/components/SearchGuide';
import SearchReasult from '@/components/SearchReasult';

export default {
  name:'Search',
  components:{
      SearchGuide,
      SearchReasult
  },
  data () {
    return {
        nowPage:0,
        keyWord:'',
        popupVisible:false
    }
  },
  methods:{
      searchBtn(){
          let kword=document.getElementById('search_input').value.trim();
          if(kword===''){
            return;
          }
          this.nowPage=1;
          this.addHistory(kword)
          this.keyWord=kword;
          console.log('我想搜索'+this.keyWord)
      },
      addHistory(kword){
		  let historys=localStorage.getItem('historys');
		  if(historys==null){
			historys=localStorage.setItem('historys','[]');
		  }
		  let phistorys=JSON.parse(historys);
		  if(phistorys.some(function(a){return a==kword;})){
			return;
		  }else{
			phistorys.push(kword);
			localStorage.setItem('historys',JSON.stringify(phistorys));
		  }  
      },
      goTo(text){
          document.getElementById('search_input').value=text;
          this.searchBtn();
      },
      changeKey(){
          document.getElementById('search_input').value=this.keyWord;
      },
      followUs(){
        this.popupVisible=true;
      }
  },
  mounted(){
      let inp=document.getElementById('search_input');
      inp.focus();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 页面切换效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to{
  opacity: 0
}
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

.search_page{
    position: relative;
}

/*商城白色的头部*/
header{
  height: 46px;
  width: 100%;
  width: 100vw;
  position: fixed;
  top:0;
  left: 0;
  z-index: 100;
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
	height: 35px;
	border-bottom: 1px solid #444444;
	flex:1;
}
.search_bar_box.white_bar_box .search_bar input{
    height: 100%;
    display: block;
    width: 100%;
    font-size: 16px;
    line-height: 20px;
    padding:0 10px;
    padding-top: 6px;
    background-color: #f9f9f9;
    color:#333333;
}
.search_bar_box .search_btn{
	width: 36px;
	height: 36px;
	margin-left: 6px;
	padding: 7px;
}
</style>
