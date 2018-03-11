(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorEditarUsuario', controladorEditarUsuario);

  controladorEditarUsuario.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

  function controladorEditarUsuario($stateParams, $state, $http, servicioUsuarios) {
    let vm = this;

    if (!$stateParams.objUsuario) {
      $state.go('listarUsuarios');
    }

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then((success) => {
      vm.provincias = success.data;
    }, (error) => {
      console.log("Ocurrió un error " + error.data);
    });

    vm.rellenarCantones = (pidProvincia) => {
      vm.cantones = $http({
        method: 'GET',
        url: './sources/data/cantones.json'
      }).then((success) => {
        let cantones = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidProvincia == success.data[i].idProvincia) {
            cantones.push(success.data[i]);
          }
        }
        vm.cantones = cantones;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
    }

    vm.rellenarDistrito = (pidCanton) => {
      console.log(pidCanton);
      vm.distritos = $http({
        method: 'GET',
        url: './sources/data/distritos.json'
      }).then((success) => {
        let distritos = [];
        for (let i = 0; i < success.data.length; i++) {
          if (pidCanton == success.data[i].idCanton) {
            distritos.push(success.data[i]);
          }
        }
        vm.distritos = distritos;
      }, (error) => {
        console.log("Ocurrió un error " + error.data)
      });
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
    // vm.usuarioEditar.provincia = objUsuarioTemp.provincia;
    // vm.usuarioEditar.canton = objUsuarioTemp.canton;
    // vm.usuarioEditar.distrito = objUsuarioTemp.distrito;
    vm.usuarioEditar.nombreUsuario = objUsuarioTemp.nombreUsuario;
    vm.usuarioEditar.correo = objUsuarioTemp.correo;
    vm.usuarioEditar.contrasenna = objUsuarioTemp.contrasenna;

    vm.editarUsuario = (pusuarioactualizar) => {
      let todosLosUsuarios = servicioUsuarios.retornarUsuario();

      let objUsuarioFormato = new Usuario(pusuarioactualizar.cedula, pusuarioactualizar.nombre, pusuarioactualizar.primerApellido, pusuarioactualizar.segundoApellido, pusuarioactualizar.sexo, pusuarioactualizar.fecha, pusuarioactualizar.provincia, pusuarioactualizar.canton, pusuarioactualizar.distrito, pusuarioactualizar.nombreUsuario, pusuarioactualizar.correo, pusuarioactualizar.contrasenna);

      for (let i = 0; i < todosLosUsuarios.length; i++) {

        if (objUsuarioFormato.getCedula() == todosLosUsuarios[i].getCedula()) {

          let objUsuarioLS = todosLosUsuarios[i];

          objUsuarioLS.getDifuntos().forEach(objTemp => {
            let objTempDifunto = new Difunto(objTemp.difuntoID, objTemp.edad, objTemp.apodo, objTemp.sexo, objTemp.estatura);

            objUsuarioFormato.setDifuntos(objTempDifunto);

          });
        }

      }
      let actualizarCorrecto = servicioUsuarios.actualizarUsuario(objUsuarioFormato);

      if (actualizarCorrecto == true) {
        swal({
          title: "Actualización exitosa",
          text: "Usuario actualizado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('listarUsuarios');
      }
    }

    vm.regresar = () => {
      $state.go('listarUsuarios');
    }
  }
})();
