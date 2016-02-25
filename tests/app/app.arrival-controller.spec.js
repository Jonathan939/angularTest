/* app.arrival-controller.spec.js */

(function() {
	'use strict';

	describe('Arrival Controller', function() {
		// the Arrival Controller we plan to test
		var testController;
		// the root scope (needed to trigger promise)
		var rootScope;
		// the Data Service mock (defined now, completed later)
		var dataServiceMock = {};
		// the Configurartion Service (defined now, completed later)
		var configServiceMock = {};
		// test data holder
		var testData =[];

    // grab the Controller module
    beforeEach(angular.mock.module('App'));

		// inject Angular's Controller service, Promise (q) service, and its dependencies
    beforeEach(angular.mock.inject(function GetDependencies($controller, $q, $rootScope) {
			// inject $rootScope so we can set off Promises
			rootScope = $rootScope.$new();

			// set up the working API return, now that Promises ($q) are available
			dataServiceMock.getBusDataPromise = jasmine.createSpy('getBusDataPromise').and.callFake(function() {
					// wrap the sample data in a Promise
				 return $q.when(testData);
			});

			// set up the test data ----->
			testData = [ {status: 'Tracking', estimatedTime: new Date('Feb 19, 2016 16:16:11 GMT-0800'), scheduledTime: new Date('Fri Feb 19 2016 16:10:32 GMT-0800 (PST)') }, { status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:28:17 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:25:32 GMT-0800 (PST)') },{ status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:39:56 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:40:32 GMT-0800 (PST)') },{ status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:57:38 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:55:32 GMT-0800 (PST)') } ];



			// TO DO! Set up second batch of test data to test refresh! (once weird multi-call issue is solved...)



			// set up the Configuration service mock
			configServiceMock = {
				busName: 'Burnside/Stark',
				busNumber: 20,
				destination: 'Beaverton Transit Center',
				stopName: 'W Burnside & NW 23rd Westbound',
				stopNumber: 755
			};

			// Since controllers aren't injectable services, use Angular's Controler to instantiate it
			testController = $controller ('ArrivalController', {
				configService: configServiceMock,
				dataService: dataServiceMock
			});

    })); // end of dependency injection



		//////////////

		// Tests:
		it('should exist', function() {
			expect(testController).toBeDefined();
		});

		it('should configure itself correctly upon activation', function(done) {
			// initial variables
			var busName = testController.busName;
			var busNumber = testController.busNumber;
			var stopName = testController.stopName;
			var stopNumber = testController.stopNumber; // desired stop number
			var destination = testController.destination;
			expect(busName).toBe('Burnside/Stark');
			expect(busNumber).toBe(20);
			expect(stopName).toBe('W Burnside & NW 23rd Westbound');
			expect(stopNumber).toBe(755);
			expect(destination).toBe('Beaverton Transit Center');

			// upon initialization the controller should be in its loading state
			expect(testController.isLoading).toBe(true);

			// data array should be empty until the promise returns
			expect(testController.busData).toEqual([]);

			// the Data Service should have been called
			expect(dataServiceMock.getBusDataPromise.calls.count()).toEqual(1);

			// return the Data Service promise
			rootScope.$apply();

			// once the promise has been returned, bus data should now be available
			expect(testController.busData).toEqual(testData);

			// the Data Service should not have been called again
			expect(dataServiceMock.getBusDataPromise.calls.count()).toEqual(1);

			// the controller should not be in its loading state
			if(testController.isLoading === false) {
				done();
			}
			else {
				fail("Test controller still loading after promise completion.");
				done();
			}
		});


		// test controller's refresh state
		describe('when the bus list is refreshed', function(){

			// activate a new Refresh request for the Data Service
			beforeEach(function() {
				// reset the spy
				dataServiceMock.getBusDataPromise.calls.reset();

				// set off the refresh request
				testController.refreshBusData();
				console.log("Refreshing in test!");
			});


			it('should display a loading icon while waiting for data', function() {
				// the controller should be in its loading state
				expect(testController.isLoading).toBe(true);

				// the Data Service should have been called
				expect(dataServiceMock.getBusDataPromise.calls.count()).toEqual(1);
			});

			describe('and when data returns', function(){

				// return data from the Data Service
				beforeEach(function() {
					// set off the Data Service's Refresh promise from its inital load
					rootScope.$apply();
					console.log("Returning data in test!");
				});

				it('should correctly handle returned data', function(done) {

					// the Data Service should not have been called again
					expect(dataServiceMock.getBusDataPromise.calls.count()).toEqual(1);

					// once the promise has been returned, bus data should now be available
					expect(testController.busData).toEqual(testData);

					// the controller should not be in its loading state
					if(testController.isLoading === false) {
						done();
					}
					else {
						fail("Test controller still loading after promise completion.");
						done();
					}
				});

			}); // end of when data returns

		}); // end of when list is refreshed

	});
}) ();
