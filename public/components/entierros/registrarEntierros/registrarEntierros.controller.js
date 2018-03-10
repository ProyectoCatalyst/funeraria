(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorRegistroEntierro', controladorRegistroEntierro);

  controladorRegistroEntierro.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorRegistroEntierro($stateParams, $state, servicioUsuarios) {
    let vm = this;

    if (!$stateParams.objDifunto) {
      $state.go('listarUsuarios');
    }

    let objsinFormatoDifunto = JSON.parse($stateParams.objDifunto);

    vm.nuevoEntierro = {};
    vm.registrarEntierro = (pnuevoEntierro) => {

      let objEntierroTem = new Entierro(pnuevoEntierro.horaInicio, pnuevoEntierro.fecha,  pnuevoEntierro.horaFin, pnuevoEntierro.lugar, pnuevoEntierro.prioridad);

      let objNuevoDifunto = new Difunto(objsinFormatoDifunto.edad, objsinFormatoDifunto.apodo, objsinFormatoDifunto.sexo, objsinFormatoDifunto.estatura);

      let aDifuntos = [objNuevoDifunto, objEntierroTem];

      let registro = servicioUsuarios.agregarEntierro(IDCliente);

      if (registro == true) {
        swal({
          title: "Registro exitoso",
          text: "Entierro registrado correctamente.",
          icon: "success",
          button: "Aceptar"
        });
      }
    }

    vm.regresar = () => {
      $state.go('listarUsuarios');
    }
  }
})();