var app = angular.module("app", ["firebase"]).config(function($routeProvider) {
	$routeProvider.when('/test', {
		templateUrl: 'templates/test.html',
		controller: 'TestController'
	});

	$routeProvider.when('/end', {
		templateUrl: 'templates/end.html',
		controller: 'EndController'
	});

	$routeProvider.otherwise({
		redirectTo : '/home',
		templateUrl: 'templates/home.html'
	});
});

var MainCtrl = function($scope, $location) {
	$scope.startTests = function() {
		$location.path('/test');
	}

	window.$s = $scope;

	var passageRef = new Firebase('https://ussy289q.firebaseio.com/passages');
	$scope.metrics = [
		{
			'name': 'Word Spacing',
			'css': ['word-spacing'],
			'min': 0,
			'max': 32
		},
		{
			'name': 'Line Height',
			'css': ['line-height'],
			'min': 16,
			'max': 64
		},
		{
			'name': 'Section Spacing',
			'css': ['margin-bottom'],
			'min': 0,
			'max': 64
		},
		{
			'name': 'Side Margins',
			'css': ['margin-left', 'margin-right'],
			'min': 0,
			'max': 64
		}
	];
	$scope.results = [];
	$scope.maxTests = $scope.metrics.length;
	$scope.loadingData = true;
	passageRef.once('value', function(snap) {
		$scope.passages = snap.val();
		$scope.loadingData = false;
		$scope.$apply();
	});
}

var TestController = function($scope, $timeout, $location) {

	window.$t = $scope;

	$scope.nextPassage = function() {
		if ($scope.$parent.passages == undefined) {
			$location.path('home');
			return;
		}
		var remaining = $scope.$parent.passages.length;
		if (remaining > 0) {
			$scope.startTime = new Date();
			$scope.timeTaken = null;
			$scope.passage = $scope.$parent.passages.splice(remaining * Math.random(), 1)[0];
			$scope.metric = $scope.$parent.metrics.splice(remaining * Math.random(), 1)[0];
			$scope.testValue = $scope.metric.min + Math.round(Math.random() * ($scope.metric.max - $scope.metric.min));
			$scope.testStyle = {};
			for (var prop in $scope.metric.css) {
				$scope.testStyle[$scope.metric.css[prop]] = $scope.testValue + 'px';
			}
		} else {
			$location.path('end');
		}
	}

	$scope.doneReading = function() {
		$scope.timeTaken = new Date() - $scope.startTime;
		$scope.question = $scope.passage.questions.splice(0, 1)[0];
		$scope.$parent.results.push({
			'time': $scope.timeTaken,
			'answers': []
		});
	}

	$scope.select = function(letter) {
		$scope.$parent.results[$scope.$parent.results.length - 1].answers.push(letter == $scope.question.answer);
		$scope.question = $scope.passage.questions.splice(0, 1)[0];
		if($scope.question == null)
			$scope.nextPassage();
	}

	$scope.nextPassage();
}

var EndController = function($scope, $location) {
	if($scope.$parent.passage == undefined || $scope.$parent.passages.length > 0) $location.path('home');
}