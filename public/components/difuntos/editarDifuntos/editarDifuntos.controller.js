(() => {
    'use strict';
    angular
        .module('funeraria')
        .controller('controladorEditarDifuntos', controladorEditarDifuntos)

    controladorEditarDifuntos.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

    function controladorEditarDifuntos($stateParams, $state, $http, servicioUsuarios) {
        let vm = this;

        if (!$stateParams.objDifunto) {
            $state.go('listarUsuarios');
        }

        let objDifuntoSinFormato = JSON.parse($stateParams.objDifunto);

        let objDifuntoFormato = new Difunto(objDifuntoSinFormato.difuntoID, objDifuntoSinFormato.edad, objDifuntoSinFormato.apodo, objDifuntoSinFormato.sexo, objDifuntoSinFormato.estatura);

        objDifuntoFormato.setCedulaCliente(objDifuntoSinFormato.clienteID);

        vm.difuntoActivo = objDifuntoFormato.apodo;

        vm.difuntoEditar = {}
        vm.difuntoEditar.difuntoID = objDifuntoFormato.difuntoID;
        vm.difuntoEditar.clienteID = objDifuntoFormato.clienteID;
        vm.difuntoEditar.apodo = objDifuntoFormato.apodo;
        vm.difuntoEditar.edad = objDifuntoFormato.edad;
        vm.difuntoEditar.sexo = objDifuntoFormato.sexo;
        vm.difuntoEditar.estatura = objDifuntoFormato.estatura;

        vm.editarDifuntos = (pdifunto) => {

            let todosLosDifuntos = servicioUsuarios.retornarDifunto(objDifuntoFormato.clienteID);

            let objDifuntoEditado = new Difunto(pdifunto.difuntoID, pdifunto.edad, pdifunto.apodo, pdifunto.sexo, pdifunto.estatura);

            for (let i = 0; i < todosLosDifuntos.length; i++) {

                if (pdifunto.difuntoID == todosLosDifuntos[i].getDifuntoID()) {

                    let objDifuntoLS = todosLosDifuntos[i];

                    objDifuntoLS.getEntierro().forEach(objEntierroTemp => {
                        let objEntierro = new Entierro(objEntierroTemp.horaInicio, objEntierroTemp.horaFinal, objEntierroTemp.fecha, objEntierroTemp.lugar, objEntierroTemp.prioridad);

                        objDifuntoEditado.setEntierro(objEntierro);
                        objDifuntoEditado.setCedulaCliente(objDifuntoFormato.clienteID);
                    });
                }
            }

            let actualizarCorrecto = servicioUsuarios.actualizarDifunto(objDifuntoEditado);

            if (actualizarCorrecto == true) {
                swal({
                    title: "Actualización exitosa",
                    text: "Difunto actualizado correctamente",
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