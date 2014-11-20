var orderlyApp = angular.module('orderlyApp',['angoose.client']);

orderlyApp.controller('orderlyCtrl', function($scope, Shipment){
//	$scope.testData = [{'name':'test1','id':'1'},{'name':'test2','id':'2'}];
		$scope.shipments = Shipment.$query({});
})

/*
var Shipment = require('../models/shipment');

module.exports.postShipment = function() {

};
*/
