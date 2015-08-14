//获取工具和形状的标签 
var Brush = document.getElementById('gongjuBrush');
var Eraser = document.getElementById('gongjuEraser');
var Paint = document.getElementById('gongjuPaint');
var Straw = document.getElementById('gongjuStraw');
var Text = document.getElementById('gongjuText');
var Magnifier = document.getElementById('gongjuMagnifier');
var Line = document.getElementById('shapeLine');
var Arc = document.getElementById('shapeArc');
var Arcfill = document.getElementById('shapeArcfill');
var Poly = document.getElementById('shapePoly');
var Rect = document.getElementById('shapeRect');
var Rectfill = document.getElementById('shapeRectfill');

var Line1 = document.getElementById('sizeLine1');
var Line3 = document.getElementById('sizeLine3');
var Line5 = document.getElementById('sizeLine5');
var Line8 = document.getElementById('sizeLine8');

var Red = document.getElementById('red');
var Green = document.getElementById('green');
var Blue = document.getElementById('blue');
var Yellow = document.getElementById('yellow');

var White = document.getElementById('white');
var Black = document.getElementById('black');
var Pink = document.getElementById('pink');
var Purple = document.getElementById('purple');
var Cyan = document.getElementById('cyan');
var Orange = document.getElementById('orange');
var canvas = document.getElementById('j_canvas');
 window.onresize=resizeCanvas;
             function resizeCanvas(){
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight*0.75;
        }
        resizeCanvas();
var cxt = canvas.getContext('2d');
//把12个标签放在一个数组中，因为每次智能选择其中的一个
var actions = [Brush, Eraser, Paint, Straw, Text, Magnifier, Line, Arc, Rect, Poly, Arcfill, Rectfill];
var width = [Line1, Line3, Line5, Line8];
var colors = [Red, Green, Blue, Yellow, White, Black, Pink, Purple, Cyan, Orange];
drawBrush(0);
setColor(Red, 0);
setLine1(0);

function setStatus(Arr, num, type) {
	for (var i = 0; i < Arr.length; i++) {
		if (i == num) {
			if (type == 1) {
				Arr[i].style.background = "yellow";
			} else {
				Arr[i].style.border = "1px solid #000";
			}
		} else {
			if (type == 1) {
				Arr[i].style.background = "#fff";
			} else {
				Arr[i].style.border = "1px solid #eee";
			}
		}
	}
}
//导出画布为图片
function saveImage(){
	//var image=canvas.toDataURL("image/png");   
   // var w=window.open('about:blank','image from canvas');  
   // w.document.write("<img src='"+image+"' alt='from canvas'/>");
     var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");   
    window.location.href=image; // it will save locally  
}
function cleanImage() {
	//画布清除方法
	cxt.clearRect(0, 0, canvas.width, canvas.height);
}
function drawBrush(num) {
	setStatus(actions, num, 1);
	var flag = 0; //设置标志位->检测鼠标是否按下
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX, startY);
		flag = 1;
	}
	//鼠标移动的时候->不同的绘图(获取鼠标的位置)
	canvas.onmousemove = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//判断一下鼠标是否按下
		if (flag) {
			//移动的时候设置路径并且画出来
			cxt.lineTo(endX, endY);
			cxt.stroke();
		}

	}

	//鼠标抬起的时候结束绘图
	canvas.onmouseup = function() {
		flag = 0;
	}

	//鼠标移出canvas的时候必须取消画图操作
	canvas.onmouseout = function() {
		flag = 0;
	}
}
var eraserFlag = 0; //设置橡皮擦的状态标志位
function drawEraser(num) {
		setStatus(actions, num, 1);
		setStatus(actions, num, 1);
		canvas.onmousedown = function(evt) {
				evt = window.event || evt;
				var eraserX = evt.pageX - this.offsetLeft;
				var eraserY = evt.pageY - this.offsetTop;
				//canvas擦出方法 cxt.clearRect();
				cxt.clearRect(eraserX - cxt.lineWidth, eraserY - cxt.lineWidth, cxt.lineWidth * 2, cxt.lineWidth * 2);
				eraserFlag = 1;
			}
			//随着鼠标移动不停地擦出
		canvas.onmousemove = function(evt) {
				evt = window.event || evt;
				var eraserX = evt.pageX - this.offsetLeft;
				var eraserY = evt.pageY - this.offsetTop;
				// 擦除方法
				if (eraserFlag) { //判断鼠标左键是否按下(按下的情况下拖动鼠标才能删除)
					cxt.clearRect(eraserX - cxt.lineWidth, eraserY - cxt.lineWidth, cxt.lineWidth * 2, cxt.lineWidth * 2);
				}

			}
			//抬起鼠标按键 	清除擦出的状态位 变成0
		canvas.onmouseup = function() {
				eraserFlag = 0;
			}
			//抬起鼠标移出画布 	清除擦出的状态位 变成0
		canvas.onmouseout = function() {
			eraserFlag = 0;
		}
	}
function drawPaint(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function() {
	
		cxt.fillRect(0, 0, 880, 400);
	}
	canvas.onmouseup = null;
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

//吸管工具函数
function drawStraw(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
			evt = window.event || evt;
			var strawX = evt.pageX - this.offsetLeft;
			var strawY = evt.pageY - this.offsetTop;
			var obj = cxt.getImageData(strawX, strawY, 1, 1);
			var color = 'rgb(' + obj.data[0] + ',' + obj.data[1] + ',' + obj.data[2] + ')';
			//将吸管吸出的颜色设定到应用中 
			cxt.strokeStyle = color;
			cxt.fillStyle = color;
			drawBrush(0);
		}
		//取消移动事件 、鼠标抬起事件、鼠标移出事件
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}


function drawText(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		//获取鼠标点击时的位置
		var textX = evt.pageX - this.offsetLeft;
		var textY = evt.pageY - this.offsetTop;
		var userVal = window.prompt('请在这里输入文字', '');
		//alert(userVal);
		//将用户输入的文字写到画布中对应的坐标点上。
		if (userVal != null) {
			cxt.fillText(userVal, textX, textY);
		}

	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}

function drawMagnifier(num) {
	setStatus(actions, num, 1);
	var scale = window.prompt('请输入要放大的百分比[只能是整型]', '100');
	//吧数据转成对应canvas画布的大小
	var scaleW = 880 * scale / 100;
	var scaleH = 400 * scale / 100;
	//将数据设置到对应HTML标签上
	canvas.style.width = parseInt(scaleW) + 'px';
	canvas.style.height = parseInt(scaleH) + 'px';
}

function drawLine(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;

		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		//设置直线的开始点
		cxt.beginPath(); //尽量写上开始新路径
		cxt.moveTo(startX, startY);
	}
	canvas.onmousemove = null; //注销掉其他工具注册时间
	canvas.onmouseout = null; 
	//鼠标按键抬起的时候
	canvas.onmouseup = function(evt) {
		//计算鼠标抬起时鼠标相对于画布的坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//设置路径吧开始点和结束点连接起来,然后进行绘图
		cxt.lineTo(endX, endY);
		cxt.closePath();
		cxt.stroke();
	}
}
var arcX = 0;
var arcY = 0;
//圆形形状函数
function drawArc(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		//获取圆心的位置
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;
	}

	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		//获取半径(目的)
		//实际获取的是一个坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//计算C的距离
		var a = endX - arcX;
		var b = endY - arcY;
		//计算半径
		var c = Math.sqrt(a * a + b * b);
		cxt.beginPath();
		cxt.arc(arcX, arcY, c, 0, 360, false);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null; //注销掉鼠标移动时间
	canvas.onmouseout = null;
}
var rectX = 0;
var rectY = 0;

function drawRect(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		//获取矩形左上角(对角线的开始点)
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;

	}

	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		//先获取鼠标的当前坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//计算矩形的宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		//画出矩形
		cxt.strokeRect(rectX, rectY, rectW, rectH);
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}
var polyX = 0;
var polyY = 0;

function drawPoly(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		polyX = evt.pageX - this.offsetLeft;
		POLyY = evt.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		//将画笔移动到右下角的顶点
		cxt.moveTo(endX, endY);
		//计算左下角的顶点坐标
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		cxt.lineTo(lbX, lbY);
		//设置第三个顶点的坐标
		var tmpC = 2 * (endX - polyX);
		var tmpA = endX - polyX;
		var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
		//计算最上面顶点坐标
		//endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
		//画到顶点
		cxt.lineTo(polyX, endY - tmpB);
		//封闭路径->画出来
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

function drawArcfill(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		//获取圆心的位置
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;
	}

	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		//获取半径(目的)
		//实际获取的是一个坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//计算C的距离
		var a = endX - arcX;
		var b = endY - arcY;
		//计算半径
		var c = Math.sqrt(a * a + b * b);
		cxt.beginPath();
		cxt.arc(arcX, arcY, c, 0, 360, false);
		cxt.closePath();
		cxt.fill();
	}
	canvas.onmousemove = null; //注销掉鼠标移动时间
	canvas.onmouseout = null;
}

function drawRectfill(num) {
	setStatus(actions, num, 1);
	canvas.onmousedown = function(evt) {
		evt = window.event || evt;
		//获取矩形左上角(对角线的开始点)
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;

	}

	canvas.onmouseup = function(evt) {
		evt = window.event || evt;
		//先获取鼠标的当前坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//计算矩形的宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		//画出矩形
		cxt.fillRect(rectX, rectY, rectW, rectH);
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

function setLine1(num) {
	setStatus(width, num, 1)
	switch (num) {
		case 0:
			cxt.lineWidth = 1;
			break;
		case 1:
			cxt.lineWidth = 3;
			break;
		case 2:
			cxt.lineWidth = 5;
		case 3:
			cxt.lineWidth = 8;
			break;
		default:
			cxt.lineWidth = 1;

	}
}


function setColor(obj, num) {
	setStatus(colors, num, 2);
	//设置画笔颜色和填充颜色
	cxt.strokeStyle = obj.id;
	cxt.fillStyle = obj.id;
}