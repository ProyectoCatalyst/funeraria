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
        templateUrl: './components/landingPage/landingPage.view.html',
        data: {
          pageTitle: 'Inicio | Funeraria'
        }
      })

      .state('registroUsuarios', {
        url: '/registrarUsuario',
        templateUrl: './components/usuarios/registrarUsuarios/registrarUsuarios.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/registrarUsuarios/registrarUsuarios.controller.js')
          }]
        },
        data: {
          pageTitle: 'Registrar Usuario | Funeraria'
        },
        controller: 'controladorRegistrarUsuario',
        controllerAs: 'vm'
      })

      .state('listarUsuarios', {
        url: '/listarUsuarios',
        templateUrl: './components/usuarios/listarUsuarios/listarUsuarios.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/listarUsuarios/listarUsuarios.controller.js')
          }]
        },
        data: {
          pageTitle: 'Listar Usuarios | Funeraria'
        },
        controller: 'controladorListarUsuario',
        controllerAs: 'vm'
      })

      .state('editarUsuarios', {
        url: '/editarUsuarios',
        templateUrl: './components/usuarios/editarUsuarios/editarUsuarios.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/usuarios/editarUsuarios/editarUsuarios.controller.js')
          }]
        },
        data: {
          pageTitle: 'Modificar usuario | Funeraria'
        },
        params: {
          objUsuario: ''
        },
        controller: 'controladorEditarUsuario',
        controllerAs: 'vm'
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