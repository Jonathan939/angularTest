/* data-services.data-service.spec.js */

(function () {
  'use strict';

  describe('Data Servicee', function() {
    // the module's service to test
    var testService;
    // the root scope (needed to trigger promise)
    var rootScope;
    // raw data holder
    var rawData = {};
    // cleaned data holder
    var cleanedData = [];
    // the API Service mock (declared now, updated later)
    var apiServiceMock = {};
    // the Config Services mock (declared now, updated later)
    var configServiceMock = {};

    // grab the Data Service module
    beforeEach(angular.mock.module('DataServices'));

    // provide the fake API Service and Config Service to it
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('apiService', apiServiceMock);
      $provide.value('configService', configServiceMock);
    }));

    // inject the service, Promise (q) service, and its dependencies
    beforeEach(angular.mock.inject(function GetDependencies(dataService, $q, $rootScope) {
      // inject $rootScope so we can set off Promises
      rootScope = $rootScope.$new();
      // inject the Service we want to test
      testService = dataService;

      // mock the working API return, now that Promises ($q) is available
      apiServiceMock.getApiDataPromise = jasmine.createSpy('getApiDataPromise').and.callFake(function() {
          // wrap the sample data in a Promise (inside 'data' object of HTTP)
          return $q.when({data:rawData});
      });

      // mock Config Services
      configServiceMock = {
        busNumber: 20
      };

      // set up the raw data object typically returned by the server ---->
      rawData = {"resultSet":{"detour":[{"route":[{"route":20,"detour":true,"type":"B","desc":"20-Burnside\/Stark"}],"info_link_url":"","end":2144451600000,"id":"42630","begin":1450111500000,"desc":"No service to the westbound stop on Burnside at NE 102nd from 8:45 a.m. until 5 p.m. weekdays only, due to 102nd Ave MAX platform rebuilding.  Use stop at 97th."},{"route":[{"route":15,"detour":true,"type":"B","desc":"15-Belmont\/NW 23rd"}],"info_link_url":"","end":2136445200000,"id":"39017","begin":1428832800000,"desc":"Buses continue to use the Hawthorne Bridge due to weight restrictions on the Morrison Bridge."}],"arrival":[{"feet":6102,"inCongestion":false,"departed":true,"scheduled":1456268301000,"loadPercentage":0,"shortSign":"15 To NW Yeon-44th","estimated":1456268303000,"detoured":true,"tripID":"6212066","dir":0,"blockID":1536,"detour":["39017"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Yeon & 44th via Montgomery Park","id":"6212066_53901_23","vehicleID":"2314","locid":755,"newTrip":false,"status":"estimated"},{"feet":12160,"inCongestion":false,"departed":true,"scheduled":1456268552000,"loadPercentage":0,"shortSign":"20 Beaverton TC","estimated":1456268639000,"detoured":true,"tripID":"6212976","dir":0,"blockID":2039,"detour":["42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to Beaverton TC","id":"6212976_54152_23","vehicleID":"2235","locid":755,"newTrip":false,"status":"estimated"},{"feet":19064,"inCongestion":false,"departed":true,"scheduled":1456269201000,"loadPercentage":0,"shortSign":"15 To Thurman","estimated":1456269307000,"detoured":true,"tripID":"6212067","dir":0,"blockID":1544,"detour":["39017"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Thurman St","id":"6212067_54801_23","vehicleID":"2228","locid":755,"newTrip":false,"status":"estimated"},{"feet":25454,"inCongestion":false,"departed":true,"scheduled":1456269687000,"loadPercentage":0,"shortSign":"20 To NW 23rd Ave","estimated":1456269610000,"detoured":true,"tripID":"6212977","dir":0,"blockID":2043,"detour":["42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to 23rd Ave to Tichner","id":"6212977_55287_23","vehicleID":"3010","locid":755,"newTrip":false,"status":"estimated"},{"feet":30028,"inCongestion":false,"departed":true,"scheduled":1456270041000,"loadPercentage":0,"shortSign":"15 To NW Yeon-44th","estimated":1456270018000,"detoured":true,"tripID":"6212068","dir":0,"blockID":1535,"detour":["39017"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Yeon & 44th via Montgomery Park","id":"6212068_55641_23","vehicleID":"2292","locid":755,"newTrip":false,"status":"estimated"},{"trackingError":{"timestamp":1456267674000,"desc":null},"feet":2783,"inCongestion":false,"departed":false,"scheduled":1456270080000,"loadPercentage":0,"shortSign":"18 Hillside","estimated":1456270080000,"detoured":false,"tripID":"6212638","dir":0,"blockID":6367,"route":18,"piece":"1","fullSign":"18  Hillside","id":"6212638_55680_23","vehicleID":"3421","locid":755,"newTrip":false,"status":"estimated"},{"feet":46110,"inCongestion":false,"departed":true,"scheduled":1456270657000,"loadPercentage":0,"shortSign":"20 Beaverton TC","estimated":1456270769000,"detoured":true,"tripID":"6212978","dir":0,"blockID":2036,"detour":["42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to Beaverton TC","id":"6212978_56257_23","vehicleID":"2269","locid":755,"newTrip":false,"status":"estimated"},{"feet":49509,"inCongestion":false,"departed":true,"scheduled":1456270881000,"loadPercentage":0,"shortSign":"15 To Thurman","estimated":1456271142000,"detoured":true,"tripID":"6212069","dir":0,"blockID":1543,"detour":["39017"],"route":15,"piece":"2","fullSign":"15  NW 23rd Ave to NW Thurman St","id":"6212069_56481_23","vehicleID":"3023","locid":755,"newTrip":false,"status":"estimated"},{"feet":null,"departed":true,"scheduled":1456271727000,"shortSign":"20 To NW 23rd Ave","detoured":true,"tripID":"6212980","dir":0,"blockID":2042,"detour":["42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to 23rd Ave to Tichner","id":"6212980_57327_23","vehicleID":null,"locid":755,"newTrip":false,"status":"scheduled"},{"feet":null,"departed":false,"scheduled":1456274280000,"shortSign":"18 Hillside","detoured":false,"tripID":"6212639","dir":0,"blockID":6367,"route":18,"piece":"1","fullSign":"18  Hillside","id":"6212639_59880_23","vehicleID":null,"locid":755,"newTrip":false,"status":"scheduled"}],"queryTime":1456267690917,"location":[{"lng":-122.69799527604,"passengerCode":"E","id":755,"dir":"Westbound","lat":45.5234914028264,"desc":"W Burnside & NW 23rd"}]}};

      // set up the resulting object returned by the Data Service ---->
      cleanedData = [{status: 'Tracking', estimatedTime: new Date('Feb 23 2016 15:03:59 GMT-0800'), scheduledTime: new Date('Feb 23 2016 15:02:32 GMT-0800') },{ status: 'Tracking', estimatedTime: new Date('Feb 23 2016 15:20:10 GMT-0800'), scheduledTime: new Date('Feb 23 2016 15:21:27 GMT-0800') },{ status: 'Tracking', estimatedTime: new Date('Feb 23 2016 15:39:29 GMT-0800'), scheduledTime: new Date('Feb 23 2016 15:37:37 GMT-0800') },{ status: 'Estimated (no real-time)', estimatedTime: null, scheduledTime: new Date('Feb 23 2016 15:55:27 GMT-0800') }];
    })); // end of dependency injection



    //////////////

    // Tests:
    it('should exist', function() {
      expect(testService).toBeDefined();
    });

    it('should return a promise with properly formatted bus data from the Rest API', function(done) {
      // success callback
      var successCallback = function(response) {
        // compare input and output strings
	      expect(response).toEqual(cleanedData);
      };

      // failure callback
      var failCallback = function(error) {
        expect(error).toBeUndefined(); // (shouldn't happen...)
        fail("Promise has errored out!"); // (shouldn't happen...)
      };

			// call the Data Services
      testService.getBusDataPromise()
				.then(successCallback)
      	.catch(failCallback)
      	.finally(done);

      // regardless of the Promise's status, the API should have been called
      expect(apiServiceMock.getApiDataPromise.calls.count()).toEqual(1);

      // set off the promise
			rootScope.$apply();

    });


  }); // end of describe

}) ();
