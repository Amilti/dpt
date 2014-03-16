
app.directive('carousel', function() {

	return {
		scope:{
			'carousel':'='
		 },
		link: function(scope, elem, attr) {
			scope.nbElem = 0
			scope.nbCurrent = 1
      		scope.$watch('carousel', function(value) {
      			if(!scope.carousel){return false}
      			scope.nbCurrent = 1
      			scope.stopCarrousel();
      			scope.nbElem = scope.carousel.length
			    scope.$evalAsync(function(){
			    	elem.find('.item:first').show();
			    	scope.play()
			    });
      		});
	  		scope.play =  function(){
				scope.timer = setTimeout(function(){ scope.next(true) },9000)
			},

			scope.stopCarrousel = function(){
				clearTimeout(scope.timer);
			},

			scope.next = function(loop){
				var current = scope.nbCurrent + 1;

				if(current > scope.nbElem){
					current = 1;
				}

				scope.gotoSlide(current);

				scope.nbCurrent = current;

				if (loop) {
					scope.play();
				}
			},
			scope.gotoSlide = function(num){
				$(".item").fadeOut();
				$(".item-"+num).fadeIn();
			}
  		}
	}
});