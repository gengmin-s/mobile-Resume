/*----------------------滑屏部分-------------------------*/
$(document).on('touchmove', function (e) {
    e.preventDefault();
});
$(function () {
    var viewHeight = $(window).height();
    var $li = $('#list>li');
    $('#main').css('height', viewHeight);

    slidePage();
    function slidePage() {
        var startY = null;
        var step = 1 / 4;
        var nowIndex = 0;
        var nextOrPrevIndex = 0;
        var bOk = true;
        $li.on('touchstart', function (e) {
            if (bOk == false)return;
            bOk = false;
            var touch = e.originalEvent.changedTouches[0];
            startY = touch.pageY;

            nowIndex = $(this).index();
            $li.on('touchmove.move', function (e) {
                var touch = e.originalEvent.changedTouches[0];
                $(this).siblings('li').hide();

                if (touch.pageY < startY) {//up
                    nextOrPrevIndex = nowIndex == $li.length - 1 ? 0 : nowIndex + 1;
                    $li.eq(nextOrPrevIndex).css('transform', 'translate(0,' + (viewHeight + touch.pageY - startY) + 'px)');
                } else if (touch.pageY > startY) {
                    nextOrPrevIndex = nowIndex == 0 ? $li.length - 1 : nowIndex - 1;
                    $li.eq(nextOrPrevIndex).css('transform', 'translate(0,' + (-viewHeight + touch.pageY - startY) + 'px)');
                } else {
                    bOk = true
                }
                $(this).css('transform', 'translate(0,' + (touch.pageY - startY) * step + 'px) scale(' + (1 - Math.abs(touch.pageY - startY) / viewHeight * step ) + ')');
                $li.eq(nextOrPrevIndex).addClass('zIndex').show();
            });
            $li.on('touchend.move', function (e) {
                var touch = e.originalEvent.changedTouches[0];
                if (touch.pageY < startY) {//up
                    $(this).css('transform', 'translate(0,' + (-viewHeight * step) + 'px) scale(' + (1 - step) + ')');
                } else if (touch.pageY > startY) {
                    //过渡
                    $(this).css('transform', 'translate(0,' + (viewHeight * step) + 'px) scale(' + (1 - step) + ')');
                } else {
                    bOk = true;
                }
                $li.eq(nextOrPrevIndex).css('transform', 'translate(0,0)');
                $li.eq(nextOrPrevIndex).css('transition', '.3s');
                $li.eq(nowIndex).css('transition', '.3s');
                $li.off('.move');
            })
        });
        $li.on('transitionend webkitTransitionend', function (e) {
            if (!$li.is(e.target))return;
            resetFn();
        });
        function resetFn() {
            $li.css('transform', '');
            $li.css('transition', '');
            $li.eq(nextOrPrevIndex).removeClass('zIndex').siblings('li').hide();
            bOk = true;
        }
    }
});

/*--------------------------page1-----------------------*/
$(function () {
    setTimeout(function () {
        $('.page1 .p1_head').show().addClass('animated bounceIn');
    }, 0);
    setTimeout(function () {
        $('.page1 span').css('display', 'block').addClass('animated fadeInLeftBig');
    }, 700);
    setTimeout(function () {
        $('.page1 h3').show().addClass('animated fadeInRightBig');
    }, 1400);
    setTimeout(function () {
        $('.page1 h4').show().addClass('animated fadeInLeftBig');
    }, 2100);
});
/*-------------------music-------------------*/
~function () {
    var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");

    //->给页面的加载缓冲500MS时间
    window.setTimeout(function () {
        audioFir.play();

        //->当音频文件可以播放(出声了)的时候:canplay/canplaythrough
        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        }, false);
    }, 500);

    //->移动端使用CLICK存在300MS的延迟
    music.addEventListener("click", function () {
        //->当前是暂停的
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        //->当前是播放的
        audioFir.pause();
        music.className = "music";
    }, false);
}();
/*--------------------------page2-----------------------*/
$(function () {
    $('.page2 ul li:nth-child(even)').show(500).addClass('animated fadeInLeftBig');
    $('.page2 ul li:nth-child(odd)').show(500).addClass('animated fadeInRightBig');
});
/*--------------------------page3-----------------------*/
var page3ZIndex;
setInterval(function () {
    page3ZIndex = $('.page3').css('zIndex');
}, 500);
setInterval(function () {
    if (page3ZIndex == 2) {
        $('.line').animate({
            height: '70%'
        }, 2000);
    }
}, 500);