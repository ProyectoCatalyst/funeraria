(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorListaEntierros', controladorListaEntierros);

  controladorListaEntierros.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorListaEntierros($stateParams, $state, servicioUsuarios) {
    let vm = this;

    if (!$stateParams.objDifunto) {
      $state.go('listarUsuarios');
    }

    let objDifuntoSinFormato = JSON.parse($stateParams.objDifunto);
    let objDifuntoFormato = new Difunto(objDifuntoSinFormato.difuntoID, objDifuntoSinFormato.edad, objDifuntoSinFormato.apodo, objDifuntoSinFormato.sexo, objDifuntoSinFormato.estatura);

    vm.difunto = objDifuntoFormato.apodo;

    let datos = [objDifuntoSinFormato.clienteID, objDifuntoFormato.getDifuntoID()];
    vm.listarEntierros = servicioUsuarios.retornarEntierro(datos);

    vm.agregarFiesta = (pentierro) => {
      $state.go('registrarFiesta', { objDifunto: JSON.stringify(objDifuntoSinFormato) });
    }
    vm.agregarRetoques = (pentierro) => {
      $state.go('agregarRetoques', { objDifunto: JSON.stringify(objDifuntoSinFormato) });
    }
    vm.editarEntierro = (pentierro) => {
      $state.go('editarEntierro', { objEntierro: JSON.stringify(pentierro) });
    }
    vm.editarEntierro = () => {
      $state.go('listarDifuntos');
    }
  }
})();