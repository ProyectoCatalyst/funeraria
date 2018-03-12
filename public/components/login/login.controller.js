(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorInicioSesion', controladorInicioSesion);

  controladorInicioSesion.$inject = ['$stateParams', '$state', '$window', 'servicioUsuarios', 'authService'];

  function controladorInicioSesion($stateParams, $state, $window, servicioUsuarios, authService) {
    let vm = this;

    vm.usuario = {};

    vm.iniciarSesion = (pusuario) => {

      let inicioCorrecto = authService.logIn(pusuario);

      if (inicioCorrecto == true){
        swal({
          title: "Inicio exitoso",
          text: "",
          icon: "success",
          button: "Aceptar"
        });
        $state.go('listarUsuarios');
      }else{
        swal({
          title: "Revise los datos",
          text: "Los datos ingresados no pertenecen a ninguna cuenta",
          icon: "error",
          button: "Aceptar"
        });
      }
    }

    vm.registrar = () => {
      $state.go('registroUsuarios');
    }
  }
})();