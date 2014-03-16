class Character
	include Mongoid::Document
	field :name, type: String
	field :enable, type: Boolean
	mount_uploader :avatar, AvatarUploader
	has_many :specialisations

	def self.import_avatar
		Dir.glob("public/images/*").each do |avatar|
			path = avatar.split('/')
			name =  path[2].split('.')
			cara = Character.where(name: name[0]).first
			if cara
				cara.avatar = File.open(avatar)
				cara.save

			end

		end
	end
end