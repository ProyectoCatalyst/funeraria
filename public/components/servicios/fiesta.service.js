(() => {
    'use strict';

    angular
    .module('funeraria')
    .service('servicioFiestas', servicioFiestas)

    servicioFiestas.$inject = ['$q', '$log', '$http'];
    function servicioFiestas($q, $log, $http){
        let publicAPI = {
            agregarFiesta: _agregarFiesta,
            retornarFiestas: _retornarFiestas,
            agregarAnimador: _agregarAnimador,
            retornarAnimadores: _retornarAnimadores,
            eliminarAnimador: _eliminarAnimador,
            actualizarCosto: _actualizarCosto,
            editarFiesta: _editarFiesta
        }
        return publicAPI

        //___________funciones del servicio__________
        function _agregarFiesta(pobjFiestaNueva){
            let fiestasLS = _retornarFiestas();
            fiestasLS.push(pobjFiestaNueva);
            localStorage.setItem('fiestasLS', JSON.stringify(fiestasLS));
        }

        function _retornarFiestas(){
            let fiestasLS = JSON.parse(localStorage.getItem('fiestasLS')),
                fiestaFinal = [];

            if(fiestasLS == null){
                return fiestaFinal;
            }else{
                fiestasLS.forEach(objTem => {
                    let objNuevaFiesta = new Fiesta(objTem.fecha, objTem.horas, objTem.pago, objTem.costoTotal);

                    objTem.animadores.forEach( objAnimadores => {
                        let objNuevoAnimador = new Animador(objAnimadores.codigo, objAnimadores.nombre, objAnimadores.costo, objAnimadores.estado)

                        objNuevaFiesta.setAnimadores(objNuevoAnimador);
                    });
                    fiestaFinal.push(objNuevaFiesta);
                });
            }
            return fiestaFinal
        }

        function _agregarAnimador(paDatos){
            let fiestasLS = _retornarFiestas();

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() === paDatos[1].getFecha() ){
                    fiestasLS[i].setAnimadores(paDatos[0]);
                }
            }
            actualizarLista(fiestasLS)
        }

        function _retornarAnimadores(pobjFiestaAgregar){
            let fiestasLS = _retornarFiestas(),
                animadoresActuales = [];

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == pobjFiestaAgregar.fecha){
                    animadoresActuales = fiestasLS[i].getAnimadores();
                }
            }
            return animadoresActuales

        }

        function _eliminarAnimador(aDatos){
            let fiestasLS = _retornarFiestas(),
                nuevosAnimadores = [];

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == aDatos[0].fecha){
                    let animadores = fiestasLS[i].getAnimadores();
                    for(let j=0; j<animadores.length; j++){
                        if( !( animadores[j].getCodigo() == aDatos[1].codigo) ){
                            nuevosAnimadores.push(animadores[j]);
                        }
                    }
                    fiestasLS[i].animadores = nuevosAnimadores;
                }
            }
           actualizarLista(fiestasLS);
        }

        function _actualizarCosto(pcostoFinal, pobjFiestaActual){
            let fiestasLS = _retornarFiestas();

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == pobjFiestaActual.fecha){
                    fiestasLS[i].costoTotal = pcostoFinal;
                }
            }
            actualizarLista(fiestasLS)

            return true
        }

        function _editarFiesta(pfiestaNueva){
            let fiestasLS = _retornarFiestas();

            for(let i=0; i<fiestasLS.length; i++){
                if(fiestasLS[i].getFecha() == pfiestaNueva.fecha){
                    fiestasLS[i].horas = pfiestaNueva.horas
                    fiestasLS[i].pago = pfiestaNueva.pago
                }
            }
            actualizarLista(fiestasLS);
        }

        function actualizarLista(pfiestasLS){
        localStorage.setItem('fiestasLS', JSON.stringify(pfiestasLS));
        }

    }
})();