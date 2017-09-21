<template>
<div>
    <div class="form_box">
		<label class="list line_bottom">
			<input type="text" placeholder="收件人姓名" class="input_list">
		</label>
		<label class="list line_bottom">
			<input type="text" placeholder="手机号" class="input_list">
		</label>
		<div class="list line_bottom">
			<input type="text" placeholder="省 市 区" class="input_list">
		</div>
		<textarea placeholder="详细地址" class="text_box"></textarea>
	</div>

	<div class="add_btn">保存并使用</div>
</div>
</template>

<script>

export default {
  name: 'AddAddress',
  data () {
    return {

    }
  },
  methods:{
    
  }

}

</script>

<style scoped>
.add_btn{
	background-color: #fc0548;
	height: 50px;
	color: #fff;
	text-align: center;
	line-height: 50px;
	font-size: 16px;
	position: fixed;
	left: 0;
	bottom:0;
	width: 100%;
	width: 100vw;
}
.form_box{
	background-color: #fff;
	padding-bottom:16px;
}
.form_box .list{
	height: 44px;
	width: 94%;
	width: 94vw;
	display: block;
	margin:0 auto;
	margin-bottom: 3px;
}
.form_box .list .input_list{
	color: #383838;
	font-size: 15px;
	height: 44px;
	line-height: 44px;
	width: 94%;
	width: 94vw;
	outline: none;
}
.form_box .text_box{
	width: 94%;
	width: 94vw;
	margin:0 auto;
	display:block;
	outline: none;
	margin-top:6px;
	resize:none;
	font-size: 15px;
	color: #383838;
	line-height:20px;
	min-height: 100px;
	border:none;
}
</style>
