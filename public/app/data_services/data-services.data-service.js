/* data-services.data-service.js */

(function () {
  'use strict';

	// the service for data services
	angular
    .module('DataServices')
    .service('dataService', DataStore);

	DataStore.$inject = ['configService', 'apiService'];

  function DataStore (config, api) {
		var self = this;

    // Bindable Members
    self.getBusDataPromise = getBusDataPromise;


    /////////////

    // process the API data and update the bus data stored in its promise
		function getBusDataPromise () {

      // get the promised response and process it
      var cleanedArrivalsPromise = api.getApiDataPromise().then(function(response) {
				var processedArrivalsData = [];
				var arrivalsDataRaw = response.data.resultSet.arrival;

        // iterate through all incoming arrivals
        for (var i = 0; i < arrivalsDataRaw.length; i++) {
					// grab the next bus arrival
	        var arrival = arrivalsDataRaw[i];

					// only keep data for the desired route
	        if (arrival.route === config.busNumber) {
	          var arrivalsData = {};

	          // store the status of the bus
	          if (arrival.status === 'estimated') {
	            arrivalsData.status = 'Tracking';
	          }
	          else if (arrival.status === 'scheduled') {
	            arrivalsData.status = 'Estimated (no real-time)';
	          }
	          else {
	            // return status straight if something weird is going on
	            arrivalsData.status = arrival.status;
	          }

	          // get the scheduled and estimated arrival times
	          if(isNaN(arrival.estimated)) {
	            arrivalsData.estimatedTime = null;
	          }
	          else {
	            arrivalsData.estimatedTime = new Date(arrival.estimated);
	          }

	          if (isNaN(arrival.scheduled)) {
	            arrivalsData.scheduledTime = null;
	          }
	          arrivalsData.scheduledTime = new Date(arrival.scheduled);

	          // attach arrival data to the data array
	          processedArrivalsData.push(arrivalsData);
	        } // end if
      	} // end of arrivals loop

				// return the cleaned data to the promise
				return processedArrivalsData;

	    }, // end of success on then()
      function (error) {
        console.error('API Error: ' + error);
        return error;
      }); // end of .then()

      // return the cleaned promise
      return cleanedArrivalsPromise;

		} // end of get bus data
  } // end of data store service

}) ();
