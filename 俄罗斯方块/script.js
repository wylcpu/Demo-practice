//游戏的耦合性太高了，思路不是很清楚，没有从整体上进行把握
//现在假定每个小方格是30px，其中包括3px的边框
//过几天再完善
var canvas = document.getElementById("canvas");
var cnavas2 = document.getElementById("canvas2");
var context2 = canvas2.getContext("2d");
var context = canvas.getContext("2d");
canvas.width = 306;
canvas.height = 635;
canvas2.width = 130;
canvas2.height = 70;
context.beginPath();
context.rect(1,1,304,634);
context.lineWidth = 3;
context.strokeStyle = "green";
context.stroke();
context.translate(2,2);
var store = [];//储存每个放个的状态
var flag = 1;//是否产生一个新的图形
var shop = 1;//记录变形的数字
var timer = null;//定时器的控制
var score = 0;//分数的显示
var oldrand = 0;//记录当前显示移动的方块
var newrand = 0;//记录下一个要实现的方块
var smallarr = [[0,1,0,0,0,0,0],[0,0,2,0,0,0,0]];
var stop = 1;
//创建一个21*10的方格，默认状态是0，即什么都没有

//注意注意注意！！！！！！！！
// var arr = [];
// for(var j=0; j<10; j++) {
// 	arr.push(0);
// }
// // arr[2] = 1;
// console.log(arr);
// // console.log(arr);
// for (var i=0; i<21; i++) {//
// 	store.push(arr);//这里犯了一个致命的错误！！！！！！！！！
// }
// arr = null;
// store[1][2] = 1;

for(var i=0; i<21; i++) {
	var ar = [];
	for(var j=0; j<10; j++){
		ar.push(0);
	}
	store.push(ar);
}
ar = null;
//绘制方格的函数
//param posX 绘制开始的X坐标
//param posY 绘制开始的Y坐标
//param width 绘制的方格的宽度
//param height 绘制的方格的高度
//这个其实是可以加上颜色的参数的
function drawRect(posX,posY,width,height,cxt) {
	cxt.save();
	cxt.translate(posX,posY);
	cxt.beginPath();
	cxt.rect(2,2,width-2,height-2);
	cxt.closePath();
	cxt.lineWidth = 4;
	cxt.strokeStyle = "#000";
	cxt.fillStyle = "#f00";
	cxt.stroke();
	cxt.fill();
	cxt.restore();
}
//重新绘制整个画布
//param arr 这个数组存放着要显示的方块
//param cxt 绘图上下文
function draw(arr,cxt) {
	cxt.save();
cxt.clearRect(0,0,302,632);
cxt.fillStyle = "#EFEFEF";
cxt.fillRect(0,0,302,632);
cxt.restore();
for(var i=0; i<21; i++) {
	for(var j=0; j<10; j++) {
		if(arr[i][j] !== 0) {
			drawRect(getPosX(i,j),getPosY(i,j),30,30,cxt);
		}
	}
}
}
function smalldraw(cxt) {
	cxt.save();
	cxt.clearRect(0,0,130,70);
	cxt.fillStyle = "#efefef";
	cxt.fillRect(0,0,130,70);
	cxt.restore();
	for(var i=0; i<2; i++) {
		for(var j=0;j<7; j++) {
			if(smallarr[i][j] !== 0 && j>2) {
				cxt.save();
				cxt.translate(5,5);
			drawRect(getPosX(i,j-3),getPosY(i,j-3),30,30,cxt);
			cxt.restore();
			}
			smallarr[i][j] = 0;//绘制完进行清空；
		}
	}

}

//获取X坐标
function getPosX(i,j) {
	return 30*j;
}
//获取Y坐标
function getPosY(i,j) {
	return 30 * i;
}
function newGame() {
	score = 0;
	for(var i=0; i<21; i++) {
		for(var j=0; j<10; j++) {
			store[i][j] =0;
		}
	}
	draw(store,context);
timer = setInterval(function(){
	if(flag) {
		oldrand = newrand;
		newrand = ~~(Math.random()*7);//产生0-6的随机数
		randRect(smallarr,newrand);
		smalldraw(context2);
		randRect(store,oldrand);
		
		shop =1;//每次产生新的方块时，进行初始化
		flag = false;

	}
	moveDown(store);

},500);
}
//本函数是产生随机形状的方块
//产生7种不同的形状
function randRect(arr,randNum) {
	
	
	switch(randNum) {
		case 0:
		arr[0][3] = 2;
		arr[0][4] = 2;
		arr[0][5] = 2;
		arr[1][3] = 2;
		break;
		case 1:
		arr[0][3] = 2;
		arr[0][4] = 2;
		arr[0][5] = 2;
		arr[1][5] = 2;
		break;
		case 2:
		arr[0][3] = 2;
		arr[0][4] = 2;
		arr[0][5] = 2;
		arr[1][4] = 2;
		break;
		case 3:
		arr[0][3] = 2;
		arr[0][4] = 2;
		arr[0][5] = 2;
		arr[0][6] = 2;
		break;
		case 4:
		arr[0][4] = 2;
		arr[0][5] = 2;
		arr[1][3] = 2;
		arr[1][4] = 2;
		break;
		case 5:
		arr[0][3] = 2;
		arr[0][4] = 2;
		arr[1][3] = 2;
		arr[1][4] = 2;
		break;
		case 6:
		arr[0][3] = 2;
		arr[0][4] = 2;
		arr[1][4] = 2;
		arr[1][5] = 2;
		break;

	}
}

//这个函数是检查是否还要向下移动
//并且还要检查是否合并
function checkDown(arr) {
	for(var i=20; i>=0; i--) {
		for(var j=0; j<10; j++) {
			if(arr[i][j] === 2) {//这里是否还要检查是否到底了？？？
			if(i<20) {
				if(arr[i+1][j] === 1) {
					if(arr[2][j] === 1){
						clearInterval(timer);
						if(confirm("Are you again new game?")) {
							newGame();
						}
					}
					bacomeOne(arr);//如果碰见了下面是固定的小
									//方块就把本活动方块变成固定方块
					heBing(arr);//检查是否进行合并
					flag = true;//产生新的方块
					return false;
				}	
			} else {//这里只是判断顶部的
			 	if(arr[i][j] === 2) {//这个是检查如果是没有阻挡，到了底部
			 		bacomeOne(arr);//这些和下面的同上面的
			 		heBing(arr);
			 		flag = true;
			 		return false;
			 	}
			}
				
			}
		}
	}
	return true;
}
//检查是否有可以进行合并的
function heBing(arr) {
	for(var i=20; i>=0; i--) {
	var sum = arr[i].reduce(function(prev,cur){
		return prev + cur;
	});
	if(sum === 10) {
		score =score + 10;
		document.getElementById("#grade").innerHTML = "<span>" + score
		 + "</span>";//进行分数显示
		for(var k = i-1; k>=0; k--) {
			for(var j=0; j<10; j++) {
				arr[k+1][j] = arr[k][j];
			}
		}
		heBing(arr);//递归是检查是否是多行得分
	}
	}		
}
//本函数是进行向下移动
function moveDown(arr) {
	if(checkDown(arr)) {//成立说明可以往下移动，就使活动方块下移
		for(var i=20; i>=0; i--) {//这里i是从19开始的，从20也是可以的
			for(var j=0; j<10; j++) {
				if(arr[i][j] === 2) {
					arr[i][j] = 0;
					arr[i+1][j] = 2;
				}	
			} 
		}
	}
	draw(arr,context);//下移玩，要立即重绘显示出来
}

//当活动方块不能再移动了，就要把他变为固定方块，即把2变为1
function bacomeOne(arr) {
	for(var i=0; i<21; i++) {
		for(var j=0; j<10; j++) {
			if(arr[i][j] === 2) {
				arr[i][j] = 1;
			}
		}
	}
 }
 //这个函数是需要优化的，觉得不可能这么多
 //是对每个形状进行变形的
 function shape(num,arr) {
 	switch(num) {
 		case 0:
 		if(shop === 1) {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						arr[i][j] = 0;
 						arr[i-1][j] = 0;
 						arr[i-1][j+2] = 0;
 						arr[i][j+1] = 2;
 						arr[i][j+2] = 2;
 						arr[i-2][j+1] = 2;
 						shop++;
 						return true;
 					} 
 				}
 			}
 		} else if(shop === 2)  {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						if(j === 0) {
 							return false;
 						}
 						arr[i-1][j] = 0;
 						arr[i-2][j] = 0;
 						arr[i][j-1] = 2;
 						arr[i-1][j+1] = 2;
 						shop++;
 						return true;
  					}
 				}
 			}
 		} else if(shop === 3) {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						
 						arr[i][j] = 0;
 						arr[i][j+2] = 0;
 						arr[i-1][j+2] = 0;
 						arr[i-1][j] = 2;
 						arr[i+1][j+1] = 2;
 						arr[i-1][j+1] = 2;
 						shop++;
 						return true;
 					}
 				}
 			}
 		} else {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						if(j === 9) {
 							return false;
 						}
 						arr[i][j] = 0;
 						arr[i-2][j] = 0;
 						arr[i-2][j-1] = 0;
 						arr[i-1][j-1] = 2;
 						arr[i][j-1] = 2;
 						arr[i-1][j+1] = 2;
 						shop++;
 						return true;
 					}
 				}
 			}
 		}
 		break;
 		case 1:
 		if(shop === 1) {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						arr[i][j] = 0;
 						arr[i-1][j] = 0;
 						arr[i-1][j-2] = 0;
 						arr[i][j-1] = 2;
 						arr[i-2][j-1] = 2;
 						arr[i-2][j] = 2;
 						shop++;
 						return true;
 					}
 				}
 			}
 		} else if( shop === 2) {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						if(j === 0) {
 							return false;
 						}
 						arr[i][j] = 0;
 						arr[i-2][j] = 0;
 						arr[i-2][j+1] = 0;
 						arr[i-1][j-1] = 2;
 						arr[i-1][j+1] = 2;
 						arr[i-2][j-1] = 2;
 						shop++;
 						return true;

 					}
 				}
 			}
 		} else if(shop === 3) {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
 					if(arr[i][j] === 2) {
 						arr[i][j] = 0;
 						arr[i-1][j] = 0;
 						arr[i][j+2] = 0;
 						arr[i+1][j] = 2;
 						arr[i+1][j+1] = 2;
 						arr[i-1][j+1]  = 2;
 						shop++;
 						return true;
 					}
 				}
 			}
 		} else {
 			for(var i=20; i>=0; i--) {
 				for(var j=0; j<10; j++) {
					if(arr[i][j] === 2) {
						if(j === 8) {
 							return false;
 						}
					arr[i][j] = 0;
		 			arr[i][j+1] = 0;
		 			arr[i-2][j+1] = 0;
		 			arr[i-1][j] = 2;
		 			arr[i][j+2] = 2;
		 			arr[i-1][j+2] = 2;
		 			shop++;
						return true;
					}
 				}
 			}
 			
 		}
 	break;
 	case 2:
 	if(shop === 1) {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					arr[i-1][j-1] = 0;
 					arr[i-2][j] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	} else if(shop === 2) {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					if(j === 0) {
 						return false;
 					}
 					arr[i][j] = 0;
 					arr[i-1][j-1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	} else if (shop === 3) {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					arr[i][j+2] = 0;
 					arr[i+1][j+1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	} else {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					if(j === 9) {
 						return false;
 					}
 					arr[i-2][j] = 0;
 					arr[i-1][j+1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	}
 	break;
 	case 3:
 	if(shop === 1 || shop === 3) {
 		for(var i=20; i>=2; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					arr[i][j] = 0;
 					arr[i][j+2] = 0;
 					arr[i][j+3] = 0;
 					arr[i+1][j+1] = 2;
 					arr[i-1][j+1] = 2;
 					arr[i-2][j+1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	} else {
 		for(var i=20; i>=2; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					if(j === 0 || j > 7) {
 						return false;
 					}
		 		arr[i][j] = 0;
		 		arr[i-2][j] = 0;
		 		arr[i-3][j] = 0;
		 		arr[i-1][j-1] = 2;
		 		arr[i-1][j+1] = 2;
		 		arr[i-1][j+2] = 2;
		 		shop++;
	 			return true;
 				}
 			}
		}
 	}
 	break;
 	case 4:
 	if(shop === 1 || shop === 3) {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					arr[i][j] = 0;
 					arr[i-1][j+2] = 0;
 					arr[i-1][j] = 2;
 					arr[i-2][j] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	} else {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					if(j === 9) {
 						return false;
 					}
 					arr[i][j] = 0;
 					arr[i-2][j-1] = 0;
 					arr[i-2][j] = 2;
 					arr[i-2][j+1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	}
 	break;
 	case 5:
 	break;
 	case 6:
 	if(shop === 1 || shop === 3) {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					if(j === 0) {
 						return false;
 					}
 					arr[i][j+1] = 0;
 					arr[i-1][j-1] = 0;
 					arr[i-1][j+1] = 2;
 					arr[i-2][j+1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	} else {
 		for(var i=20; i>=0; i--) {
 			for(var j=0; j<10; j++) {
 				if(arr[i][j] === 2) {
 					if( j === 0) {
 						return false;
 					}
 					arr[i][j] = 0;
 					arr[i-2][j+1] = 0;
 					arr[i-2][j] = 2;
 					arr[i-2][j-1] = 2;
 					shop++;
 					return true;
 				}
 			}
 		}
 	}
 	break;
 	}
 } 
newGame();//第一次开始时需要的
document.onkeydown = function (evt) {
	if(evt.keyCode === 38) {
		if(shop === 4) {
			shop = 0;
		}
		
		shape(oldrand,store);	
		
	} else if(evt.keyCode === 37) {
		moveLeft(store);
	} else if (evt.keyCode === 39) {
		moveRight(store);
	} else if(evt.keyCode === 40) {
		setTimeout(function() {//为了使运动不太快，也是为了平滑
		moveDown(store);	
		},30);

	} else if(evt.keyCode === 32) {
		if(stop) {
			clearInterval(timer);
			stop = 0;
		} else {
			stop = 1;
			timer = setInterval(function(){
				if(flag) {
					oldrand = newrand;
					newrand = ~~(Math.random()*7);//产生0-6的随机数
					randRect(smallarr,newrand);
					smalldraw(context2);
					randRect(store,oldrand);
					
					shop =1;//每次产生新的方块时，进行初始化
					flag = false;

				}
				moveDown(store);

			},500);
		}
	}
	draw(store,context);
}
function moveLeft(arr) {
	for(var i=0; i<10; i++) {
		for(var j=0; j<21; j++) {
			if(arr[j][i] === 2) {
				if(i === 0 || arr[j][i-1] === 1) {
					return false;
				} else {
					arr[j][i] = 0;
					arr[j][i-1] = 2;
				}
			}
		}
	}
}
function moveRight(arr) {
	for(var i=9; i>=0; i--) {
		for(var j=0; j<21; j++) {
			if(arr[j][i] === 2) {
				if(i === 9 || arr[j][i+1] === 1) {
					return false;
				} else {
					arr[j][i] = 0;
					arr[j][i+1] = 2;
				}
			}
		}
	}

}
