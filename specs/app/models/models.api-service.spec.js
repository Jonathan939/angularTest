/* models.api-service.spec.js */

(function() {
	'use strict';

	describe('API Service', function() {
		// the module's service to test
		var testService;
		// the mocked HTTP backend
		var $httpBackend;
		// the expected URL to hit for data
		var correctUrl = 'https://developer.trimet.org/ws/v2/arrivals?appID=D14BEDCD0ED1CAB4054C1C0B3&arrivals=4&json=true&locIDs=755';
		// mock return data
		var mockData = { bus: 1, result: "Success!!!" };

		// mock Config Service
		var configServiceMock = {
			tmApiKey: 'D14BEDCD0ED1CAB4054C1C0B3',
			stopNumber: 755,
			numArrivals: 4
		};


		// grab the Models module
		beforeEach(angular.mock.module('Models'));

		// provide the fake Config Service
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('configService', configServiceMock);
    }));

		// inject the API service, its http dependency, and the dependency we set up
		beforeEach(angular.mock.inject(function GetDependencies(_$httpBackend_, apiService) {
			// inject the $http tester
			$httpBackend = _$httpBackend_;
			// inject the Service we want to test
			testService = apiService;
		}));

		///////////////

		// Tests:
		it('should exist', function() {
			expect(testService).toBeDefined();
		});

		it('should return a promise with JSON data from the website', function(done) {
			// success callback
			var successCallback = function(response) {
				// response should exist
				expect(response.data).toBeDefined();
				// response should match our simplfied API return
	      expect(response.data.bus).toBe(mockData.bus);
	      expect(response.data.result).toBe(mockData.result);
	    };
			// failure callback
	    var failCallback = function(error) {
	      expect(error).toBeUndefined(); // (shouldn't happen...)
	    };

			// set up a mock GET response to intercept the app's normal response
			$httpBackend.expectGET(correctUrl).respond(200,mockData);

			// call the API
			testService.getApiDataPromise()
				.then(successCallback)
      	.catch(failCallback)
      	.finally(done);

			// execute all HTTP requests (akin to $rootScope.apply() )
			$httpBackend.flush();
		});

	}); // end of describe

}) ();
