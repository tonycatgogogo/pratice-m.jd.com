/**
 * Created by USER on 2019/3/20.
 */
// 功能：1 header部分，随着页面下滑而改变透明度
// 2.轮播图：
// 2.1 自动无缝轮播
/*2.2 左右滑跳转 根据索引改变
 *2.3 滑动效果
 *2.4 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡
 *滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡
 * 3. 计时器
 * */

// var Index = function(){
//   this.search();
//   this.banner();
//   this.timer();
//   console.log(this);
// };
// Index.prototype.search = function () {
//   // 功能：1 header部分，随着页面下滑而改变透明度
//   var searchBox = document.querySelector('.jd_search_box');
//   var banner = document.querySelector('.jd_banner');
//   var height = banner.offsetHeight;
//   window.onScroll = function () {
//     var scrollTop = document.body.scrollTop;
//     var opacity = 0;
//     if(scrollTop < height) {
//       opacity = scrollTop / height *0.85;
// } else {
//   opacity = 0.85;
// }
// searchBox.style.backgroundColor = 'rgba(201, 21, 35, '+ opacity +')';
// }
// };
// Index.prototype.banner = function () {
//
// };
// Index.prototype.timer = function () {
//
// };
// new Index();

window.onload = function () {
  search();
  banner();
  timer();
};
function search() {
  var searchBox = document.querySelector('.jd_search_box');
  var banner = document.querySelector('.jd_banner');
  var height = banner.offsetHeight;
  window.onscroll = function () {
    /*console.log(document.body.scrollTop);
     console.log(document.documentElement.scrollTop);
     console.log(window.pageYOffset);*/
    //我的谷歌浏览器用document.body.scrollTop居然一直都是0 真是见了鬼了
    var scrollTop = window.pageYOffset;
    console.log(scrollTop);
    var opacity = 0;
    if (scrollTop < height) {
      opacity = scrollTop / height * 0.85;
    } else {
      opacity = 0.85;
    }
    searchBox.style.backgroundColor = 'rgba(201, 21, 35, ' + opacity + ')';
  }
}
function banner() {
// 2.轮播图：
// 2.1 自动无缝轮播
  /*2.2 左右滑跳转 根据索引改变当前页面点
   *2.3 滑动效果
   *2.4 滑动结束的时候    如果滑动的距离不超过屏幕的1/3  吸附回去   过渡
   *滑动结束的时候    如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡*/
  var banner = document.querySelector('.jd_banner');
  var width = banner.offsetWidth;
  console.log(width);
  var imageBox = banner.querySelector('ul:first-child');
  var pointBox = banner.querySelector('ul:last-child');
  var points = pointBox.querySelectorAll('li');
  var addTransition = function () {
    imageBox.style.transition = 'all 0.2s';
    imageBox.style.webkitTransition = 'all 0.2s';
  };
  var removeTransition = function () {
    imageBox.style.transition = 'none';
    imageBox.style.webkitTransition = 'none';
  };
  var setTranslateX = function (translateX) {
    imageBox.style.transform = 'translateX(' + translateX + 'px)';
    imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
  };
  var index = 1;
  var setTimer = setInterval(function () {
    index++;
    addTransition();
    setTranslateX(-width * index);
  }, 3000);
  imageBox.addEventListener('transitionend', function () {
    if (index > 8) {
      index = 1;
      removeTransition();
      setTranslateX(-width * index);
    } else if (index < 1) {
      index = 8;
      removeTransition();
      setTranslateX(-width * index);
    }
    setPoints();
  });
  var setPoints = function () {
    for (var i = 0; i < points.length; i++) {
      var obj = points[i];
      obj.classList.remove('active');
    }
    points[index - 1].classList.add('active');
  };
  // *2.3 滑动效果
  var startX = 0;
  var distanceX = 0;
  var isMove = false;

  imageBox.addEventListener('touchstart', function (e) {
    clearInterval(setTimer);
    startX = e.touches[0].clientX;
  });
  imageBox.addEventListener('touchmove', function (e) {
    var moveX = e.touches[0].clientX;
    distanceX = moveX - startX;
    var translateX = -index * width + distanceX;
    removeTransition();
    setTranslateX(translateX);
    isMove = true;
  });
  imageBox.addEventListener('touchend', function () {
    if (isMove) {
      if (Math.abs(distanceX) < width / 3) {
        addTransition();
        setTranslateX(-index * width)
      } else {
        if (distanceX > 0) {
          index--
        } else {
          index++
        }
        addTransition();
        setTranslateX(-index * width)
      }
    }
    startX = 0;
    distanceX = 0;
    isMove = false;
    clearInterval(setTimer);
    setTimer = setInterval(function () {
      index++;
      addTransition();
      setTranslateX(-width * index);
    }, 3000);
  }
)}
function timer() {
  var time = 4*60*60;
  var timeDown = document.querySelector('.time');
  var li = timeDown.querySelectorAll('li');
  var timer = setInterval(function () {
    time--;
    var h= Math.floor(time/3600);
    var m= Math.floor(time%3600/60);
    var s= Math.floor(time%60);
    li[0].innerHTML = Math.floor(h/10);
    li[1].innerHTML = (h%10);
    li[3].innerHTML = Math.floor(m/10);
    li[4].innerHTML = (m%10);
    li[6].innerHTML = Math.floor(s/10);
    li[7].innerHTML = (s%10);
  },1000)
}