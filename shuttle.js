/**
 * Created by Zhangjianfeng on 2016/8/30.
 */

(function($){
    $.fn.extend({
        "shuttle":function(classname,speed){
            var coordinate={};
            $(this).mouseenter(function(e){
                if(isNaN(speed))speed=200;
		//处理数据
                initShuttleData(e,$(this),coordinate);
		//设置初始数据并开始进入动画
                $(this).css({position:"relative",overflow:"hidden"}).find("."+classname).css({width:"100%",height:"100%",display:"block",position:"absolute",left: coordinate.left+"px",top: coordinate.top+"px"}).stop().animate({left:"0px",top:"0px"},speed);
            }).mouseleave(function(e){
	    	//处理数据
                initShuttleData(e,$(this),coordinate);
		//设置初始数据并开始退出动画
                $(this).css({position:"relative",overflow:"hidden"}).find("."+classname).css({position:"absolute"}).stop().animate({left:coordinate.left+"px",top: coordinate.top+"px"},speed);
            });
        }
    });
    //设置数据并处理
    function initShuttleData(e,p,c){
    	//设置当前对象4个角的坐标和鼠标坐标
        c.thiswidth=p.width();
        c.thisheight=p.height();
        c.x1= c.x4= p.position().left;
        c.x2= c.x3= c.x1+c.thiswidth;
        c.y1= c.y2= p.position().top;
        c.y4= c.y3= c.y1+c.thisheight;
        c.x= e.clientX+$(window).scrollLeft();
        c.y= e.clientY+$(window).scrollTop();
	//判断鼠标进入点的方向：
	//设4个点以左上角为起点按顺时针方向分别为ABCD点
	//isl1鼠标进入点是否在AC连线的左侧
	//isl2鼠标进入点是否在BD连线的左侧
	//c.left,c.top为穿梭层的初始位置
        var isl1=(((c.x1- c.x)*(c.y3- c.y)-(c.x3- c.x)*(c.y1- c.y))<0)?1:0;
        var isl2=(((c.x4- c.x)*(c.y2- c.y)-(c.x2- c.x)*(c.y4- c.y))<0)?1:0;
        if(isl1&&isl2){
            c.left=0;
            c.top=c.thisheight*-1;
        }else if(!isl1&&!isl2){
            c.left=0;
            c.top=c.thisheight;
        }else if(!isl1&&isl2){
            c.left= c.thiswidth*-1;
            c.top=0;
        }else{
            c.left= c.thiswidth;
            c.top=0;
        }
    }
})(jQuery);
