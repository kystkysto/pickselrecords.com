class ArtistsController < ApplicationController
	before_filter :authenticate_user!, :except => [:index]
	skip_before_filter :verify_authenticity_token
	respond_to :json

	def show
		@artist = Artist.find_by_id(params[:id])
		if @artist
			render status: 200,
				json: @artist
		else
			render status: 400,
				json: {msg: 'not found'}
		end
	end

	def index
		@artists = Artist.all
		render status: 200,
			json: @artists
	end

	def create
		artist = Artist.create(param)
		write_json()
		render status: 200,
			json: artist
	end

	def update
		artist = Artist.find_by_id(params[:id])
		artist.update(param)
		write_json()
		render status: 200,
			json: artist
	end

	def destroy
		@artist = Artist.find_by_id(params[:id])
		if @artist
			@artist.destroy
			write_json()
			render status: 200,
				json: params[:id]
		else
			render status: 400,
				json: {msg: 'not found'}
		end

	end

	def photo
		name = params[:file].original_filename
		directory = "public/img/artists"
		path = File.join(directory, name)
		File.open(path, "wb") { |f| f.write(params[:file].read) }
		render status: 200,
			json: {name: name}
	end

	private

	def param
		params.permit(:name, :url, :photo)
	end

	def write_json
		artists_json = []
		Artist.all.each do |artist|
			artist_json = {
				"name" => artist.name,
				"url" => artist.url,
				"photo" => artist.photo
			} 
			artists_json << artist_json
		end

		File.open("public/data/artists.json","w") do |f|
			f.write(artists_json.to_json)
		end 
	end
end
