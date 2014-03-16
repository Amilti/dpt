app.directive("active", function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl){
			element.bind('click', function (e) {
				$(".animation-spec").removeClass('active')
				element.addClass('active')
			});
		}
	}
});

app.directive("checkNumber", function(){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			element.bind('keyup', function (e) {
				if(parseInt(ctrl.$viewValue) < 0){
					ctrl.$setValidity('number', false)
				}else{
					ctrl.$setValidity('number', true)
				}
			});
		}
	}
});

app.directive("activeClassement", function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs, ctrl){
			element.bind('click', function (e) {
				$("#best-player ul").removeClass('active')
				element.addClass('active')
			});
		}
	}
});

app.directive('animateOnChange', function($animate) {
	return {
		scope:{'animateOnChange':'=' },
		link: function(scope, elem, attr) {
      		scope.$watch('animateOnChange.total', function() {
      			elem.addClass('active');
			    setTimeout(function() {
			      elem.removeClass('active');
				}, 2000);
      		})  
  		}  
	}
})