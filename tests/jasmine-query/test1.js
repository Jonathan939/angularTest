(function(){

  'use strict';

  describe('Stacked Percent Bar Chart Directive', function() {
    // the directive to test
    var testDirective;
    // the HTML element that calls the directive
    var directiveElement;
    // the compiler service
    var compiler;
    // the scope (used to trigger the digest cycle for the directive)
    var scope;
    // data used to test the chart directive
    var testData;

    // grab the directive's module
    beforeEach(angular.mock.module('hawthorneFrontendApp'));

    // set up the directive
    beforeEach(angular.mock.inject(function GetDependencies($compile, $rootScope) {
      compiler = $compile;
      scope = $rootScope.$new();

      // set up the test data (attach to directive's DOM scope)
      scope.testData = '[]'; // (blank at first)

      // set up the HTML element that calls the directive
      directiveElement = angular.element(
        '<stacked-percent-barchart barchartdata="testData" orientation="horizontal" useanimation="true" barsize="16" barmultiplier="4" chartwidth="200" chartheight="50" wrapperclass="test-success-class">' +
        '</stacked-percent-barchart>');

      // compile the directive
      testDirective = compiler(directiveElement)(scope);
      // initialize digest cycle to add it to DOM
      scope.$apply();
    }));


    //////////////////


    // Tests:
    it('should exist', function() {
      expect(testDirective).toBeDefined();
    });

    it('should contain the provided wrapper class', function(){
      var innerDiv = testDirective.find('div')[0];
      expect(innerDiv).toEqual('div');
      expect(innerDiv).toHaveClass('test-success-class');
    });

    it('should create an SVG with appropriate dimensions', function() {
      var svgChart = testDirective.find('svg')[0];
      expect(svgChart).toEqual('svg');
      expect(svgChart).toHaveAttr('width','200');
      expect(svgChart).toHaveAttr('height','50');
    });

    it('should not build the chart until initialized', function(){
      var bars = testDirective.find('rect');
      expect(bars.length).toBe(0);
    });

    describe('when nonzero data is detected', function() {

      beforeEach(function() {
        // trigger the watch
        scope.$apply();
        // update the data
        scope.testData = [
            {"usetype": "phantom", "percentage": 10},
            {"usetype": "booked", "percentage": 15},
            {"usetype": "used", "percentage": 30},
            {"usetype": "unknown", "percentage": 25},
            {"usetype": "unused", "percentage": 20}
          ];
          // trigger the watch
          scope.$apply();
      });

      it('should build the chart', function() {
        var bars = testDirective.find('rect');
        expect(bars.length).toBe(5);
      });

    });

  }); // end of Describe

})();
