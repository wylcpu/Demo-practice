function startMove(obj,iTarget,attr,fn){//这里的obj.timer没有搞明白，这里的是否和上面的是一个吗，我不太清楚
	clearInterval(obj.timer);
	var speed = 0;
	
	obj.timer = setInterval(function(){
			var iCur = 0;
			
			if(attr == 'opacity'){
				iCur = Math.round(parseFloat(getComputedStyle(obj,false)[attr])*100);	
			}else{
				iCur = parseInt(getComputedStyle(obj,false)[attr]);	
			}
		speed = (iTarget - iCur)/7;
		speed = speed > 0?Math.ceil(speed):Math.floor(speed);
		if(iTarget == iCur){
			clearInterval(obj.timer);
			if(fn){
				fn();	
			}
		}else{
			if(attr == 'opacity'){
			obj.style[attr] = (iCur + speed)/100;
			}else{
			obj.style[attr] = iCur + speed + 'px';
			}
		}
	},30);
}
// JavaScript Document
window.onload = function(){
	var oDiv = document.getElementById('box');
	
	oDiv.onmouseover = function(){
		startMove(oDiv,400,'width',function(){
				startMove(oDiv,400,'height',function(){
						startMove(oDiv,30,'opacity');
					});
			});	
	}
	oDiv.onmouseout = function(){
		startMove(oDiv,100,'height',function(){
				startMove(oDiv,100,'width',function(){
					startMove(oDiv,100,'opacity');
					});
			})
	}	
}





















