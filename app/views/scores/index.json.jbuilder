json.array! @scores do |json, score|

	# liste des personnages jouable

	json.id score.id
	json.kills score.kills
	json.assists score.assists
	json.deaths score.deaths
	json.date score.created_at.strftime("%Y-%m-%d %H:%M:%S")
	json.user  do
		json.id score.user.id
		json.user_name score.user.user_name
	end
	json.specialisation do 
		json.id score.specialisation.try(:id)
		json.name score.specialisation.try(:name)
	end

end