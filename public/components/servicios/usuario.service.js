(() => {
  'use strict';
  angular
    .module('funeraria')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http'];

  function servicioUsuarios($q, $log, $http) {

    const asyncLocalStorage = {
      setItem: function (key, value) {
        return Promise.resolve().then(() => {
          let response = true;
          localStorage.setItem(key, JSON.stringify(value));
          return response
        });
      }
    }

    let publicAPI = {
      agregarUsuario: _agregarUsuario,
      retornarUsuario: _retornarUsuario,
      actualizarUsuario: _actualizarUsuario
    };
    return publicAPI;

    function _agregarUsuario(pusuario) {
      let todosLosUsuarios = _retornarUsuario();
      let registroExitoso = true;

      todosLosUsuarios.push(pusuario);

      asyncLocalStorage.setItem('listaUsuariosLS', todosLosUsuarios).then((result) => {
        registroExitoso = result
      });

      return registroExitoso;
    }

    function _retornarUsuario() {
      let todosLosUsuarios = [],
          listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

      if (listaUsuarios == null) {

        return todosLosUsuarios;

      } else {

        listaUsuarios.forEach(obj => {

          let objUsuarioTemp = new Usuario(obj.cedula,obj.nombre, obj.primerApellido, obj.segundoApellido, obj.sexo, obj.fecha, obj.provincia, obj.canton, obj.distrito, obj.nombreUsuario, obj.correo, obj.contrasenna);
          // obj.difuntos.forEach(objdifunto => {
          //   let obtDifuntoTemp = new Difunto(objdifunto.apodo, objdifunto.genero, objdifunto.edad, objdifunto.tamanno);

          //   obtDifuntoTemp.setCedulaCliente(objUsuarioTemp.getCedula());

          //   objUsuarioTemp.setDifunto(obtDifuntoTemp);
          // })
          todosLosUsuarios.push(objUsuarioTemp);
        });
      }
      return todosLosUsuarios;
    }

    function _actualizarUsuario(pusuarioactulizar){
      let listaUsuarios = _retornarUsuario(),
          valido = false;

      for(let i =0; i < listaUsuarios.length; i++){
        if(pusuarioactulizar.getCedula() == listaUsuarios[i].getCedula()){
          listaUsuarios[i] = pusuarioactulizar;
          valido = true;
        }
      }

      actualizarLocal(listaUsuarios);

      return valido;
    }


    function actualizarLocal(listaActualizada){
      localStorage.setItem('listaUsuariosLS', JSON.stringify(listaActualizada));
    }
  }   
})(); 
