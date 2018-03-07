(() => {
    'use strict';

    angular
    .module('funeraria')
    .service('servicioDifunto', servicioDifunto);

    servicioDifunto.$inject = ['$q', '$log', '$http'];

    function servicioDifunto($q, $log, $http){
        let publicAPI = {
            retornarDifuntos: _retornarDifuntos,
            agregarDifunto: _agregarDifunto,
        };
        return publicAPI;

        function _agregarDifunto(pobjNuevoDifunto){
            let difuntosLS = _retornarDifuntos();
                difuntosLS.push(pobjNuevoDifunto);

            localStorage.setItem('listaDifuntosLS', JSON.stringify(difuntosLS));
        }

        function _retornarDifuntos(){
            let difuntosLS = JSON.parse(localStorage.getItem('listaDifuntosLS')),
                listaDifuntos = [];

            if(difuntosLS == null){
                return listaDifuntos;
            }else{
                difuntosLS.forEach(objTemp => {
                    let objDifuntoTemp = new Difunto(objTemp.edad, objTemp.apodo, objTemp.estatura);
                    listaDifuntos.push(objDifuntoTemp);
                });
            }
            return listaDifuntos
        }
    }
})()