new Swiper('.banner__slider', {
    slidesPerView: 1,
    speed: 800,
    effect: "fade",
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.banner__arrow-next',
        prevEl: '.banner__arrow-prev',
    },

    // on: {
    //     init: sliderNumber,
    //     slideChange: sliderNumber
    // },

    pagination: {
            el: '.swiper-progressbar',
            type: "progressbar",
        },
});


