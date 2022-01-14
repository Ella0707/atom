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

$(".categories__sort-link").click(function(e) {
    e.preventDefault();
    $(".categories__sort-link").removeClass('active');
    $(this).addClass('active');
  })



$('.catalog__select-title').click(function (event) {
    $(this).toggleClass('active').next().slideToggle(300);
});


// $(".catalog__option").click(function(e) {
//     e.preventDefault();
//     $(".catalog__option").removeClass('active');
//     $(this).addClass('active');
//   })

// new Swiper('.catalog__cotnent-slider', {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     speed: 800,
//     navigation: {
//         prevEl: '.catalog__arrow-prev',
//         nextEl: '.catalog__arrow-next',
//     },

//     pagination: {
//         el: '.catalog__pagination',
//         type: "fraction",

//         formatFractionCurrent: function (number) {
//             if (number < 10) {
//                 number = "0" + number;
//             }
//             return number;
//         },
//         formatFractionTotal: function (number) {
//             if (number < 10) {
//                 number = "0" + number;
//             }
//             return number;
//         },
//     },
// });


// new Swiper('.catalog__products-slider', {
//     slidesPerView: 1,
//     spaceBetween: 20,
//     speed: 800,
//     navigation: {
//         prevEl: '.catalog__arrow-prev',
//         nextEl: '.catalog__arrow-next',
//     },

//     pagination: {
//         el: '.catalog__pagination',
//         type: "fraction",

//         formatFractionCurrent: function (number) {
//             if (number < 10) {
//                 number = "0" + number;
//             }
//             return number;
//         },
//         formatFractionTotal: function (number) {
//             if (number < 10) {
//                 number = "0" + number;
//             }
//             return number;
//         },
//     },
// });





$("#rangeSlider").ionRangeSlider();            

var $range = $(".js-range-slider"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    instance,
    min = 1000,
    max = 3000,
    from = 0,
    to = 0;

$range.ionRangeSlider({
    type: "double",
    min: min,
    max: max,
    from: 1000,
    to: 2000,
    hide_from_to: true,
    hide_min_max: true,
    onStart: updateInputs,
    onChange: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs (data) {
	from = data.from;
    to = data.to;
    
    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);	
}

$inputFrom.on("input", function () {
    var val = $(this).prop("value");
    
    // validate
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }
    
    instance.update({
        from: val
    });
});

$inputTo.on("input", function () {
    var val = $(this).prop("value");
    
    // validate
    if (val < from) {
        val = from;
    } else if (val > max) {
        val = max;
    }
    
    instance.update({
        to: val
    });
});
 


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