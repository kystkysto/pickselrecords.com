(function() {
	
	'use strict';

	angular.module('Admin.controllers')

		.controller('ReleaseController',ReleaseController)

		.controller('ArtistController',ArtistController);

		//.controller('MenuController',MenuController);

	function ReleaseController (FileUploader, $sce, releases, Release) {

		var self = this;

		self.showRelease = false;

		self.logoUploader = new FileUploader({url: '/releases/logo', isHTML5: true});

		self.coverUploader = new FileUploader({url: '/releases/cover', isHTML5: true});

		self.logoUploader.onSuccessItem = function(item) {
			self.newRelease.logo = item.file.name;
		}

		self.coverUploader.onSuccessItem = function(item) {
			self.newRelease.cover = item.file.name;
		}

		self.releases = releases;

		self.newRelease = {};
		
		function current() {
			angular.forEach(self.releases, function(value, key) {
				value.current = false;
			});
		}

		function afterSave(data) {
			if(data.current) {
				current();
			}
			if(self.$index !== undefined) {
				self.releases[self.$index] = data;
			} else {
				self.releases.push(data);
			}
			self.showRelease = false;
			self.newRelease = {};
			self.$index = undefined;
			self.logoUploader.clearQueue();
			self.coverUploader.clearQueue();
		}

		self.save = function() {
			if(self.newRelease.logo || self.newRelease.cover) {
				var release = new Release(self.newRelease);
				
				if(self.newRelease.id) {
					release.$update(function(data) {
						afterSave(data);
					});
				} else {
					release.$save(function(data) {
						afterSave(data);
					});
				}
			}
		}

		self.delete = function($index,id) {
			if(id) {
				var release = new Release({id: id});
				release.$delete(function() {
					self.releases.splice($index, 1);
				});
			}
		}

		self.edit = function($index,id) {
			if(id) {
				self.newRelease = new Release.get({id: id});
				self.$index = $index;
				self.showRelease = true;
			}
		}

		self.cancel = function() {
			self.showRelease = false;
			self.newRelease = {};
			self.logoUploader.clearQueue();
			self.coverUploader.clearQueue();
		}
	}

	function ArtistController (FileUploader, artists, Artist) {

		var self = this;

		self.showArtist = false;

		self.photoUploader = new FileUploader({url: '/artists/photo', isHTML5: true});

		self.photoUploader.onSuccessItem = function(item) {
			self.newArtist.photo = item.file.name;
		}

		self.artists = artists;

		self.newArtist = {};

		function afterSave(data) {
			if(self.$index !== undefined) {
				self.artists[self.$index] = data;
			} else {
				console.log(self.artists);
			}
			self.showArtist = false;
			self.newArtist = {};
			self.$index = undefined;
			self.photoUploader.clearQueue();
		}

		self.save = function() {
			if(self.newArtist.photo) {
				var artist = new Artist(self.newArtist);
				
				if(self.newArtist.id) {
					artist.$update(function(data) {
						afterSave(data);
					});
				} else {
					artist.$save(function(data) {
						afterSave(data);
					});
				}
			}
		}

		self.delete = function($index,id) {
			if(id) {
				var artist = new Artist({id: id});
				artist.$delete(function() {
					self.artists.splice($index, 1);
				});
			}
		}

		self.edit = function($index,id) {
			if(id) {
				self.newArtist = new Artist.get({id: id});
				self.$index = $index;
				self.showArtist = true;
			}
		}

		self.cancel = function() {
			self.showArtist = false;
			self.newArtist = {};
			self.photoUploader.clearQueue();
		}
	}

/*	function MenuController(route) {

	}*/
})();