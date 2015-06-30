var game = []
		var catX,
			catY;
		var timer;
		var timer2;
		
		var canvas = document.querySelector('#canvas');
		var context = canvas.getContext('2d');
		function init() {
			for(var i=0; i<9; i++) {
				game[i] = new Array();
				for(var j=0; j<9; j++) {
						if(Math.random() > 0.15) {

							game[i][j] = 0;
						} else {
							game[i][j] = 1;
						}
				}
			}
			catX = 4;
			catY = 4;
			game[catX][catY] = 2;
			context.clearRect(0,0,528,506);
			// for(var i=0; i<15; i++) {
			// 	var zx = ~~(Math.random()*9);
			// 	var zy = ~~(Math.random()*9);
			// 	if(game[zx][zy] != 2){ 
			// 		game[zx][zy] = 1;
			// 	}
			// }
			cat();
		}
		init();
		function getX(i,j) {
			if(i%2) {
				return 51 * j + 46;
			} else {
				return 51 * j + 23;	
			}
			
		}
		function getY(i,j) {
			return 46 * i + 69;
		}
		//重新绘制所有的
		function drawBg() {
			context.clearRect(0,0,528,506);
			drawArc(context,0,0,528,506,0,"#676567");
			for(var i=0; i<9; i++) {
				for(var j=0; j<9; j++) {
					if(game[i][j] == 0 || game[i][j] == 2) {
						drawArc(context,getX(i,j),getY(i,j),46,46,23,"#b5b5b5");
					} else if(game[i][j] == 1) {
						drawArc(context,getX(i,j),getY(i,j),46,46,23,"#ff845e");
					}
				}
			}
		}
		//监听鼠标点击
		var x,y;
		canvas.addEventListener('click',function(evt) {
			x = Math.floor((evt.offsetY -69)/46);
			if(x%2) {
				y = Math.floor((evt.offsetX -46)/51);
			} else {
				y = Math.floor((evt.offsetX -23)/51);
			}
			var a = Math.sqrt(Math.pow(evt.offsetX - (getX(x,y)+23),2)+ Math.pow(evt.offsetY - (getY(x,y)+23),2));
			if(a <= 23 && game[x][y] == 0) {
				game[x][y] = 1;
				//根据点击位置确定cat下一步去哪里
				var cc = catMove();
				Move(cc);
				// console.log(cc);
			}
			
		},false);
		function Move(num) {
			game[catX][catY] = 0;
			// console.log(num);
			switch(num) {
				case 1:
				catY--;
				break;
				case 2:
				if(!(catX%2)){
					catY--;
				}
				catX--;
				break;
				case 3:
				if(catX%2) {
					catY++;
				}
				catX--;
				break;
				case 4:
				catY++;
				break;
				case 5:
				if(catX%2) {
					catY++;
				}
				catX++;
				break;
				case 6:
				if(!(catX%2)){
					catY--;
				}
				catX++;
				break;
				case 7:
			}
			game[catX][catY] = 2;

		}
		var gg = [];
		function catMove() {
			var m = catX,
				n = catY;
			if(m == 0 || n == 0 || m == 8 || n == 8) {
				fail.style.display = 'block';
				return;
			}
			//left
			var flag = true;
			gg[0] = 0;
			for(var j=catY; j>=0; j--) {
				if(game[catX][j] == 1) {
					flag = false;
					gg[0] = catY - j;
					break;
				}
			}
			if(flag) {
				cat();
				return 1;
			}
			//left up
			gg[1] = 0;
				while(1) {
				if(game[m][n] == 1) {
					gg[1] = catX - m;
					break;
				}
				if(!(m%2)) {
					n--;
				}
				m--;
				if(m < 0 || n < 0) {
					cat();
					return 2;
				}
			}

			//right up
			m = catX;
			n = catY;
			// flag = true;
			gg[2] = 0;
			while(1) {
				if(game[m][n] == 1) {
					gg[2] = catX - m;
					break;
				}
				if(m%2) {
					n++;
				}
				m--;
				if(n>8 || m<0) {
					cat();
					return 3;
				}
				
			}

			//right
			flag = true;
			gg[3] = 0;
			for(var j=catY; j<9; j++) {
				if(game[catX][j] == 1) {
					flag = false;
					gg[3] = j - catY;
					break;
				}
			}
			if(flag) {
				cat();
				return 4;
			}

			//right down
			m = catX;
			n = catY;
			gg[4] = 0;
			while(1) {
				if(game[m][n] == 1) {
					gg[4] = m - catX;
					break;
				}
				if(m%2) {
					n++;
				}
				m++;
				if(m > 8 || n > 8) {
					cat();
					return 5;
				}
			}
			m = catX;
			n = catY;
			flag = true;
			gg[5] = 0;
			while(1) {
				if(game[m][n] == 1) {
					gg[5] = m - catX;
					break;
				}
				if(!(m%2)){
					n--;
				}
				m++;
				if(m > 8 || n < 0) {
					return 6;
					}
				
			}
			var maxV = -1,
				maxD = -1;
			for(var j=0;j<6; j++) {
				if(gg[j] > maxV) {
					maxV = gg[j];
					maxD = j+1;
				}
			}
			if(maxV > 1) {
				noCat();
				return maxD;
			} else {
				win.style.display = 'block';
				return 7;
			}
			
		}
		// drawBg();
		//绘制圆
		function drawArc(cxt,posX,posY,width,height,radius,bgcolor) {
			//禁止圆角的半径大于较小的边
			if ( Math.min(width,height ) < radius) {
				return null;
			};
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
		// drawArc(context,0,0,46,46,23,"#b5b5b5");
		// drawArc(context,200,300,46,46,23,"#ff845e");	img.src = 'stay.png';

		function cat() {
			clearInterval(timer);
			clearInterval(timer2);
			var img = new Image();
			img.src= 'images/stay.png';
		
			img.onload = function() {
				var k = 0,m = 0, i = 0;
				timer = setInterval(function() {
				//全部重新绘制
				drawBg();
				if(catX%2) {
					context.drawImage(img,61*k,93*m,60,93,39+51*catY,2+46*catX,60,93);//39
				} else {
					context.drawImage(img,61*k,93*m,60,93,16+catY*51,2+46*catX,60,93);//51,16
				}
				i++;
				k++;
				if(i%4 == 0) {
					m++;
				}
				if(i%4 == 0) {
					k = 0;
				}
				if(i == 16) {
					i = 0;
					m = 0;
				}
			},50);
		}
		}
		
		function noCat () {
			clearInterval(timer2);
			clearInterval(timer);
			var img1 = new Image();
			img1.src = 'images/weizhu.png';
			img1.onload = function() {
			var k = 0,m = 0, i = 0;
			timer2 = setInterval(function() {
				drawBg();
				if(catX%2) {
				context.drawImage(img1,64*k,92*m,64,92,36+51*catY,4+46*catX,64,92);
				} else {
					context.drawImage(img1,64*k,92*m,64,92,12+catY*51,4+46*catX,64,92);
				}
				
				i++;
				k++;
				if(i%4 == 0) {
					m++;
				}
				if(i%4 == 0) {
					k = 0;
				}
				if(i == 15) {
					i = 0;
					m = 0;
					k = 0;
				}
			},50);
			
			}
		}