<template>
  <div id="app">
    <keep-alive> 
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* 样式重置 */
body,h1,h2,h3,h4,h5,h6,hr,p,ul,ol,li,button,input,textarea,th,td{margin:0;padding:0}
html{font-size: 20px;}
h1,h2,h3,h4,h5,h6,div,li,a,div{font-size:.75rem}
div,li,header,main,footer,ul,ol{box-sizing: border-box;}
ul,ol{list-style:none}
input{box-sizing: border-box;border:none;}
a{text-decoration:none}
a:hover{text-decoration:underline}
img{width: 100%;border:0;display: block;height: auto}
.hide{display:none}
.clearfix:after{content:'\20';display:block;height:0;clear:both}
.clearfix{zoom:1}.clear{clear:both;height:0;line-height:0;font-size:0;visibility:hidden;overflow:hidden}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale
}

/* 公共样式 */
.flex_betwen{display: flex;justify-content: space-between;align-items: center;}
.flex_around{display: flex;justify-content: space-around;align-items: center;}
.flex_start{display: flex;justify-content: flex-start;align-items: center;}
.flex_end{display: flex;justify-content: flex-end;align-items: center;}
.flex_center{display: flex;justify-content: center;align-items: center;}

.dot_line{width: 100%;height: 1px;border-bottom:1px dashed #b3b3b3;}
.line_bottom{position: relative;}
.line_top{position: relative;}
.line_bottom:after{
	height: 1px;
	background-color:#d6d6d6;
	display: block;
	content: '';
	position: absolute;
	top: auto;
	right: auto;
	bottom:0;
	left: 0;
	width: 100%;
	z-index: 2;
	-webkit-transform-origin: 50% 100%;
	transform-origin: 50% 100%;
	pointer-events: none;
}
.line_top:before{
	height: 1px;
	background-color:#d6d6d6;
	display: block;
	content: '';
	position: absolute;
	top: 0;
	right: auto;
	bottom:auto;
	left: 0;
	width: 100%;
	z-index: 2;
	-webkit-transform-origin: center top;
	transform-origin:center top;
	pointer-events: none;
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.5){
	.line_bottom:after,.line_top:before{-webkit-transform: scaleY(1);transform: scaleY(1);}

}
@media only screen and (-webkit-min-device-pixel-ratio: 2){
	.line_bottom:after,.line_top:before{-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}
}
body{
	background-color: #f0f0f0;
}
</style>
