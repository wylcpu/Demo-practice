window.onload = function () {
	var nav = document.getElementById("nav1");
	var navPop = document.getElementById("navPop");
	var navDl = document.getElementById("navDl");
	var navLogin = document.getElementById("navLogin");
	var navrr = document.getElementById("navrr");
	var navyx = document.getElementById("navyx");
	var navrr1 = document.getElementById("navrr1");
	// var navli1 = document.getElementById("navli1");
	var li = navrr1.getElementsByClassName("nav-c");
	var div = navrr1.getElementsByTagName("div");

	
	nav.onmouseover = function () {
		navPop.style.display = "block";
	}
	
	nav.onmouseout = function () {
		navPop.style.display = "none";
	}
	navDl.onmouseover = function () {
		navLogin.style.display = "block";
	}
	document.onclick = function (evt) {
		navLogin.style.display = "none";

	}
	navLogin.onclick = function (evt) {
		evt.stopPropagation();
		// return false;
	}
	navrr.onmouseover = function () {
		navyx.style.display = "block";
		navLogin.style.display = "none";
	}
	navrr.onmouseout = function () {
		navyx.style.display = "none";
	}
	console.log(li.length);
	for (var i=0; i<li.length-1; i++) {
		li[i].num = i;
		li[i].onmouseover = function () {
			// console.log(i);
			div[this.num].style.display = "block";
			navLogin.style.display = "none";
		}
		li[i].onmouseout = function () {
			// console.log(i);
			div[this.num].style.display = "none";
		}
	}
	
	
}
