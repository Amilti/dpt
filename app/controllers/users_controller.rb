class UsersController < ApplicationController
	def session_user
		@user = current_user
	end


	def index
		@users = User::getUser


	end

	def logout
		sign_out current_user
		redirect_to "/" 
	end
end