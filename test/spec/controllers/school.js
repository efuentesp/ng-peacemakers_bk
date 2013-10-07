'use strict';

describe('Controller: SchoolCtrl', function () {

  // load the controller's module
  beforeEach(module('peacemakersApp'));

  var SchoolCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchoolCtrl = $controller('SchoolCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
