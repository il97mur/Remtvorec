document.addEventListener("DOMContentLoaded", function() {

	// Custom JS

	$( function() {
	  var handle = $( "#custom-handle" );
	  $( "#slider" ).slider({
		create: function() {
		  handle.text( $( this ).slider( "value" ) );
		},
		range: 'min',
		min: 20,
		max: 200,
		value: 154,
		slide: function( event, ui ) {
		  handle.text( ui.value );
		  $('.area-value').attr('value', ui.value);
		  calculate();
		},

		change: function(event, ui) {
			$('.area-value').attr('value', ui.value);
			calculate();
		}

	  });
	} );

	

	$('.type-of-house__item').on('click', function(){
		$('.type-of-house__item').removeClass('type-of-house__item_active');
		$(this).toggleClass('type-of-house__item_active');

		calculate();
	});

	$('.type-of-repair__item').on('click', function(){
		$('.type-of-repair__item').removeClass('type-of-repair__item_active');
		$('.type-of-repair__name').removeClass('type-of-repair__name_active');
		$(this).addClass('type-of-repair__item_active');
		$(this).find('.type-of-repair__name').addClass('type-of-repair__name_active');

		if ($(this).hasClass('j-cosmetic')) {
			$('.j-content').removeClass('type-of-repair__text_visible');
			$('.j-cosmetic-content').addClass('type-of-repair__text_visible');
		} else if ($(this).hasClass('j-capital')) {
			$('.j-content').removeClass('type-of-repair__text_visible');
			$('.j-capital-content').addClass('type-of-repair__text_visible');
		} else if ($(this).hasClass('j-elite')) {
			$('.j-content').removeClass('type-of-repair__text_visible');
			$('.j-elite-content').addClass('type-of-repair__text_visible');
		}

		calculate();

	});

	$('.owl-carousel').owlCarousel({
		loop:false,
		nav:true,
		margin: 50,
		center: true,
		pagination: false,
		dots: false,
		items: 1.62,
		responsive: {
			1450 : {
				items: 1.62
			},

			0: {
				items: 1,
				margin: 0
			}
		},
		// items: 1.5,
		navText : ["<", ">"]
	});

	

	

	$('.portfolio-item__img_preview').on('click', function(){
		$('.owl-item.active.center').find('.portfolio-item__img_preview').removeClass('portfolio-item__img_active');
		$(this).addClass('portfolio-item__img_active');
		var source = $(this).attr('src');
		$('.owl-item.active.center').find('.portfolio-item__img_big').fadeOut('fast', function(){
			$('.owl-item.active.center').find('.portfolio-item__img_big').attr('src', source);
		});
		$('.owl-item.active.center').find('.portfolio-item__img_big').fadeIn('fast');
	});

	$('.tariff__type').on('click', function(){
		$('.tariff__type').removeClass('tariff__type_active');
		$(this).addClass('tariff__type_active');
	});



	// Маска для ввода номера телефона

	function setCursorPosition(pos, elem) {
		elem.focus();
		if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
		else if (elem.createTextRange) {
			var range = elem.createTextRange();
			range.collapse(true);
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select()
		}
	}
	
	function mask(event) {
		var matrix = "+7 (___)-___-__-__",
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		if (def.length >= val.length) val = def;
		this.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
		if (event.type == "blur") {
			if (this.value.length == 2) this.value = ""
		} else setCursorPosition(this.value.length, this)
	};

	function telMask(input) {
		input.addEventListener("input", mask, false);
		input.addEventListener("focus", mask, false);
		input.addEventListener("blur", mask, false);
	};

	for (var i = 0; i < $('input[type="tel"]').length; i++) {
		telMask($('input[type="tel"]')[i]);
		$($('input[type="tel"]')[i]).attr('maxlength', '18')
	}


	// Валидация форм

	function validate(form) {

		// Переменные, отражающее валидность группы интутов. inputValid - для [type="text"]; telValid - для [type="tel"]
			var inputValid = false;
			var telValid = false;
		
			var input = form.find("input:not([type=checkbox]):not([type=tel])");
			var phone = form.find('input[type="tel"]');
		
			var counter = 0; // Счетчик для определения валидности группы инпутов
		
			// Добавление обработчика событий на текстовые инпуты
			for (var i = 0; i < input.length; i++) {
				input[i].addEventListener("input", function(){
		
					// Фукнция, которую выполняет обработчик
		
					// Проверка текстовых инпутов
					for (var i = 0; i < input.length; i++) {
						console.log($(input[i]).val());
		
						if ($(input[i]).val().length > 0) {
							$(input[i]).addClass('j-input_valid');
							console.log("Текстовый инпут стал валидным")
							counter++;
						}
						else {
							$(input[i]).removeClass('j-input_valid');
							counter--;
						}
					} 
		
					if (counter == input.length) 
						inputValid = true;
					else 
						inputValid = false;
					
					counter = 0;
		
					// Проверка инпутов номера телефона
					for (var i = 0; i < phone.length; i++) {
						console.log($(phone[i]).val());
		
						if ($(phone[i]).val().length == 18) {
							$(phone[i]).addClass('j-input_valid');
							console.log("Текстовый инпут стал валидным")
							counter++;
						}
						else {
							$(phone[i]).removeClass('j-input_valid');
							counter--;
						}
					} 
		
					if (counter == phone.length) 
						telValid = true;
					else
						telValid = false;
		
					counter = 0;
		
					// Условия для активации submit-кнопки
					if (inputValid == true && telValid == true) {
						form.find('[type="submit"]').removeClass('disabled');
						form.find('[type="submit"]').removeAttr('disabled');
					} else {
						form.find('[type="submit"]').addClass('disabled');
						form.find('[type="submit"]').attr('disabled', '');
					}	
				}, false);
			}
		
			// Добавление обработчика события на инпуты с номером телефона
			for (var i = 0; i < phone.length; i++) {
				phone[i].addEventListener("input", function(){
		
					// Функция, которую выполняет обработчик
		
					// Проверка инпутов номера телефона
					for (var i = 0; i < phone.length; i++) {
						console.log($(phone[i]).val());
		
						if ($(phone[i]).val().length == 18) {
							$(phone[i]).addClass('j-input_valid');
							console.log("Текстовый инпут стал валидным")
							counter++;
						}
						else {
							$(phone[i]).removeClass('j-input_valid');
							counter--;
						}
					} 
		
					if (counter == phone.length) 
						telValid = true;
					else
						telValid = false;
		
					counter = 0;
		
				// Проверка текстовых инпутов
					for (var i = 0; i < input.length; i++) {
						console.log($(input[i]).val());
		
						if ($(input[i]).val().length > 0) {
							$(input[i]).addClass('j-input_valid');
							console.log("Текстовый инпут стал валидным")
							counter++;
						}
						else {
							$(input[i]).removeClass('j-input_valid');
							counter--;
						}
					} 
		
					if (counter == input.length) 
						inputValid = true;
					else 
						inputValid = false;
					
					counter = 0;
		
		
					// Условия активации submit-кнопки
					if (inputValid == true && telValid == true) {
						form.find('[type="submit"]').removeClass('disabled');
						form.find('[type="submit"]').removeAttr('disabled');
					} else {
						form.find('[type="submit"]').addClass('disabled');
						form.find('[type="submit"]').attr('disabled', '');
					}
		
		
				}, false);
		
			}
		
		// Условия для активации submit-кнопки
			if (inputValid == true && telValid == true) {
				form.find('[type="submit"]').removeClass('disabled');
				form.find('[type="submit"]').removeAttr('disabled');
			} else {
				form.find('[type="submit"]').addClass('disabled');
				form.find('[type="submit"]').attr('disabled', '');
			}
			
		}

		for (var i = 0; i < $('form').length; i++) {
			validate($($('form')[i]));
		};


		jQuery(function($){
			$(document).mouseup(function (e){ // событие клика по веб-документу
				var div = $(".popup"); // тут указываем ID элемента
				if (!div.is(e.target) // если клик был не по нашему блоку
					&& div.has(e.target).length === 0) { // и не по его дочерним элементам
					$('.popup-wrap').fadeOut(); // скрываем его
				}
			});
		});

		$('.close').on('click', function(){
			$('.popup-wrap').fadeOut();
		})

		$('.info__get-callback-link').on('click', function(){
			$('.popup-wrap').fadeIn();
		});

		// Калькулятор

		function calculate(){
			var area = $('.area-value').attr('value');
			var typeOfHouse = $('.type-of-house__item_active').attr('data-type-k');
			var typeOfRepair = $('.type-of-repair__item_active').attr('data-price');

			var servicesPrice;
			var materialPrice;
			var price = Math.round(area*typeOfHouse*typeOfRepair);
			servicesPrice = Math.round(price*0.6);
			materialPrice = Math.round(price*0.4);

			$('.j-services').text(servicesPrice + ' р.');
			$('.j-materials').text(materialPrice + ' р.');
			$('.valuation__result-value').text(price + ' р.');

			// $('.j-services')[0].value=$('.j-services')[0].value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');

			function numberWithSpaces(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
			  }

			  numberWithSpaces($('.j-services').text());
		};

		// PARALLAX

		// CUSTOM PARALLAX

		// function customParallax(el){
		// 	var howMuchScrolled = $(window).scrollTop();
 		// 	var verticalScrollSpeed = howMuchScrolled / 4; // скорость вертикального скроллинга фона
		// 	var horizontalScrollSpeed = howMuchScrolled / 40; // скорость горизонтального скроллинга фона
			  
		// 	var scrollDown = 0 + verticalScrollSpeed;

		// 	var startPos = el.css('transform')

		// 	el.css('transform', 'translateY(' + scrollDown + 'px)')
		// };

		// $(window).scroll(customParallax($('.parallax')));

		$('.parallax').paroller();

		$(window).scroll(parallaxScrollStart);

		function parallaxScrollStart(){
			var window_top = $(window).scrollTop();
			$('.parallax').each(function(){
				if (window_top > $(this).offset().top - 500) {
					// alert($(this).attr('data-parallax-speed'));
					$(this).attr('data-paroller-factor', '0.5');
					// $(this).paroller();
				}
			})
		};
});
