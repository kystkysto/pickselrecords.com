class AdminController < ApplicationController
	before_filter :authenticate_user!
	layout :choose_layout

	def index
		
	end

	def choose_layout
		user_signed_in? ? "angular" : "application"
	end
end
