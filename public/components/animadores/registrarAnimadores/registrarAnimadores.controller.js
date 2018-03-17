(() => {
    'use strict';

    angular
    .module('funeraria')
    .controller('controladorRegistroAnimadores', controladorRegistroAnimadores)

    controladorRegistroAnimadores.$inject = ['$state', 'servicioAnimadores'];
    function controladorRegistroAnimadores($state, servicioAnimadores){
        let vm = this;

        vm.registrarAnimador = (panimadorNuevo) => {
            if(panimadorNuevo.estado == null){
                panimadorNuevo.estado = true;
            }

            let objAnimadorNuevo = new Animador(panimadorNuevo.codigo, panimadorNuevo.nombre, panimadorNuevo.costo, panimadorNuevo.estado),
            existente = verificar(objAnimadorNuevo);

            if(existente){
                swal("El animador ya existe en el sistema", "Intenta con otro", "error");
            }else{
                swal('Hemos registrado el animador', "con éxito", "success")
                servicioAnimadores.agregarAnimador(objAnimadorNuevo);
                $state.go('listarAnimadores')
            }
        }


        function verificar(pobjAnimadorNuevo){
            let animadoresLS = servicioAnimadores.retornarAnimadores(),
                existente = false;

            for(let i=0; i<animadoresLS.length; i++){
                if(animadoresLS[i].getCodigo() == pobjAnimadorNuevo.codigo){
                    existente = true;
                }
            }
            return existente
        }
    }
})();