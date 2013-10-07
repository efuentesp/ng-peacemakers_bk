'use strict';

describe('Service: Auth', function () {

  // load the service's module
  beforeEach(module('peacemakersApp'));

  // instantiate service
  var loginService;
  beforeEach(inject(function (Auth) {
    loginService = Auth;
  }));

  it('should do something', function () {
    expect(!!Auth).toBe(true);
  });

});
