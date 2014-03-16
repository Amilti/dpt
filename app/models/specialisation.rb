class Specialisation
	include Mongoid::Document
	field :name, type: String
	belongs_to :character
	belongs_to :user
	mount_uploader :avatar, AvatarUploader

	def self.import_avatar
		Dir.glob("public/images/*").each do |avatar|
			path = avatar.split('/')
			name =  path[2].split('.')
			cara = Specialisation.where(name: name[0]).first
			if cara
				cara.avatar = File.open(avatar)
				cara.save

			end

		end
	end

	def self.import_avatar_id
		Dir.glob("public/images/*").each do |avatar|
			path = avatar.split('/')
			name =  path[2].split('.')
			cara = Specialisation.where(id: name[0]).first
			if cara
				cara.avatar = File.open(avatar)
				cara.save

			end

		end
	end
end