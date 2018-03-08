(() => {
  'use strict';
  angular
    .module('funeraria')
    .controller('controladorRegistrarUsuario', controladorRegistrarUsuario);

    controladorRegistrarUsuario.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios'];

  function controladorRegistrarUsuario($stateParams, $state, $http, servicioUsuarios) {
    let vm = this;

    vm.provincias = $http({
      method: 'GET',
      url: './sources/data/provincias.json'
    }).then( (success) => {
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

    vm.usuarioNuevo = {};
    
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