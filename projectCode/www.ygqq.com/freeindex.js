var formatDate = function(date,format){if(!format)format="yyyy-MM-dd HH:mm:ss";date=new Date(parseInt(date));var dict={"yyyy":date.getFullYear(),"M":date.getMonth()+1,"d":date.getDate(),"H":date.getHours(),"m":date.getMinutes(),"s":date.getSeconds(),"S":(""+(date.getMilliseconds()+1000)).substr(1),"MM":(""+(date.getMonth()+101)).substr(1),"dd":(""+(date.getDate()+100)).substr(1),"HH":(""+(date.getHours()+100)).substr(1),"mm":(""+(date.getMinutes()+100)).substr(1),"ss":(""+(date.getSeconds()+100)).substr(1)};return format.replace(/(y+|M+|d+|H+|s+|m+|S)/g,function(a){return dict[a]})};
//获取最新商品
/* var getNew = function(){
	
	$.ajax({
		url:"/free/newGoods.do",
		type:"post",
		dataType:"json",
		data:{
			
		},
		success:function(result){
			if(result.status){
				var output=$('#product').parseTemplate(result);  
				$('.c_product_list').html(output);
				
				$(result.goods).each(function(index, g){
					if(g.stopTime>=result.now)
						Time_fun(new Date().getTime()+g.stopTime-result.now,$(".c_sack_time .time"+g.id));
				});
				
			}
		},
		error:function(){
			
		}
	});
	
} */
//获取所有商品
var getList = function(page){
	
	$.ajax({
		url:"/free/list.do",
		type:"post",
		dataType:"json",
		data:{
			page : page
		},
		success:function(result){
			if(result.status){
				
				var output=$('#product').parseTemplate(result);  
				$('.c_product_list').html(output);
				
				var output=$('#goods').parseTemplate(result);  
				$('.c_sift_list').append(output);
				
				$(result.goodsList).each(function(index, g){
					if(g.stopTime>=result.now){
						Time_fun(new Date().getTime()+g.stopTime-result.now,$(".time"+g.id));
					}
				});
				$(result.goodsNew).each(function(index, g){
					if(g.stopTime>=result.now)
						Time_fun(new Date().getTime()+g.stopTime-result.now,$(".time"+g.id));
				});
				
			}
		},
		error:function(){
			
		}
	});
	
}
setTimeout(function(){
	//2015.4.20
	//全球免税店
	$(".c_new_product").hover(function(){
		$(".c_new_product").removeClass("c_product_hover");
		$(this).addClass("c_product_hover");
	},function(){
		$(".c_new_product").removeClass("c_product_hover");
	})
	
	$(".yMenuIndex :contains('免税专区')").addClass("yMenua");
},500)

$(".c_product_list").delegate(".c_product_left,.c_product_descrip,.discount,h3,.c_sack_buy","click",function(ev){
	var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    var id = $(target).attr("data-id");
    //alert(id);
    window.location.href="/free/detail"+id+".html";
});
$(".c_sift_list").delegate(".c_Korean,.c_sift_descrip,.c_sift_img,.c_sack_buy","click",function(ev){
	var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    var id = $(target).attr("data-id");
    //alert(id);
    window.location.href="/free/detail"+id+".html";
});

var t = {};
function Time_fun(times,objc){               
	t.time = times - (new Date().getTime());
	t.d = parseInt((t.time/1000)/60/60/24);//天
	t.h = parseInt((t.time/1000)/60/60%24);//时
	t.m = parseInt((t.time/1000)/60%60);//分数
	t.s = parseInt((t.time/1000)%60);//秒数
	if(t.h<10)t.h='0'+t.h;
	if(t.m<10)t.m='0'+t.m;
	if(t.s<10)t.s='0'+t.s;
	t.oh=String(t.h).slice(0,1);
	t.th=String(t.h).slice(1);
	t.om=String(t.m).slice(0,1);
	t.tm=String(t.m).slice(1);
	t.os=String(t.s).slice(0,1);
	t.ts=String(t.s).slice(1);
 	objc.html('<span>'+t.d+'</span><span>天</span>'+'<span>'+t.oh+'</span><span>'+t.th+'</span><span>时</span><span>'+t.om+'</span><span>'+t.tm+'</span><span>分</span><span>'+t.os+'</span><span>'+t.ts+'</span><span>秒</span>');   
	if(t.time<=0){     
		//objc.find("p").addClass("w_timeing");           
		//objc.html('活动已结束');
		setTimeout(function(){
			
		},5000);                             
		return;                     
	}
              
	setTimeout(function(){                                 
		Time_fun(times,objc,t);                 
	},1000); 
}