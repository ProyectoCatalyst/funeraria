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
      actualizarDifunto: _actualizarDifunto,
      agregarEntierro: _agregarEntierro,
      retornarEntierro: _retornarEntierro,
      agregarRetoques: _agregarRetoques,
      retornarRetoques: _retornarRetoques,
      eliminarCompra: _eliminarCompra
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

          let objUsuarioTemp = new Usuario(obj.cedula, obj.nombre, obj.primerApellido, obj.segundoApellido, obj.sexo, obj.fecha, obj.provincia, obj.canton, obj.distrito, obj.nombreUsuario, obj.correo, obj.contrasenna);

          obj.difuntos.forEach(objdifunto => {
            let obtDifuntoTemp = new Difunto(objdifunto.difuntoID, objdifunto.edad, objdifunto.apodo, objdifunto.sexo, objdifunto.estatura);

            objdifunto.entierro.forEach(objEntierro => {
              let objEntierroTemp = new Entierro(objEntierro.horaInicio, objEntierro.horaFinal, objEntierro.fecha, objEntierro.lugar, objEntierro.prioridad);
              
              obtDifuntoTemp.setEntierro(objEntierroTemp);
            })

            objdifunto.retoques.forEach( objRetoques => {
              let objRetoquesTemp = new Retoque(objRetoques.nombre, objRetoques.precio);        
              
              obtDifuntoTemp.setCompra(objRetoquesTemp);
            })

            obtDifuntoTemp.setCedulaCliente(objUsuarioTemp.getCedula());
            objUsuarioTemp.setDifuntos(obtDifuntoTemp);
          })
          todosLosUsuarios.push(objUsuarioTemp);
        });
      }
      return todosLosUsuarios;
    }

    function _actualizarUsuario(pusuarioactulizar) {
      let listaUsuarios = _retornarUsuario(),
        valido = false;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (pusuarioactulizar.getCedula() == listaUsuarios[i].getCedula()) {
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

      for (let i = 0; i < todosLosUsuarios.length; i++) {
        if (pidusuario == todosLosUsuarios[i].getCedula()) {
          todosLosDifuntos = todosLosUsuarios[i].getDifuntos();
        }
      }
      return todosLosDifuntos;
    }

    function _actualizarDifunto(pdifuntoactulizar) {
      let listaUsuarios = _retornarUsuario(),
        valido = false;

      for (let i = 0; i < listaUsuarios.length; i++) {
        if (pdifuntoactulizar.getCedulaCliente() == listaUsuarios[i].getCedula()) {

          let listaDifuntos = listaUsuarios[i].getDifuntos();

          for (let x = 0; x < listaDifuntos.length; x++) {
            
            if(pdifuntoactulizar.getDifuntoID() == listaDifuntos[x].getDifuntoID()){
              listaDifuntos[x] = pdifuntoactulizar;
              valido = true;
            }
            
          }
        }
      }
      actualizarLocal(listaUsuarios);
      return valido;
    }

    function _agregarEntierro(pdatos) {

      let todosLosUsuarios = _retornarUsuario();
      let registroExitoso = false;

      for (let i = 0; i < todosLosUsuarios.length; i++) {
        if (pdatos[0].getCedulaCliente() === todosLosUsuarios[i].getCedula()) {

          let listaDifuntos = todosLosUsuarios[i].getDifuntos();

          for (let x = 0; x < listaDifuntos.length; x++) {
            if (pdatos[0].getDifuntoID() == listaDifuntos[x].getDifuntoID()) {
              listaDifuntos[x].setEntierro(pdatos[1]);
              registroExitoso = true;
            }
          }
        }
      }
      actualizarLocal(todosLosUsuarios);
      return registroExitoso;
    }

    function _retornarEntierro(pdatos) {
      let todosLosUsuarios = _retornarUsuario();
      let todosLosEntierros = [];

      for (let i = 0; i < todosLosUsuarios.length; i++) {
        if (pdatos[0] == todosLosUsuarios[i].getCedula()) {
          let todosLosDifuntos = _retornarDifunto(todosLosUsuarios[i].getCedula());

          for (let x = 0; x < todosLosDifuntos.length; x++) {
            if (pdatos[1] == todosLosDifuntos[x].getDifuntoID()) {
              todosLosEntierros = todosLosDifuntos[x].getEntierro();
            }

          }
        }
      }
      return todosLosEntierros;
    }


    function _agregarRetoques(paDatos){
        let usuariosLS = _retornarUsuario(),
            difuntosLS = [];

        for(let i=0; i<usuariosLS.length; i++){
          difuntosLS = usuariosLS[i].getDifuntos();
          for(let j=0; j<difuntosLS.length; j++){
            if(difuntosLS [j].getDifuntoID() == paDatos[0].difuntoID){
              difuntosLS[j].setCompra(paDatos[1]);
            }
          }
          usuariosLS[i].difuntos = difuntosLS;
        }
        actualizarLocal(usuariosLS);
    };

    function _retornarRetoques(pobjDifuntoTemp){
      let usuariosLS = _retornarUsuario(),
          difuntos = [],
          retoques = [];

      for(let i=0; i<usuariosLS.length; i++){
          difuntos = usuariosLS[i].getDifuntos();

          for(let j=0; j<difuntos.length; j++){
            if(difuntos[j].getDifuntoID() == pobjDifuntoTemp.difuntoID){
              retoques = difuntos[j].getCompra();
            }
          }
          return retoques
      }
    }

    function _eliminarCompra(paDatos){
      let usuariosLS = _retornarUsuario(),
          difuntos = [],
          retoques = [],
          listaNuevaCompras = [];

          for(let i=0; i<usuariosLS.length; i++){
            difuntos = usuariosLS[i].getDifuntos();

            for(let j=0; j<difuntos.length; j++){

              if(difuntos[j].getDifuntoID() == paDatos[0].difuntoID){
                retoques = difuntos[i].getCompra();
                for(let k=0; k<retoques.length; k++){
                  if(retoques[k].nombre == paDatos[1].nombre){

                  }else{
                    listaNuevaCompras.push(retoques[k]);
                  }
                }

                difuntos[j].retoques = listaNuevaCompras;

              }
            }
            usuariosLS [i].difuntos = difuntos;
          }
          console.log(usuariosLS)
          actualizarLocal(usuariosLS)
    }

    

    function actualizarLocal(listaActualizada) {
      localStorage.setItem('listaUsuariosLS', JSON.stringify(listaActualizada));
    }
  }
})(); 
