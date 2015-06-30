var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
//获取屏幕的宽度
var sWidth = window.screen.availWidth;
var cWidth = sWidth;
var sideWidth = 0.04 * sWidth;
var cellWidth = 0.2 *sWidth;
var game = [];
var fontSize = sWidth/10;
if(sWidth > 500) {
	cWidth = 500;
	cellWidth = 100;
	sideWidth = 20;
	fontSize = 48;
}
canvas.width = cWidth;
canvas.height = cWidth;
function getX(i,j) {
	return (sideWidth + cellWidth) * j + sideWidth;
}
function getY(i,j) {
	return (sideWidth + cellWidth) * i + sideWidth;
}
$("#box").width(cWidth).css('margin','0 auto');


//开始一个新的游戏
function newGame() {
	for(var i=0; i<4; i++) {
	game.push([{x:0,y:0,num:0,state:-1},{x:0,y:0,num:0,state:-1},{x:0,y:0,num:0,state:-1},{x:0,y:0,num:0,state:-1}]);
	}
	clearBg(context);
	randNum();
	randNum();
	move();
}
newGame();
function move() {
	$(document).keydown(function(evt) {
		evt.preventDefault();
		if(hasFill()) {
			if(!fillHorizontal() && !fillVertical()) {
				gameOver();
				return ;
			}
		}
		switch(evt.keyCode) {
			//向左
			case 37:
			if(canLeft()) {
				moveLeft();
			}
			break;
			//向上
			case 38:
			if(canUp()) {
				moveUp();	
			}
			break;
			//向右
			case 39:
			if(canRight()) {
				moveRight();	
			}
			break;
			//向下
			case 40: 
			if(canDown()) {
				moveDown();	
			}
			break;
		}	
	})
}
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
function animate(cxt,obj,newi,newj) {
var ioldX = obj.x;
var ioldY = obj.y;	
var inewX = getX(newi,newj);
var inewY = getY(newi,newj);
var istate = obj.state;
var ispeed = 2;
var inow = 0;
var inum = obj.num;
var itimer = setInterval(function() {
	if((ioldX < inewX + 1 && ioldX > inewX -1) && (ioldY < inewY + 1 && ioldY > inewY - 1)) {
		clearInterval(itimer);
		if(istate == 1) {
			obj.state = 0;
		} else if(istate == 2) {
			obj.state =0;
			bigAnimate(context,obj.x,obj.y,obj.num,bgColor(obj.num),textColor(obj.num),cellWidth,cellWidth,fontSize)

		}
	}
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
	game[newi][newj].x = ioldX;
	game[newi][newj].y = ioldY;
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
		
	},30);
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
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			animate(context,game[i][j],i,j)
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
			animate(context,game[i][j],i,j)
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
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			animate(context,game[i][j],i,j);
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

function Stone(i,j,m,n,x,y,k,z) {
if(game[m][n].num) {
	if(game[m][n].num == game[i][j].num) {
		game[m][n].num *=2;
		game[m][n].state = 2;
		game[m][n].x = getX(i,j);
		game[m][n].y = getY(i,j); 
		game[i][j].num = 0;
		game[i][j].state = -1;
	} else {
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
return false;
}
function noStone(i,j,m,n,k,z) {
	game[m][n].num = game[i][j].num;
	game[m][n].x = getX(i,j);
	game[m][n].y = getY(i,j);
	game[m][n].state = 1;
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
//动画
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
	},20);
}
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
	},40);
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