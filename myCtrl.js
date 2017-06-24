app.controller('myCtrl', function($scope, $http) {
	$scope.loadExpenses = function() {
		$http.get("http://localhost:8080/money-be/expenses").then(function(response) {
			$scope.expenses = response.data;
		});		
	};	
	$scope.loadExpenses();
	
	$scope.loadCategories = function() {
		$http.get("http://localhost:8080/money-be/categories").then(function(response) {
			$scope.categories = response.data;
		});		
	};	
    $scope.loadCategories();

	$scope.addExpense = function(expense) {
		expense.date = moment(expense.jsDate, 'DD/MM/YYYY').unix()*1000;
		//alert(expense.value+' ; '+expense.category.name+' ; '+expense.date+' ; '+expense.jsDate);
		$http.post("http://localhost:8080/money-be/expenses", expense).then(function(response) {	
			$scope.loadExpenses();		
		});		
	};
	$scope.updateExpense = function(expense) {
		expense.date = moment(expense.jsDate, 'DD/MM/YYYY').unix()*1000;
		//alert(new Date(parseInt(x*1000))+' ; '+new Date(parseInt(x))+' ; '+d.data_js+' ; '+d.data+' ; '+new Date(parseInt(d.data)));		
		$http.put("http://localhost:8080/money-be/expenses/"+expense.id, expense).then(function(response) {	
			$scope.loadExpenses();		
		});		
	};	
	$scope.deleteExpense = function(expenseId) {				
		$http.delete("http://localhost:8080/money-be/expenses/"+expenseId).then(function(response) {	
			$scope.loadExpenses();		
		}); 		
	};	
	
	$scope.clearTempExpense = function() {
		$scope.tempExpense.id = null;
		$scope.tempExpense.value = null;
		$scope.tempExpense.date = null;
		$scope.tempExpense.jsDate = null;
		$scope.tempExpense.category.id = null;
		$scope.tempExpense.category.name = null;
	};		
	
	$scope.addButtomPressed = function() {
		$scope.currentCrudOperation = 'add';
		$scope.modalTitle = 'Nova despesa';
		$scope.modalConfirmButtomText = 'Salvar';
		$scope.modalDisabled = false;
		$scope.clearTempExpense();
		$scope.tempExpense.jsDate = new Date();
		$scope.tempExpense.date = moment($scope.tempExpense.jsDate, 'DD/MM/YYYY').unix()*1000;
	};	
	
	$scope.updateButtomPressed = function(expense) {
		$scope.currentCrudOperation = 'update';
		$scope.modalTitle = 'Alteração de despesa';
		$scope.modalConfirmButtomText = 'Salvar';
		$scope.modalDisabled = false;
		$scope.tempExpense = angular.copy(expense);
		$scope.tempExpense.jsDate = new Date(parseInt(expense.date));
	};
	
	$scope.deleteButtomPressed = function(expense) {
		$scope.currentCrudOperation = 'delete';
		$scope.modalTitle = 'Tem certeza que deseja excluir a despesa selecionada?';
		$scope.modalConfirmButtomText = 'Confirmar exclusão';
		$scope.modalDisabled = true;
		$scope.tempExpense = angular.copy(expense);
		$scope.tempExpense.jsDate = new Date(parseInt(expense.date));
	};	

	$scope.confirmButtomPressed = function(expense) {
		if ($scope.currentCrudOperation == 'add') {
			$scope.addExpense(expense);
		} else if ($scope.currentCrudOperation == 'update') {	
			$scope.updateExpense(expense);
		} else if ($scope.currentCrudOperation == 'delete') {	
			$scope.deleteExpense(expense.id);
		};
	};		
	
});