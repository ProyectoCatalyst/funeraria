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

      let objEntierroTem = new Entierro(pnuevoEntierro.entierroID, pnuevoEntierro.horaInicio, pnuevoEntierro.fecha, pnuevoEntierro.horaFin, pnuevoEntierro.lugar, pnuevoEntierro.prioridad);

      let objNuevoDifunto = new Difunto(objsinFormatoDifunto.difuntoID, objsinFormatoDifunto.edad, objsinFormatoDifunto.apodo, objsinFormatoDifunto.sexo, objsinFormatoDifunto.estatura);

      objNuevoDifunto.setCedulaCliente(objsinFormatoDifunto.clienteID);
      objEntierroTem.setCedulaCliente(objsinFormatoDifunto.clienteID);
      objEntierroTem.setIdDifunto(objNuevoDifunto.difuntoID);
      
      let datos = [objNuevoDifunto, objEntierroTem];

      let registro = servicioUsuarios.agregarEntierro(datos);

      if (registro == true) {
        swal({
          title: "Registro exitoso",
          text: "Entierro registrado correctamente.",
          icon: "success",
          button: "Aceptar"
        });
        vm.nuevoEntierro = null;
        $state.go('listarDifuntos');
      }
    }

    vm.regresar = () => {
      $state.go('listarDifuntos');
    }
  }
})();