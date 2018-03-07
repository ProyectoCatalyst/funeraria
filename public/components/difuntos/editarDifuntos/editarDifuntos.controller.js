(() => {
    'use strict';

    angular
    .module('funeraria')
    .controller('controladorEditarDifuntos', controladorEditarDifuntos)

    controladorEditarDifuntos.$inject = ['$stateParams', '$state', 'servicioDifunto'];

    function controladorEditarDifuntos($stateParams, $state, servicioDifunto){
        let vm = this;

        let difuntoOriginalSinFormato = JSON.parse($stateParams.objDifuntoEditar);

        let objDifuntoOriginalTemp = new Difunto (difuntoOriginalSinFormato.edad, difuntoOriginalSinFormato.apodo, difuntoOriginalSinFormato.estatura);


        // ---------  tomar objetos previos y mostrarlo en los campos de texto ----------
        vm.difuntoEditar = {};
        vm.difuntoEditar.edad = objDifuntoOriginalTemp.edad;
        vm.difuntoEditar.apodo = objDifuntoOriginalTemp.apodo;
        vm.difuntoEditar.estatura = objDifuntoOriginalTemp.estatura;
        // ---------  tomar objetos previos y mostrarlo en los campos de texto ----------


        vm.editarDifunto = (pnuevoDifunto) => {
            let objNuevoDifunto = new Difunto (pnuevoDifunto.edad, pnuevoDifunto.apodo, pnuevoDifunto.estatura),
                aDatos = [objDifuntoOriginalTemp, objNuevoDifunto];


            verificarDifuntoEditado(aDatos);

            swal('¡Gracias!', 'Hemos editado la información', 'success');

            $state.go('listarDifuntos');

        }

        vm.regresar = () => {
            $state.go('listarDifuntos')
        }


        function verificarDifuntoEditado(aDatos){
            let listaDifuntosOriginal = servicioDifunto.retornarDifuntos();

            for (let i=0; i<listaDifuntosOriginal.length; i++){
                if(listaDifuntosOriginal[i].retornarApodo() == aDatos[0].apodo){
                    listaDifuntosOriginal[i] = aDatos[1];
                }
            }

            servicioDifunto.actualizarDifunto(listaDifuntosOriginal); // envio lista actualizada
        }
    }
})()