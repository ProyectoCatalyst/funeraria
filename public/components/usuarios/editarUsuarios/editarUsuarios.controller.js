(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorEditarUsuario', controladorEditarUsuario);

    controladorEditarUsuario.$inject = ['$stateParams','$state','$http','servicioUsuarios'];

  function controladorEditarUsuario($stateParams, $state, $http, servicioUsuarios) {
    let vm = this;
    
    if(!$stateParams.objUsuario){
      $state.go('listarUsuarios');
    }
    
    let objUsuarioSinFormato = JSON.parse($stateParams.objUsuario);

    let objUsuarioTemp = new Usuario(objUsuarioSinFormato.cedula, objUsuarioSinFormato.nombre, objUsuarioSinFormato.primerApellido, objUsuarioSinFormato.segundoApellido, objUsuarioSinFormato.sexo, objUsuarioSinFormato.fecha, objUsuarioSinFormato.provincia, objUsuarioSinFormato.canton, objUsuarioSinFormato.distrito, objUsuarioSinFormato.nombreUsuario, objUsuarioSinFormato.correo, objUsuarioSinFormato.contrasenna);

    vm.usuarioActivo = `${objUsuarioTemp.nombre} ${objUsuarioTemp.primerApellido} ${objUsuarioTemp.segundoApellido}`;

    vm.usuarioEditar = {}

    vm.usuarioEditar.cedula = objUsuarioTemp.cedula;
    vm.usuarioEditar.nombre = objUsuarioTemp.nombre;
    vm.usuarioEditar.primerApellido = objUsuarioTemp.primerApellido;
    vm.usuarioEditar.segundoApellido = objUsuarioTemp.segundoApellido;
    vm.usuarioEditar.sexo = objUsuarioTemp.sexo;
    // vm.usuarioEditar.fecha = objUsuarioTemp.fecha;
    vm.usuarioEditar.provincia = objUsuarioTemp.provincia;
    vm.usuarioEditar.canton = objUsuarioTemp.canton;
    vm.usuarioEditar.distrito = objUsuarioTemp.distrito;
    vm.usuarioEditar.nombreUsuario = objUsuarioTemp.nombreUsuario;
    vm.usuarioEditar.correo = objUsuarioTemp.correo;
    vm.usuarioEditar.contrasenna = objUsuarioTemp.contrasenna;

    vm.editarUsuario = (pusuarioactualizar) => {

      let objUsuarioFormato = new Usuario(pusuarioactualizar.cedula, pusuarioactualizar.nombre, pusuarioactualizar.primerApellido, pusuarioactualizar.segundoApellido, pusuarioactualizar.sexo, pusuarioactualizar.fecha, pusuarioactualizar.provincia, pusuarioactualizar.canton, pusuarioactualizar.distrito, pusuarioactualizar.nombreUsuario, pusuarioactualizar.correo, pusuarioactualizar.contrasenna);
      
      let actualizarCorrecto = servicioUsuarios.actualizarUsuario(objUsuarioFormato);

      if(actualizarCorrecto == true){
        swal({
          title: "Actualización exitosa",
          text: "Usuario actualizado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('listarUsuarios');
      }
    }

    vm.regresar = ()=>{
      $state.go('listarUsuarios');
    }
  }
})();
