(function ($) {
  'use strict';

  var _sb = _sb || {};

  // Document Ready
  $(function () {
    _init();
    _initEvent();
  });

  // 정의를 내리는 부분
  function _init() {
    _sb.$topCard = $('.top-card');
    _sb.$header = $('header');
    _sb.headerHeight = _sb.$header.height();
    _sb.$search = $('.search');
    _sb.$searchInput = _sb.$search.find('input');
    _sb.$searchImg = _sb.$search.find('img');
    _sb.searchValue = '';
    _sb.ENTER_KEY = 13;
    _sb.$promotion = $('.promotion .inner');
    _sb.$togglePromotionBtn = $('.notice-line .toggle-promotion');
  }

  // 기능을 실행하는 부분
  function _initEvent() {
    toggleTopCard();
    megaMenuHandler();
    searchHandler();
    firstAnimations();
    sliderHandler();
    togglePromotionHandler();
    playTogglePromotionBtn();
  }

  function toggleTopCard() {
    $('.toggle-top-card').on({
      click: function () {
        _sb.$topCard.slideToggle(400);
      },
      mouseenter: function () {
        animateToggleTopCardBtn();
      }
    });
  }

  function animateToggleTopCardBtn() {
    // SET
    TweenMax.killChildTweensOf('.toggle-top-card');
    var cup = '.toggle-top-card .cup';
    var star = '.toggle-top-card .star';

    TweenMax.set(cup, { y: 44 });
    TweenMax.set(star, { y: -44, opacity: .6 });

    // PLAY
    TweenMax.to(cup, 1.5, { y: 5, ease: Back.easeOut.config(2) });

    var ani = new TimelineMax();
    ani.to(star, .8, { x: -12, y: -4, ease: Back.easeOut.config(2) })
      .to(star, .8, { x: -2, y: 0, ease: Back.easeOut.config(2) })
      .to(star, .4, { opacity: 1, repeat: 7, yoyo: true }, '-=1.6');
  }

  function megaMenuHandler() {
    $('.main-menu > ul > li').on({
      mouseenter: function () {
        openMegaMenu($(this));
      },
      mouseleave: function () {
        closeMegaMenu($(this));
      }
    });
  }

  function openMegaMenu($this) {
    $this.addClass('on');

    var megaHeight = $this.find('.mega-menu').height();

    _sb.$header
      .css({ borderBottomColor: '#2c2a29' })
      .stop()
      .animate({
        height: _sb.headerHeight + megaHeight
      }, 250);
  }

  function closeMegaMenu($this) {
    $this.removeClass('on');

    _sb.$header
      .css({ borderBottomColor: '#c8c8c8' })
      .stop()
      .animate({
        height: _sb.headerHeight
      }, 250);
  }

  function searchHandler() {
    _sb.$searchInput.on({
      focus: function () {
        focusSearch();
      },
      blur: function () {
        blurSearch();
      },
      keydown: function (event) {
        submitSearch($(this), event);
      }
    });

    _sb.$searchImg.on({
      click: function () {
        _sb.$searchInput.focus();
      }
    });
  }

  function focusSearch() {
    _sb.$search
      .stop()
      .animate({ width: 182 }, 600);
    _sb.$searchInput
      .stop()
      .animate({ width: 182 }, 600)
      .attr({ placeholder: '통합검색' });
    _sb.$searchImg.stop(false, true).fadeOut(600);

    if (_sb.searchValue !== '') {
      _sb.$searchInput.val(_sb.searchValue);
    }
  }

  function blurSearch() {
    _sb.$search
      .stop()
      .animate({ width: 38 }, 600);
    _sb.searchValue = _sb.$searchInput.val();
    _sb.$searchInput
      .stop()
      .animate({ width: 38 }, 600)
      .attr({ placeholder: '' })
      .val('');
    _sb.$searchImg.stop(false, true).fadeIn(600);
  }

  function submitSearch($this, event) {
    switch (event.which) {
      case _sb.ENTER_KEY:
        event.preventDefault();
        console.log( $this.val() );
        break;
    }
  }

  function firstAnimations() {
    $('.visual .fade-in').each(function (index) {
      TweenMax.to(this, 1, { opacity: 1, delay: (index + 1) * .7 });
    });
  }

  function sliderHandler() {
    $('.notice-line .slider ul').bxSlider({
        mode: 'vertical',
        pager: false,
        controls: false,
        auto: true,
        pause: 5000
    });

    _sb.promotionSlider = $('.promotion .slider ul').bxSlider({
        pager: true,
        controls: false,
        autoControls: true,
        pagerSelector: '.promotion .pager',
        autoControlsSelector: '.promotion .auto-controls',
        autoControlsCombine: true, // start와 stop중 하나만 보이고 서로 바뀌게 함.
        startText: '',
        stopText: '',
        auto: true,
        pause: 5000,
        minSlides: 1,
        maxSlides: 3,
        moveSlides: 1,
        slideWidth: 819,
        slideMargin: 10,
        onSliderLoad: function () {
            $('.promotion .slider li').removeClass('active');
            $('.promotion .slider li.first').addClass('active'); // 복사된 li가 존재하기 때문에
        },
        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
            $('.promotion .slider li').removeClass('active');
            $slideElement.addClass('active');
        }
    });

    $('.promotion .prev').on('click', function () {
        _sb.promotionSlider.goToPrevSlide();
        _sb.promotionSlider.stopAuto();
    });

    $('.promotion .next').on('click', function () {
        _sb.promotionSlider.goToNextSlide();
        _sb.promotionSlider.stopAuto();
    });

  }

  function togglePromotionHandler() {
      _sb.$togglePromotionBtn.on('click', function () {
          if (_sb.$promotion.data('opened') === 'opened') {
            closePromotion();
          } else {
            openPromotion();
          }
      });
  }

  function openPromotion() {
    _sb.$promotion
        .stop()
        .slideDown(400)
        .data({
            opened: 'opened'
        });
    _sb.promotionSlider.reloadSlider();
    pauseTogglePromotonBtn();
  }

  function closePromotion() {
      _sb.$promotion
          .stop()
          .slideUp(400, function () {
              _sb.promotionSlider.destroySlider();
          })
          .data({
              opened: ''
          });
      playTogglePromotionBtn();
  }

  function playTogglePromotionBtn() {
    TweenMax.set(_sb.$togglePromotionBtn, { scale: .9 });
    TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: 0 });
    _sb.toggleZoom = TweenMax.to(_sb.$togglePromotionBtn, 1, {
        scale: 1.1,
        repeat: -1,
        yoyo: true
    });
  }

  function pauseTogglePromotonBtn() {
      TweenMax.set(_sb.$togglePromotionBtn, { scale: 1 });
      TweenMax.to(_sb.$togglePromotionBtn, .5, { rotation: -180 });
      _sb.toggleZoom.pause();
  }

}(jQuery));