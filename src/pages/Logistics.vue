<template>
<div>
    <div class="detail_box flex_start">
        <div class="pic">
            <img src="../../static/img/product.jpeg">
        </div>
        <ul class="right_box">
            <li class="black">物流状态：<span class="green">运输中</span></li>
            <li>承运公司：<span>百世快递</span></li>
            <li>运单编号：<span>545452126356161316546465</span></li>
            <li>承运公司：<span>无</span></li>
        </ul>
    </div>

    <div class="Flow_chart flex_betwen">
        <div class="left_box">
            <div class="long_line">
                <div class="short_white_line"></div>
            </div>
        </div>
        <div class="right_box">
            <div class="list line_bottom active">
                <div class="pp">到宁波市 【余姚集散中心】</div>
                <div class="pp">2017-08-01 09:31:08</div>
                <div class="ball"></div>
            </div>
            <div class="list line_bottom">
                <div class="pp">到宁波市 【余姚集散中心】</div>
                <div class="pp">2017-08-01 09:31:08</div>
                <div class="ball"></div>
            </div>
            <div class="list line_bottom">
                <div class="pp">到宁波市 【余姚集散中心】</div>
                <div class="pp">2017-08-01 09:31:08</div>
                <div class="ball"></div>
            </div>
            <div class="list line_bottom">
                <div class="pp">到宁波市 【余姚集散中心】</div>
                <div class="pp">2017-08-01 09:31:08</div>
                <div class="ball"></div>
            </div>
            <div class="list line_bottom">
                <div class="pp">到宁波市 【余姚集散中心】</div>
                <div class="pp">2017-08-01 09:31:08</div>
                <div class="ball"></div>
            </div>
            <div class="list line_bottom">
                <div class="pp">到宁波市 【余姚集散中心】</div>
                <div class="pp">2017-08-01 09:31:08</div>
                <div class="ball"></div>
            </div>
        </div>
    </div>
    
    <div style="height:50px"></div>
</div>

</template>

<script>

export default {
  name: 'Logistics',
  data () {
    return {

    }
  },
  methods:{
    
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
    font-size: 13px;
    line-height: 20px;
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
