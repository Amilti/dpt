class ScoresController < ApplicationController
	respond_to :json

	def index
		@scores = Score.all.limit(10).desc('created_at')
	end

	def create
		user = current_user
		score = Score.new(params[:score])
		user.specialisations << score.specialisation
		score.user = user
		if score.save
			render json: {success: true, specialisation: score.specialisation, image: score.specialisation.avatar.url, user: user, date: score.created_at.strftime("%Y-%m-%d %H:%M:%S")}
		else
			render json: {success: false}
		end
	end

	def new
	end


end