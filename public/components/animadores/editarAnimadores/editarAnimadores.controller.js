(() => {
    'use strict';

    angular
    .module('funeraria')
    .controller('controladorEditarAnimadores', controladorEditarAnimadores)

    controladorEditarAnimadores.$inject = ['$state', '$stateParams', 'servicioAnimadores']
    function controladorEditarAnimadores($state, $stateParams, servicioAnimadores){
        let vm = this;

        let objAnimadorSinFormato = JSON.parse($stateParams.objAnimadorMod);

        let objAnimadorTemp = new Animador(objAnimadorSinFormato.codigo, objAnimadorSinFormato.nombre, objAnimadorSinFormato.costo, objAnimadorSinFormato.estado);

        vm.animador = {}
        vm.animador.codigo = objAnimadorTemp.codigo;
        vm.animador.nombre = objAnimadorTemp.nombre;
        vm.animador.costo = objAnimadorTemp.costo;

        vm.editarAnimador = (panimador) => {

            if(!$stateParams.objAnimadorMod){
                $state.go('listarAnimadores');
            }
            panimador.estado = true;
            
            let objNuevoAnimador = new Animador (panimador.codigo, panimador.nombre, panimador.costo, panimador.estado);

            servicioAnimadores.editarAnimadores(objNuevoAnimador);
            swal("Listo", "Hemos modificado el animador", "success");
            $state.go('listarAnimadores')
        }

        vm.regresar = () => {
            $state.go('listarAnimadores');
        }

    }
})();