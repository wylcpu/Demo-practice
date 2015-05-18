$(function() {
	var timer = null;
	var index = 0;
	$(".smallBox div").mouseover(function() {
		$(".smallBox div")
			.eq(index).animate({marginTop:0},200).css("opacity",0.4)
			.children("span").css({"border":"3px solid #333","width":"124px"});

		$(".BigBox div").eq(index).fadeOut("fast");
		$(this).animate({marginTop:"-18px"},200).css("opacity",1)
			.children("span").css({"border":"2px solid #fff","width":"121px"});
		$(".BigBox div").eq($(".smallBox div").index(this)).fadeIn("fast");
		index = $(".smallBox div").index(this);
	}).mouseout(function() {
		setTimeout(function() {
			$(this).animate({marginTop:0},200).css("opacity",0.4)
			.children("span").css({"border":"3px solid #333","width":"124px"});
		if($(".smallBox div").index(this) == 9) {
			$(this).children("span").css({"border":"3px solid #333","width":"120px"});
		}
		$(".BigBox div").eq($(".smallBox div").index(this)).fadeOut("fast");
	},1000);
		
	});
	$("#box").mouseover(function() {
		clearInterval(timer);
	}).mouseout(function() {
		timer = setInterval(function() {
			if(++index == 10) {
			index = 0;
		}
		$(".smallBox div")
			.eq(index)
			.animate({marginTop:"-18px"},200)
			.css("opacity",1)
			.children("span")
			.css({"border":"2px solid #fff","width":"121px"});
		$(".BigBox div").eq(index).fadeIn("fast");
		//隐藏
		if(index != 0) {
		$(".smallBox div")
			.eq(index).prev().animate({marginTop:0},200).css("opacity",0.4)
			.children("span").css({"border":"3px solid #333","width":"124px"});

		$(".BigBox div").eq(index).prev().fadeOut("fast");
		} else {
			$(".smallBox div")
			.eq(9).animate({marginTop:0},200).css("opacity",0.4)
			.children("span").css({"border":"3px solid #333","width":"124px"});
			$(".BigBox div").eq(9).fadeOut("fast");
		}
		},4000);


	}).mouseout();
});