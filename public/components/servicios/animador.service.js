(() => {
    'use strict';

    angular
    .module('funeraria')
    .service('servicioAnimadores', servicioAnimadores)

    servicioAnimadores.$inject = ['$q', '$log', '$http']
    function servicioAnimadores($q, $log, $http){
        let publicAPI = {
            agregarAnimador:  _agregarAnimador,
            retornarAnimadores: _retornarAnimadores,
            editarAnimadores: _editarAnimadores,
            cambiarEstado: _cambiarEstado,
            retornarAnimadoresDesact: _retornarAnimadoresDesact,
            retornarAnimadoresAct: _retornarAnimadoresAct
        }
        return publicAPI;

        // funciones del service


        // para animadores activos
        function _agregarAnimador(pobjAnimadorNuevo){
            let animadoresLS = _retornarAnimadores();
            animadoresLS.push(pobjAnimadorNuevo);
            localStorage.setItem('animadoresLS', JSON.stringify(animadoresLS));
        }

        // todos los animadores
        function _retornarAnimadores(){
            let animadoresLS = JSON.parse(localStorage.getItem('animadoresLS')),
                animadoresTemp = [];

            if(animadoresLS == null){
                return animadoresTemp;
            }else{
                animadoresLS.forEach(objTemp => {
                    let objAnimadoresAct = new Animador(objTemp.codigo, objTemp.nombre, objTemp.costo, objTemp.estado);

                    animadoresTemp.push(objAnimadoresAct);
                });
            }
            return animadoresTemp
            
        }

        function _editarAnimadores(pobjNuevoAnimador){
            let animadoresLS = _retornarAnimadores();

            for(let i=0; i<animadoresLS.length; i++){
                if(animadoresLS[i].getCodigo() == pobjNuevoAnimador.codigo){
                    animadoresLS[i] = pobjNuevoAnimador;
                }
            }
            actualizarLista(animadoresLS)
        }

        function _cambiarEstado(pobjAnimador){
            let animadoresLS = _retornarAnimadores(); // tomo todos los animadores y cambio el estado del seleccionado

                for(let i=0; i<animadoresLS.length; i++){
                    if(animadoresLS[i].getCodigo() == pobjAnimador.codigo){
                        animadoresLS[i].estado = !pobjAnimador.estado;
                    }
                }
                actualizarLista(animadoresLS); // actualizar lista con nuevo estado.
        }

        // retornar animadores activos, donde filtro los activos

        function _retornarAnimadoresAct(){
            let animadoresLS = JSON.parse(localStorage.getItem('animadoresLS')),
                animadoresAct = [],
                animadoresActLS = [];
                // recibe del local bien.

            if(animadoresLS == null){
                return animadoresActLS;
            }else{
                for(let i=0; i<animadoresLS.length; i++){
                    if( animadoresLS[i].estado == true ){
                        animadoresAct.push(animadoresLS[i]);
                    }
                }
                // filtrar los estado true
                
                animadoresAct.forEach(objTemp => {
                    let objAnimadoresAct = new Animador(objTemp.codigo, objTemp.nombre, objTemp.costo, objTemp.estado);

                    animadoresActLS.push(objAnimadoresAct);
                });

                // recorro obj con true y doy formato
                return animadoresActLS
            }
        }

        // para animadores desactivados

        function _retornarAnimadoresDesact(){
            let animadoresLS = JSON.parse(localStorage.getItem('animadoresLS')),
                animadoresDesact = [],
                animadoresDesactLS = [];
                // recibe del local bien.

            if(animadoresLS == null){
                return animadoresDesactLS;
            }else{
                for(let i=0; i<animadoresLS.length; i++){
                    if( animadoresLS[i].estado == false ){
                        animadoresDesact.push(animadoresLS[i]);
                    }
                }
                // modifica bien el estado
                
                animadoresDesact.forEach(objTemp => {
                    let objAnimadoresDesact = new Animador(objTemp.codigo, objTemp.nombre, objTemp.costo, objTemp.estado);

                    animadoresDesactLS.push(objAnimadoresDesact);
                });
                return animadoresDesactLS
            }
        }

        function _agregarAnimadorDesact(panimadoresLS){
            localStorage.setItem('animadoresLS', JSON.stringify(panimadoresLS));
        }

        //_______________funciones internas_________________
        function actualizarLista(panimadoresLS){
            localStorage.setItem('animadoresLS', JSON.stringify(panimadoresLS));
            // console.log(panimadoresLS)
        }
    }
})();