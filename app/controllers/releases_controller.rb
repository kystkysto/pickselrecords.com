class ReleasesController < ApplicationController
	before_filter :authenticate_user!, :except => [:index]
	skip_before_filter :verify_authenticity_token
	respond_to :json

	def show
		@release = Release.find_by_id(params[:id])
		if @release
			render status: 200,
				json: @release
		else
			render status: 400,
				json: {msg: 'not found'}
		end
	end

	def index
		@releases = Release.all
		render status: 200,
			json: @releases
	end

	def create
		current()
		release = Release.create(param)
		write_json()
		render status: 200,
			json: release
	end

	def update
		current()
		release = Release.find_by_id(params[:id])
		release.update(param)
		write_json()
		render status: 200,
			json: release
	end

	def destroy
		@release = Release.find_by_id(params[:id])
		if @release
			@release.destroy
			write_json()
			render status: 200,
				json: params[:id]
		else
			render status: 400,
				json: {msg: 'not found'}
		end

	end

	def logo
		name = params[:file].original_filename
		directory = "public/img/release/logo"
		path = File.join(directory, name)
		File.open(path, "wb") { |f| f.write(params[:file].read) }
		render status: 200,
			json: {name: name}
	end

	def cover
		name = params[:file].original_filename
		directory = "public/img/release/cover"
		path = File.join(directory, name)
		File.open(path, "wb") { |f| f.write(params[:file].read) }
		render status: 200,
			json: {name: name}
	end

	private

	def current
		if param[:current]
			Release.all.update_all(:current => false)
		end
	end

	def param
		params.permit(:title, :current, :txt, :release, :logo, :cover, :player)
	end

	def write_json
		releases_json = []
		Release.all.reverse.each do |release|
			annonce = ""
			if release.current
				annonce = "out now"
			elsif release.release
				annonce = release.release.strftime("%d.%m.%Y")
			else
				annonce = "coming soon"
			end

			release_json = {
				"cover" => release.cover,
				"logo" => release.logo,
				"title" => release.title,
				"txt" => release.txt,
				"current" => release.current ? 1 : 0,
				"player" => release.player,
				"annonce" => annonce
			} 
			releases_json << release_json
		end

		File.open("public/data/releases.json","w") do |f|
			f.write(releases_json.to_json)
		end 
	end
end
