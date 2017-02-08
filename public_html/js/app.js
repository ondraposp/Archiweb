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

    checkWidth($(window).width());
    $(window).resize(function () {
        checkWidth($(window).width());
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
});