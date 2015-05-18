// JavaScript Document
window.onload = function(){
	var top = document.getElementById('top'),
		box = document.getElementById('logon'),
		closed = document.getElementById('close'),
		selected = document.getElementById('selected'),
		hi = document.getElementById('hi'),
		hii = hi.getElementsByTagName('li');
		
	//登陆框的拖拽
	top.onmousedown = fnDrag;         //这里要用top.onmousedown
	
	//登陆框的关闭
	closed.onclick = function(){
		logon.style.display = 'none';
	}
	
	//在线状态选择
	selected.onclick = function(){
		if(hi.style.display == 'none'){
			hi.style.display = 'block';	
		}else{
			hi.style.display = 'none';
			}
	}
	
	for(var i=0;i<hii.length;i++){
		hii[i].onmouseover = function(){
			for(var j=0;j<hii.length;j++){
				hii[j].style.background = 'white';
				}
			this.style.background = 'red';
			this.onclick = function(){
			selected.getElementsByTagName('div')[2].innerHTML = this.getElementsByTagName('div')[1].innerHTML;
			selected.getElementsByTagName('div')[0].className = this.getElementsByTagName('div')[0].className;
			}
			}
		hii[i].onmouseout = function(){
			this.style.background = 'white';
			}
		}
		
}




function fnDrag(evt){
			var top = document.getElementById('top'),
				box = document.getElementById('logon'),
			 	topX = evt.clientX - box.offsetLeft,
			    topY = evt.clientY - box.offsetTop ,
				maxWidth = document.documentElement.clientWidth - box.offsetWidth-10,
				maxHeight = document.documentElement.clientHeight - box.offsetHeight-5;
			document.onmousemove = function(evt){  //这个地方刚开始的时候我用了top.onmousemove这个用的不好，因为这样的话当你移动的太快就会出问题
													//鼠标就会脱离登陆框这时候就出现问题了
				var disX = 0,disY = 0;
				disX = evt.clientX - topX;
				disY = evt.clientY - topY;
				if(disX <= 5){
					disX = 5;	
				}else if(disX >= maxWidth){
					disX = maxWidth;
				}
				if(disY <= 5){
					disY = 5;	
				}else if(disY >=maxHeight){
					disY = maxHeight;
					}
				box.style.left = disX + 'px';
				box.style.top = disY + 'px';
				}
		document.onmouseup = function(){				//这里也不能用top.onmouseup,
			document.onmousemove = null;	
			}
	}	






























