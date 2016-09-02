(function(){
	'use strict';


	// SLIDER KIRED PARALAX 1.0


	function KrdSliderParalax(){

		// elemento wrapper do slider
		var wrapper = $('.wrapper-slider'),
			// elementos slides
			slidesElements = wrapper.find('.slider-slide'),
			// background a animar pelo paralax
			background = $('.section-01'),
			// elemento wrapper das bullets
			wrapperBullets = wrapper.find('.slider-bullets'),
			// width do holder / do conteudo da pagina
			defineWidth = 1090,
			// auto
			slidesQuantidade = slidesElements.length,
			currentPosition = 1,
			// empty
			bulletsElements,
			timer,
			paralaxValues = [];

		function sliderAutoTimer(){
			timer = setTimeout(function () {
				sliderMove(currentPosition + 1);
				sliderAutoTimer();
			}, 6000);
		}

		function sliderMove(pos){
			if (pos > slidesQuantidade) pos = 1;
			wrapper.stop().animate({
				'margin-left': '-' + parseInt( (pos - 1) * defineWidth )
			}, 1000);
			currentPosition = pos;
			sliderAtualizaBullets(pos);
			sliderAtualizaParalax(pos);
		}

		function sliderAddBullets(quantidade){
			for (var n = 1; n < quantidade + 1; n++){
				wrapperBullets.append('<div class="bullet" n="' + n + '"></div>');
			}
			sliderIniciaBullets();
		}

		function sliderAtualizaBullets(n){
			bulletsElements.removeClass('active');
			bulletsElements.filter('[n="' + n + '"]').addClass('active');
		}

		function sliderIniciaBullets(){
			bulletsElements = wrapperBullets.find('.bullet');
			bulletsElements.filter('[n="' + 1 + '"]').addClass('active');
		}

		function sliderClearAutoTimer(){
			clearTimeout(timer);
			sliderAutoTimer();
		}

		function sliderMapeiaParalax(){
			var fator = 32;

			var inicial = 50 - Math.ceil( (slidesQuantidade * fator) / 2 );
			for(var n = 0; n < slidesQuantidade; n++){
				paralaxValues[n] = inicial;
				inicial += fator;
			}
		}

		function sliderAtualizaParalax(pos){
			background.stop().animate({
				'background-position-x': paralaxValues[pos - 1] + '%'
			}, 1000);
		}

		function sliderIniciaParalax(){
			background.css('background-position-x', paralaxValues[0] + '%');
		}

		function sliderConfigura(){
			slidesElements.css('width', defineWidth);
			wrapper.css({
				'width': defineWidth * slidesQuantidade
			});
			sliderConfiguraClick();
		}

		function sliderConfiguraClick(){
			bulletsElements.click(function(){
				sliderClearAutoTimer();
				sliderMove( $(this).attr('n') );
			});
		}

		// para configurar passar array com os elementos
		this.sliderConfig = function(config){
			wrapper = config[0];
			slidesElements = config[1];
			background = config[2];
			wrapperBullets = config[3];
		};

		this.sliderDo = function (){
			sliderConfigura();
			sliderAddBullets(slidesQuantidade);
			sliderMapeiaParalax();
			sliderIniciaParalax();
			sliderAutoTimer();
		};

	}

	var slider01 = new KrdSliderParalax();
	slider01.sliderDo();

})();
