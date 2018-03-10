(() => {
    'use strict';
    angular
        .module('funeraria')
        .controller('controladorEditarDifuntos', controladorEditarDifuntos)

    controladorEditarDifuntos.$inject = ['$stateParams', '$state'];

    function controladorEditarDifuntos($stateParams, $state) {
        let vm = this;

        // if (!$stateParams.objUsuario) {
        //     $state.go('listarUsuarios');
        // }

        let objDifuntoSinFormato = JSON.parse($stateParams.objDifunto);

        let objDifuntoFormato = new Difunto(objDifuntoSinFormato.edad, objDifuntoSinFormato.apodo, objDifuntoSinFormato.sexo, objDifuntoSinFormato.estatura);

        vm.difuntoEditar = {}

        vm.difuntoEditar.apodo = objDifuntoFormato.apodo;
        vm.difuntoEditar.edad = objDifuntoFormato.edad;
        vm.difuntoEditar.sexo = objDifuntoFormato.sexo;
        vm.difuntoEditar.estatura = objDifuntoFormato.estatura;
        
        vm.editarDifuntos=(pdifuntoActualizar) => {
            swal({
                title: "No esta programado",
                text: "Más información en la proxima versión",
                icon: "error",
                button: "Aceptar"
              });
              $state.go('listarDifuntos')
        }
        vm.regresar = () => {
            $state.go('listarDifuntos')
        }


    }
})()