/* data-services.data-service.spec.js */

(function () {
  'use strict';

  describe('Data Servicee', function() {
    // the module's service to test
    var dataService;
    // the root scope (needed to trigger promise)
    var $rootScope;
    // raw data holder
    var rawData = {};
    // cleaned data holder
    var cleanedData = [];
    // the API Service mock (instantiated now, updated later)
    var apiServiceMock = {};
    // the Config Services mock (instantiated now, updated later)
    var configServiceMock = {};

    // grab the Data Service module
    beforeEach(angular.mock.module('DataServices'));

    // provide the fake API Service to it
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('apiService', apiServiceMock);
    }));

    // provide the fake Config Service to it
    beforeEach(angular.mock.module(function ($provide) {
      $provide.value('configService', configServiceMock);
    }));

    // inject the service, Promise (q) service, and its dependencies
    beforeEach(angular.mock.inject(function GetDependencies(_dataService_, $q, _$rootScope_) {
      // inject $rootScope so we can set off Promises
      $rootScope = _$rootScope_.$new();
      // inject the Service we want to test
      dataService = _dataService_;

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
      rawData = {"resultSet":{"detour":[{"route":[{"route":12,"detour":true,"type":"B","desc":"12-Barbur\/Sandy Blvd"},{"route":19,"detour":true,"type":"B","desc":"19-Woodstock\/Glisan"},{"route":20,"detour":true,"type":"B","desc":"20-Burnside\/Stark"}],"info_link_url":"","end":1456189200000,"id":"43893","begin":1455382800000,"desc":"The stop on NE 16th at Sandy will be closed for construction from 9 a.m. Saturday February 13, 2016 through 5 p.m. Monday February 22.  Use temporary stop 150 feet south."},{"route":[{"route":20,"detour":true,"type":"B","desc":"20-Burnside\/Stark"}],"info_link_url":"","end":2144451600000,"id":"42630","begin":1450111500000,"desc":"No service to the westbound stop on Burnside at NE 102nd from 8:45 a.m. until 5 p.m. weekdays only, due to 102nd Ave MAX platform rebuilding.  Use stop at 97th."},{"route":[{"route":15,"detour":true,"type":"B","desc":"15-Belmont\/NW 23rd"}],"info_link_url":"","end":2136445200000,"id":"39017","begin":1428832800000,"desc":"Buses continue to use the Hawthorne Bridge due to weight restrictions on the Morrison Bridge."},{"route":[{"route":15,"detour":true,"type":"B","desc":"15-Belmont\/NW 23rd"}],"info_link_url":"","end":1456185600000,"id":"43990","begin":1455811200000,"desc":"No service to the stop on SW Morrison at 17th from 8 a.m. to 4 p.m. weekdays, due to grinding and paving.  Use stop at 16th or on Burnside at NW 19th."}],"arrival":[{"feet":10280,"inCongestion":false,"departed":true,"scheduled":1455927032000,"loadPercentage":0,"shortSign":"20 Beaverton TC","estimated":1455927371000,"detoured":true,"tripID":"6212979","dir":0,"blockID":2038,"detour":["43893","42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to Beaverton TC","id":"6212979_58232_19","vehicleID":"2252","locid":755,"newTrip":false,"status":"estimated"},{"feet":11877,"inCongestion":false,"departed":true,"scheduled":1455926961000,"loadPercentage":0,"shortSign":"15 To Thurman","estimated":1455927578000,"detoured":true,"tripID":"6212071","dir":0,"blockID":1537,"detour":["39017","43990"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Thurman St","id":"6212071_58161_19","vehicleID":"2282","locid":755,"newTrip":false,"status":"estimated"},{"feet":15189,"inCongestion":false,"departed":true,"scheduled":1455927801000,"loadPercentage":0,"shortSign":"15 To NW Yeon-44th","estimated":1455927831000,"detoured":true,"tripID":"6212072","dir":0,"blockID":1505,"detour":["39017","43990"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Yeon & 44th via Montgomery Park","id":"6212072_59001_19","vehicleID":"2602","locid":755,"newTrip":false,"status":"estimated"},{"feet":20518,"inCongestion":false,"departed":true,"scheduled":1455927932000,"loadPercentage":0,"shortSign":"20 Beaverton TC","estimated":1455928097000,"detoured":true,"tripID":"6212981","dir":0,"blockID":2044,"detour":["43893","42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to Beaverton TC","id":"6212981_59132_19","vehicleID":"2243","locid":755,"newTrip":false,"status":"estimated"},{"feet":26647,"inCongestion":false,"departed":true,"scheduled":1455928521000,"loadPercentage":0,"shortSign":"15 To Thurman","estimated":1455928664000,"detoured":true,"tripID":"6212073","dir":0,"blockID":1539,"detour":["39017","43990"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Thurman St","id":"6212073_59721_19","vehicleID":"2284","locid":755,"newTrip":false,"status":"estimated"},{"feet":11385,"inCongestion":false,"departed":false,"scheduled":1455928680000,"loadPercentage":0,"shortSign":"18 Hillside","estimated":1455928680000,"detoured":false,"tripID":"6212639","dir":0,"blockID":6367,"route":18,"piece":"1","fullSign":"18  Hillside","id":"6212639_59880_19","vehicleID":"3419","locid":755,"newTrip":false,"status":"estimated"},{"feet":34280,"inCongestion":false,"departed":true,"scheduled":1455928832000,"loadPercentage":0,"shortSign":"20 Beaverton TC","estimated":1455928796000,"detoured":true,"tripID":"6212982","dir":0,"blockID":2037,"detour":["43893","42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to Beaverton TC","id":"6212982_60032_19","vehicleID":"2296","locid":755,"newTrip":false,"status":"estimated"},{"feet":46194,"inCongestion":false,"departed":true,"scheduled":1455929361000,"loadPercentage":0,"shortSign":"15 To NW Yeon-44th","estimated":1455929736000,"detoured":true,"tripID":"6212074","dir":0,"blockID":1540,"detour":["39017","43990"],"route":15,"piece":"1","fullSign":"15  NW 23rd Ave to NW Yeon & 44th via Montgomery Park","id":"6212074_60561_19","vehicleID":"2214","locid":755,"newTrip":false,"status":"estimated"},{"feet":53106,"inCongestion":false,"departed":true,"scheduled":1455929732000,"loadPercentage":null,"shortSign":"20 Beaverton TC","estimated":1455929858000,"detoured":true,"tripID":"6212983","dir":0,"blockID":2040,"detour":["43893","42630"],"route":20,"piece":"1","fullSign":"20  Burnside\/Stark to Beaverton TC","id":"6212983_60932_19","vehicleID":"3016","locid":755,"newTrip":false,"status":"estimated"},{"feet":null,"departed":false,"scheduled":1455932880000,"shortSign":"18 Hillside","detoured":false,"tripID":"6212640","dir":0,"blockID":6367,"route":18,"piece":"1","fullSign":"18  Hillside","id":"6212640_64080_19","vehicleID":null,"locid":755,"newTrip":false,"status":"scheduled"}],"queryTime":1455926508124,"location":[{"lng":-122.69799527604,"passengerCode":"E","id":755,"dir":"Westbound","lat":45.5234914028264,"desc":"W Burnside & NW 23rd"}]}};

      // set up the resulting object returned by the Data Service ---->
      cleanedData = [ {status: 'Tracking', estimatedTime: new Date('Feb 19, 2016 16:16:11 GMT-0800'), scheduledTime: new Date('Fri Feb 19 2016 16:10:32 GMT-0800 (PST)') }, { status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:28:17 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:25:32 GMT-0800 (PST)') },{ status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:39:56 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:40:32 GMT-0800 (PST)') },{ status: 'Tracking', estimatedTime: new Date('Fri Feb 19 2016 16:57:38 GMT-0800 (PST)'), scheduledTime: new Date('Fri Feb 19 2016 16:55:32 GMT-0800 (PST)') } ];

    })); // end of dependency injection



    //////////////

    // Tests:
    it('should exist', function() {
      expect(dataService).toBeDefined();
    });

    it('should return a promise with properly formatted bus data from the Rest API', function(done) {
      // success callback
      var successCallback = function(response) {
        // compare input and output strings
	      expect(response).toEqual(cleanedData);
        done();
      };

      // failure callback
      var failCallback = function(error) {
        expect(error).toBeUndefined(); // (shouldn't happen...)
        done();
      };

			// call the Data Services
      dataService.getBusDataPromise()
				.then(successCallback)
      	.catch(failCallback)
      	.finally(done);

      // regardless of the Promise's status, the API should have been called
      expect(apiServiceMock.getApiDataPromise).toHaveBeenCalled();

      // set off the promise
			$rootScope.$apply();

    });


  }); // end of describe

}) ();
