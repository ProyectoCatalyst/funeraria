(() => {
'use strict';

angular
.module('funeraria')
.controller('controladorRegistrarFiesta', controladorRegistrarFiesta)

controladorRegistrarFiesta.$inject = ['$state', '$stateParams', 'servicioFiestas'];
function controladorRegistrarFiesta($state, $stateParams, servicioFiestas){
    let vm = this;

    vm.registrarFiesta = (pfiestaNueva) => {
        pfiestaNueva.costoTotal = 0; // crear un costo generico

        let objFiestaNueva = new Fiesta (pfiestaNueva.fecha, pfiestaNueva.horas, pfiestaNueva.pago, pfiestaNueva.costoTotal, pfiestaNueva.animadores);
        
        let existente = verificarFiesta(objFiestaNueva);

        if(existente){
            swal({
                title: "No se pudo registrar",
                text: "Los datos de la fiesta ya estan en el sistema",
                icon: "error",
                button: "Aceptar"
              });
        }else{
            servicioFiestas.agregarFiesta(objFiestaNueva);
            swal({
                title: "Registro exitoso",
                text: "Fiesta registrada correctamente",
                icon: "success",
                button: "Aceptar"
              });
            $state.go('listarFiestas');
        }
    }

    function verificarFiesta(pobjfiestaNueva){
        let fiestasLS = servicioFiestas.retornarFiestas(),
            existente = false;

        for(let i=0; i<fiestasLS.length; i++){
            if(fiestasLS[i].getFecha() == pobjfiestaNueva.fecha){
                existente = true;
            }
        }
        return existente
    }
}
})();