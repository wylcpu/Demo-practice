$(function() {
	var index = 0;
	var flag = 0;
	$(".small-img .prev").click(function(){
		index++;
		if(index === 3) {
			index = 0;
		}
		$(".small-right li").css("display","none");
		var $li = $(".small-right li");
		if(index === 0) {
			$li.eq(20).removeClass('last');
			for(var i=0; i < 7; i++) {
				$li.eq(i).css("display","list-item");
			}
			$li.eq(6).addClass("last");
		} else if(index === 1) {
			$li.eq(6).removeClass('last');
			for(i=7; i<14;i++) {
				$li.eq(i).css("display","list-item");
			}
			$li.eq(13).addClass('last');
		} else if(index === 2) {
			$li.eq(13).removeClass('last');
			for(i=14; i<21; i++) {
				$li.eq(i).css("display","list-item");
			}
			$li.eq(20).addClass('last');
		}
		
	});
	$(".small-img .next").click(function(){
		index--;
		if(index === -1) {
			index = 2;
		}
		$(".small-right li").css("display","none");
		var $li = $(".small-right li");
		if(index === 0) {
			$li.eq(20).removeClass('last');
			for(var i=0; i < 7; i++) {
				$li.eq(i).css("display","list-item");
			}
			$li.eq(6).addClass("last");
		} else if(index === 1) {
			$li.eq(6).removeClass('last');
			for(i=7; i<14;i++) {
				$li.eq(i).css("display","list-item");
			}
			$li.eq(13).addClass('last');
		} else if(index === 2) {
			$li.eq(13).removeClass('last');
			for(i=14; i<21; i++) {
				$li.eq(i).css("display","list-item");
			}
			$li.eq(20).addClass('last');
		}
		
	});
	$(".small-right li").mouseover(function() {
		$('.small-right a').eq(flag).removeClass("current");
		$('.big-img a').eq(flag).hide();

		flag = $(".small-right li").index(this);
		$(".small-right a").eq(flag).addClass("current");
		$('.big-img a').eq(flag).show();
		
	})
});