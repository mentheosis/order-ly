var orderlyControllers = angular.module('orderlyControllers',[]);

orderlyControllers.controller('taskListCtrl', function($scope, InternalTask){
//	$scope.testData = [{'name':'test1','id':'1'},{'name':'test2','id':'2'}];
		$scope.tasks = InternalTask.$query({});
})

orderlyControllers.controller('createTaskCtrl', function($scope, InternalTask){
		var task = new InternalTask();
		task.type = "InternalTask";
		$scope.task = task;

		$scope.saveTask = function()
		{
			task.save(function(err) {
					if (err)
						$scope.err = err;
						//throw err;
			});

			task = new InternalTask();
			task.type = "InternalTask";
		}
})

/*
var Shipment = require('../models/shipment');

module.exports.postShipment = function() {

};
*/
