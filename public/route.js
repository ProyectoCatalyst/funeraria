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

      .state('iniciarSesión', {
        url: '/iniciarSesion',
        templateUrl: './components/login/login.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/login/login.controller.js')
          }]
        },
        data: {
          pageTitle: 'Inicio de sesión | Funeraria'
        },
        controller: 'controladorInicioSesion',
        controllerAs: 'vm'
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
      })

      .state('registroDifuntos', {
        url: '/registroDifuntos',
        templateUrl: './components/difuntos/registrarDifuntos/registrarDifuntos.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/difuntos/registrarDifuntos/registrarDifuntos.controller.js')
          }]
        },
        data: {
          pageTitle: 'Registrar difuntos | Funeraria'
        },
        params: {
          objUsuario: ''
        },
        controller: 'controladorRegistrarDifunto',
        controllerAs: 'vm'
      })

      .state('listarDifuntos', {
        url: '/listarDifuntos',
        templateUrl: './components/difuntos/listarDifuntos/listarDifuntos.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/difuntos/listarDifuntos/listarDifuntos.controller.js')
          }]
        },
        data: {
          pageTitle: 'Lista difuntos | Funeraria'
        },
        params: {
          objUsuario: ''
        },
        controller: 'controladorListaDifuntos',
        controllerAs: 'vm'
      })

      .state('editarDifuntos', {
        url: '/editarDifuntos',
        templateUrl: './components/difuntos/editarDifuntos/editarDifuntos.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/difuntos/editarDifuntos/editarDifuntos.controller.js')
          }]
        },
        params: {
          objDifunto: ''
        },
        data: {
          pageTitle: 'Editar difunto | Funeraria'
        },
        controller: 'controladorEditarDifuntos',
        controllerAs: 'vm'
      })

      .state('registrarEntierros', {
        url: '/registrarEntierros',
        templateUrl: './components/entierros/registrarEntierros/registrarEntierros.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/entierros/registrarEntierros/registrarEntierros.controller.js')
          }]
        },
        data: {
          pageTitle: 'Registro de Entierros | Funeraria'
        },
        params: {
          objDifunto: ''
        },
        controller: 'controladorRegistroEntierro',
        controllerAs: 'vm'
      })

      .state('listarEntierros', {
        url: '/listarEntierros',
        templateUrl: './components/entierros/listarEntierros/listarEntierros.view.html',
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/entierros/listarEntierros/listarEntierros.controller.js')
          }]
        },
        data: {
          pageTitle: 'Lista de entierros | Funeraria'
        },
        params: {
          objDifunto: ''
        },
        controller: 'controladorListaEntierros',
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