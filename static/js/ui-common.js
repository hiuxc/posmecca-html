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
  $scrollTopBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $scrollTopBtn.fadeIn();
    } else {
      $scrollTopBtn.fadeOut();
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

  //공통 서브 메뉴 탭
  let $tabSwiper;
  function initTabSwiper() {
    if ($('.common-tab .swiper-slide').length) {
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

  /* 스크롤 애니메이션 */
  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    var scrollTopAnimation = document.querySelector('.scrollTopAnimation'); // 변경할 요소의 클래스를 여기에 넣으세요

    if (scrollTopAnimation) {
      var elementHeight = scrollTopAnimation.offsetHeight;
      var elementOffsetTop = scrollTopAnimation.offsetTop;

      var elementTopInView = elementOffsetTop - scrollTop;
      var elementBottomInView = elementTopInView + elementHeight;

      if (elementTopInView < windowHeight / 2 && elementBottomInView > windowHeight / 2) {
        scrollTopAnimation.classList.add('yourClassName'); // 추가할 클래스명을 여기에 넣으세요
        console.log(2);
      } else {
        scrollTopAnimation.classList.remove('yourClassName'); // 제거할 클래스명을 여기에 넣으세요
        console.log(1);
      }
    }
  });

  /*폼 글자수*/
  const textareas = document.querySelectorAll('textarea');
  const countInput = document.querySelectorAll('input');

  textareas.forEach((textarea) => {
    textarea.addEventListener('input', valueLengthCheck);
  });
  countInput.forEach((inputs) => {
    inputs.addEventListener('input', valueLengthCheck);
  });

  function valueLengthCheck(e) {
    const target = e.target;
    const value = target.value;
    const el = target.parentNode.querySelector('.count-num');
    el.querySelector('.current').innerHTML = value.length;
  }

  // 인풋 value 초기화
  $('.btn-x').hide();
  const $inpFocus = $('.inputbox input');

  $inpFocus.focusin(function () {
    $(this).siblings('.btn-x').show();
  });

  $(document).on('click', '.btn-x', function () {
    const $inp = $(this).siblings('input', 'textarea');
    $inp.val('').change().siblings('.btn-x').hide();
  });

  $inpFocus.focusout(function () {
    const $btnX = $(this).siblings('.btn-x');

    setTimeout(function () {
      if (!$btnX.is(':focus')) {
        $btnX.hide();
      }
    }, 100);
  });

  // 인풋 파일 파일명
  const fileTarget = $('.filebox .inp-file');

  fileTarget.on('change', function () {
    var files = $(this)[0].files;
    var fileArr = [];
    for (var i = 0; i < files.length; i++) {
      fileArr.push(files[i].name);
    }

    var fileList = fileArr.join(', ');
    $(this).siblings('.upload-name').val(fileList);
  });
}

/* main ui */
let $mainBanner;
let $mainReferences;
let activeBullet;
function mainUI() {
  /* 메인 배너 스와이퍼(영상 제어 포함) - 시작 */
  let videoPlayStatus = 'PAUSE';
  let timeout = null;
  let waiting = 5000; // swiper autoplay를 쓰지 못하기 때문에 따로 여기서 지정
  const swiperBanner = document.querySelector('.main-banner');
  const player = videojs('bannerVideo');

  let swiperInitialized = false;

  function initializeSwiper() {
    if (swiperInitialized) return; // 초기화되었다면 다시 초기화 안함

    $mainBanner = new Swiper('.main-banner', {
      loop: true,
      preventInteractionOnTransition: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">0' + (index + 1) + '<strong class="progressbar "><i class="progress"></i></strong>' + '</span>';
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init() {
          clearTimeout(timeout);
          player.currentTime(0);
          player.play();
          videoPlayStatus = 'PLAYING';

          const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress');
          setTimeout(function () {
            activeBullet.style.width = '100%';
          }, 100);
        },
        slideChangeTransitionStart() {
          let index = $mainBanner.activeIndex;
          let currentSlide = $($mainBanner.slides[index]);
          let currentSlideType = currentSlide.data('slide-type');
          const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress');
          activeBullet.style.width = '0%';

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
        },
        slideChangeTransitionEnd() {
          const activeBullet = document.querySelector('.swiper-pagination-bullet-active .progress');
          activeBullet.style.width = '100%';
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
    // $mainBanner.slideNext();
    if (!swiperBanner.classList.contains('pause')) {
      $mainBanner.slideNext();
    }
  }

  function runNext() {
    timeout = setTimeout(function () {
      next();
    }, waiting);
  }
  runNext();

  const controlSwiper = document.querySelector('.swiper-control');
  controlSwiper.addEventListener('click', function () {
    swiperBanner.classList.toggle('pause');
    if (!swiperBanner.classList.contains('pause')) {
      $mainBanner.slideNext();
    }
  });
  /* 메인 배너 스와이퍼(영상 제어 포함) - 끝 */

  // 메인 레퍼런스 스와이퍼
  $mainReferences = new Swiper('.main-references .swiper', {
    slidesPerView: 'auto',
    freeMode: true,
    autoplay: {
      delay: 1500,
      disableOnInteraction: false
    },
    preventInteractionOnTransition: false
  });

  // 메인 하단 SOLUTIONS & SERVICE
  const mainBottom = document.querySelector('.main-bottomContents');
  const bottomBtns = mainBottom.querySelectorAll('.bottomContents-btns a');

  bottomBtns.forEach((bottomBtn, i) => {
    bottomBtn.addEventListener('click', function (event) {
      event.preventDefault();

      index = i;
      mainBottom.classList.remove('type-1', 'type-2', 'type-3');
      // 클릭한 <a> 태그의 data-bg 속성 값을 가져옴
      const dataBg = event.currentTarget.getAttribute('data-bg');

      // $mainBottom에 data-bg 속성 값을 클래스로 추가
      if (dataBg) {
        mainBottom.classList.add(dataBg);
      }
      bottomBtns.forEach((btn) => {
        const parentLi = btn.parentElement;
        parentLi.classList.remove('active');
      });

      const clickedParentLi = event.currentTarget.parentElement;
      clickedParentLi.classList.add('active');
    });
  });

  // 5초마다 클릭 이벤트 발생
  let index = 0;
  setTimeout(() => {
    index = 1;
  }, 5000);
  setInterval(() => {
    bottomBtns[index].click();

    index++;

    // index가 마지막 요소를 넘어가면 초기화
    if (index >= bottomBtns.length) {
      index = 0;
    }
  }, 5000);

  // 페이지를 벗어날 때 interval 정리
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
  });
}

/* about ui */
function aboutUi() {
  const addressBox = document.querySelector('.address-box');
  const addressTabBtn = document.querySelectorAll('.location-tab .list a');
  addressTabBtn.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const parentLi = e.target.closest('.list');
      const relValue = tab.getAttribute('rel');

      const addressTxt = document.querySelector('.location-tab-contents > .address');

      addressBox.className = 'address-box'; // 주소 리셋
      addressBox.classList.add(relValue); // 클릭한 주소 클래스 추가

      addressTxt.textContent = '';

      switch (relValue) {
        case 'seoul':
          addressTxt.textContent = '서울특별시 금천구 두산로 70, 현대지식산업센터 A동 1807호/1808호';
          break;
        case 'busan':
          addressTxt.textContent = '부산광역시 부산진구 거제대로60번길 15 매종해달별 802호 (양정동)';
          break;
        case 'daejeon':
          addressTxt.textContent = '대전광역시 중구 성산로19번길 11 101호 (안영동)';
          break;
        case 'daegu':
          addressTxt.textContent = '대구광역시 남구 현충로5길 75 1층 (대명동)';
          break;
        case 'gwangju':
          addressTxt.textContent = '광주광역시 광산구 선운중앙로67번길 22 킹스빌 302호 (선암동)';
          break;
        default:
          addressTxt.textContent = '서울특별시 금천구 두산로 70, 현대지식산업센터 A동 1807호/1808호';
      }

      document.querySelectorAll('.location-tab .list').forEach((div) => {
        div.classList.remove('active');
      });

      if (parentLi) {
        parentLi.classList.add('active');
      }
    });
  });
}

//map
function kakakoMapInit() {
  var mapContainer = document.getElementById('companyMap'), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

  // 지도를 생성합니다
  var map = new kakao.maps.Map(mapContainer, mapOption);

  // 주소-좌표 변환 객체를 생성합니다
  var geocoder = new kakao.maps.services.Geocoder();

  let addressVar = '서울특별시 금천구 두산로 70, 현대지식산업센터 A동 1807호/1808호';

  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(addressVar, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: '<div style="width:150px;text-align:center;padding:6px 0;">POSMECCA</div>'
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      map.setCenter(coords);
    }
  });
}
