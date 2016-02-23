/* models.api-service.js */

(function() {
	'use strict';

	// service for the RESTful APIs
	angular
		.module('Models')
    .service('apiService', RestApis);

    RestApis.$inject = ['configService', '$http'];

    function RestApis(config, $http) {
			var self = this;

			// Bindable Members
			self.getApiDataPromise = getApiDataPromise;


			////////////

  		// get the data from the TriMet API (private)
  		var RestPromise = $http({
				method: 'GET',
				url: 'https://developer.trimet.org/ws/v2/arrivals',
				params: {
					locIDs: config.stopNumber,
					appID: config.tmApiKey,
					json: true,
					arrivals: config.numArrivals
				} // end of parameters
			}); // end of $http

  		// retrieve the TriMet API data
  		function getApiDataPromise() {
        // get the HTTP promise
  			return RestPromise;
  		}

    } // end of rest API service

}) ();
