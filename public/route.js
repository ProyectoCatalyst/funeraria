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
      data:{
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
      data:{
        pageTitle: 'Registro | Funeraria'
      },
      // controller: 'controladorRegistrarUsuario',
      // controllerAs: 'vm'
    })
    
    .state('registroDifuntos', {
      url: '/registro-difuntos',
      templateUrl: './components/difuntos/registrarDifuntos/registrarDifuntos.view.html',
      resolve: {
        load: ['$ocLazyLoad', ($ocLazyLoad) => {
          return $ocLazyLoad.load('./components/difuntos/registrarDifuntos/registrarDifuntos.controller.js')
        }]
      },
      data:{
        pageTitle: 'Registrar difuntos | Funeraria'
      },
      controller: 'controladorRegistrarDifunto',
      controllerAs: 'vm'
    })
    
    .state('listarDifuntos', {
      url: '/listar-difuntos',
      templateUrl: './components/difuntos/listarDifuntos/listarDifuntos.view.html',
      resolve: {
        load: ['$ocLazyLoad', ($ocLazyLoad) => {
          return $ocLazyLoad.load('./components/difuntos/listarDifuntos/listarDifuntos.controller.js')
        }]
      },
      data:{
        pageTitle: 'Lista difuntos | Funeraria'
      }, 
      controller: 'contrtoladorListaDifuntos',
      controllerAs: 'vm'
    })
    
    .state('editarDifuntos', {
      url: '/editar-difuntos',
      templateUrl: './components/difuntos/editarDifuntos/editarDifuntos.view.html',
      resolve: {
        load: ['$ocLazyLoad', ($ocLazyLoad) => {
          return $ocLazyLoad.load('./components/difuntos/editarDifuntos/editarDifuntos.controller.js')
        }]
      },
      params:{
        objDifuntoEditar : ''
      }, 
      data:{
        pageTitle: 'Editar difunto | Funeraria'
      },
      controller: 'controladorEditarDifuntos',
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