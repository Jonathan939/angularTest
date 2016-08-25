(function(){

  'use strict';

  describe('Expansion Button Directive', function() {
    // the directive to test
    var testDirective;
    // the HTML element that calls the directive
    var directiveElement;
    // the compiler service
    var compiler;
    // the scope (used to trigger the digest cycle for the direvtive)
    var scope;

    // grab the directive's module
    beforeEach(angular.mock.module('hawthorneFrontendApp'));

    // grab all HTML templates in the app
    beforeEach(angular.mock.module('ngHtml2JsPreprocessorTemplates'));

    // set up the directive
    beforeEach(angular.mock.inject(function GetDependencies($compile, $rootScope) {
      compiler = $compile;
      scope = $rootScope.$new();

      // set up the HTML element that calls the directive
      directiveElement = angular.element('<expansionbutton></expansionbutton>');

      // compile the directive
      testDirective = compiler(directiveElement)(scope);
      scope.$digest();

    }));


    //////////////////


    // Tests:
    it('should exist', function() {
      expect(testDirective).toBeDefined();
    });

    it('should create column header with an arrow', function() {
      var outerSpan = testDirective;
      expect(outerSpan).toHaveClass('haw-clickable');
      expect(outerSpan).toHaveClass('data-row-expansion');
    });

    it('should default to the right arrow icon', function (){
      var outerSpan = testDirective;
      var innerSpans = outerSpan.children('span');
      expect(innerSpans[0]).toHaveClass('glyphicon-triangle-right');
    });

    describe('when the directive element is clicked', function() {

      beforeEach(function() {
        $(testDirective).click();
      });

      it('arrow should move to the down position', function() {
        var outerSpan = testDirective;
        var innerSpans = outerSpan.children('span');
        expect(innerSpans[0]).toHaveClass('glyphicon-triangle-bottom');
      });

      describe('when the directive element is clicked again', function() {

        beforeEach(function() {
          $(testDirective).click();
        });

        it('arrow should move to the right position', function() {
          var outerSpan = testDirective;
          var innerSpans = outerSpan.children('span');
          expect(innerSpans[0]).toHaveClass('glyphicon-triangle-right');
        });

      }); // end of test directive click

    }); // end of first test directive click



  }); // end of Describe

})();
