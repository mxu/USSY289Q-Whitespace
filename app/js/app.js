var app = angular.module("app", []).config(function($routeProvider) {
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

	window.$scope = $scope;

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

	$scope.passages = [
		{
			'text': [
				"Lorem ipsum dolor sit amet, maiestatis interpretaris ut qui, graecis vivendum cu quo. An veri iracundia vituperatoribus usu, affert suavitate qui no. Sed cu wisi omnium petentium, te eum iusto pertinax, mundi iriure intellegebat sit eu. Eum no alii tractatos. Diceret euismod argumentum te pri, primis petentium salutatus ut eos, mea diceret propriae an.",
				"Vim eu ancillae repudiandae, graecis antiopam torquatos et duo. Eam ea quaeque iudicabit. Numquam suscipiantur interpretaris id vel, atqui aliquam bonorum cum no, possim contentiones in usu. Eos choro exerci feugait te, ad est aliquip adipisci repudiare. Cu dicant facilis nam, est ei amet repudiandae, mel aliquid periculis an.",
				"Ea vero soluta quo. Agam viris quidam sea an. Mea nobis apeirian perfecto ea, dolor vocibus te vis, zril dolorem per in. No dicant aliquip eam. Diam vidisse per ad, vim no dicit dissentiunt. Nisl erat consetetur te nec, vis ad dicam graece.",
				"Vel debitis denique ei, feugiat debitis invenire te his. Mei maiorum suscipiantur cu, justo eirmod eu ius. Nam id elit quas graece, ius intellegebat interpretaris eu. Dolores temporibus liberavisse an quo, no vim amet tale, est alia posse ei."
			],
			'questions': [
				{
					'text': 'What is the answer to question one?',
					'answer': 'a',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}, {
					'text': 'What is the answer to question two?',
					'answer': 'b',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}
			]
		}, {
			'text': [
				"Lorem ipsum dolor sit amet, maiestatis interpretaris ut qui, graecis vivendum cu quo. An veri iracundia vituperatoribus usu, affert suavitate qui no. Sed cu wisi omnium petentium, te eum iusto pertinax, mundi iriure intellegebat sit eu. Eum no alii tractatos. Diceret euismod argumentum te pri, primis petentium salutatus ut eos, mea diceret propriae an.",
				"Vim eu ancillae repudiandae, graecis antiopam torquatos et duo. Eam ea quaeque iudicabit. Numquam suscipiantur interpretaris id vel, atqui aliquam bonorum cum no, possim contentiones in usu. Eos choro exerci feugait te, ad est aliquip adipisci repudiare. Cu dicant facilis nam, est ei amet repudiandae, mel aliquid periculis an.",
				"Ea vero soluta quo. Agam viris quidam sea an. Mea nobis apeirian perfecto ea, dolor vocibus te vis, zril dolorem per in. No dicant aliquip eam. Diam vidisse per ad, vim no dicit dissentiunt. Nisl erat consetetur te nec, vis ad dicam graece.",
				"Vel debitis denique ei, feugiat debitis invenire te his. Mei maiorum suscipiantur cu, justo eirmod eu ius. Nam id elit quas graece, ius intellegebat interpretaris eu. Dolores temporibus liberavisse an quo, no vim amet tale, est alia posse ei."
			],
			'questions': [
				{
					'text': 'What is the answer to question one?',
					'answer': 'a',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}, {
					'text': 'What is the answer to question two?',
					'answer': 'b',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}
			]
		}, {
			'text': [
				"Lorem ipsum dolor sit amet, maiestatis interpretaris ut qui, graecis vivendum cu quo. An veri iracundia vituperatoribus usu, affert suavitate qui no. Sed cu wisi omnium petentium, te eum iusto pertinax, mundi iriure intellegebat sit eu. Eum no alii tractatos. Diceret euismod argumentum te pri, primis petentium salutatus ut eos, mea diceret propriae an.",
				"Vim eu ancillae repudiandae, graecis antiopam torquatos et duo. Eam ea quaeque iudicabit. Numquam suscipiantur interpretaris id vel, atqui aliquam bonorum cum no, possim contentiones in usu. Eos choro exerci feugait te, ad est aliquip adipisci repudiare. Cu dicant facilis nam, est ei amet repudiandae, mel aliquid periculis an.",
				"Ea vero soluta quo. Agam viris quidam sea an. Mea nobis apeirian perfecto ea, dolor vocibus te vis, zril dolorem per in. No dicant aliquip eam. Diam vidisse per ad, vim no dicit dissentiunt. Nisl erat consetetur te nec, vis ad dicam graece.",
				"Vel debitis denique ei, feugiat debitis invenire te his. Mei maiorum suscipiantur cu, justo eirmod eu ius. Nam id elit quas graece, ius intellegebat interpretaris eu. Dolores temporibus liberavisse an quo, no vim amet tale, est alia posse ei."
			],
			'questions': [
				{
					'text': 'What is the answer to question one?',
					'answer': 'a',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}, {
					'text': 'What is the answer to question two?',
					'answer': 'b',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}
			]
		}, {
			'text': [
				"Lorem ipsum dolor sit amet, maiestatis interpretaris ut qui, graecis vivendum cu quo. An veri iracundia vituperatoribus usu, affert suavitate qui no. Sed cu wisi omnium petentium, te eum iusto pertinax, mundi iriure intellegebat sit eu. Eum no alii tractatos. Diceret euismod argumentum te pri, primis petentium salutatus ut eos, mea diceret propriae an.",
				"Vim eu ancillae repudiandae, graecis antiopam torquatos et duo. Eam ea quaeque iudicabit. Numquam suscipiantur interpretaris id vel, atqui aliquam bonorum cum no, possim contentiones in usu. Eos choro exerci feugait te, ad est aliquip adipisci repudiare. Cu dicant facilis nam, est ei amet repudiandae, mel aliquid periculis an.",
				"Ea vero soluta quo. Agam viris quidam sea an. Mea nobis apeirian perfecto ea, dolor vocibus te vis, zril dolorem per in. No dicant aliquip eam. Diam vidisse per ad, vim no dicit dissentiunt. Nisl erat consetetur te nec, vis ad dicam graece.",
				"Vel debitis denique ei, feugiat debitis invenire te his. Mei maiorum suscipiantur cu, justo eirmod eu ius. Nam id elit quas graece, ius intellegebat interpretaris eu. Dolores temporibus liberavisse an quo, no vim amet tale, est alia posse ei."
			],
			'questions': [
				{
					'text': 'What is the answer to question one?',
					'answer': 'a',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}, {
					'text': 'What is the answer to question two?',
					'answer': 'b',
					'options': {
						'a': 'Option a',
						'b': 'Option b',
						'c': 'Option c',
						'd': 'Option d'
					}
				}
			]
		}
	];

	$scope.results = [];

	$scope.maxTests = $scope.passages.length;
}

var TestController = function($scope, $timeout, $location) {
	$scope.nextPassage = function() {
		$scope.startTime = new Date();
		$scope.timeTaken = null;
		var remaining = $scope.$parent.passages.length;
		if (remaining > 0) {
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
	if($scope.$parent.passages.length > 0) $location.path('home');
}