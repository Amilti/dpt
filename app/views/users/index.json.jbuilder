json.array! @users do |json, user|

	# liste des personnages jouable

	json.id user.id
	json.user_name user.user_name
	json.scores user.scores.each do |json, score|
		json.id score.id
		json.kills score.kills
		json.assists score.assists
		json.deaths score.deaths
		json.date score.created_at.strftime("%Y-%m-%d")
		json.specialisation score.specialisation.try(:id)
		json.specialisation_avatar score.specialisation.try(:avatar).try(:url)
		json.user_name score.user.user_name
	end

	json.specialisations user.specialisations.each do |json, specialisation|
		json.id specialisation.id
		json.name specialisation.name
		json.image specialisation.avatar.url
		json.character do 
			json.id specialisation.character.id
			json.name specialisation.character.name
		end
		json.user do 
			json.id specialisation.user.id
			json.user_name specialisation.user.user_name
		end
	end
end