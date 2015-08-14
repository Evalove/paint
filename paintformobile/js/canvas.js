window.doresize = resizeCanvas;

function resizeCanvas() {
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 45;
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
var color = document.getElementById('color');
var footer = document.getElementById('footer');
var altBox = document.getElementById('altBox');
var brush = document.getElementById('brush');
var setSize1 = document.getElementById('setSize1');
var eraser = document.getElementById('eraser');
var eraserAltBox = document.getElementById('eraserAltBox');
var tool = document.getElementById('tool');
var backout = document.getElementById('backout');
var clean = document.getElementById('clean');
var save = document.getElementById('save');
var canvas = document.getElementById('canvas');
var setSize3 = document.getElementById('setSize3');
var setSize5 = document.getElementById('setSize5');
var setSize7 = document.getElementById('setSize7');
var setSize9 = document.getElementById('setSize9');
var shapeDefault = document.getElementById('shapeDefault');
var shapeRect = document.getElementById('shapeRect');
var shapePoly = document.getElementById('shapePoly');
var shapeArc = document.getElementById('shapeArc');
var shapeEllipse = document.getElementById('shapeEllipse');
var shapeLine = document.getElementById('shapeLine');
var shapeRectFill = document.getElementById('shapeRectFill');
var shapePolyFill = document.getElementById('shapePolyFill');
var shapeArcFill = document.getElementById('shapeArcFill');
var shapeEllipseFill = document.getElementById('shapeEllipseFill');
var actions = [color, brush, tool, eraser, backout, clean, save];
var size = [setSize1, setSize3, setSize5, setSize7, setSize9];
var shape = [shapeDefault, shapeRect, shapePoly, shapeArc, shapeEllipse, shapeLine, shapeRectFill, shapePolyFill, shapeArcFill, shapeEllipseFill];
var ctx = canvas.getContext('2d');
drawBrush(1);
//setLine(0);
brush.onclick = function() {
	setStatus(actions, 1, 1);
	if (footer.style.display = 'block') {
		footer.style.display = 'none';
		altBox.style.display = 'block';
		canvas.height = window.innerHeight - 100;
	} else if (footer.style.display == 'none') {
		alert("2222");
	}
};

// setSize1.onclick=function (){
//     altBox.style.display='none';
//     footer.style.display='block';
//     canvas.height=window.innerHeight-45;
//     brush.style.background='url(img/size.png) 0 0';
// }
// eraser.onclick=function (){
//     if(footer.style.display='block')
//     {
//         footer.style.display='none';
//         eraserAltBox.style.display='block';
//         canvas.height=window.innerHeight-32;
//     }
// };
function setStatus(Arr, num, type) {
	for (var i = 0; i < Arr.length; i++) {
		if (i == num) {
			if (type == 1) {
				Arr[i].style.backgroundColor = "yellow";
			} else {
				Arr[i].style.border = "1px solid #000";
			}
		} else {
			if (type == 1) {
				Arr[i].style.backgroundColor = "#eee";
			} else {
				Arr[i].style.border = "1px solid #eee";
			}
		}
	}
}
color.addEventListener('click',function(){
	setStatus(actions, 0, 1);
},false);
function drawBrush(num) {
	setStatus(actions, num, 1);
	setStatus(shape, 0, 1);
	var flag = 0; //设置标志位->检测鼠标是否按下
	canvas.addEventListener('touchstart',function onTouchStart(){
		if (footer.style.display == 'none') {
				footer.style.display = 'block';
				altBox.style.display = 'none';
				canvas.height = window.innerHeight - 45;
			}
	    evt = window.event || evt;
	    evt.preventDefault();
	    ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		var startX = evt.touches[0].clientX;
		var startY = evt.touches[0].clientY;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		flag = 1;
	},false);
	canvas.touchstart=null;
	canvas.touchmove=null;
		//鼠标移动的时候->不同的绘图(获取鼠标的位置)
	canvas.addEventListener('touchmove',function onTouchMove(){
		evt = window.event || evt;
		var endX = evt.touches[0].clientX;
		var endY = evt.touches[0].clientY;
		//判断一下鼠标是否按下
		if (flag) {
			//移动的时候设置路径并且画出来
			ctx.lineTo(endX, endY);
			ctx.stroke();
		}

	},false);
	//鼠标抬起的时候结束绘图
	canvas.addEventListener('touchend',function (){
		flag = 0;
	},false);
}
shapeDefault.onclick = function drawBrush1() {
	drawBrush(1);
};
shapeLine.onclick = function drawLine(num) {
	setStatus(shape, 5, 1);
	canvas.addEventListener('touchstart',function(){
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		evt.preventDefault();
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		var startX = evt.touches[0].clientX;
		var startY = evt.touches[0].clientY;
		//设置直线的开始点
		ctx.beginPath(); //尽量写上开始新路径
		ctx.lineCap="round";
		ctx.moveTo(startX, startY);
	},false);
    canvas.touchstart=null;
	canvas.touchmove = null; //注销掉其他工具注册时间
	canvas.touchend=null;
	//鼠标按键抬起的时候
	canvas.addEventListener('touchend',function (evt) {
		evt = window.event || evt;
	  //计算鼠标抬起时鼠标相对于画布的坐标
		var endX = evt.changedTouches[0].clientX;
		var endY = evt.changedTouches[0].clientY;
		//设置路径吧开始点和结束点连接起来,然后进行绘图
		ctx.lineTo(endX, endY);
		ctx.closePath();
		ctx.stroke();
	},false);
};

function setLine(num) {
	setStatus(size, num, 1);
	switch (num) {
		case 0:
			ctx.lineWidth = 1;
			break;
		case 1:
			ctx.lineWidth = 3;
			break;
		case 2:
			ctx.lineWidth = 5;
		case 3:
			ctx.lineWidth = 7;
			break;
		case 4:
			ctx.lineWidth = 9;
			break;
		default:
			ctx.lineWidth = 4;
	}
}
setSize1.onclick = function() {
	setLine(0);
	alert('111');
	console.log(ctx.lineWidth);
};
setSize3.onclick = function() {
	setLine(1);
	console.log(ctx.lineWidth);
};
setSize5.onclick = function() {
	setLine(2);
	console.log(ctx.lineWidth);
};
setSize7.onclick = function() {
	setLine(3);
	console.log(ctx.lineWidth);
};
setSize9.onclick = function() {
	setLine(4);
	console.log(ctx.lineWidth);
	ctx.lineWidth=10;
};
var arcX = 0;
var arcY = 0;
//圆形形状函数
function drawArc(num) {
	setStatus(shape, num, 1);
	canvas.addEventListener('touchstart',function(){
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		evt.preventDefault();
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		//获取圆心的位置
		arcX = evt.touches[0].pageX - this.offsetLeft;
		arcY = evt.touches[0].pageY - this.offsetTop;
	},false);
	canvas.touchstart=null;
	canvas.touchmove = null; //注销掉其他工具注册时间
	canvas.touchend=null;
	canvas.addEventListener('touchend',function (evt){
		evt = window.event || evt;
		//获取半径(目的)
		//实际获取的是一个坐标
		var endX = evt.changedTouches[0].clientX;
		var endY = evt.changedTouches[0].clientY;
		//计算C的距离
		var a = endX - arcX;
		var b = endY - arcY;
		//计算半径
		var c = Math.sqrt(a * a + b * b);
		ctx.beginPath();
		ctx.arc(arcX, arcY, c, 0, 360, false);
		ctx.closePath();
		ctx.stroke();
	},false);
	canvas.touchmove = null; //注销掉鼠标移动时间
	canvas.touchend = null;
}
shapeArc.onclick = function() {
	drawArc(3);
}
var rectX = 0;
var rectY = 0;

function drawRect(num) {
	setStatus(shape, num, 1);
	canvas.addEventListener('touchstart',function(evt) {
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		//获取矩形左上角(对角线的开始点)
		rectX = evt.touches[0].pageX - this.offsetLeft;
		rectY = evt.touches[0].pageY - this.offsetTop;
	},false);
	canvas.addEventListener('touchend',function(evt) {
		evt = window.event || evt;
		//先获取鼠标的当前坐标
		var endX = evt.changedTouches[0].pageX - this.offsetLeft;
		var endY = evt.changedTouches[0].pageY - this.offsetTop;
		
		//画出矩形
		ctx.strokeRect(rectX, rectY, rectW, rectH);
	},false);
	canvas.touchmove = null;
	canvas.touchend = null;
}
shapeRect.onclick = function() {
	drawRect(1);
}
var polyX = 0;
var polyY = 0;

function drawPoly(num) {
	setStatus(shape, num, 1);
	canvas.addEventListener('touchstart',function(evt) {
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		polyX = evt.touches[0].pageX - this.offsetLeft;
		POLyY = evt.touches[0].pageY - this.offsetTop;
	},false);
	canvas.addEventListener('touchend',function(evt) {
		evt = window.event || evt;
		var endX = evt.changedTouches[0].pageX - this.offsetLeft;
		var endY = evt.changedTouches[0].pageY - this.offsetTop;
		ctx.beginPath();
		//将画笔移动到右下角的顶点
		ctx.moveTo(endX, endY);
		//计算左下角的顶点坐标
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		ctx.lineTo(lbX, lbY);
		//设置第三个顶点的坐标
		var tmpC = 2 * (endX - polyX);
		var tmpA = endX - polyX;
		var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
		//计算最上面顶点坐标
		//endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
		//画到顶点
		ctx.lineTo(polyX, endY - tmpB);
		//封闭路径->画出来
		ctx.closePath();
		ctx.stroke();
	},false);
	canvas.touchmove = null;
	canvas.touchend = null;
}
shapePoly.onclick = function() {
	drawPoly(2);
}
function drawPolyFill(num) {
	setStatus(shape, num, 1);
	canvas.addEventListener('touchstart',function(evt) {
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		polyX = evt.touches[0].pageX - this.offsetLeft;
		POLyY = evt.touches[0].pageY - this.offsetTop;
	},false);
	canvas.addEventListener('touchend',function(evt) {
		evt = window.event || evt;
		var endX = evt.changedTouches[0].pageX - this.offsetLeft;
		var endY = evt.changedTouches[0].pageY - this.offsetTop;
		ctx.beginPath();
		//将画笔移动到右下角的顶点
		ctx.moveTo(endX, endY);
		//计算左下角的顶点坐标
		var lbX = 2 * polyX - endX;
		var lbY = endY;
		ctx.lineTo(lbX, lbY);
		//设置第三个顶点的坐标
		var tmpC = 2 * (endX - polyX);
		var tmpA = endX - polyX;
		var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
		//计算最上面顶点坐标
		//endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
		//画到顶点
		ctx.lineTo(polyX, endY - tmpB);
		//封闭路径->画出来
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	},false);
	canvas.touchmove = null;
	canvas.touchend = null;
}
shapePolyFill.onclick = function() {
	drawPolyFill(7);
}
function drawArcFill(num) {
	setStatus(shape, num, 1);
	canvas.addEventListener('touchstart',function(evt) {
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		//获取圆心的位置
		arcX = evt.touches[0].pageX - this.offsetLeft;
		arcY = evt.touches[0].pageY - this.offsetTop;
	},false);
	canvas.addEventListener('touchend',function(evt) {
		evt = window.event || evt;
		//获取半径(目的)
		//实际获取的是一个坐标
		var endX = evt.changedTouches[0].clientX;
		var endY = evt.changedTouches[0].clientY;
		//计算C的距离
		var a = endX - arcX;
		var b = endY - arcY;
		//计算半径
		var c = Math.sqrt(a * a + b * b);
		ctx.beginPath();
		ctx.arc(arcX, arcY, c, 0, 360, false);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
	},false);
	canvas.touchend = null; //注销掉鼠标移动时间
	canvas.touchmove = null;
}
shapeArcFill.onclick = function() {
	drawArcFill(8);
}

function drawRectfill(num) {
	setStatus(shape, num, 1);
	canvas.addEventListener('touchstart',function(evt) {
		if (footer.style.display == 'none') {
			footer.style.display = 'block';
			altBox.style.display = 'none';
			canvas.height = window.innerHeight - 45;
		}
		evt = window.event || evt;
		ctx.strokeStyle = color.value;
		ctx.fillStyle = color.value;
		//获取矩形左上角(对角线的开始点)
		rectX = evt.touches[0].pageX - this.offsetLeft;
		rectY = evt.touches[0].pageY - this.offsetTop;
	},false);
	canvas.addEventListener('touchend',function(evt) {
		evt = window.event || evt;
		//先获取鼠标的当前坐标
		var endX = evt.changedTouches[0].pageX - this.offsetLeft;
		var endY = evt.changedTouches[0].pageY - this.offsetTop;
		//计算矩形的宽高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		//画出矩形
		ctx.fillRect(rectX, rectY, rectW, rectH);
	},false);
	canvas.touchmove = null;
	canvas.touchend = null;
}
shapeRectFill.onclick = function() {
	drawRectfill(6);
}
clean.onclick = function cleanImage() {
		//画布清除方法
		setStatus(actions, 5, 1);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	//导出画布为图片

function download() {
	//var image=canvas.toDataURL("image/png");   
	// var w=window.open('about:blank','image from canvas');  
	// w.document.write("<img src='"+image+"' alt='from canvas'/>");
	//var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	//window.location.href = image; // it will save locally 
	setStatus(actions, 6, 1);
	var str = prompt("请输入图片名称", "");
	if (str) {
		var dt = canvas.toDataURL('image/jpeg');
		this.href = dt;
		saveImage.download = str;
	}
}
saveImage.addEventListener('click', download, false);
var eraserFlag = 0; //设置橡皮擦的状态标志位
function drawEraser(num) {
	setStatus(actions, num, 1);
	canvas.addEventListener('touchstart',function(evt) {
			evt = window.event || evt;
			var eraserX = evt.touches[0].pageX - this.offsetLeft;
			var eraserY = evt.touches[0].pageY - this.offsetTop;
			//canvas擦出方法 ctx.clearRect();
			ctx.clearRect(eraserX - ctx.lineWidth, eraserY - ctx.lineWidth, ctx.lineWidth * 2, ctx.lineWidth * 2);
			eraserFlag = 1;
		},false);
		//随着鼠标移动不停地擦出
    canvas.addEventListener('touchmove',function(evt) {
			evt = window.event || evt;
			var eraserX = evt.touches[0].pageX - this.offsetLeft;
			var eraserY = evt.touches[0].pageY - this.offsetTop;
			// 擦除方法
			if (eraserFlag) { //判断鼠标左键是否按下(按下的情况下拖动鼠标才能删除)
				ctx.clearRect(eraserX - ctx.lineWidth, eraserY - ctx.lineWidth, ctx.lineWidth * 2, ctx.lineWidth * 2);
			}
		},false);
		//抬起鼠标按键    清除擦出的状态位 变成0
		canvas.addEventListener('touchend',function() {
			eraserFlag = 0;
		// }
		//抬起鼠标移出画布  清除擦出的状态位 变成0
	// canvas.onmouseout = function() {
	// 	eraserFlag = 0;
	},false);
}
eraser.onclick = function() {
	drawEraser(3);
}
backout.addEventListener('click',function(){
	setStatus(actions, 4, 1);
},false);
tool.addEventListener('click',function(){
	setStatus(actions, 2, 1);
},false);
