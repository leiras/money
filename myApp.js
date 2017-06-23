var app = angular.module('myApp', ['ngMaterial'])

.config(function($mdDateLocaleProvider) {
	
	$mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD/MM/YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function(date) {
      var m = moment(date);
      return m.isValid() ? m.format('DD/MM/YYYY') : '';
    };
	
	//$mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Março', ...];
    //$mdDateLocaleProvider.shortMonths = ['janv', 'févr', 'mars', ...];
    //$mdDateLocaleProvider.days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    //$mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

}); 


	
	