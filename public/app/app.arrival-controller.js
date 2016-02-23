/* app.arrival-controller.js */

(function() {
	'use strict';

	// Controller for the BusLocation app
	angular
    .module('App')
    .controller('ArrivalController', AppController);

    // inject dependencies into the controller
    AppController.$inject = ['configService', 'dataService'];

    function AppController(config, dataStore) {
  		var self = this;

  		// Bindable Members
			self.busData = []; // holds API data once site returns
  		self.busName = config.busName;
  		self.busNumber = config.busNumber;
			self.destination = config.destination;
			self.isLoading = false;
			self.refreshBusData = refreshBusData;
  		self.stopName = config.stopName;
  		self.stopNumber = config.stopNumber;

			// initialize the page
			activate();


			////////////

			// initialization function
			function activate () {
				// intialize the bus data for the first load
				self.refreshBusData();
				console.log("Refreshing!");  // TEST!!
			}

  		// refreshes bus data on the front end (as server responds)
			function refreshBusData() {
				// mark the controller state as loading
				self.isLoading = true;

				// wait for the promised bus data from the server
				dataStore.getBusDataPromise().then(function(response) {
					// clear the old bus data
					self.busData = [];
					// load the (cleaned) response data into the controller
					self.busData = response; // (front-end will update when bus data gets updated)
					console.log("Data returned");  // TEST!!

					// clear the loading flag
					self.isLoading = false;
				});
			} // end of refresh bus data

    } // end of the arrival controller

}) ();
