<template>
<div>
    <div class="detail_box flex_start">
        <div class="pic">
            <img :src="productPic">
        </div>
        <ul class="right_box">
            <!-- <li class="black">物流状态：<span class="green">运输中</span></li> -->
            <li>承运公司：{{ model.expressname }}</li>
            <li>运单编号：{{ model.nu }}</li>
            <li>公司联系号码：{{ model.comcontact }}</li>
        </ul>
    </div>

    <div class="Flow_chart flex_betwen">
        <div class="left_box">
            <div class="long_line">
                <div class="short_white_line"></div>
            </div>
        </div>
        <div class="right_box">
            <div class="list line_bottom" :class="{'active':index===0}" v-for="(location,index) in model.data" :key="index">
                <div class="pp">{{ location.context }}</div>
                <div class="pp">{{ location.time }}</div>
                <div class="ball"></div>
            </div>
        </div>
    </div>
    
    <div style="height:50px"></div>
</div>

</template>

<script>
import { MessageBox,Indicator } from 'mint-ui';

export default {
  name: 'Logistics',
  data () {
    return {
        model:'',
        productPic:''
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
    getExpress(){
        let token=this.getToken();//获取token
        if(!token){//如果没有token就直接跳到登录页面
            this.goSignIn();
            return;
        }

        let orderID=this.getOrderID();
        //真实地址
        let realOne=`http://api.lingkuaiyou.com/User/CheckExpress?token=${token}&id=${orderID}`
        //测试地址
        let testOne='http://api.lingkuaiyou.com/User/CheckExpress?token=831XVgicAUWXOnx0%2b6jYkaOu1b%2bCTvjOxSBEznQ13xkwfdyaiTQW5wxnnNMa9v5j&id=264a25daff794a6489dd70c0ee8df514'
        this.$http.get(testOne).then((data)=>{
            console.log(data)
            if(data.body.result){//表示有快递信息
               this.model=data.body.data
            }else{//没有快递信息
                MessageBox('提示', '查不到快递信息，可能订单还未发货').then(action => {
                    this.$router.go(-1);
                });
            }
        }).catch(err=>{})
    },
    getOrderID(){
        return this.$route.params.orderID
    }
  },
  created(){
      this.productPic=decodeURIComponent(this.$route.params.pic);
      this.getExpress();
  }


}

</script>

<style scoped>
.Flow_chart {
    background-color: #fff;
    margin-top: 26px;
    align-items: stretch;
    flex:1;
}
.Flow_chart .left_box{
    width: 54px;
}
.Flow_chart .left_box .long_line{
    width: 2px;
    height: 100%;
    background-color: #cccccc;
    margin:0 auto;
}
.Flow_chart .left_box .short_white_line{
    width: 2px;
    height: 20px;
    background-color: #fff;
}
.right_box{
    flex:1;
}
.right_box .list{
    padding:18px 8px;
    line-height: 20px;
    color: #999999;
}
.right_box .list .ball{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #cccccc;
    position: absolute;
    top: 18px;
    left: -35px;
}
.right_box .list.active .ball{
    background-color: #25ae5f;
    border:3px solid #bae5cc;
    width: 21px;
    height: 21px;
    top:18px;
    left: -37px;
}
.right_box .list .pp{
    margin-bottom: 5px;
    font-size: .7rem;
}
.right_box .list.active .pp{
    color: #25ae5f;
}

/* 头部详情 */
.detail_box{
    background-color: #fff;
    padding:10px;
    flex: 1;
    align-items: flex-start;
}
.detail_box .pic{
    width: 100px;
    height: 100px;
    
}

.detail_box .right_box{
    padding-left:10px;
    flex:1;
}
.detail_box .right_box li{
    font-size: 14px;
    line-height: 24px;
    color:#999999;
    word-break:break-all
}
.detail_box .right_box .black{
    color: #333333;
}
.detail_box .right_box .green{
    color: #25ae5f;
}

/* 物流流程 */

</style>
