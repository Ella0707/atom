// мобильное меню
$('.header__burger').on('click', function (e) {
    e.preventDefault();
    $('.header__burger').toggleClass("active");
    $('.header__bottom').toggleClass("active");
});


// слайдеры
new Swiper('.banner__slider', {
    slidesPerView: 1,
    speed: 1500,
    // autoplay: {
    //     delay: 5000,
    // },
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.banner__arrow-next',
        prevEl: '.banner__arrow-prew',
    },

    pagination: {
        el: '.banner__pagination',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },

    breakpoints: {

        769: {
            verticalSwiping: true,
        }
    }
});


new Swiper('.categories__content', {

    slidesPerView: 1,
    speed: 800,
    slidesPerColumn: 2,
    spaceBetween: 16,
    // enabled: false,

    navigation: {
        nextEl: '.categories__arrow-next',
        prevEl: '.categories__arrow-prev',
    },

    pagination: {
        el: '.categories__pagination',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },

    breakpoints: {

        769: {
            // enabled: true,
        }
    }

});

new Swiper('.services__slider', {
    slidesPerView: 1,
    slidesOffsetAfter: 0,
    speed: 800,
    navigation: {
        prevEl: '.services__arrow-prev',
        nextEl: '.services__arrow-next',
    },

    pagination: {
        el: '.services__pagination',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },

    breakpoints: {

        769: {
            slidesOffsetAfter: 120,
            slidesPerView: 3.5,
        }
    }
});





new Swiper('.distributor__our-distr-slider', {
    slidesPerView: 1,
    speed: 800,
    spaceBetween: 28,
    navigation: {
        prevEl: '.distributor__arrow-prev',
        nextEl: '.distributor__arrow-next',
    },

    pagination: {
        el: '.distributor__our-disr-pagin',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },
});



new Swiper('.distributor__photo', {
    slidesPerView: 1,
    speed: 800,
    // spaceBetween: 40,

    pagination: {
        el: '.distributor__photo-pagin',
        clickable: true,
    },
});



new Swiper('.clients__content', {
    slidesPerView: 5,
    spaceBetween: 183,
    speed: 800,
    navigation: {
        prevEl: '.clients__arrow-prev',
        nextEl: '.clients__arrow-next',
    },

    pagination: {
        el: '.clients__pagination',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },
});

$(".categories__sort-link").click(function(e) {
    e.preventDefault();
    $(".categories__sort-link").removeClass('active');
    $(this).addClass('active');
  })



$('.catalog__select-title').click(function (event) {
    $(this).toggleClass('active').next().slideToggle(300);
});


let textSlider = new Swiper('.command__about-pipl-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 800,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    loop: true,
    navigation: {
        prevEl: '.command__about-pipl-arrow-prev',
        nextEl: '.command__about-pipl-arrow-next',
    },

    pagination: {
        el: '.command__about-pipl-pagin',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },
});


let imageSlider = new Swiper('.command__photo-pipl-slider', {
    slidesPerView: 3,
    spaceBetween: 60,
    speed: 800,
    slidesPerGroup: 1,
    loop: true,
});

textSlider.controller.control = imageSlider;
imageSlider.controller.control = textSlider;



new Swiper('.catalog__product-slider', {
    slidesPerView: 1,
    speed: 800,
    spaceBetween: 0,

    pagination: {
    el: '.catalog__product-pagination',
    clickable: true,
},
});



new Swiper('.card-product__description-slider', {
    slidesPerView: 1,
    speed: 800,
    navigation: {
        prevEl: '.card-product__arrow-prev',
        nextEl: '.card-product__arrow-next',
    },
});



$(".card-product__about-item").click(function(e) {
    e.preventDefault();
    $(".card-product__about-item").removeClass('active');
    $(this).addClass('active');
  })



  new Swiper('.product-card', {
    slidesPerView: 1,
    speed: 800,
    spaceBetween: 0,

    pagination: {
    el: '.product-card__pagination',
    clickable: true,
},
});


$(".arrow-custom").click(function(e) {
    e.preventDefault();
    $(".arrow-custom").removeClass('active');
    $(this).addClass('active');
  })



  let reviewsSlider = new Swiper('.reviews__slider', {
    slidesPerView: 2.5,
    spaceBetween: 60,
    speed: 800,
    loop: true,
    navigation: {
        prevEl: '.reviews__slide-arrow-prev',
        nextEl: '.reviews__slide-arrow-next',
    },

    pagination: {
        el: '.reviews__slide-pagination',
        type: "fraction",

        formatFractionCurrent: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
        formatFractionTotal: function (number) {
            if (number < 10) {
                number = "0" + number;
            }
            return number;
        },
    },
});



