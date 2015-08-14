window.doresize = resizeCanvas;

function resizeCanvas() {
  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 45;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
var saveImage = document.getElementById('saveImage');
var eraserFlag = 0; //设置橡皮擦的状态标志位
var arcX = 0;
var arcY = 0;
var shapeindex = 12;
var kindBtn = null;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineWidth = 23;
window.onload = function() {
  resizeCanvas();
  new Tool();
  var size = new Choose('sizeChoose');
  var shape = new Choose('shapeChoose');
  var toolType = new Choose('toolAltBox');
  var eraserShape = new Choose('eraserAltBox');
  var drawPicture = new DrawPicture('content');
};
//点击按钮时使选择的背景颜色为黄色

function Choose(id) {
  var _this = this;
  var oDiv = document.getElementById(id);
  this.aBtn = oDiv.getElementsByTagName('input');
  for (var i = 0; i < this.aBtn.length; i++) {
    this.aBtn[i].index = i;
    this.aBtn[i].addEventListener('click', function() {
      _this.chooseClick(this);
    }, false);
  };
}
//点击按钮弹出对应的选择框
Choose.prototype.chooseClick = function(aBtn) {
  for (var i = 0; i < this.aBtn.length; i++) {
    this.aBtn[i].className = '';
  }
  aBtn.className = 'active';
}
var oTool = document.getElementById('footer');
var altBox = document.getElementById('altBox');
var toolBtn = null;
var altDiv = null;

function Tool() {
  var _this = this;
  this.toolBtn = oTool.getElementsByTagName('input');
  this.altDiv = altBox.getElementsByTagName('div');
  for (var i = 0; i < this.toolBtn.length; i++) {
    this.toolBtn[i].index = i;
    this.toolBtn[i].addEventListener('click', function() {
      _this.toolClick(this);
    }, false);
  };
}
Tool.prototype.toolClick = function(toolBtn) {
  // body...
  for (var i = 0; i < this.toolBtn.length; i++) {
    this.toolBtn[i].className = '';
  }
  //||toolBtn.index==2||toolBtn.index==3
  if (toolBtn.index == 1) {
    var altBtn = document.getElementById('shapeChoose').getElementsByTagName('input');
    for (var i = 0; i < altBtn.length; i++) {
      altBtn[i].className = '';
    }
    document.getElementById('shapeDefault').className = 'active';
    // alert(toolBtn.index-1);
    oTool.style.display = 'none';
    // alert('test');
    //为什么这段代码只执行一次
    this.altDiv[toolBtn.index - 1].style.display = 'block';
    // alert(toolBtn.index);
  }
  //删除图片
  else if (toolBtn.index == 5) {
    if (confirm("确定要删除吗？")) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {}

  }
  //保存图片
  else if (toolBtn.index == 6) {
    function download() {
      var str = prompt("请输入图片名称", "");
      if (str) {
        var dt = canvas.toDataURL('image/jpeg');
        this.href = dt;
        saveImage.download = str;
      }
    }
    saveImage.addEventListener('click', download, false);
  }
  toolBtn.className = 'active';
};
var xcolor = null;
var lineSize = 1;
//点击画图开始画图咯
function DrawPicture(id) {
  var _this = this;
  var kinds = document.getElementById(id);
  this.kindBtn = kinds.getElementsByTagName('input');
  var color = document.getElementById('color');
  // this.kindBtn[i].addEventListener('click',function(){
  //    lineSize=2*shapeindex-13;
  // for (var i = 7 ; i < 12; i++) {
  //  this.kindBtn[i].addEventListener('click',function(){
  //    lineSize=2*shapeindex-13;
  //    alert(shapeindex);
  //  },false);
  // }
  this.kindBtn[7].addEventListener('click', function() {
    lineSize = 1;
  }, false);
  this.kindBtn[8].addEventListener('click', function() {
    lineSize = 3;
  }, false);
  this.kindBtn[9].addEventListener('click', function() {
    lineSize = 5;
  }, false);
  this.kindBtn[10].addEventListener('click', function() {
    lineSize = 7;
  }, false);
  this.kindBtn[11].addEventListener('click', function() {
    lineSize = 9;
  }, false);
  var evt = window.event || evt;
  var flag = 0;
  canvas.addEventListener('touchstart', ontouchStart, false);

  function ontouchStart(evt) {
    if (oTool.style.display == 'none') {
      oTool.style.display = 'block';
      document.getElementById('shapeBox').style.display = 'none';
      //这样的话每次都需要重画
      // canvas.height = window.innerHeight - 45;
    }
    //var evt = window.event || evt;
    //evt.preventDefault();
    var startX = evt.touches[0].clientX || evt.clientX;
    var startY = evt.touches[0].clientY || evt.clientY;
    //获取圆心的位置
    ctx.strokeStyle = color.value;
    ctx.fillStyle = color.value;
    ctx.lineWidth = lineSize;
    arcX = evt.touches[0].pageX - this.offsetLeft;
    arcY = evt.touches[0].pageY - this.offsetTop;
    ctx.beginPath();
    switch (shapeindex) {
       case 1:
       break;
      case 2:
        var obj = ctx.getImageData(arcX, arcY, 1, 1);
        xcolor = 'rgb(' + obj.data[0] + ',' + obj.data[1] + ',' + obj.data[2] + ')';
        // ctx.strokeStyle = xcolor;
        // ctx.fillStyle = xcolor;
        // alert(xcolor);
        //将吸管吸出的颜色设定到应用中
        break;
      case 3:
        ctx.lineWidth = 4;
        ctx.clearRect(arcX - ctx.lineWidth, arcY - ctx.lineWidth, ctx.lineWidth * 2, ctx.lineWidth * 2);
        eraserFlag = 1;
        break;
      case 4:
        break;
      case 5:
        break;
        // case 7:
        // alert(shapeindex);
        // break;
      case 12:
        ctx.moveTo(startX, startY);
        flag = 1;
        break;
      case 17:
        ctx.moveTo(startX, startY);
        ctx.lineCap = "round";
        break;
      default:
        break;
    }
  };
  canvas.addEventListener('touchmove', onTouchMove, false);

  function onTouchMove(evt) {
    var evt = window.event || evt;
    evt.preventDefault();
    var endX = evt.touches[0].clientX;
    var endY = evt.touches[0].clientY;
    var eraserX = evt.touches[0].pageX - this.offsetLeft;
    var eraserY = evt.touches[0].pageY - this.offsetTop;
    switch (shapeindex) {
      case 1:
        if (flag) {
          //移动的时候设置路径并且画出来
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
        break;
      case 3:
        if (eraserFlag) { //判断鼠标左键是否按下(按下的情况下拖动鼠标才能删除)
          ctx.clearRect(eraserX - ctx.lineWidth, eraserY - ctx.lineWidth, ctx.lineWidth * 2, ctx.lineWidth * 2);
        }

        break;
      case 12:
        if (flag) {
          //移动的时候设置路径并且画出来
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
        break;
      case 17:
        ctx.beginPath();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.moveTo(arcX,arcY);
        ctx.lineTo(endX, endY);
        ctx.closePath();
        ctx.stroke();
        break;
      default:
        break;
    }

  }
  canvas.addEventListener('touchend', onTouchEnd, false);

  function onTouchEnd(evt) {
    evt = window.event || evt;
    //计算鼠标抬起时鼠标相对于画布的坐标
    var endX = evt.changedTouches[0].pageX - this.offsetLeft;
    var endY = evt.changedTouches[0].pageY - this.offsetTop;
    //设置路径吧开始点和结束点连接起来,然后进行绘图
    //计算C的距离
    var a = endX - arcX;
    var b = endY - arcY;
    var c = Math.sqrt(a * a + b * b);
    //计算矩形的宽高
    var rectW = endX - arcX;
    var rectH = endY - arcY;
    //计算左下角的顶点坐标
    var lbX = 2 * arcX - endX;
    var lbY = endY;
    //设置第三个顶点的坐标
    var tmpC = 2 * (endX - arcX);
    var tmpA = endX - arcX;
    var tmpB = Math.sqrt(tmpC * tmpC - tmpA * tmpA);
    //计算最上面顶点坐标
    //endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
    switch (shapeindex) {
      case 1:
        flag = 0;
        break;
      case 3:
        eraserFlag = 0;
        break;
      case 12:
        flag = 0;
        break;
      case 13:
        ctx.strokeRect(arcX, arcY, rectW, rectH);
        break;
      case 14:
        //将画笔移动到右下角的顶点
        ctx.moveTo(endX, endY);
        ctx.lineTo(lbX, lbY);
        //画到顶点
        ctx.lineTo(arcX, endY - tmpB);
        //封闭路径->画出来
        ctx.closePath();
        ctx.stroke();
        break;
      case 15:
        //计算半径
        ctx.arc(arcX, arcY, c, 0, 360, false);
        ctx.closePath();
        ctx.stroke();
        break;
      case 17:
        // ctx.lineTo(endX, endY);
        // ctx.closePath();
        // ctx.stroke();
        break;
      case 18:
        ctx.fillRect(arcX, arcY, rectW, rectH);
        break;
      case 19:
        //将画笔移动到右下角的顶点
        ctx.moveTo(endX, endY);
        ctx.lineTo(lbX, lbY);
        //画到顶点
        ctx.lineTo(arcX, endY - tmpB);
        //封闭路径->画出来
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        break;
      case 20:
        //计算半径
        ctx.arc(arcX, arcY, c, 0, 360, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        break;
      default:
        break;
    }
  }
  for (var i = 0; i < this.kindBtn.length; i++) {
    this.kindBtn[i].index = i;
    this.kindBtn[i].addEventListener('click', function() {
      _this.changeShapeIndex(this);
    }, false);
  }
}
//改变index的值
DrawPicture.prototype.changeShapeIndex = function(kindBtn) {
  shapeindex = kindBtn.index;

};