var timer = null;

window.onload = function () {
	var oTop = document.getElementById("top");
	var aLi = oTop.getElementsByTagName("li");
	var oBottom = document.getElementById("bottom");
	var aBtn = oBottom.getElementsByTagName("span");
	var oPoint = document.getElementById("point");
	var oldPos = [];

	for(var i = 0; i<aLi.length; i++) {
		oldPos.push(aLi[i].offsetLeft);
	}

	for(var i = 0; i<aLi.length; i++) {
		aLi[i].style.position = 'absolute';
		if(i < aLi.length/2){
		aLi[i].style.left = oldPos[i] + "px";
		} else {
			aLi[i].style.left = 1000 + "px";
		}
	}
	//点击左键
	aBtn[0].onclick = function () {
		clearTimeout(timer);
		 i = 0;
		prev();
		miaovStartMove(oPoint,{left:410},MIAOV_MOVE_TYPE.FLEX);

	}

	//点击右键
	aBtn[1].onclick = function () {
		clearTimeout(timer);
		 i = 11;
		next();
		miaovStartMove(oPoint,{left:520},MIAOV_MOVE_TYPE.FLEX);
	}

function move(obj,oTarget) {

}

function prev () {
	// console.log(1);
		if(i < aLi.length/2) {
			miaovStartMove(aLi[i],{left:-300},MIAOV_MOVE_TYPE.FLEX);
		} else {
			miaovStartMove(aLi[i],{left:oldPos[i-aLi.length/2]},MIAOV_MOVE_TYPE.FLEX);
		}
		timer = setTimeout(prev,100);
		i++;
		if(i == aLi.length) {
			clearTimeout(timer);
		}
	}

function next () {
	// console.log(2);
	// console.log(i);
	if (i >= aLi.length/2) {
		console.log(3);
		miaovStartMove(aLi[i],{left:1000},MIAOV_MOVE_TYPE.FLEX);
	} else {
		console.log(4);
		miaovStartMove(aLi[i],{left:oldPos[i]},MIAOV_MOVE_TYPE.FLEX);
	}
	timer = setTimeout(next,100);
	i--;
	if(i == -1) {
		clearTimeout(timer);
	}
}



//下面这些不是我写的是妙维的
function css(obj, attr, value)
{
	if(arguments.length==2)
		return parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
	else if(arguments.length==3)
		switch(attr)
		{
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value*100+")";
				obj.style.opacity=value;
				break;
			default:
				obj.style[attr]=value;
		}
	
	return function (attr_in, value_in){css(obj, attr_in, value_in)};
}

var MIAOV_MOVE_TYPE={
	BUFFER: 1,
	FLEX: 2
};

function miaovStartMove(obj, oTarget, iType, fnCallBack, fnDuring)
{
	var fnMove=null;
	if(obj.timer)
	{
		clearInterval(obj.timer);
	}
	
	switch(iType)
	{
		case MIAOV_MOVE_TYPE.BUFFER:
			fnMove=miaovDoMoveBuffer;
			break;
		case MIAOV_MOVE_TYPE.FLEX:
			fnMove=miaovDoMoveFlex;
			break;
	}
	
	obj.timer=setInterval(function (){
		fnMove(obj, oTarget, fnCallBack, fnDuring);
	}, 15);
}

function miaovDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		cur=css(obj, attr);
		if(oTarget[attr]!=cur)
		{
			bStop=false;
			
			speed=(oTarget[attr]-cur)/5;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			css(obj, attr, cur+speed);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		
		if(fnCallBack)fnCallBack.call(obj);
	}
}



function miaovDoMoveFlex(obj, oTarget, fnCallBack, fnDuring)
{
	var bStop=true;
	var attr='';
	var speed=0;
	var cur=0;
	
	for(attr in oTarget)
	{
		if(!obj.oSpeed)obj.oSpeed={};
		if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
		cur=css(obj, attr);
		if(Math.abs(oTarget[attr]-cur)>1 || Math.abs(obj.oSpeed[attr])>1)
		{
			bStop=false;
			
			obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
			 // console.log(1);
			obj.oSpeed[attr]*=0.7;
			var maxSpeed=65;
			if(Math.abs(obj.oSpeed[attr])>maxSpeed)
			{
				// console.log(2);
				obj.oSpeed[attr]=obj.oSpeed[attr]>0?maxSpeed:-maxSpeed;
			}
			
			css(obj, attr, cur+obj.oSpeed[attr]);
		}
	}
	
	if(fnDuring)fnDuring.call(obj);
	
	if(bStop)
	{
		clearInterval(obj.timer);
		obj.timer=null;
		if(fnCallBack)fnCallBack.call(obj);
	}
}
}

