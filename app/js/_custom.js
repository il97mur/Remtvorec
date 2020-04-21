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
		}
	  });
	} );

	$('.type-of-house__item').on('click', function(){
		$('.type-of-house__item').removeClass('type-of-house__item_active');
		$(this).toggleClass('type-of-house__item_active');
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

	});

	$('.owl-carousel').owlCarousel({
		loop:false,
		nav:true,
		margin: 50,
		center: true,
		pagination: false,
		dots: false,
		items: 1.62,
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
	})
});
