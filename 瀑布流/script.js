// JavaScript Document
var kk = 0;
window.onload = function(){
	var oMain = document.getElementById('main'),
	oBoxs = getClassName(oMain,'box'),
	oPics = getClassName(oMain,'pic');

	var winWidth = document.documentElement.clientWidth;
	var	boxWidth = oBoxs[0].offsetWidth;
	var	num = Math.floor(winWidth/boxWidth);
	oMain.style.cssText += 'width:' + boxWidth*num +'px;margin:0 auto';
	var picArry = [];
	var minH = 0;
	var index = 0;
	var dataIn = { "date":[{"src":"40.jpg"},{"src":"41.jpg"},{"src":"42.jpg"},{"src":"43.jpg"},{"src":"44.jpg"},{"src":"45.jpg"},{"src":"46.jpg"},
	{"src":"47.jpg"},{"src":"48.jpg"},{"src":"49.jpg"},{"src":"50.jpg"},{"src":"51.jpg"},{"src":"52.jpg"},{"src":"53.jpg"},{"src":"54.jpg"},{"src":"55.jpg"},{"src":"56.jpg"},{"src":"57.jpg"},{"src":"58.jpg"},{"src":"59.jpg"},{"src":"60.jpg"},{"src":"61.jpg"}]};
	
	for(var i=0; i<oBoxs.length; i++){
		boxHeight = oBoxs[i].offsetHeight;
		if (i<num){
			picArry[i]=boxHeight;
			}else{
				minH = Math.min.apply(null,picArry);
				for( var j in picArry){	
					if( picArry[j] == minH){
						index = j;	
						}
				   }
				 oBoxs[i].style.position = 'absolute';
				 oBoxs[i].style.top = picArry[index] + 'px';
				 oBoxs[i].style.left = boxWidth*index + 'px';
				 picArry[index] += oBoxs[i].offsetHeight;
				 
				}
				
		}

	window.onscroll = function(){
	var lastHeight = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var curHeight = (document.documentElement.clientHeight||document.body.clientHeight) + (document.documentElement.scrollTop||document.body.scrollTop);
	if ( lastHeight<curHeight){
		 for( var k=0; k<dataIn.date.length;k++){
			 			document.title =k;
		   var iBox = document.createElement('div');
		   var iPic = document.createElement('div');
		   var iImg = document.createElement('img');
			  iBox.className = "box";
		    oMain.appendChild(iBox);
			iPic.className = "pic";
			iBox.appendChild(iPic);
			iImg.src = 'images/' + dataIn.date[k].src;
			iPic.appendChild(iImg);
	
		 }
			 
		}
	oBoxs = getClassName(oMain,'box'),
	oPics = getClassName(oMain,'pic');
		for(var i=0; i<oBoxs.length; i++){

		boxHeight = oBoxs[i].offsetHeight;
		if (i<num){
			picArry[i]=boxHeight;
			}else{
				minH = Math.min.apply(null,picArry);
				for( var j in picArry){	
					if( picArry[j] == minH){
						index = j;	
						}
				   }
				 oBoxs[i].style.position = 'absolute';
				 oBoxs[i].style.top = picArry[index] + 'px';
				 oBoxs[i].style.left = boxWidth*index + 'px';
				 picArry[index] += oBoxs[i].offsetHeight;
				 
				}
				
		}

	}
}
function getClassName(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}