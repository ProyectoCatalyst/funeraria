(() => {
    'use strict';

    angular
    .module('funeraria')
    .controller('controladorListaAnimadores', controladorListaAnimadores)

    controladorListaAnimadores.$inject = ['$state', '$stateParams', 'servicioAnimadores']
    function controladorListaAnimadores($state, $stateParams, servicioAnimadores){
        let vm = this;

        vm.listarAnimadoresAct = servicioAnimadores.retornarAnimadoresAct();
        vm.listarAnimadoresDesact = servicioAnimadores.retornarAnimadoresDesact();

        vm.editarAnimadores = (panimadores) => {
            let animadoresLS = servicioAnimadores.retornarAnimadores();

            panimadores.estado = true;
            $state.go('editarAnimadores', {objAnimadorMod: JSON.stringify(panimadores)});
        }

        vm.desactivarAnimadores = (panimadores) => {
            let objAnimador = new Animador(panimadores.codigo, panimadores.nombre, panimadores.costo, panimadores.estado);

            servicioAnimadores.cambiarEstado(objAnimador);

            $state.reload();
        }

        vm.activarAnimadores = (panimadores) => {
            let objAnimador = new Animador(panimadores.codigo, panimadores.nombre, panimadores.costo, panimadores.estado);

            servicioAnimadores.cambiarEstado(objAnimador);

            $state.reload();
        }

        vm.agregarAnimadores = () => {
            $state.go('registrarAnimadores')
        }
    }
})();