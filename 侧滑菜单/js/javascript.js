// JavaScript Document

window.onload = function(){
	var oDiv = document.getElementById('box1');
	
	oDiv.onmouseover = function(){
		startMove(0);	
	}
	oDiv.onmouseout = function(){
		startMove(-200);	
	}
		
}
var timer = null;
function startMove(iTarget){
	var oDiv = document.getElementById('box1');
	clearInterval(timer);
	var speed = 0;

	timer = setInterval(function(){

		speed = (iTarget - oDiv.offsetLeft)/10;
		speed = speed > 0? Math.ceil(speed):Math.floor(speed);
		if(oDiv.offsetLeft == iTarget){
			clearInterval(timer);
		}else{
			oDiv.style.left = oDiv.offsetLeft + speed + 'px';	
		}	
		},30);	
	
}


















