var app = angular.module("app", ["firebase"]).config(function($routeProvider) {
	$routeProvider.when('/test', {
		templateUrl: 'templates/test.html',
		controller: 'TestController'
	});

	$routeProvider.when('/end', {
		templateUrl: 'templates/end.html',
		controller: 'EndController'
	});

	$routeProvider.when('/analysis', {
		templateUrl: 'templates/analysis.html',
		controller: 'AnalysisController'
	});

	$routeProvider.when('/gen', {
		templateUrl: 'templates/gen.html',
		controller: 'GenController'
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
	var myTimeout = null;

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

	$scope.nextQuestion = function() {
		if($scope.passage.questions.length > 0) {
			$scope.question = $scope.passage.questions.splice(0, 1)[0];
			$scope.counter = 30;
			myTimeout = $timeout($scope.onTimeout, 1000);
		} else {
			$scope.question = null;
			$scope.nextPassage();
		}
	}

	$scope.onTimeout = function() {
		$scope.counter--;
		if($scope.counter < 1) {
			$scope.select(null);
		} else {
			myTimeout = $timeout($scope.onTimeout, 1000);
		}
	}

	$scope.doneReading = function() {
		$scope.timeTaken = new Date() - $scope.startTime;
		$scope.$parent.results.push({
			'time': $scope.timeTaken,
			'metric': $scope.metric.name,
			'value': $scope.testValue,
			'score': 0,
			'maxScore': $scope.passage.questions.length
		});
		$scope.nextQuestion();
	}

	$scope.select = function(letter) {
		if(letter == $scope.question.answer)
			$scope.$parent.results[$scope.$parent.results.length - 1].score++;
		$timeout.cancel(myTimeout);
		$scope.nextQuestion();
	}

	$scope.nextPassage();
}

var AnalysisController = function($scope) {
	window.$a = $scope;

	$scope.data = {
		"Line Height" : [],
		"Word Spacing" : [],
		"Section Spacing" : [],
		"Side Margins": []
	}

	var raw = null;
	var uRef = new Firebase('https://ussy289q.firebaseio.com/userData');
	uRef.once('value', function(snap) {
		raw = snap.val();
		for(u in raw) {
			var results = raw[u].results;
			for(r in results) {
				$scope.data[results[r].metric].push({
					'x': results[r].value, 
					'y1': results[r].time,
					'y2': results[r].score
				});
			}
		}
		$scope.$apply();
	});
}

var GenController = function($scope) {
	window.$g = $scope;

	$scope.getResult = function() {
		var results = [];
		for(i in $scope.$parent.metrics) {
			var metric = $scope.$parent.metrics[i];
			results[i] = {
				'metric': metric.name,
				'score': Math.round(Math.random() * 6),
				'maxScore': 7,
				'time': Math.round(100000 + 500000 * Math.random()),
				'value': Math.round(metric.min + (metric.max - metric.min) * Math.random())
			}
		}
		var resultRef = new Firebase('https://ussy289q.firebaseio.com/userData').push();
		resultRef.set({
			'results': results
		});
	}
}

var EndController = function($scope, $location) {
	if($scope.$parent.results.length < 4) $location.path('home');
	var resultRef = new Firebase('https://ussy289q.firebaseio.com/userData').push();
	resultRef.set({
		'results': $scope.$parent.results
	});
}