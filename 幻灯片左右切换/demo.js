// JavaScript Document
window.onload = function(){
	var box = document.getElementById('box'),
		u2 = box.getElementsByTagName('ul')[1],
		u2lis = u2.getElementsByTagName('li'),
		u = box.getElementsByTagName('ul')[0],
		ulis = u.getElementsByTagName('li'),
		prev = box.getElementsByTagName('p')[0],
		next = box.getElementsByTagName('p')[1];
			
	u2.style.width = 470*u2lis.length +'px';
	
	for(i=0;i<ulis.length;i++){
		ulis[i].tt=i;	//这句话放在下面就不合适一定要放在这里
		ulis[i].onmouseover = function(evt){//不能把这句话放在这里		ulis[i].tt=i;
			for(i=0;i<ulis.length;i++){
				ulis[i].className = '';
			}
			this.className = 'active';//这个地方为什么一定要用this呢？？？？？？？
			nextTarget = this.tt;
			move( -this.tt* 470);				
		}
	}
	autoPlay();
	prev.onmousedown = fPrev;
	next.onmousedown = fNext;
}
var timer = null;
function move(target){
	clearInterval(timer);
//	clearInterval(timer2);
	var box = document.getElementById('box'),
		u2 = box.getElementsByTagName('ul')[1],
		speed = 0;
	timer = setInterval(function(){
		 speed = (target-u2.offsetLeft)/5;
		 speed = speed > 0?Math.ceil(speed):Math.floor(speed);
		 u2.style.left =speed + u2.offsetLeft + 'px';
		 if(target == u2.offsetLeft){
			clearInterval(timer); 
		   }
		},30);
}
function goTo(index){
	var box = document.getElementById('box'),
		u = box.getElementsByTagName('ul')[0],
		u2 = box.getElementsByTagName('ul')[1],
		ulis = u.getElementsByTagName('li'),
		u2lis = u2.getElementsByTagName('li'),
		iTarget = 0;
	for(i=0;i<ulis.length;i++){
			ulis[i].className = '';
		}
	ulis[index].className = 'active';
	iTarget = -index * 470;
	move(iTarget);
}
var nextTarget = 0;
function fPrev(){
	var box = document.getElementById('box'),
		u2 = box.getElementsByTagName('ul')[1],
		u2lis = u2.getElementsByTagName('li');
		
	nextTarget--;
	if(nextTarget < 0){
		nextTarget = u2lis.length-1;
	}
	goTo(nextTarget);	
}
function fNext(){
	var box = document.getElementById('box'),
		u2 = box.getElementsByTagName('ul')[1],
		u2lis = u2.getElementsByTagName('li');
		
	nextTarget++;
	if(nextTarget >= u2lis.length){
		nextTarget = 0;	
	}
	goTo(nextTarget);
}
var timer2 = null;
function autoPlay(){
	var box = document.getElementById('box'),
		u2 = box.getElementsByTagName('ul')[1],
		u2lis = u2.getElementsByTagName('li');
	
	box.onmouseover = function(evt){
//		evt.stopPropagation();
		clearInterval(timer2);	
	};
	box.onmouseout = function(evt){
//		evt.stopPropagation();
		timer2 = setInterval(function(){
			nextTarget++;
			if(nextTarget >=u2lis.length){
				nextTarget = 0;	
			}
		goTo(nextTarget);
		},3000);
	}	
}



















































