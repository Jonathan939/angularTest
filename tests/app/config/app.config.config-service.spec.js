/* app.config.config-service.spec.js */
(function () {
	'use strict';

	describe('Config service', function() {
		// the service to test
		var testService;

		// grab the Config module
		beforeEach(angular.mock.module('Config'));

		// inject the Config service
		beforeEach(angular.mock.inject(function (configService) {
				testService = configService;
		}));

		//////////////

		// Tests:
		it('should exist', function() {
			expect(testService).toBeDefined();
		});

		it('should return the TriMet API key', function () {
			var apiKey = testService.tmApiKey;
			expect(apiKey).toBe('D14BEDCD0ED1CAB4054C1C0B3');
		});

		it('should return all bus route details', function() {
			var busName = testService.busName;
			var busNumber = testService.busNumber;
			var stopName = testService.stopName;
			var stopNumber = testService.stopNumber; // desired stop number
			var numArrivals = testService.numArrivals; // the desired number of upcoming bus arrivals to show
			var destination = testService.destination;

			expect(busName).toBe('Burnside/Stark');
			expect(busNumber).toBe(20);
			expect(stopName).toBe('W Burnside & NW 23rd Westbound');
			expect(stopNumber).toBe(755);
			expect(numArrivals).toBe(4);
			expect(destination).toBe('Beaverton Transit Center');
		});

	}); // end of describe
}) ();
