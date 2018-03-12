(() => {
    'use strict';
  
    angular.module('funeraria')
    .controller('controladorListarRetoques', controladorListarRetoques)
    
    controladorListarRetoques.$inject = ['$stateParams', '$state', 'servicioRetoques'];
    function controladorListarRetoques($stateParams, $state, servicioRetoques){
      let vm = this;
  
      vm.retoques = {}
  
      vm.listaRetoques = servicioRetoques.getRetoques();
  
      listarRetoques();
  
      function listarRetoques(){
        vm.listaRetoques = servicioRetoques.getRetoques();
      }
  
      vm.agregarRetoque = () => {
        $state.go('registrarRetoques');
      }
  
      vm.modificarRetoque = (pretoques) => {
        // console.log (pretoques);
        $state.go('editarRetoques', { objRetoqueMod : JSON.stringify(pretoques)});
      }
  
      vm.eliminarRetoque = (pretoques) => {
        let retoqueaeliminar = pretoques;
        servicioRetoques.deleteRetoques(retoqueaeliminar);
  
        $state.reload();
      }
    }
  })();