(() => {
    'use strict';

    angular
    .module('funeraria')
    .controller('contrtoladorListaDifuntos', contrtoladorListaDifuntos);

    contrtoladorListaDifuntos.$inject = ['$state', '$stateParams', 'servicioDifunto'];

    function contrtoladorListaDifuntos($state, $stateParams, servicioDifunto){

        let vm = this;

        vm.listarDifuntos = servicioDifunto.retornarDifuntos();

        vm.editarDifuntos = (pdifuntos) => {
            $state.go('editarDifuntos', {objDifuntoEditar : JSON.stringify(pdifuntos)});
        }

        vm.agregarDifuntos = () =>{
            $state.go('registroDifuntos');
        }
    }

})();