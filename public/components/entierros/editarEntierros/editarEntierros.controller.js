(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorEditarEntierro', controladorEditarEntierro)

  controladorEditarEntierro.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

  function controladorEditarEntierro($stateParams, $state, $http, servicioUsuarios) {
    let vm = this;

    if (!$stateParams.objEntierro) {
      $state.go('listarUsuarios');
    }

    let objEntierroSinFormato = JSON.parse($stateParams.objEntierro);

    let objEntierroFormato = new Entierro(objEntierroSinFormato.entierroID, objEntierroSinFormato.horaInicio, objEntierroSinFormato.horaFinal, objEntierroSinFormato.fecha, objEntierroSinFormato.lugar, objEntierroSinFormato.prioridad);
    objEntierroFormato.setCedulaCliente(objEntierroSinFormato.clienteID);
    objEntierroFormato.setIdDifunto(objEntierroSinFormato.idDifunto);

    let datos = [objEntierroFormato.getCedulaCliente(), objEntierroFormato.getIdDifunto()];

    vm.entierroEditado = {}
    vm.entierroEditado.entierroID = objEntierroFormato.entierroID; 
    // vm.entierroEditado.horaInicio = objEntierroFormato.horaInicio;
    // vm.entierroEditado.horaFin = objEntierroFormato.horaFinal;
    // vm.editarEntierro.fecha = objEntierroFormato.fecha;
    vm.entierroEditado.lugar = objEntierroFormato.lugar;
    vm.entierroEditado.prioridad = objEntierroFormato.prioridad;

    vm.editarEntierro = (pentierro) => {

      let objEntierroEditado = new Entierro(pentierro.entierroID , pentierro.horaInicio, pentierro.horaFinal, pentierro.fecha, pentierro.lugar, pentierro.prioridad);

      objEntierroEditado.setCedulaCliente(datos[0]);
      objEntierroEditado.setIdDifunto(datos[1]);
      
      let actualizarCorrecto = servicioUsuarios.actualizarEntierro(objEntierroEditado);

      if (actualizarCorrecto == true) {
        swal({
          title: "Actualización exitosa",
          text: "Entierro actualizado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('listarDifuntos');
      }
    }

    vm.regresar = () => {
      $state.go('listarDifuntos');
    }
  }
})();