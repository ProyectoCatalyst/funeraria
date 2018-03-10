(() => {
    'use strict'

    angular
    .module('funeraria')
    .controller('controladorListarFiestas', controladorListarFiestas)

    controladorListarFiestas.$inject = ['$state', '$stateParams', 'servicioFiestas']
    function controladorListarFiestas($state, $stateParams, servicioFiestas){
        let vm = this;

        vm.listarFiestas = servicioFiestas.retornarFiestas();

        vm.agregarFiesta = () => {
            $state.go('registrarFiesta');
        }

        vm.agregarAnimadores = (pfiestas) => {
            $state.go('agregarAnimadores', {objFiestaAgregar: JSON.stringify(pfiestas)});
        }
    }
})();