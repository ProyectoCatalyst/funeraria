(() => {
  'use strict';
  angular
    .module('funeraria')
    .service('sessionService', sessionService)

  function sessionService() {

    this.create = (data) => {
      this.session = data;
      sessionStorage.setItem('session', JSON.stringify(data));
    };

    this.session = () => {
      return sessionStorage.getItem('session');
    }

    this.destroy = function () {
      delete this.session;
      sessionStorage.removeItem('session');
    };
  }
})();