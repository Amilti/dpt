class CharactersController < ApplicationController
	def index
		@characters = Character.where(enable: true)
	end
end