$(function () {
  commonUI();
  // mainUI();
});
$(window).on('resize', function () {
  vhChk();
});

vhChk();
function vhChk() {
  const $vh = window.innerHeight * 0.01;
  $('html').css('--vh', $vh + 'px');
}

/* common ui */
function commonUI() {
  let $gnbTxt = $('#gnb li a');
  const $title = $.trim($('#pageTit').text());
  $gnbTxt.each(function () {
    if ($(this).text() === $title) {
      const $parents = $(this).parents('li');
      $parents.addClass('active');
    }
  });

  /* header fixed */
  let prevSclTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  document.addEventListener('scroll', function () {
    const nowSclTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const sclDirection = nowSclTop > prevSclTop ? 'down' : 'up';
    const sclDistance = Math.abs(nowSclTop - prevSclTop);
    const elArray = [];
    const header = document.querySelector('#header');
    if (header) elArray.push(header);

    if (elArray.length) fixedClassChk(elArray, nowSclTop, sclDirection, sclDistance);

    prevSclTop = nowSclTop;
  });

  // GNB 모바일 메뉴
  const gnbBtn = document.querySelector('#gnb .btn-gnb');
  const body = document.querySelector('body');

  gnbBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.body.classList.toggle('gnbOpen');
  });

  //스크롤 탑 버튼
  const $scrollTop = $('.scroll-top');
  const $scrollTopBtn = $scrollTop.children();
  $scrollTopBtn.on('click', function () {
    if ($('#wrapper').hasClass('main')) {
      scrollArea.animate({ scrollTop: 0 }, 800, function () {
        $(this).closest('#container').removeClass('active');
      });
    } else {
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  });

  // 스크롤 headerr 고정 스크립트
  function fixedClassChk(elArray, nowSclTop, sclDirection, sclDistance) {
    elArray.forEach(function (item) {
      const itemEnd = getOffset(item).top + item.offsetHeight;
      if (nowSclTop > itemEnd) {
        item.classList.add('fixed');
        if (sclDistance > 5) {
          if (sclDirection === 'down') {
            item.classList.add('is-up');
          } else {
            item.classList.remove('is-up');
          }
        }
      } else {
        item.classList.remove('fixed', 'is-up');
      }
    });
  }
  function getOffset(element) {
    let $el = element;
    let $elX = 0;
    let $elY = 0;
    let isSticky = false;
    while ($el && !Number.isNaN($el.offsetLeft) && !Number.isNaN($el.offsetTop)) {
      let $style = window.getComputedStyle($el);
      // const $matrix = new WebKitCSSMatrix($style.transform);
      if ($style.position === 'sticky') {
        isSticky = true;
        $el.style.position = 'static';
      }
      $elX += $el.offsetLeft;
      // $elX += $matrix.m41; //translateX
      $elY += $el.offsetTop;
      // $elY += $matrix.m42;  //translateY
      if (isSticky) {
        isSticky = false;
        $el.style.position = '';
        if ($el.getAttribute('style') === '') $el.removeAttribute('style');
      }
      $el = $el.offsetParent;
      if ($el !== null) {
        $style = window.getComputedStyle($el);
        $elX += parseInt($style.borderLeftWidth);
        $elY += parseInt($style.borderTopWidth);
      }
    }
    return { left: $elX, top: $elY };
  }

  //공통 탭
  let $tabSwiper;
  function initTabSwiper() {
    destroyTabSwiper(); // 리셋
    console.log($('.common-tab .swiper .swiper-slide').length);
    if ($('.common-tab .swiper .swiper-slide').length) {
      $tabSwiper = new Swiper('.common-tab .swiper', {
        slidesPerView: 'auto'
      });
    }
  }

  function destroyTabSwiper() {
    if ($tabSwiper) {
      $tabSwiper.destroy(true, true);
      $tabSwiper = undefined;
    }
  }

  function handleWindowResize() {
    if (window.innerWidth > 1024) {
      destroyTabSwiper();
    } else {
      initTabSwiper();
    }
  }
  $(window).on('load', function () {
    handleWindowResize();
  });
  $(window).on('resize', function () {
    handleWindowResize();
  });
  //window.addEventListener('resize', handleWindowResize), document.addEventListener('DOMContentLoaded', handleWindowResize);
}

/* main ui */
let $mainBanner;
function mainUI() {
  /* 메인 배너 스와이퍼(영상 제어 포함) - 시작 */
  let videoPlayStatus = 'PAUSE';
  let timeout = null;
  let waiting = 1000;

  const player = videojs('bannerVideo');
  let swiperInitialized = false;

  function initializeSwiper() {
    if (swiperInitialized) return; // 초기화되었다면 다시 초기화 안함

    $mainBanner = new Swiper('.main-banner', {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      preventInteractionOnTransition: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      on: {
        init() {
          clearTimeout(timeout);
          player.currentTime(0);
          player.play();
          videoPlayStatus = 'PLAYING';
        },
        slideChangeTransitionStart() {
          let index = $mainBanner.activeIndex;
          let currentSlide = $($mainBanner.slides[index]);
          let currentSlideType = currentSlide.data('slide-type');

          if (videoPlayStatus === 'PLAYING') {
            player.pause();
          }

          clearTimeout(timeout);

          switch (currentSlideType) {
            case 'img':
              runNext();
              break;
            case 'vdo':
              player.currentTime(0);
              player.play();
              videoPlayStatus = 'PLAYING';
              break;
            default:
              throw new Error('Invalid slide type');
          }
        }
      }
    });

    swiperInitialized = true; // Swiper 초기화
  }
  function handleVideoEnded() {
    next();
  }
  // 비디오 플레이어 준비가 완료되면 실행될 함수
  player.ready(function () {
    initializeSwiper();
    player.on('ended', handleVideoEnded);
  });

  function prev() {
    $mainBanner.slidePrev();
  }

  function next() {
    $mainBanner.slideNext();
  }

  function runNext() {
    timeout = setTimeout(function () {
      next();
    }, waiting);
  }
  runNext();
  /* 메인 배너 스와이퍼(영상 제어 포함) - 끝 */
}
