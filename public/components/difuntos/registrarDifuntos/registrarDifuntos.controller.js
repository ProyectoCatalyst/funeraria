(() => {
    'use strict';

    angular
    .module('funeraria')
    .controller('controladorRegistrarDifunto', controladorRegistrarDifunto);

    controladorRegistrarDifunto.$inject = ['servicioDifunto'];

    function controladorRegistrarDifunto(servicioDifunto){
        let vm = this;

        vm.nuevoDifunto={}

        vm.registrarDifunto = (pdifunto) => {
            let objDifunto = new Difunto(pdifunto.edad, pdifunto.apodo, pdifunto.estatura),
                existente = verificarDifunto(objDifunto);

            if(existente == true){
                swal("El difunto ya esta en el sistema", "Intenta con otro no registrado", "error");
            }else{
                servicioDifunto.agregarDifunto(objDifunto);
                
                swal("Difunto agregado en el sistema", "Un gusto atenderle", "success");
            }

            
        }

        function verificarDifunto(pobjDifunto){
            let listaDifuntos = servicioDifunto.retornarDifuntos(),
                repetido = false;

                console.log(listaDifuntos);
                console.log(pobjDifunto.apodo);

            for(let i=0; i<listaDifuntos.length; i++){
                if(listaDifuntos[i].retornarApodo() == pobjDifunto.apodo){
                    repetido = true;
                }
            }
            return repetido
        }
    }
})()