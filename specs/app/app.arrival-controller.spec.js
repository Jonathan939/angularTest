/* app.arrival-controller.spec.js */

(function() {
	'use strict';

	describe('Arrival Controller', function() {
		// the Arrival Controller we plan to test
		var testController;
		// the root scope (needed to trigger promise)
		var $rootScope;
		// the Data Service mock (defined now, completed later)
		var dataServiceMock = {};
		// the Configurartion Service (defined now, completed later)
		var configServiceMock = {};
		// test data holder
		var testData =[];

    // grab the Controller module
    beforeEach(angular.mock.module('App'));

		// inject Angular's Controller service, Promise (q) service, and its dependencies
    beforeEach(angular.mock.inject(function GetDependencies($controller, $q, _$rootScope_) {
			// inject $rootScope so we can set off Promises
			$rootScope = _$rootScope_.$new();

			// set up the working API return, now that Promises ($q) are available
			dataServiceMock.getBusDataPromise = jasmine.createSpy('getBusDataPromise').and.callFake(function() {
					// wrap the sample data in a Promise
				 return $q.when(testData);
			});

			// set up the test data ----->
			testData = [ {status: 'Tracking', estimatedTime: new Date('Feb 19, 2016 16:16:11 GMT-0800'), scheduledTime: new Date('Fri Feb 19 2016 16:10:32 GMT-0800 (PST)') }, { status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:28:17 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:25:32 GMT-0800 (PST)') },{ status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:39:56 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:40:32 GMT-0800 (PST)') },{ status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:57:38 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:55:32 GMT-0800 (PST)') } ];

			// set up the Configuration service mock
			configServiceMock = {
				busName: 'Burnside/Stark',
				busNumber: 20,
				destination: 'Beaverton Transit Center',
				stopName: 'W Burnside & NW 23rd Westbound',
				stopNumber: 755
			};

			// Since controllers aren't injectable services, use Angular's Controler service used to instantiate it
			testController = $controller ('ArrivalController', {
				configService: configServiceMock,
				dataService: dataServiceMock
			});

    })); // end of dependency injection



		//////////////

		// Tests:
		it('should exist', function() {
			expect(testController).toBeDefined();




			// all tests set off 'activate' function! Need to confirm its finish before next function is called!
			// SET UP 'DATA RECEIVED' console.log AS DONE STATE!! (Using Spy?) (detecting change of variable?)







		});

		it('should list line parameters from Configuration', function() {
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
		});

		it('should initialize to an empty array for future bus data', function() {
			// upon initialization the controller should be in its loading state
			expect(testController.isLoading).toBe(true);

			// data array should be empty until the promise returns
			var data = testController.busData;
			expect(data).toEqual([]);

			$rootScope.$apply();

			// once the promise has been returned, bus data should now be available
			expect(data).toEqual(testData);

			// the controller should not be in its loading state
			expect(testController.isLoading).toBe(false);
		});

		it('should display a loading status while waiting for a refresh', function() {


			// activate the Refresh request for the Data Service
			testController.refreshBusData();

			// regardless of the Promise's status, the Data Service should have been called
			expect(dataServiceMock.getBusDataPromise).toHaveBeenCalled();

			// until the promise returns, the controller should be in its loading state
			expect(testController.isLoading).toBe(true);

			// set off the Data Service's Refresh promise
			$rootScope.$apply();

			// as the promise has been returned, bus data should now be available
			var data = testController.busData;
			expect(data).toEqual(testData);

			// the controller should not be in its loading state
			expect(testController.isLoading).toBe(false);
		});

		it('should correctly display the schedule info even when values are missing', function() {
			pending('Waiting on sample data with missing values to mock this properly');
		});


		it('should display a loading icon while waiting for data', function() {
			pending('Not sure how to test this, or if we should...');
		});

	});

}) ();
