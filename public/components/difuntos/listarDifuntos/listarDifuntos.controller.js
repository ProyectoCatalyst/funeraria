(() => {
    'use strict';
    angular
        .module('funeraria')
        .controller('controladorListaDifuntos', controladorListaDifuntos);

    controladorListaDifuntos.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

    function controladorListaDifuntos($stateParams, $state, servicioUsuarios) {
        let vm = this;

        if (!$stateParams.objUsuario) {
            $state.go('listarUsuarios');
        }

        let objUsuarioSinFormato = JSON.parse($stateParams.objUsuario);

        let objUsuarioTemp = new Usuario(objUsuarioSinFormato.cedula, objUsuarioSinFormato.nombre, objUsuarioSinFormato.primerApellido, objUsuarioSinFormato.segundoApellido, objUsuarioSinFormato.sexo, objUsuarioSinFormato.fecha, objUsuarioSinFormato.provincia, objUsuarioSinFormato.canton, objUsuarioSinFormato.distrito, objUsuarioSinFormato.nombreUsuario, objUsuarioSinFormato.correo, objUsuarioSinFormato.contrasenna);

        vm.usuarioActivo = `${objUsuarioTemp.nombre} ${objUsuarioTemp.primerApellido} ${objUsuarioTemp.segundoApellido}`;

        vm.listarDifuntos = servicioUsuarios.retornarDifunto(objUsuarioTemp.cedula);

        vm.agregarEntierro = (pdifunto) => {
            $state.go('registrarEntierros', { objDifunto: JSON.stringify(pdifunto) });
        }
        vm.editarDifunto = (pdifunto) => {
            $state.go('editarDifuntos', { objDifunto: JSON.stringify(pdifunto) });
        }
        vm.regresar = () => {
            $state.go('listarUsuarios');
        }

    }
})();