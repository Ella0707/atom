new Swiper('.banner__slider', {
    slidesPerView: 1,
    speed: 1500,
    autoplay: {
        delay: 5000,
    },
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
});





new Swiper('.services__slider', {
    slidesPerView: 3,
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





$('.catalog__select-title').click(function (event) {
    $(this).toggleClass('active').next().slideToggle(300);
  });


  new Swiper('.catalog__cotnent-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 800,
    navigation: {
        prevEl: '.catalog__arrow-prev',
        nextEl: '.catalog__arrow-next',
    },

    pagination: {
        el: '.catalog__pagination',
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