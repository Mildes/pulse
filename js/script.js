const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
});
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});

function toggleSlide(item) {
    $(item).each(function (i) {
        $(this).on('click', function (e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });
};
toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//Modal
const validateForms = (form) => {
    $(form).validate({
        rules: {
            name: 'require',
            phone: 'require',
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: 'Пожалуйста, введите свое имя',
            phone: 'Пожалуйста, введите свой номер телефона',
            email: {
                required: 'Пожалуйста, введите свой e-mail',
                email: 'Неправильно введен e-mail адрес'
            }
        }
    });
};

$('[data-modal=consultation]').click((e) => {
    e.preventDefault();
    $('.overlay, #consultation').fadeIn();
});

$('.modal__close').click((e) => {
    e.preventDefault();
    $('.overlay, #consultation, #thanks, #order').fadeOut();
});

$('.button_mini').each((i, e) => {
    $(e).click((ev) => {
        ev.preventDefault();
        $('#order .modal__descr').text($(e).text());
        $('.overlay, #order').fadeIn();
    });
});

$('form').submit((e) => {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(e.currentTarget).serialize()
    }).done(() => {
        $(e.currentTarget).find('inpute').val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
    });
    return false;
});

(() => {
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask('+7 (999) 999-99-99');
})();

//Scroll and pageup
$(window).scroll(function () {
    if ($(this).scrollTop() > 600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});
$("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});
new WOW().init();