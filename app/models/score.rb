class Score
	include Mongoid::Document
	include Mongoid::Timestamps
	field :kills,    :type => Integer
	field :assists, :type => Integer
	field :deaths, :type => Integer
	belongs_to :user
	belongs_to :specialisation

end