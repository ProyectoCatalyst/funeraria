(() => {
  'use strict';
  angular
  .module('funeraria')
  .service('usuarioActivoService', usuarioActivoService);

  usuarioActivoService.$inject = ['servicioUsuarios', 'authService'];

  function usuarioActivoService(servicioUsuarios, authService) {

    let publicAPI = {
      usuarioActivo: _usuarioActivo
    };
    return publicAPI;

    function _usuarioActivo(){
      let listaUsuarios = servicioUsuarios.retornarUsuario();
      let usuarioActivo = authService.getAuthUser();
      let authUser;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i].getCedula() === usuarioActivo) {
          authUser = listaUsuarios[i];
        }
      }

      return authUser;
    }

  };
})();