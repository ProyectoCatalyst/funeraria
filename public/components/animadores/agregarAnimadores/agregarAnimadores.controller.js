(() => {
    angular
    .module('funeraria')
    .controller('controladorAgregarAnimadores', controladorAgregarAnimadores)

    controladorAgregarAnimadores.$inject = ['$state', '$stateParams', 'servicioFiestas', 'servicioAnimadores']

    function controladorAgregarAnimadores($state, $stateParams, servicioFiestas, servicioAnimadores){

        if(!$stateParams.objFiestaAgregar){
            $state.go('listarFiestas')
        }

        let vm = this

        let objFiestaSinFormato = JSON.parse($stateParams.objFiestaAgregar),
            objFiestaAgregar = new Fiesta(objFiestaSinFormato.fecha, objFiestaSinFormato.horas, objFiestaSinFormato.pago, objFiestaSinFormato.costoTotal);

        vm.listarAnimadores = servicioAnimadores.retornarAnimadoresAct();

        vm.detallesAnimador = servicioFiestas.retornarAnimadores(objFiestaAgregar);

        vm.listaFiesta = listarFiestaActiva();

        vm.editarFiesta = (plistaFiesta) => {
            $state.go('editarFiestas', {objFiestaMod: JSON.stringify(plistaFiesta)});
        }

        vm.eliminarAnimadores = (panimadores) => {
            let aDatos = [objFiestaAgregar, panimadores]
            servicioFiestas.eliminarAnimador(aDatos);
            swal({
                title: "Eliminado exitosamente",
                text: "Hemos removido este animador exitosamente",
                icon: "success",
                button: "Aceptar"
            })
            calcularCostoFinal();
        }

        vm.contratarAnimador = (panimador) => {
            let objAnimadorContratar = new Animador(panimador.codigo, panimador.nombre,              panimador.costo, panimador.estado),
                objFiestaTemp = new Fiesta(objFiestaSinFormato.fecha, objFiestaSinFormato.horas,objFiestaSinFormato.pago, objFiestaSinFormato.costoTotal);

            let aDatos = [objAnimadorContratar, objFiestaTemp];

            let existente = verificarAnimadorContratar(objAnimadorContratar, objFiestaAgregar);
            
            if(existente){
                swal({
                    title: "No se puede agregar",
                    text: "Este animador ya existe",
                    icon: "error",
                    button: "Aceptar"
                });
            }else{
                swal({
                    title: "Gracias",
                    text: "Hemos agregado el animador exitosamente",
                    icon: "success",
                    button: "Aceptar"
                });
                servicioFiestas.agregarAnimador(aDatos);
            }
            calcularCostoFinal();
        }

        function verificarAnimadorContratar(pobjAnimador, pobjFiestaAgregar){
            let fiestasLS = servicioFiestas.retornarFiestas(),
                existente = false;

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == pobjFiestaAgregar.fecha){
                    let animadoresLS = fiestasLS[i].getAnimadores();
                    for(let j=0; j<animadoresLS.length; j++){
                        if(animadoresLS[j].getCodigo() == pobjAnimador.codigo){
                            existente = true;
                        } 
                    }
                }
            }
            return existente
        }

        function listarFiestaActiva(){
            let fiestasLS = servicioFiestas.retornarFiestas();

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == objFiestaAgregar.fecha){
                    return fiestasLS[i];
                    console.log(fiestasLS)
                }
            }
        }

        function calcularCostoFinal(){
            let fiestasLS = servicioFiestas.retornarFiestas(),
                fiestaTrabajar = [],
                infoAnimadores = [],
                costoFinal = '',
                costoTotalAnimadores = 0,
                horas = '';

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == objFiestaAgregar.fecha){

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
                servicioFiestas.actualizarCosto(costoFinal, objFiestaAgregar);
            }
            $state.reload();
        }
    }
})();