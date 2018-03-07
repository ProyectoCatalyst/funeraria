(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorRegistrarUsuario', controladorRegistrarUsuario);

    controladorRegistrarUsuario.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

  function controladorRegistrarUsuario($stateParams, $state, $http, servicioUsuarios) {
    let vm = this;

    // ng-options="provincia as provincia.name for provincia in vm.provincias track by provincia._id" 
    // vm.provincias = $http({
    //   method: 'GET',
    //   url: './provincias.JSON'
    // }).then(function (success) {
    //   vm.provincias = success.data
    // }, function (error) {
    //   console.log("Ocurrió un error" + error);
    // });

    vm.usuarioNuevo = {}

    vm.registrarUsuario= (pusuarioNuevo) => {
      
      let objNuevoUsuario = new Usuario(pusuarioNuevo.cedula, pusuarioNuevo.nombre, pusuarioNuevo.primerApellido, pusuarioNuevo.segundoApellido, pusuarioNuevo.sexo, pusuarioNuevo.fecha, pusuarioNuevo.provincia, pusuarioNuevo.canton, pusuarioNuevo.distrito, pusuarioNuevo.nombreUsuario, pusuarioNuevo.correo, pusuarioNuevo.contrasenna);

      let registro = servicioUsuarios.agregarUsuario(objNuevoUsuario);

      if(registro == true){
        swal({
          title: "Registro exitoso",
          text: "Usuario registrado correctamente",
          icon: "success",
          button: "Aceptar"
        });
        $state.go('iniciarSesión');
      }
    }
  }
})();