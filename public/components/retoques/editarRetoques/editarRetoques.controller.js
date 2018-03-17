(() => {
    'use strict';
  
    angular.module('funeraria')
    .controller('controladorEditarRetoques', controladorEditarRetoques);
  
    controladorEditarRetoques.$inject = ['$stateParams', '$state', 'servicioRetoques'];
  
    function controladorEditarRetoques($stateParams, $state, servicioRetoques){
      
      let vm = this;
  
      let objSinFormato = JSON.parse($stateParams.objRetoqueMod); // tomar objeto que me envia el state manage
  
      let objRetoque = new Retoque (objSinFormato.nombre, objSinFormato.precio); // darle formato al objeto que recibo del state anterior
  
      vm.retoqueoriginal = objRetoque; // asignar el objeto a la lista la cual se va  a llamar desde la vista para mostrar el objeto original antes de moficarlo
  
      vm.retoqueModificado = {};
      vm.retoqueModificado.nombre = objSinFormato.nombre
      vm.retoqueModificado.precio = objSinFormato.precio
  
      vm.modificarRetoque = (pretoqueModificado) => {
        let objNuevoRetoque = new Retoque (pretoqueModificado.nombre, pretoqueModificado.precio);
  
        // console.log(vm.retoqueoriginal);
        // console.log(objNuevoRetoque); // va a mostrar el objeto modificado
  
        let aDatos = [objRetoque, objNuevoRetoque];
  
        // console.log(aDatos); aDatos contiene el objeto que estoy modificando junto con los datos que voy a reemplazar 
        
        let modificar = verificarRetoques(aDatos);
  
        if (modificar == true){
          servicioRetoques.modifyRetoques(aDatos); // enviara datos una vez sea verificado que no exista
  
          vm.retoqueModificado = null
          $state.go('listarRetoques'); 
           
          swal("Modificado", "Se ha hecho la modificaion", "success")
        }else{
          swal("No hay que modificar", "Verifica tus datos", "error")
        }  
      }
  
      function verificarRetoques(paDatos){
        let modificar = false
        if(paDatos[0].nombre === paDatos[1].nombre && paDatos[0].precio === paDatos[1].precio){
  
        }else{
          modificar = true
        }
        return modificar
      }
    }
  })();