	json.id @user.id
	json.user_name @user.user_name
	json.scores @user.scores.each do |json, score|
		json.id score.id
		json.kill score.kills
		json.assist score.assists
		json.death score.deaths
	end
