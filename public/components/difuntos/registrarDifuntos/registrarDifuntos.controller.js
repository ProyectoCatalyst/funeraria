(() => {
    'use strict';
    angular
        .module('funeraria')
        .controller('controladorRegistrarDifunto', controladorRegistrarDifunto);

    controladorRegistrarDifunto.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

    function controladorRegistrarDifunto($stateParams, $state, servicioUsuarios) {
        let vm = this;

        if (!$stateParams.objUsuario) {
            $state.go('listarUsuarios');
        }

        let objUsuarioSinFormato = JSON.parse($stateParams.objUsuario);

        let objUsuarioTemp = new Usuario(objUsuarioSinFormato.cedula, objUsuarioSinFormato.nombre, objUsuarioSinFormato.primerApellido, objUsuarioSinFormato.segundoApellido, objUsuarioSinFormato.sexo, objUsuarioSinFormato.fecha, objUsuarioSinFormato.provincia, objUsuarioSinFormato.canton, objUsuarioSinFormato.distrito, objUsuarioSinFormato.nombreUsuario, objUsuarioSinFormato.correo, objUsuarioSinFormato.contrasenna);

        vm.usuarioActivo = `${objUsuarioTemp.nombre} ${objUsuarioTemp.primerApellido} ${objUsuarioTemp.segundoApellido}`;


        vm.difuntoNuevo = {};

        vm.registrarDifunto = (pdifuntoNuevo) => {

            let objUsuarioTemp = new Usuario(objUsuarioSinFormato.cedula, objUsuarioSinFormato.nombre, objUsuarioSinFormato.primerApellido, objUsuarioSinFormato.segundoApellido, objUsuarioSinFormato.sexo, objUsuarioSinFormato.fecha, objUsuarioSinFormato.provincia, objUsuarioSinFormato.canton, objUsuarioSinFormato.distrito, objUsuarioSinFormato.nombreUsuario, objUsuarioSinFormato.correo, objUsuarioSinFormato.contrasenna);

            let objDifunto = new Difunto(pdifuntoNuevo.edad, pdifuntoNuevo.apodo, pdifuntoNuevo.sexo, pdifuntoNuevo.estatura);

            objDifunto.setCedulaCliente(objUsuarioTemp.getCedula());

            let datos = [objUsuarioTemp, objDifunto];

            let registro = servicioUsuarios.agregarDifunto(datos);

            if (registro == true) {
                swal({
                    title: "Registro exitoso",
                    text: "Difunto registrado correctamente",
                    icon: "success",
                    button: "Aceptar"
                });
                vm.difuntoNuevo = null;
                $state.go('listarDifuntos');
            }
        }

        vm.regresar = () => {
            $state.go('editarUsuarios');
        }

    }
})();