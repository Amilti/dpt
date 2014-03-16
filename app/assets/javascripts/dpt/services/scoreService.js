app.factory('scoreData', function($http, $q){
	return {
		addScore: function(score){
			var deferred = $q.defer();
			$http({method: 'POST', url: '/scores', data: {score: score}}).
				success(function(data, status, headers, config){
					deferred.resolve(data)
				}).
				error(function(data, status, headers, config){
					deferred.reject(status)
				});

			return deferred.promise;
		},

		getModel: function(){
			return {"kills": "", "assists": "", "deaths": "","specialisation_id": ""}
		},

		listScore: function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: '/scores.json'}).
				success(function(data, status, headers, config){
					deferred.resolve(data)
				}).
				error(function(data, status, headers, config){
					deferred.reject(status)
				});

			return deferred.promise;
		},

		to_object: function(result){
			return {
				"id": result.score._id,
				"kills": result.score.kills,
				"assists": result.score.assists,
				"deaths": result.score.deaths,
				"date": result.score.created_at,
				"user": {
					"id": result.user._id,
					"user_name": result.user.user_name
				},
			}
		},

		getClassementModel: function(user){
			return {user: user, totalKill: 0, totalAssist: 0, totalDeath: 0, total: 0}
		},

		findUserClassement: function(score, classements){
			var classement = this.getClassementModel(score.user);
			var current = this
			var result = "";
			_.each(classements, function(classement, index){
				if(classement.user.id == score.user.id){
					result = index
					return result
				}
			});
			if(!_.isNumber(result) ){
				result =  current.addScoreClassement(score, classement)
			}
			return result
		},

		getClassements: function(users, type){
			var current = this;
			var classements = []
			_.each(users, function(user){
				var classement = current.getClassementModel(user);
				user.scores = current.filterType(user.scores, type)
				_.each(user.scores, function(score){
					classement = current.addScoreClassement(score, classement)
				});
				classements.push(classement)
			});
			return classements;
		},

		filterType: function(scores, type){
			moment().lang('fr');
			if(type == "all"){ return scores}
			var result = [];
			var begin = moment().startOf(''+type+'');
			var end = moment().endOf(''+type+'');
			_.each(scores, function(score, index){
				if(moment(score.date) >= begin && moment(score.date) <= end){
					result.push(score)
				}
			});	

			return result
		},

		classementTotalCalcul: function(score){
			return (score.kills + score.assists * 0.5) - score.deaths 
		},

		addScoreClassement: function(score, classement){
			classement.totalKill += score.kills;
			classement.totalAssist += score.assists;
			classement.totalDeath += score.deaths;
			classement.total += this.classementTotalCalcul(score)

			return classement;
		},
		updateClassement: function(score, classements){
			return this.findUserClassement(score, classements)
		},
		getPartyStat: function(user){
		},

		getStatCharacter: function(users, type){
			var current = this
			var tab = [];
			_.each(users, function(user, index){
				user.scores = current.filterType(user.scores, type)
				tab.push(current.getBestSpec(user));
			});
			tab = _.reject(tab, function(carrousel){ 
				if(!carrousel.specialisation){
						return carrousel
				}
			});
			return tab;
		},

		getBestSpec: function(user){
			var result = {};
			result.user = user.user_name;
			var max = 0;
			var current = this;
			scores = _.reject(user.scores, function(score){ 
				if(_.isNull(score.specialisation) ){
					return score
				}
			});
			scores = _.groupBy(scores, function(score){ 
				return score.specialisation; 
			});

			scores = _.toArray(scores)
			_.each(scores, function(spec, index){
				var moyenne = 0;
				_.each(spec, function(score, index){
					moyenne += current.classementTotalCalcul(score)
				});
				if(moyenne / spec.length > max){
					max = moyenne
					result.moyenne = moyenne / spec.length
					result.specialisation = spec[0].specialisation
					result.specialisation_url = spec[0].specialisation_avatar
					result.nbParty = spec.length
				}
			});

			return result
		},

		testBind: function(users){
			users[0] = "";
			users.splice(users[0],1)
		}


	}
})