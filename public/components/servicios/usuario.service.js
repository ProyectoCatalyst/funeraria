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
      actualizarUsuario: _actualizarUsuario,
      agregarDifunto: _agregarDifunto,
      retornarDifunto: _retornarDifunto,
      agregarEntierro: _agregarEntierro,
      retornarEntierro: _retornarEntierro
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
          
          obj.difuntos.forEach(objdifunto => {
            let obtDifuntoTemp = new Difunto(objdifunto.edad, objdifunto.apodo, objdifunto.sexo, objdifunto.estatura);

            obtDifuntoTemp.setCedulaCliente(objUsuarioTemp.getCedula());

            objUsuarioTemp.setDifuntos(obtDifuntoTemp);
          })
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

    function _agregarDifunto(adatos) {
      let todosLosUsuarios = _retornarUsuario();
      let registroExitoso = false;

      for (let i = 0; i < todosLosUsuarios.length; i++) {
        if (adatos[0].getCedula() === todosLosUsuarios[i].getCedula()) {
          todosLosUsuarios[i].setDifuntos(adatos[1]);
          registroExitoso = true;
        }
      }
      actualizarLocal(todosLosUsuarios);
      return registroExitoso;
    }

    function _retornarDifunto(pidusuario) {
      let todosLosUsuarios = _retornarUsuario();
      let todosLosDifuntos = [];
      
      for(let i = 0; i < todosLosUsuarios.length; i++){
        if(pidusuario == todosLosUsuarios[i].getCedula()){
          todosLosDifuntos = todosLosUsuarios[i].getDifuntos();
        }
      }
      return todosLosDifuntos;
    }

  

    function actualizarLocal(listaActualizada){
      localStorage.setItem('listaUsuariosLS', JSON.stringify(listaActualizada));
    }
  }   
})(); 
