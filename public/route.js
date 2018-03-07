(() => {
  'use strict';
  angular
    // Se inyecta el ui.router y el oclazyLoad
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);
  // Inyeccción de dependencia indirecta (tipo Angular)
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  // Forma del archivo de identificarse a sí mismo (tercer tipo de inyection por parametro)
  function routing($stateProvider, $urlRouterProvider, $ocLazyLoad) {

    $stateProvider
    .state('landingPage', {
      url: '/',
      templateUrl: './components/landingPage/landinPage.view.html',
      data:{
        pageTitle: 'Inicio | Funeraria'
      }
    });

    // .state('', {
    //   url: '',
    //   templateUrl: '',
    //   resolve: {
    //     load: ['$ocLazyLoad', ($ocLazyLoad) => {
    //       return $ocLazyLoad.load('')
    //     }]
    //   },
    //   data:{
    //     pageTitle: 'lorem | lorem'
    //   },
    //   controller: '',
    //   controllerAs: 'vm'
    // })

    //Por el amor de Dios comenten esto si surge un problema raro y corran la aplicación :)
    $urlRouterProvider.otherwise('/');
  };
})();