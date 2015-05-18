//在写本程序的时候刚开始用的不是这样的,主要是产生了冒泡和捕获的问题,今天我是碰到了
//他们给我带来的问题,刚开始我是用的元素套牵,但是实现起来要避免冒泡,最后看见了人家用的是兄弟
//元素,这个问题就很好的解决了
window.onload = function () {
	var wind = document.getElementById('wind'),
		smallBox = document.getElementById('small_box'),
		control = document.getElementById("control");
	var imgs = document.getElementById("imgs");
	var bigBox = document.getElementById("big_box");
		// document.title = smallBox.offsetLeft;
	var l = 0, t = 0;

	control.onmouseout = function () {
		wind.style.display = "none";
		bigBox.style.display = "none";
	}
	control.onmouseover = function () {
		wind.style.display = "block";
		bigBox.style.display = "block";
	}
	control.onmousemove = function (evt) {
		//根据鼠标的位置算出框框的位置
		l = evt.clientX - smallBox.offsetLeft - wind.offsetWidth/2;
		t = evt.clientY - smallBox.offsetTop  - wind.offsetHeight/2;
		//阻止框框出来
		if ( l<0) {
			l = 0;
		} else if ( l > control.offsetWidth - wind.offsetWidth) {
				l = control.offsetWidth - wind.offsetWidth;
		};
		if (t < 0) {
			t = 0;
		} else if (t > control.offsetHeight - wind.offsetHeight) {
			t = control.offsetHeight - wind.offsetHeight;
		}
		//根据鼠标的位置为框框赋值
		wind.style.left = l + "px";
		wind.style.top = t + "px";
		//把小box的移动比例转换到大box的现实比例
		var ll = ((evt.clientX - smallBox.offsetLeft)/control.offsetWidth)*(imgs.offsetWidth - bigBox.offsetWidth);
		var tt = ((evt.clientY - smallBox.offsetTop)/control.offsetHeight)*(imgs.offsetHeight - bigBox.offsetHeight);

		imgs.style.left = -ll + "px";
		imgs.style.top = - tt + "px";


	
	}
}