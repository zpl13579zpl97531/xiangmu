

 window.onload=function(){
 	  
	var cookie = getCookie("zpl");
	
	
		if (cookie.length != 0) {
			for(var i in cookie){
				if (cookie[i].isDoing) {
					$(".main1").append(`<li data-time="${cookie[i].time}">
							<input type="checkbox" name="">
							<p>${cookie[i].text}</p>
							<span class="delete">删除</span>
						</li>`);
				}else{
					$(".main1").append(`<li data-time="${cookie[i].time}">
							<input type="checkbox" checked name="">
							<p>${cookie[i].text}</p>
							<span class="delete">删除</span>
						</li>`);
				}
			}
		}
		count();

        //拼接内容,添加
	$(document).keydown(function(event){
		var evt = event || window.event;
		var code = evt.keyCode||evt.which;
		if (code == 13) {
			var createTime = new Date().getTime();
			$(".main1").append(`<li data-time="${createTime}">
						<input type="checkbox" name="">
						<p>${$(".search").val()}</p>
						<span class="delete">删除</span>
					</li>`);
			var obj = {
				"time" : createTime,
				"isDoing" : true,
				"text" : $(".search").val()
			}
			
			var arr = getCookie("zpl");
			arr.push(obj);
			setCookie("zpl",JSON.stringify(arr),1000);
			$(".search").val("");
			count();
		}
	});


	function count(){
		$(".z1 h2 span").html($(".main1").children().size());
		$(".z2 h2 span").html($(".main2").children().size());
	}


	$(".main1").on("click","li input",function(){
		var time = $(this).parent().data("time");
		var cookie = getCookie("TODOLIST");
		console.log(cookie);
		if(cookie.length != 0){
			for( var i = 0 ; i < cookie.length ; i++ ){
				if( time == cookie[i].time){
					cookie[i].isDoing = false;
					break;
				}
			}
		}
		setCookie("zpl",JSON.stringify(cookie));
		$(".main2").append($(this).parent());
		count();
	});

	$(".main").on("click",".delete",function(){
		var cookie = getCookie("zpl");
		for(var i in cookie){
			if (cookie[i].time == $(this).parent().data("time")) {
				cookie.splice(i,1);
				break;
			}
		}
		$(this).parent().remove();
		setCookie("zpl",JSON.stringify(cookie),1000);
		count();
	});

 }
       