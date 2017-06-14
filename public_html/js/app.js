$(document).ready(function () {
    $('.bxslider').bxSlider({
        slideWidth: 155,
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
                $(".topbar, .pretopbar, .subtopbar").addClass('fixed');
            } else {
                $(".topbar, .pretopbar, .subtopbar").removeClass('fixed');
            }
        });
    }


    checkWidth($(window).width());

    $(window).resize(function () {
        checkWidth($(window).width());
    });




    var footTop, windowBottom, st, h;
    var partnersHeight;


    $(".bxslider img").load(function () {
        partnersHeight = $('.partners').height();
    });






    //console.log(partnersHeight);
    $('#tpl_homepage .footer').css('margin-top', partnersHeight); //hardcoded

    if ($('#tpl_homepage').length
            && $(window).width() > em(40)) {
        $(window).scroll(function () {

            partnersHeight = $('.partners').height();
            $('#tpl_homepage .footer').css('margin-top', partnersHeight); //hardcoded

            footTop = $('#tpl_homepage .footer').offset().top;

            st = $(this).scrollTop();
            h = window.innerHeight;

            windowBottom = st + h;
            if (footTop <= windowBottom) {
                $("#tpl_homepage .partners").css('bottom', windowBottom - footTop);
            } else {
                $("#tpl_homepage .partners").css('bottom', 0);
            }
        });
    }

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

            //pokud je obrazek zmenseny, zmensi se vyska i sirka

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



    $(".fancybox_video").fancybox({
        padding: 0,
        openEffect: 'elastic',
        openSpeed: 150,
        nextEffect: 'elastic',
        clickOutside: 'close',
        buttons: [
            'close'
        ],
        afterLoad: function (links, index) {

            var video = $('.fancybox-slide--inline video').get(0);
            setTimeout(function () {
                video.play();
            }, 500);
        }
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


    $('.topbar .icon:not(.cal)').bind("click", function () {
        toggleSubmenubar($(this));
    });

    $('.topbar .icon:not(.cal)').bind("mouseenter", function () {
        toggleSubmenubar($(this));
    });

    $('.topbar .icon:not(.cal)').bind("mouseleave", function () {
        if ($('.subtopbar:hover').length == 0) {
            toggleSubmenubar($(this));
        }
    });

    function em(input) {
        var emSize = parseFloat($("body").css("font-size"));
        return (emSize * input);
    }

    function px(input) {
        var emSize = parseFloat($("body").css("font-size"));
        return (input / emSize);
    }

    function toggleSubmenubar(bar) {

        if (!bar.hasClass('active')) {
            $('.topbar .icon').removeClass('active');
            $('.subtopbar').height();

            $('.subtopbar').removeClass('open');
            $('.' + bar.data('bar')).addClass('open');
            $('.' + bar.data('bar')).css('opacity', 0.99); // fix: band under transparent subtopbar (z-index problem..)                

            bar.addClass('active');
            $('.pretopbar').addClass('subtopbaropen');
        }
    }

    //SLIDER

    $(".mainslider").makeSlider({
        time: 5000,
        control: false
    });


    if ($('.ddd').length) {
        $(".ddd").dotdotdot({
            watch: true
        });
    }
});

(function ($) {
    $.fn.makeSlider = function (options) {

        var settings = $.extend({
            time: 5000,
            dots: true,
            control: true,
            autoplay: true,
            movtime: 300
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

            mySlider.find(".carousel .slide.active").fadeIn(settings.movtime);


            setTimeout(function () {
                $('.carousel .slide:not(.active)').hide();
            }, settings.movtime * 0.95); // konstanta kvuli prevenci probliknuti



        }

        function doTransitionReverse() {

            $('.carousel').addClass('moving');

            $(nextSlide).show();
            $(nowSlide).fadeOut(settings.movtime);
            currentInd.removeClass('active');
            $(nextInd).addClass("active");


            setTimeout(function () {

                $(nowSlide).removeClass("active");
                $(nextSlide).addClass("active");

                $('.carousel').removeClass('moving');
            }, settings.movtime);
        }

        function pushSlide() {

            if ($(nowSlide).index() > $(nextSlide).index()) {
                doTransitionReverse();
            } else {

                $(nowSlide).removeClass("active");
                $(nextSlide).addClass("active");
                currentInd.removeClass('active');
                $(nextInd).addClass("active");
                doTransition();
            }
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

        var lastSlide;
        var delay = settings.movtime;
        var timer;
        //var setTimeoutConst;

        mySlider.find('.carousel-tab').each(function () {
            var $a = $(this).find('li');

            //console.log('hola');

            $a.on('mouseenter', function (e) { //ondrap
                lastSlide = $a;

                var $this = $(this);

                clearTimeout(timer);

                timer = setTimeout(function () {







                    //  if (!$('.carousel.moving').length) {

                    if (settings.dots == true) {




                        var actualSlide = mySlider.find('.carousel .slide.active');


                        if ($this.index() != actualSlide.index()) {



                            clearInterval(slideTimer);
                            //slideTimer = window.setInterval(slide, settings.time);
                            slideTimer = window.setInterval(slide, 99999999);


                            var href = $this.attr('data-slide-to');

                            var $target = mySlider.find(".carousel").find('[data-slide="' + href + '"]');
                            console.log('hola2');
                            if ($target.length) {

                                e.preventDefault();



                                if ($this.index() > actualSlide.index()) {
                                    $this.siblings('li').removeClass('active');
                                    $this.addClass('active');
                                    $target.siblings('.slide').removeClass('active');

                                    $('.carousel').addClass('moving');

                                    setTimeout(function () {
                                        $('.carousel').removeClass('moving');

                                        actualSlide.hide();
                                    }, settings.movtime);

                                    $target.addClass('active').fadeIn(settings.movtime);

                                } else if ($this.index() < actualSlide.index()) {
                                    $('.carousel').addClass('moving');

                                    $target.show();

                                    $this.siblings('li').removeClass('active');
                                    $this.addClass('active');

                                    actualSlide.fadeOut(settings.movtime);

                                    setTimeout(function () {
                                        $target.siblings('.slide').removeClass('active');

                                        $('.carousel').removeClass('moving');

                                        $target.addClass('active');

                                    }, settings.movtime);
                                }

                            }
                        }
                    }
                    //  }
                }, delay);







            });


            $('.mainslider').on('mouseleave', function (e) {
                clearInterval(slideTimer);
                //slideTimer = window.setInterval(slide, settings.time);
                slideTimer = window.setInterval(slide, settings.time);
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