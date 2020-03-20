var startx, starty;
//获得角度
function getAngle(angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI;
};

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection(startx, starty, endx, endy) {
  var angx = endx - startx;
  var angy = endy - starty;
  var result = 0;

  //如果滑动距离太短
  if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
    return result;
  }

  var angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1;
  } else if (angle > 45 && angle < 135) {
    result = 2;
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3;
  } else if (angle >= -45 && angle <= 45) {
    result = 4;
  }

  return result;
}

function touchstart(e) {
  startx = e.touches[0].pageX;
  starty = e.touches[0].pageY;
};

function touchmove(e) {
  var vanpopup = document.getElementsByClassName("van-popup")[0];
  let scrollTop = vanpopup.scrollTop;
  var endx, endy;
  endx = e.changedTouches[0].pageX;
  endy = e.changedTouches[0].pageY;
  var direction = getDirection(startx, starty, endx, endy);
  switch (direction) {
    case 0:
      //   alert("未滑动！");
      break;
    case 1:
      //   alert("向上！");
      var bottom = document.getElementsByClassName("van-popup--bottom")[0];
      if (
        (!bottom.style.top || bottom.style.top == "50%") &&
        scrollTop < 20
      ) {
        vanpopup.style.scrollTop = 0;
        vanpopup.style.overflowY = "hidden";
        bottom.style.top = "0";
        bottom.style.transition = "0.3s";
      } else {
        bottom.style.top = "0";
        vanpopup.style.overflowY = "auto";
        bottom.style.transition = "0.3s";
      }
      break;
    case 2:
      //   alert("向下！");
      if (scrollTop > 20) return;
      var bottom = document.getElementsByClassName("van-popup--bottom")[0];
      bottom.style.top = "50%";
      bottom.style.transition = "0.3s";
      break;
    case 3:
      //   alert("向左！");
      break;
    case 4:
      //   alert("向右！");
      break;
    default:
  }
}
export {
  touchstart,
  touchmove
}
