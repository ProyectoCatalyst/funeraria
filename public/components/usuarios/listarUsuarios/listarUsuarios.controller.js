(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorListarUsuario', controladorListarUsuario);

  controladorListarUsuario.$inject = ['$state', '$stateParams', '$http', 'servicioUsuarios'];

  function controladorListarUsuario($state, $stateParams, $http, servicioUsuarios) {

    let vm = this;

    listarUsuarios();

    vm.listarUsuarios = servicioUsuarios.retornarUsuario();

    vm.agregarDifunto = (pusuario) => {
      $state.go('registroDifuntos', {objUsuario : JSON.stringify(pusuario)});
    };

    vm.listarDifunto = (pusuario) => {
      $state.go('listarDifuntos', {objUsuario : JSON.stringify(pusuario)});
    };

    vm.editarUsuario = (pusuario) => {
      $state.go('editarUsuarios', {objUsuario : JSON.stringify(pusuario)});
    };

    function listarUsuarios() {
      vm.listaUsuarios = servicioUsuarios.retornarUsuario();
    }
  }
})();