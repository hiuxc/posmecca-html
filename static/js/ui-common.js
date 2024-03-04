$(function () {
  commonUI();
  mainUI();
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

  const scrollBtn = $('.scroll-top');
  const btn = scrollBtn.children();
  btn.on('click', function () {
    if ($('#wrapper').hasClass('main')) {
      scrollArea.animate({ scrollTop: 0 }, 800, function () {
        $(this).closest('#container').removeClass('active');
      });
    } else {
      $('html, body').animate({ scrollTop: 0 }, 500);
    }
  });
}
// 스크롤 시 header와 work 페이지 tag swiper 고정 스크립트
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
/* main ui */
function mainUI() {}
