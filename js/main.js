

// мобильное меню
$('.header__burger').on('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('lock');
    $('.header__burger').toggleClass("active");
    $('.header__bottom').toggleClass("active");
});


// открытие субменю в мобильной версии
$(".menu-item-open").click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).next(".header__nav-sub-list").toggleClass('active');
})


// каталог стрелки
$(".arrow-custom").click(function(e) {
    e.preventDefault();
    $(".arrow-custom").removeClass('active');
    $(this).addClass('active');
  })

$('.catalog__filter-open').click(function (event) {
    $(this).toggleClass('active').next().slideToggle(300);
});


$('.popup-link').click(function (e) {
    e.preventDefault();
    $('.popup').fadeIn(800);
    $('body').toggleClass('lock');
});

$('.close-popup').click(function () {
    $('.popup').fadeOut(800);
    $('body').toggleClass('lock');
});


// закрытие основного попапа в случае отправки заявки 
$('.popup-accepted').click(function () {
    $('.popup').fadeOut(800);
});


// окно "заявка принята"
$('.popup-accepted').click(function (e) {
    e.preventDefault();
    $('.accepted').fadeIn(800);
});

$('.close-popup').click(function () {
    $('.accepted').fadeOut(800);
});



  $('.catalog__select-title').click(function (event) {
    $(this).toggleClass('active').next().slideToggle(300);
});


function handleClick() {
    $(".catalog__select-list").each(function() {
      const $li = $(this).find(".catalog__select-item")
      if ($li.length > 14) {
        $(this).addClass('grid-display')
      }
    })
  }

  handleClick()


const activitySlider = new Swiper('#destroy_1', {
    slidesPerView: 1,
    speed: 800,
    slidesPerColumn: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.categories__arrow-next',
      prevEl: '.categories__arrow-prev',
    },
  
    pagination: {
      el: '.categories__pagination',
      type: 'fraction',
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
  
  if ($('#destroy_1').length) {
    if ($(window).width() >= 769) {
      activitySlider.destroy();
    }
  }


  const activitySlider2 = new Swiper('#destroy_1', {
    slidesPerView: 1,
    speed: 800,
    slidesPerColumn: 2,
    spaceBetween: 30,

    navigation: {
      nextEl: '.categories__arrow-next',
      prevEl: '.categories__arrow-prev',
    },
  
    pagination: {
      el: '.categories__pagination',
      type: 'fraction',
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
  
  if ($('#destroy_2').length) {
    if ($(window).width() >= 769) {
      activitySlider2.destroy();
    }
  }




// Поиск
  $(document).ready(function () {
    $('.header__search').click(function (event) {
        $(this).toggleClass('active').next().slideToggle(300);
    });
});



// слайдеры
new Swiper('.banner__slider', {
    verticalSwiping: true,

    slidesPerView: 1,
    speed: 1000,
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

    // breakpoints: {
    //     769: {
    //         // slidesPerView: auto,

    //         // verticalSwiping: false,
    //     }
    // }
});

new Swiper('.services__slider', {
    slidesPerView: 1,
    spaceBetween: 15,
    slidesOffsetAfter: 0,
    loop: true,
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
            slidesPerView: 3,
            spaceBetween: 0,
        }
    }
});





new Swiper('.distributor__our-distr-slider', {
    slidesPerView: 1,
    speed: 800,
    spaceBetween: 30,
    loop: true,
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

    breakpoints: {
        769: {
            spaceBetween: 28,
        }
    }
});


new Swiper('.distributor__photo', {
    slidesPerView: 1,
    speed: 800,
    loop: true,

    pagination: {
        el: '.distributor__photo-pagin',
        clickable: true,
    },
});


new Swiper('.clients__content', {
    slidesPerView: 1,
    spaceBetween: 35,
    speed: 800,
    loop: true,
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

    breakpoints: {
        769: {
            slidesPerView: 1,
            spaceBetween: 70,
            speed: 1500,

        }
    }
});



new Swiper('.product__box-slider', {
    slidesPerView: 1,
    speed: 800,

    pagination: {
        el: '.product__slide-pagination',
        clickable: true,
    },
});


new Swiper('.product-card', {
    slidesPerView: 1,
    speed: 800,

    pagination: {
        el: '.product-card__pagination',
        clickable: true,
    },
});


new Swiper('.card-product__description-slider', {
    slidesPerView: 1,
    speed: 800,
    loop: true,

    navigation: {
        prevEl: '.card-product__arrow-prev',
        nextEl: '.card-product__arrow-next',
    },
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


    new Swiper('.product-card', {
    slidesPerView: 1,
    speed: 800,
    spaceBetween: 0,

    pagination: {
    el: '.product-card__pagination',
    clickable: true,
},
});





let reviewsSlider = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    spaceBetween: 30,
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

    breakpoints: {
        769: {
            slidesPerView: 2.5,
            spaceBetween: 60,
        }
    }
});


let imageSlider = new Swiper('.command__photo-pipl-slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 800,
    
    slidesPerGroup: 1,
    loop: true,
    breakpoints: {
        769: {
            slidesPerView: 1,
            spaceBetween: 60,
            slidesPerGroup: 1,
        }
    }
});

let textSlider = new Swiper('.command__about-pipl-slider', {
    slidesPerView: 1,
    spaceBetween: 10,
    speed: 800,
    effect: 'fade',
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

    controller: {
        control: imageSlider
    },
});


// табы на странице "главная" в блоке "категории"
$(".categories__top .tab-btn-category").click(function() {
	$(".categories__top .tab-btn-category").removeClass("active").eq($(this).index()).addClass("active");
	$(".categories__content").hide().eq($(this).index()).fadeIn()
}).eq(0).addClass("active");


// табф на странице сервиса
const tabsBtn   = document.querySelectorAll(".tab-btn");
const tabsItems = document.querySelectorAll(".tab-item");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
    item.addEventListener("click", function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute("data-tab");
        let currentTab = document.querySelector(tabId);

        if( ! currentBtn.classList.contains('active') ) {
            tabsBtn.forEach(function(item) {
                item.classList.remove('active');
            });
    
            tabsItems.forEach(function(item) {
                item.classList.remove('active');
            });
    
            currentBtn.classList.add('active');
            currentTab.classList.add('active');
        }
    });
}

document.querySelector('.tab-btn').click();



$(document).ready(function () {
    var margin = 100; // переменная для контроля докрутки
    $("a").click(function () { // условия, для всех ссылок или для конкретных
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - margin + "px" // .top+margin -  минус, если нужно увеличить отступ
        }, {
            duration: 1600, // тут можно контролировать скорость
            easing: "swing"
        });
        return false;
    });
});


// Табы при наведении на странице карточка товара
function openTab(evt, cityName) {
    // Объявить все переменные
    var i, tabcontent, tablinks;

    // Получить все элементы с class="tabcontent" и скрыть их
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Получить все элементы с class="tablinks" и снять класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Показать на текущей вкладке, и добавить класс "active" по ссылке, которая откроется вкладка
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}




