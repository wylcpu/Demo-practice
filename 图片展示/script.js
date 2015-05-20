//牛逼
window.onload = function () {
	var oBigImage =document.getElementById("bigImage"),
		osmallImage = document.getElementById("smallImage"),
		oBottom = document.getElementById("bottom"),
		oList = document.getElementById("list"),
		aLi = oBottom.getElementsByTagName("li"),
		aImag = oBottom.getElementsByTagName("img"),
		oActive = oBottom.getElementsByTagName("div")[0],
		oBigImg = oBigImage.getElementsByTagName("img")[0];
		//设置底部小图片的滑动,
		oList.onmousemove = function(evt) {
			var pagX = evt.clientX - this.offsetLeft;
			// console.log(pagX);
			if(pagX < 50) {
				oBottom.style.left = 0 + "px";
			}else if(pagX > 300) {
				
				oBottom.style.left = -150 + "px";
			}
			else {
				oBottom.style.left = -parseInt(((pagX - 50)/5)*3) + "px";
				//这个地方本来用move方法和blue大神似的,但是有很多问题
			}

		}
		osmallImage.onmouseover = function() {
			move(this,{height:55});
		}
		osmallImage.onmouseout = function() {
			move(this,{height:0});
		}
		for(var i=0;i<aLi.length;i++) {
			aLi[i].index = i;
			aLi[i].onmouseover = function() {
				 
				move(this,{opacity:1});
			}
			aLi[i].onmouseout = function() {
				if(this.offsetLeft != oActive.offsetLeft){
				 move(this,{opacity:0.5});
				 // console.log(this);
				}

			}
			aLi[i].onclick = function() {
				// console.log(this.offsetLeft);
				move(oActive,{left:this.offsetLeft})
				this.style.opacity = 1;

				//点击的时候进行大图展示
				var img = new Image();
				img.onload = function () {
					oBigImg.src = img.src;
					move(oBigImage,{width:img.width});
				}
				img.src = "images/image" + (this.index + 1) + ".jpg";

			}
		}

	//设置运动函数,obj是元素对象
	//oTarget是设置属性值,但是目前只能设置一个值;
function move(obj,oTarget){
	if(!oTarget){return false;}
		clearInterval(obj.timer);	
	for(var attr in oTarget) {
		var sCur=obj.currentStyle?obj.currentStyle[attr]:
				document.defaultView.getComputedStyle(obj, false)[attr];
		if(attr == "opacity") {
				//进行相应的处理代码
			sCur = parseInt(parseFloat(sCur)*100);
			obj.timer = setInterval(function() {
				if(Math.round(sCur) != oTarget[attr]*100) {
					// console.log(oTarget[attr]);
				    sCur=parseFloat(obj.currentStyle?obj.currentStyle[attr]*100:
					document.defaultView.getComputedStyle(obj, false)[attr])*100;
				    sCur = Math.round(sCur);
					var speed = parseInt(oTarget[attr]*100 - sCur)/2;
					
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					// console.log(speed +"  " + sCur);
					obj.style[attr] = (sCur + speed)/100;

				} else{
					clearInterval(obj.timer);
				}
			},30);
		} else{
			//进行相应的代码的处理
			sCur = parseInt(sCur);
			obj.timer = setInterval(function() {
				if(sCur != oTarget[attr]) {
					sCur=parseInt(obj.currentStyle?obj.currentStyle[attr]:
					document.defaultView.getComputedStyle(obj, false)[attr]);
					// console.log(sCur);
					var speed = (oTarget[attr] - sCur)/5;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					obj.style[attr] = sCur + speed + "px";
				} else {
					clearInterval(obj.timer);
				}
			},30);	
		}
	}
 }




}