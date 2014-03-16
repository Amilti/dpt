app.controller('scoresCtrl', function($scope, socket, characterData, scoreData, userData){
	$scope.enableForm = false;
	$scope.enableSpec = false;
	$scope.switchStat = false;
	$scope.user = "";
	$scope.specialisations = [];
	$scope.vote = {show: false, displayVoting: false};

	userData.getCurrentUser().then(function(user){
		$scope.user = user
		$scope.scoreForm = scoreData.getModel();
	});

	userData.getUsers().then(function(users){
		$scope.users = users
		$scope.classements = scoreData.getClassements(angular.copy($scope.users), "week");
		$scope.stats = scoreData.getStatCharacter(angular.copy($scope.users), "all");
	});


	characterData.getCharacters().then(function(characters){
		$scope.characters = characters
	});

	scoreData.listScore().then(function(scores){
		$scope.scores = scores
	});

	$scope.filterClassement = function(type){
		$scope.classements = scoreData.getClassements(angular.copy($scope.users), type);
	}

	$scope.scoreClick = function(score){
		$scope.vote = score;
		$scope.vote.user = $scope.user;
		$scope.vote.show = true;
	}

	$scope.displayVote = function(form, vote){
		if(form.$valid){
			var user = _.findWhere($scope.users, {id: vote.user.id});
			user.vote = "yes"
			$scope.vote.displayVoting = true;
		}
	}

	$scope.voting = function(user){
		if(!user.vote){
			user.vote = "yes"
		}else if(user.vote == "yes"){
			user.vote = "no"
		}else{
			user.vote = "yes"
		}

	}

	$scope.isCurrentUser = function(user){
		if(user.id == $scope.user.id){
			return true;
		}

		return false;
	}


	$scope.displaySpec = function(character){
		if(character){
			$scope.filterName = {"name": character.name}
			$scope.enableSpec = true
			$scope.specialisations = character.specialisations

		}else{
			$scope.enableSpec = false
			$scope.enableForm = false
			$scope.specialisations = []
			$scope.filterName = {"name": ""}
			$scope.filterSpec = {"name": ""}
			$scope.scoreForm = scoreData.getModel();
		}
	}

	$scope.displayForm = function(specialisation){
		$scope.scoreForm.specialisation_id = specialisation.id
		$scope.enableForm = true;
	}


	$scope.addScore = function(scoreForm, score){
		if(score.$valid){
			scoreData.addScore(scoreForm).then(function(result){
				if(result.success){
					var spec = scoreForm.specialisation_id
					scoreForm.user = $scope.user
					scoreForm.date = result.date
					scoreForm.specialisation = result.specialisation

					$scope.scores.push(angular.copy(scoreForm))
					var user = _.findWhere($scope.users, {id: scoreForm.user.id}) 

					var score_stat = angular.copy(scoreForm)
					score_stat.specialisation = scoreForm.specialisation_id
					score_stat.specialsiation_avatar = result.image
					user.scores.push(angular.copy(score_stat))

					$scope.user.scores.push(angular.copy(scoreForm))
					$scope.stats = scoreData.getStatCharacter($scope.users, "all");
					socket.emit('addScore', {score: scoreForm, user: user.id})

					var result = scoreData.updateClassement(angular.copy(scoreForm),$scope.classements)
					if(_.isObject(result) ){
						$scope.classements.push(result)
						socket.emit('addClassement', result)
					}else{
						$scope.classements[result] = scoreData.addScoreClassement(angular.copy(scoreForm), $scope.classements[result])
						delete scoreForm['user'];
						delete scoreForm['specialisation']
						socket.emit('updateClassement', {index: result, classement: scoreForm})
					}
					$scope.scoreForm = scoreData.getModel();
					$scope.scoreForm.specialisation_id = spec; 
				}
		});
		}
	}

	socket.on('broadcastScore', function(result){
		var user = _.findWhere($scope.users, {id: result.user}) 
		user.scores.push(result.score);
		$scope.scores.push(result.score);
		$scope.stats = scoreData.getStatCharacter($scope.users, "all");
	});
	socket.on('broadcastAddClassement', function(classement){
		$scope.classements.push(classement)
	});

	socket.on('broadcastUpdateClassement', function(result){
		var classement = scoreData.addScoreClassement(angular.copy(result.classement), $scope.classements[result.index])
		$scope.classements[result.index] = classement
	});
});

