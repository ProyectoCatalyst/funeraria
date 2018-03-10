(() => {
    'use strict'

    angular
    .module('funeraria')
    .controller('controladorEditarFiestas', controladorEditarFiestas)

    controladorEditarFiestas.$inject = ['$state', '$stateParams', 'servicioFiestas']

    function controladorEditarFiestas($state, $stateParams, servicioFiestas){
        let vm = this;

        if(!$stateParams.objFiestaMod){
            $state.go('listarFiestas')
        }
        let objFiestaModSinFormato = JSON.parse($stateParams.objFiestaMod),
            objFiestaMod = new Fiesta(objFiestaModSinFormato.fecha, objFiestaModSinFormato.horas, objFiestaModSinFormato.pago, objFiestaModSinFormato.costoTotal, objFiestaModSinFormato.animadores);

        vm.fiestaNueva = {}
        vm.fiestaNueva.fecha = (objFiestaMod.fecha);
        vm.fiestaNueva.horas = objFiestaMod.horas;
        vm.fiestaNueva.pago = objFiestaMod.pago;

        vm.editarFiesta = (pfiestaNueva) => {
            servicioFiestas.editarFiesta(pfiestaNueva);

            swal({
                title: "Gracias",
                text: "Modificado exitosamente",
                text: "Modificado exitosamente",
                icon: "success",
                button: "Aceptar",
            })
            calcularCostoFinal()
            $state.go('listarFiestas');
        }

        function calcularCostoFinal(){
            let fiestasLS = servicioFiestas.retornarFiestas(),
                fiestaTrabajar = [],
                infoAnimadores = [],
                costoFinal = '',
                costoTotalAnimadores = 0,
                horas = '';

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == objFiestaMod.fecha){

                    fiestaTrabajar = fiestasLS[i]; // fiesta donde que tomo desde el state params
                    horas = fiestaTrabajar.horas; // duracion de esta fiesta
                    infoAnimadores = fiestaTrabajar.getAnimadores(); // datos de los animadores de esta fiesta
                    

                    for(let j=0; j<infoAnimadores.length; j++){ // recorro los animadores buscando el costo total por cantidad de horas mas precio de cada animador

                    costoTotalAnimadores += (infoAnimadores[j].costo) * horas; // aqui almaceno los costos de los animadores en un arreglo, recorrer arreglo y multiplizar [i] por cantodad de horas
                    }
                    costoFinal = costoTotalAnimadores + (65*horas);
                    if(fiestasLS[i].pago == 'efectivo'){
                        costoFinal = costoFinal*0.94;
                    }
                }
                servicioFiestas.actualizarCosto(costoFinal, objFiestaMod);
            }
            $state.reload();
        }
    }
})();