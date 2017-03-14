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
    /*
     var timeout;
     
     var slideId;
     var el;
     
     $('.carousel-tab li').bind('mouseenter', function () {
     */

    /* timeout = setTimeout(function () {
     var but = $(this);
     var slideId = $(this).data('slide');
     var el = $('.orbit-slide[data-slide="' + slideId + '"]');
     $('.orbit').foundation('changeSlide', true, el, slideId);
     }, 2000);
     */




//        var but = $(this);
//        slideId = but.data('slide-to');
//        timeout = setTimeout(function () {
//            el = $('.slide[nr-slide="' + slideId + '"]');
//            console.log('slide id: ' + slideId + '  -  ' + timeout);
//            //if (!but.hasClass('is-active')) {
//
//            if ($('.slide.active').length) {
//                $('.orbit').foundation('changeSlide', true, el, slideId);
//            }

    // clearTimeout();


//            for (i = 0; i < 100; i++)
//            {
//                window.clearTimeout(i);
//            }
//
//        }, 500);


    //}/*, function () {
    //clearTimeout(timeout);
    // do stuff when hover off
    //});*/



    /*$('.topbar .icon').bind("click", function() {
     if ($(this).hasClass('active')) {
     $(this).removeClass('active');
     }
     
     
     });*/


    //SLIDER

    $(".mainslider").makeSlider({
        time: 5000,
        control: false
    });


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

(function ($) {
    $.fn.makeSlider = function (options) {

        var settings = $.extend({
            time: 500,
            dots: true,
            control: true,
            autoplay: true,
            movtime: 500
        }, options);

        var mySlider = this;
        var slideTimer;
        var listOfSlides = mySlider.find(".carousel .slide").toArray();
        var nowSlide = listOfSlides[0];
        var listaInd = mySlider.find(".carousel-tab li").toArray();
        var currentInd = listaInd[0];
        var nextSlide;
        var index = 0;
        var count = ($('.carousel .slide').length) - 1;

        function checkIndex() {
            if (index < count) {
                index++;
                nextSlide = listOfSlides[index];
                nextInd = listaInd[index];
            } else {
                index = 0;
                nextSlide = listOfSlides[0];
                nextInd = listaInd[0];
            }
        }

        function doTransition() {

            $('.carousel').addClass('moving');

            setTimeout(function () {
                $('.carousel').removeClass('moving');
            }, settings.movtime);



            mySlider.find(".carousel .slide").each(function () {
                if ($(this).hasClass("active")) {
                    $(this).fadeIn(settings.movtime);
                } else {
                    $(this).fadeOut(settings.movtime);
                }
            });
        }

        function pushSlide() {
            $(nowSlide).removeClass("active");
            $(nextSlide).addClass("active");
            currentInd.removeClass('active');
            $(nextInd).addClass("active");
            doTransition();
        }

        function slide() {
            nowSlide = mySlider.find(".carousel .slide.active");
            currentInd = mySlider.find(".carousel-tab li.active");
            checkIndex();
            pushSlide();
        }

        if (settings.control == true) {

            mySlider.find('.control_next').click(function () {
                clearInterval(slideTimer);
                slideTimer = window.setInterval(slide, settings.time);
                currentInd = mySlider.find(".carousel-tab li.active");
                checkIndex();
                mySlider.find(".carousel .slide").removeClass('active');
                pushSlide();
            });

            mySlider.find('.control_prev').click(function () {
                clearInterval(slideTimer);
                slideTimer = window.setInterval(slide, settings.time);
                currentInd = mySlider.find(".carousel-tab li.active");
                if (index > 0) {
                    index--;
                    nextSlide = listOfSlides[index];
                    nextInd = listaInd[index];
                } else {
                    index = count;
                    nextSlide = listOfSlides[count];
                    nextInd = listaInd[count];
                }
                mySlider.find(".carousel .slide").removeClass('active');
                pushSlide();
            });
        } else {
            mySlider.find(".control").hide();
        }

        mySlider.find('.carousel-tab').each(function () {
            var $a = $(this).find('li');
            $a.on('mouseenter', function (e) { //ondrap

                if (!$('.carousel.moving').length) {

                    if (settings.dots == true) {

                        mySlider.find('.carousel .slide.active').hide();
                        clearInterval(slideTimer);
                        slideTimer = window.setInterval(slide, settings.time);
                        var $this = $(this);

                        var href = $this.attr('data-slide-to');

                        var $target = mySlider.find(".carousel").find('[nr-slide="' + href + '"]');

                        if ($target.length) {
                            e.preventDefault();

                            $this.siblings('li').removeClass('active');

                            $this.addClass('active');

                            $target.siblings('.slide').removeClass('active');

                            $('.carousel').addClass('moving');

                            setTimeout(function () {
                                $('.carousel').removeClass('moving');
                            }, settings.movtime);

                            $target.addClass('active').fadeIn(settings.movtime);
                        }
                    }
                }

            });
        });



        $(document).ready(function () {
            index = 0;

            if (settings.autoplay == true) {
                slideTimer = window.setInterval(slide, settings.time);
                doTransition();
            } else {
                mySlider.find(".slide").hide();
                mySlider.find(".slide.active").show();
            }

            if (settings.dots != true) {
                mySlider.find(".carousel-tab").hide();
            }

        });
    }
}(jQuery));