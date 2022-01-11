layui.use(['layer', 'form','jquery'], function(){
    var layer = layui.layer
        ,form = layui.form
        ,$ = layui.$;
    //载入页面执行
    var dm = ["Merry Christmas! ", "圣诞快乐！",
        "Best wishes on this holiday season.","献上最诚挚的节日祝福。",
        "Happy holidays! ","节日快乐！",
        "网上句子千篇一律","我给你整几句",
        "咱们就是说自律起来，加油","爱你哦",
        "最最重要的是咱就就是说一定要积极面对生活噢","有啥事可以和爸爸说我一直在嘿嘿"];

    //查看弹幕
    $('#lookMsg').click(function (){
        var text = "";
        for(let j = 0; j < dm.length; j++) {
            text = text + dm[j] + '<br />';
        }
        sWindow('auto',text);
        play();
    });

    //刷新页面
    $('#lookAgain').click(function (){
        location.reload(true);
    });

    //查看贺卡
    $('#lookCard').click(function (){
        lookCard();
        play();
    });

    //关闭贺卡
    $('#closeCard').click(function (){
        $(".card").css("display","none");
        layer.closeAll();
    });

    //使用说明
    $('#explain').click(function (){
        tips();
    });


    //加载弹幕
    setTimeout(function () {
        for(let j = 0; j < dm.length; j++) {
            outTimeSend(dm[j],'#ffffff',j);
        }
    }, 15000);

});
function play() {
    var music = document.getElementById("music");
    //判断如果音乐停止播放中，就让他播放。。。
    if (music.paused) {
        music.paused = false;
        music.play();
    }
}

//小提示
function xTips(msg,xclass){
    layer.tips(msg, xclass, {
        tips: [1, '#3595CC'],
        time: 4000
    });
}

// 延时发送弹幕
function outTimeSend(info,color,i){
    setTimeout(function () {
        send(info,color);
    }, 1000 * i);
}

//弹出贺卡
function lookCard(){
    //捕获页
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        closeBtn: 0, //不显示关闭按钮
        content: $('.card'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function(){
            $(".card").css("display","none");
        }
    });
}

// 弹出窗口
function sWindow(type,text){
    layer.open({
        type: 1
        ,title: '所有弹幕查看'
        ,offset: type //具体配置参考：https://www.layuiweb.com/doc/modules/layer.html#offset
        ,id: 'layerDemo'+type //防止重复弹出
        ,content: '<div style="padding: 20px 100px;">'+ text +'</div>'
        ,btnAlign: 'c' //按钮居中
        ,shade: 0 //不显示遮罩
        ,yes: function(){
            layer.closeAll();
        }
    });
}

// 弹出提示
function tips(){
    //示范一个公告层
    layer.open({
        type: 1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: '300px;'
        ,shade: 0.8
        ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
        ,btn: ['知道啦']
        ,btnAlign: 'c'
        ,moveType: 1 //拖拽模式，0或者1
        ,content: '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">宝宝当你点开这里时，我猜你可能很笨<br>不过关系，我手把手教你<br><br>上面四个按钮鼠标放在上面会发光噢<del>嘿嘿</del><br><br>查看弹幕就是看所有的弹幕啦！这样就不用麻烦的再看一遍！一个小细节，把鼠标放在移动的弹幕上试试吧。最后最后贺卡一定要看那里都是我对你的祝福呢！^_^</div>'
        ,success: function(layero){
            var btn = layero.find('.layui-layer-btn');
            btn.find('.layui-layer-btn0').on('click', function(){
                layer.closeAll();
            });
        }
    });
}

// 发送弹幕
function send(info,color){
    var item={
        img:'', //图片
        info:info, //文字
        href:'', //链接
        close:false, //显示关闭按钮
        speed:15, //延迟,单位秒,默认6
        color:color, //颜色,默认白色
        old_ie_color:'#0095ff' //ie低版兼容色,不能与网页背景相同,默认黑色
    }
    $('body').barrager(item);
}
