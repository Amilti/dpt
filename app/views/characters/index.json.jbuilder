json.array! @characters do |json, character|

	# liste des personnages jouable

	json.id character.id
	json.name character.name
	json.avatar character.avatar.url
	json.enable character.enable 

	# liste des class pour chaque perso

	json.specialisations character.specialisations.each do |json, specialisation|
		json.id specialisation.id
		json.name specialisation.name
		json.character specialisation.character.name
		json.image specialisation.avatar.url
	end	
end