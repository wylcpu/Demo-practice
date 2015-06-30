var canvas = document.getElementById('canvas');
var fs = document.querySelector('.fs');
//取得绘制上下文
var context = canvas.getContext('2d');
//获取设备的宽度
var sWidth = window.screen.availWidth;
var cWidth = sWidth;
var sideWidth = 0.04 * sWidth;
var cellWidth = 0.2 *sWidth;
var game = [];
var score = 0;
var fontSize = sWidth/10;
//当设备的宽度大于500时，就不在增大
if(sWidth > 500) {
	cWidth = 500;
	cellWidth = 100;
	sideWidth = 20;
	fontSize = 48;
}
//设置画布的长宽高
canvas.width = cWidth;
canvas.height = cWidth;
//取得对应小方格的坐标x值
function getX(i,j) {
	return (sideWidth + cellWidth) * j + sideWidth;
}
//取得对应小方格坐标Y值
function getY(i,j) {
	return (sideWidth + cellWidth) * i + sideWidth;
}
//让其居中显示
$("#box").width(cWidth).css('margin','0 auto');


//开始一个新的游戏
function newGame() {
	for(var i=0; i<4; i++) {
		game[i] = new Array(4);
		for(var j=0; j<4; j++) {
			game[i][j] = {x:0,y:0,num:0,state:-1};
		}
	// game.push([{x:0,y:0,num:0,state:-1},{x:0,y:0,num:0,state:-1},{x:0,y:0,num:0,state:-1},{x:0,y:0,num:0,state:-1}]);
	}
	//绘制最初的背景
	clearBg(context);
	randNum();
	randNum();
	move();
}
newGame();
//用户交互，键盘控制

function move() {
	$(document).keydown(function(evt) {
		//阻止默认事件，上下键控制滚动条
		evt.preventDefault();
		//判断格子中是否都已经有数据
		if(hasFill()) {
			//进一步判断数字是否能合并
			if(!fillHorizontal() && !fillVertical()) {
				//数字已经填满，且不能合并
				gameOver();
				return ;
			}
		}
		switch(evt.keyCode) {
			//向左
			case 37:
			//判断向左还能移动吗，如果没有能合并的项，再按向左是不能产生反应的
			if(canLeft()) {
				moveLeft();
			}
			break;
			//向上
			case 38:
			//同上
			if(canUp()) {
				moveUp();	
			}
			break;
			//向右
			case 39:
			//同上
			if(canRight()) {
				moveRight();	
			}
			break;
			//向下
			case 40: 
			//同上
			if(canDown()) {
				moveDown();	
			}
			break;
		}	
	})
}
//手机滑动效果
var startx = 0,
	starty = 0,
	endx = 0,
	endy = 0;
document.addEventListener('touchstart',function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener('touchend',function(event) {
	endx = event.changedTouches[0].pageX;
  	endy = event.changedTouches[0].pageY;
  	var delx = endx - startx;
  	var dely = endy - starty;
  	if(hasFill()) {
			if(!fillHorizontal() && !fillVertical()) {
				gameOver();
				return ;
			}
		}
  	//向上
  	if(dely < 0 && Math.abs(delx) < Math.abs(dely) ) {
  		moveUp();

  	} else if (dely > 0 && Math.abs(delx) < Math.abs(dely)){//向下
  		moveDown();
  	} else if (delx < 0) {//向左
  		moveLeft();
  	} else {//向右
  		moveRight();
  	}

});
//cxt 上下文环境
//obj 小格子的属性值
//newi,newj最新坐标轴
function animate(cxt,obj,newi,newj) {
var ioldX = obj.x;
var ioldY = obj.y;	
var inewX = getX(newi,newj);
var inewY = getY(newi,newj);
var istate = obj.state;
var ispeed = 2;
var inow = 0;
var inum = obj.num;
//绘制
var itimer = setInterval(function() {
	//判断正在移动的数字方格是否移动到指定的位置了
	if((ioldX < inewX + 2 && ioldX > inewX -2) && (ioldY < inewY + 2 && ioldY > inewY - 2)) {
		clearInterval(itimer);
		//这个方格的由移动的变成不可以移动的
		if(istate == 1) {
			obj.state = 0;
		} else if(istate == 2) {//由能合并的变成不能合并的
			obj.state =0;
			//移动到指定的位置进行动画特效
			bigAnimate(context,obj.x,obj.y,obj.num,bgColor(obj.num),textColor(obj.num),cellWidth,cellWidth,fontSize);
		}
	}
		//判断这两值是否相等，这个就是产生由快到慢的动画
	if(ioldX != inewX) {
		inow = (inewX-ioldX)/ispeed;
		inow = inow > 0 ? Math.ceil(inow) : Math.floor(inow);
		ioldX += inow;
	}
	if(ioldY != inewY) {
		inow = (inewY-ioldY)/ispeed;
		inow = inow > 0 ? Math.ceil(inow) : Math.floor(inow);
		ioldY += inow;
	}
	//更新方格的x，y值
	game[newi][newj].x = ioldX;
	game[newi][newj].y = ioldY;
	//进行一次
	clearBg(cxt);
	for(var i = 0; i<4;i++) {
		for(var j= 0; j<4; j++) {
			if(game[i][j].num) {
				if(game[i][j].state == 0) {
					drawText(cxt,getX(i,j),getY(i,j),game[i][j].num,bgColor(game[i][j].num),textColor(game[i][j].num),fontSize);
				} else if(game[i][j].state == 1) {
					drawText(cxt,game[i][j].x,game[i][j].y,game[i][j].num,bgColor(game[i][j].num),textColor(game[i][j].num),fontSize);
				} else if(game[i][j].state == 2) {
					drawText(cxt,game[i][j].x,game[i][j].y,game[i][j].num/2,bgColor(game[i][j].num/2),textColor(game[i][j].num/2),fontSize);
				}
			}
		}
	}
		
	},40);
}

function moveLeft() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(game[j][i].num){
			toLeft(j,i);			
			}
		}
 	}
 	for(var i=0; i<4; i++) {
 		for(var j=0; j<4; j++) {
 			if(game[i][j].num) {
 				animate(context,game[i][j],i,j);	
 			}
 		}
 	}
 	setTimeout(function() {
		randNum();
	},400);

}
//这个函数是关键
function toLeft(i,j) {
	for(var k=j-1; k>=0; k--) {
		if(Stone(i,j,i,k,i,k+1,k+1,j)) {
			return;
		}
	}
	noStone(i,j,i,k+1,k+1,j);
}


function moveRight() {
	for(var i=3; i>=0; i--) {
		for(var j=0; j<4; j++) {
			if(game[j][i].num) {
				toRight(j,i);
			}
		}
	}
	for(var i=3; i>=0; i--) {
		for(var j=0; j<4; j++) {
			if(game[j][i].num){
				animate(context,game[j][i],j,i);
			}
		}
	}
	setTimeout(function() {
		randNum();
	},400);

}
function toRight(i,j) {
	for(var k=j+1; k<4; k++) {
		if(Stone(i,j,i,k,i,k-1,k-1,j)) {
			return;
		}
	}
	noStone(i,j,i,k-1,k-1,j);
}
function moveUp() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(game[i][j].num){
				toUp(i,j);
			}
		}
	}
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
				if(game[i][j].num){
					animate(context,game[i][j],i,j)
				}
		}
	}
	setTimeout(function() {
		randNum();
	},400);
}
function toUp(i,j) {
	for(var k = i-1; k>=0; k-- ) {
		if(Stone(i,j,k,j,k+1,j,k+1,i)) {
			return;
		}
	}
	noStone(i,j,k+1,j,k+1,i);
}

function moveDown() {
	for(var i=3; i>=0; i--) {
		for(var j=0; j<4; j++) {
			if(game[i][j].num){
				toDown(i,j);
			}
		}
	}
	for(var i=3; i>=0; i--) {
		for(var j=0; j<4; j++) {
				if(game[i][j].num){
					animate(context,game[i][j],i,j);
				}
		}
	}
	setTimeout(function() {
		randNum();
	},400);
}
function toDown(i,j) {
	for(var k = i+1; k<4; k++ ) {
		if(Stone(i,j,k,j,k-1,j,k-1,i)) {
			return;
		}
	}
	noStone(i,j,k-1,j,k-1,i);
}
//判断一个格子向前移动时可能出现的情况
function Stone(i,j,m,n,x,y,k,z) {
	//判断前方是否有格子
if(game[m][n].num) {
	//判断前方格子值是相等的情况
	if(game[m][n].num == game[i][j].num && game[m][n].state != 2) {
		game[m][n].num *=2;
		score += game[m][n].num;
		fs.innerHTML = score;
		game[m][n].state = 2;
		game[m][n].x = getX(i,j);
		game[m][n].y = getY(i,j); 
		game[i][j].num = 0;
		game[i][j].state = -1;
	} else {
		//前面有格子，这个格子不是挨在一起时
		if(k != z) {
			game[x][y].num = game[i][j].num;
			game[x][y].x = getX(i,j);
			game[x][y].y = getY(i,j);
			game[x][y].state = 1;
			game[i][j].num = 0;
			game[i][j].state = -1;
		} 
	}
	return true;
}
//前方没有障碍格子
return false;
}
function noStone(i,j,m,n,k,z) {
	game[m][n].num = game[i][j].num;
	game[m][n].x = getX(i,j);
	game[m][n].y = getY(i,j);
	game[m][n].state = 1;
	//判断这个格子是否已经在边上不能移动了
	if(k != z) {
		game[i][j].num = 0;
		game[i][j].state = -1;
	}
}

//绘制没有边框的矩形
function drawRect(cxt,posX,posY,width,height,bgcolor) {
	cxt.save();
	cxt.translate(posX,posY);
	cxt.fillStyle = bgcolor || 'gray';
	cxt.fillRect(0,0,width,height);
	cxt.restore();
}
// @describution，绘制没有边框的圆角矩形,也可以画圆形
// @param cxt,绘制的上下文环境
// @param posX，poxY绘制开始的坐标
// @param width，height，绘制的宽度和高度
// @param radius，绘制圆角的半径
// @param bgcolor，绘制的背景颜色，默认是灰色（gray）
function drawArc(cxt,posX,posY,width,height,radius,bgcolor) {
	//禁止圆角的半径大于较小的边
	if ( Math.min(width,height ) < radius) {
		return null;
	}
	cxt.save();
	cxt.translate(posX,posY);
	cxt.beginPath();
	cxt.moveTo(width-radius,0);
	cxt.arc(width-radius,radius,radius,-Math.PI/2,0,false);
	cxt.lineTo(width,height-radius);
	cxt.arc(width-radius,height-radius,radius,0,Math.PI/2,false);
	cxt.lineTo(radius,height);
	cxt.arc(radius,height-radius,radius,Math.PI/2,Math.PI,false);
	cxt.lineTo(0,radius);
	cxt.arc(radius,radius,radius,Math.PI,3*Math.PI/2,false);
	cxt.lineTo(width-radius,0);
	cxt.closePath();
	cxt.fillStyle = bgcolor || 'gray';
	cxt.fill();
	cxt.restore();
}
//绘制背景
function clearBg(cxt) {
	cxt.clearRect(0,0,cWidth,cWidth);
	drawArc(cxt,0,0,cWidth,cWidth,10,'#BBADA0');
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			drawArc(cxt,getX(i,j),getY(i,j),cellWidth,cellWidth,10,'#CDC1B4');
			}
		}	
}
//这个是绘制有数字的背景
function drawBg(cxt) {
	cxt.clearRect(0,0,cWidth,cWidth);
	drawArc(cxt,0,0,cWidth,cWidth,10,'#BBADA0');
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(!game[i][j].num){
			drawArc(cxt,getX(i,j),getY(i,j),cellWidth,cellWidth,10,'#CDC1B4');	
			} else {
			drawText(cxt,getX(i,j),getY(i,j),game[i][j].num,bgColor(game[i][j].num),textColor(game[i][j].num),fontSize);
			}
		}	
	}
}

//绘制文本
function drawText(cxt,posX,posY,num,bgColor,textColor,fs) {
	drawArc(cxt,posX,posY,cellWidth,cellWidth,10,bgColor);
	cxt.save();
	cxt.translate(posX,posY);
	cxt.font = 'bold '+ fs + 'px Arial';
	cxt.textAlign = 'center';
	cxt.textBaseline = 'middle'
	cxt.fillStyle = textColor;
	cxt.fillText(num,cellWidth/2,cellWidth/2);
	cxt.restore();
}
//返回对应数字小方格的背景
function bgColor(num) {
	switch(num) {
		case 2: return '#EEE4DA';
		case 4: return '#EDE0C8';
		case 8: return '#F2B179';
		case 16: return '#F59563';
		case 32: return '#F67C5F';
		case 64: return '#F65E3B';
		case 128: return '#EDCF72';
		case 256: return '#EDCC61';
		case 512: return '#EDC850';
		case 1024: return '#EDC53F';
		case 2048: return '#EDC22D';
	}
}
//返回对应数字的颜色
function textColor(num) {
	return num <=4 ? '#776E65' : '#fff';
}
//产生一个随机小方块
function randNum() {
	var x = ~~(Math.random()*4);
	var y = ~~(Math.random()*4);
	var num,count = 0;
	while(game[x][y].num) {
		y = ~~(Math.random()*4);
		x = ~~(Math.random()*4);
		if(count > 100) {
			for(var i=0; i<4; i++) {
				for(var j=0; j<4; j++) {
					if(game[x][y].num === 0) {
						num = Math.random() < 0.7 ? 2 : 4;
						game[x][y].num = num;
						game[x][y].state = 0;
						textAnimate(context,getX(x,y),getY(x,y),num,bgColor(num),textColor(num),0,0,0);
						return;
					}
				}
			}
		}
		count++;
	}
	num = Math.random() < 0.7 ? 2 : 4;
	game[x][y].num = num;//设置数字
	game[x][y].state = 0;
	textAnimate(context,getX(x,y),getY(x,y),num,bgColor(num),textColor(num),0,0,0);

}
//产生随意数字时用到的动画
function textAnimate(cxt,posX,posY,num,bgColor,textColor,width,height,fs) {
	posX += cellWidth/2;
	posY += cellWidth/2; 
var timer = setInterval(function() {
		cxt.clearRect(posX,posY,width,height);

		drawArc(cxt,posX,posY,width,height,0,'#BBADA0');
		width +=cellWidth/5;
		height += cellWidth/5;
		if(sWidth > 500) {
			fs = fs < 47 ? fs + 9.6 : 48;
		} else {
			fs = fs < fontSize-1 ? fs + fontSize/5 : fontSize;
		}
		
		if(width >=cellWidth) {
			clearInterval(timer);
		}
		posX -= cellWidth/10;
		posY -= cellWidth/10;
		drawArc(cxt,posX,posY,width,height,10,bgColor);
		cxt.save();
		cxt.translate(posX,posY);
		cxt.font = 'bold ' + fs + 'px Arial';
		cxt.textAlign = 'center';
		cxt.textBaseline = 'middle'
		cxt.fillStyle = textColor;
		cxt.fillText(num,width/2,height/2);
		cxt.restore();
	},30);
}
//合并数字时产生的动画
function bigAnimate(cxt,posX,posY,num,bgColor,textColor,width,height,fontSize) {
	var count = 4;
	var timer = setInterval(function() {
		cxt.clearRect(posX,posY,width,height);
		drawRect(cxt,posX-sideWidth/20,posY-sideWidth/20,width+sideWidth/10,height+sideWidth/10,'#BBADA0');
		// drawArc(cxt,posX,posY,width,height,0,'#BBADA0');
		if(count >2) {
			posX -= sideWidth/4;
			posY -= sideWidth/4;
			width +=sideWidth/2;
			height += sideWidth/2;
			fontSize += sideWidth/4;
		} else if(count > 0) {
			posX += sideWidth/4;
			posY += sideWidth/4;
			width -=sideWidth/2;
			height -= sideWidth/2;
			fontSize -= sideWidth/4;
		} else {
			clearInterval(timer);
		}
		drawArc(cxt,posX,posY,width,height,10,bgColor);
		cxt.save();
		cxt.translate(posX,posY);
		cxt.font = 'bold '+fontSize+'px Arial';
		cxt.textAlign = 'center';
		cxt.textBaseline = 'middle'
		cxt.fillStyle = textColor;
		cxt.fillText(num,width/2,height/2);
		cxt.restore();
		count--;
	},35);
}
//用于判断是否棋盘已经满了
function hasFill() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(!game[i][j].num) {
				return false;
			}
		}
	}
	return true;
}
//判断是否水平还有能合并的吗
function fillHorizontal() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<3; j++) {
				if(game[i][j].num == game[i][j+1].num) {
				return true;
				}	
		}
	}
	return false;
}
//判断垂直方向是否还有能合并的吗
function fillVertical() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<3; j++) {
				if(game[j][i].num == game[j+1][i].num) {
				return true;
				}	
			
		}
	}
	return false;
}
function gameOver() {
	alert("gameover!");
}
//判断是否还能向下移动
function canDown() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<3; j++) {
			if(game[j][i].num && (!game[j+1][i].num || game[j][i].num == game[j+1][i].num)) {
				return true;
			}
		}
	}
	return false;
}
//判断是否还能向上移动
function canUp() {
	for(var i=0; i<4; i++) {
		for(var j=3; j>0; j--) {
			if(game[j][i].num && (!game[j-1][i].num || game[j][i].num == game[j-1][i].num)) {
				return true;
			}
		}
	}
	return false;
}
//判断是否还能向左移动吗
function canLeft() {
	for(var i=0; i<4; i++) {
		for(var j=3; j>0; j--) {
			if(game[i][j].num && (!game[i][j-1].num || game[i][j].num == game[i][j-1].num)) {
				return true;
			}
		}
	}
	return false;
}
//判断是否不能向右移动
function canRight () {
	for (var i=0; i<4; i++) {
		for(var j=0; j<3; j++) {
			if(game[i][j].num && (!game[i][j+1].num || game[i][j].num == game[i][j+1].num)) {
				return true;
			}
		}
	}
	return false;
}