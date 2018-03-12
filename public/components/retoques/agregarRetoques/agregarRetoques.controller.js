(() => {
    'use strict';
  
    angular
    .module('funeraria')
    .controller('controladorAgregarRetoques', controladorAgregarRetoques);
  
    controladorAgregarRetoques.$inject = ['$state', '$stateParams', 'servicioRetoques', 'servicioUsuarios'];
  
    function controladorAgregarRetoques($state, $stateParams, servicioRetoques, servicioUsuarios){
      let vm = this;
  
      vm.mostrarretoques = servicioRetoques.getRetoques(); // mostrar retoques del sistema en la vista

      let objDifuntoSinFormato = JSON.parse($stateParams.objDifunto),
          objDifuntoTemp = new Difunto(objDifuntoSinFormato.difuntoID, objDifuntoSinFormato.edad, objDifuntoSinFormato.apodo, objDifuntoSinFormato.sexo, objDifuntoSinFormato.estatura);

      vm.mostrarCompra = servicioUsuarios.retornarRetoques(objDifuntoTemp);
      
      vm.mostrarTotal = mostrarPrecios();
  
      vm.agregarretoques = (pretoques) => {
        let objCompra = new Compra (pretoques.nombre, pretoques.precio),
            listaCompra = servicioUsuarios.retornarRetoques(objDifuntoTemp);
  
        let agregarCompra = compraExistente(objCompra, listaCompra),
            aDatos = [objDifuntoTemp, objCompra];
  
        // console.log(objCompra);
  
         // si es true es pq agregue la compra
      
        if(agregarCompra == true){
          swal("Gracias", "Hemos agregado el ítem", "success");
  
          $state.reload()
          
          servicioUsuarios.agregarRetoques(aDatos);
  
          // mostrarPrecios(objCompra.precio); // funcion que va a mostrar los precios para sumarlos
        }else{
          swal("Error", "Ya has agregado el ítem", "error");
        }
  
      }
  
  
      vm.eliminarCompra = (pcompras) => {
        let objCompra = new Compra (pcompras.nombre, pcompras.precio),
            aDatos = [objDifuntoTemp, objCompra];
  
        servicioUsuarios.eliminarCompra(aDatos);
  
        $state.reload()
      }
  
      function compraExistente(pobjCompra, listaCompra){
        let repetido = false
        for (let i = 0; i<listaCompra.length; i++){
          if(listaCompra[i].getNombre() === pobjCompra.nombre){
            repetido = true
          }
  
        }
        return !repetido // retornar contrario
      }
  
      function mostrarPrecios(){ // agregarlo al objeto
        let compras = servicioUsuarios.retornarRetoques(objDifuntoTemp),
            listaPrecios = [],
            total = 0;
  
            for(let i=0; i<compras.length; i++){
              total += compras[i].precio
            }
  
            // console.log(total)
  
            return total
      }
    }
  
  })();