$(document).ready(function () {
    $('.bxslider').bxSlider({
        slideWidth: 150,
        minSlides: 2,
        maxSlides: 8,
        moveSlides: 1,
        slideMargin: 0,
        randomStart: true,
        auto: true
    });

    $('.bxslider_gallery').bxSlider({
        pagerCustom: '#bx-pager'
    });

    // top bar with menu - fixed
    function checkWidth(winwidth) {

        $(window).scroll(function () {
            var p = $('.pretopbar').height();
            var o = $(window).scrollTop();

            if (o > p) {
                $(".topbar, .pretopbar").addClass('fixed');
            } else {
                $(".topbar, .pretopbar").removeClass('fixed');
            }
        });
    }


    // partners bar - fixed
    /*function fixPartners(winwidth) {
     $(window).scroll(function () {
     var p = $('.pretopbar').height();
     var t = $('.topbar').height();
     var b = $('.body').height();
     var ps = $('.partners').height();
     //var w = $(window).height();
     var w = window.innerHeight;
     
     var o = $(window).scrollTop();
     
     
     if (o > p + t + b - w) {
     $(".partners").removeClass('fixed');
     } else {
     $(".partners").addClass('fixed');
     }
     });
     }*/

    checkWidth($(window).width());
    //fixPartners($(window).width());

    $(window).resize(function () {
        checkWidth($(window).width());
        //fixPartners($(window).width());
    });




    var footTop, windowBottom, st, h;
    //var partnersh = $('#tpl_homepage .partners').outerHeight();
    $('#tpl_homepage .footer').css('margin-top', 165); //hardcoded

    $(window).scroll(function () {
        footTop = $('#tpl_homepage .footer').offset().top;

        st = $(this).scrollTop();
        //h = $(this).height();
        h = window.innerHeight;

        windowBottom = st + h;
        if (footTop <= windowBottom) {
            $("#tpl_homepage .partners").css('bottom', windowBottom - footTop);
        } else {
            $("#tpl_homepage .partners").css('bottom', 0);
        }
    });




    var max = 0;
    $('.survey .option').each(function () {
        if ($(this).data('votes') > max)
            max = $(this).data('votes');
    });

    var coef = 0.75;
    $('.survey .option').each(function () {
        var width = $(this).find('.bar').innerWidth();
        var data = $(this).data('votes');

        $(this).find('.bar').css('border-right-width', (width + 5 - (width * (data / max) * coef)) + 'px');
    });

    $('.showmore, .showless').bind("click", function () {
        if ($('.showmore_set').hasClass("open")) {
            $('.showmore_set').slideUp(400);
            $('.showmore_set').removeClass("open");
            $('.showless').hide();
            $('.showmore').show();
        } else {
            $('.showmore_set').slideDown(400);
            $('.showmore_set').addClass("open");
            $('.showmore').hide();
            $('.showless').show();
        }
    });

    var padding_lightbox = 100;
    var description_width = 400;

    var maxWidth = window.innerWidth - padding_lightbox;
    var maxHeight = window.innerHeight - padding_lightbox;


    $(".fancybox").fancybox({
        padding: 0,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        fitToView: false,
        autoSize: false,
        beforeLoad: function () {

            var img_width = parseInt(this.element.data("fancybox-width"));
            var img_height = parseInt(this.element.data("fancybox-height"));
            var real_height = img_height;
            var real_width = img_width;

            var hcoef = 1;
            var vcoef = 1;

            if (img_height > maxHeight) {
                real_height = maxHeight;

                hcoef = img_height / maxHeight;
            }

            if (img_width > (maxWidth - description_width)) {
                real_width = maxWidth - description_width;

                vcoef = img_width / maxWidth;
            }

            /*pokud je obrazek zmenseny, zmensi se vyska i sirka*/

            if (hcoef > 1
                    || vcoef > 1) {
                if (vcoef > hcoef) {
                    real_height = img_height / vcoef;
                    real_width = (img_width / vcoef);
                } else {
                    real_height = img_height / hcoef;
                    real_width = (img_width / hcoef);
                }
            }

            this.width = real_width + description_width;
            this.height = real_height;
        },
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });

    $('.js_menu .item').bind("click", function () {
        var menuitem = $(this);
        $('.js_menu .item').removeClass('active');

        if (!menuitem.hasClass('active')) {
            $('.inzeraty .cat.open').slideUp(400, 'easeOutQuad', function () {
                $(this).removeClass('open');
                $('[data-cat_list="' + menuitem.data("cat") + '"]').slideDown(400, 'easeInQuad');
                $('[data-cat_list="' + menuitem.data("cat") + '"]').addClass('open');
            });
        }

        menuitem.addClass('active');
    });


    $('.topbar .icon').bind("click", function () {
        toggleSubmenubar($(this));
    });

    $('.topbar .icon').bind("mouseenter", function () {
        toggleSubmenubar($(this));
    });

    $('.topbar .icon').bind("mouseleave", function () {
        if ($('.subtopbar:hover').length == 0) {
            toggleSubmenubar($(this));
        }
    });

    /*
     var myOrbit;
     
     $(".orbit").orbit({
     afterLoadComplete: function() {
     myOrbit = this;
     }
     });
     
     */


    //$('.slider.orbit').foundation();
    /*
     $('.orbit-bullets').bind('mouseenter', function () {
     //$(this).foundation('_reset');
     $('.orbit').data('use-m-u-i', 'false');
     });
     
     $('.orbit-bullets').bind('mouseleave', function () {
     //$(this).foundation('_reset');
     $('.orbit').data('use-m-u-i', 'true');
     });*/

    var timeout;

    var slideId;
    var el;

    $('.orbit-bullets button').bind('mouseenter', function () {





        /* timeout = setTimeout(function () {
         var but = $(this);
         var slideId = $(this).data('slide');
         var el = $('.orbit-slide[data-slide="' + slideId + '"]');
         $('.orbit').foundation('changeSlide', true, el, slideId);
         }, 2000);
         */















        var but = $(this);


        slideId = but.data('slide');


        timeout = setTimeout(function () {
            el = $('.orbit-slide[data-slide="' + slideId + '"]');
            console.log('slide id: ' + slideId + '  -  ' + timeout);
            //if (!but.hasClass('is-active')) {

            if ($('.orbit-slide.is-active').length) {

                $('.orbit').foundation('changeSlide', true, el, slideId);
            }

            // clearTimeout();


            for (i = 0; i < 100; i++)
            {
                window.clearTimeout(i);
            }

        }, 500);





    }/*, function () {
     clearTimeout(timeout);
     // do stuff when hover off
     }*/);



    /*$('.topbar .icon').bind("click", function() {
     if ($(this).hasClass('active')) {
     $(this).removeClass('active');
     }
     
     
     });*/


    function toggleSubmenubar(bar) {

        if (!bar.hasClass('active')) {
            $('.topbar .icon').removeClass('active');
            $('.subtopbar').slideUp(500);
            $('.' + bar.data('bar')).slideDown(500);
            bar.addClass('active');
        } else {
            $('.topbar .icon').removeClass('active');
            $('.subtopbar').slideUp(500);
            bar.removeClass('active');
        }
    }


    $(".ddd").dotdotdot({
        watch: true
    });
});