/* app.config.config-service.js */

(function () {
	'use strict';

	// service for configuration settings
	angular
    .module('Config')
    .service('configService', Configuration);

    function Configuration () {
		  var self = this;

  		// Bindable Members (app parameters)
  		self.tmApiKey = 'D14BEDCD0ED1CAB4054C1C0B3'; // API key needed to access TriMet
  		self.busName = 'Burnside/Stark';
  		self.busNumber = 20; // desired bus route
  		self.stopName = 'W Burnside & NW 23rd Westbound';
  		self.stopNumber = 755; // desired stop number
  		self.numArrivals = 4; // the desired number of upcoming bus arrivals to show
  		self.destination = 'Beaverton Transit Center';

    } // end of the config service

}) ();
