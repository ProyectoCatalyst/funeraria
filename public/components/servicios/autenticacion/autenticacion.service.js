(() => {
  'use strcit';
  angular
  .module('funeraria')
  .service('authService', authService);

  authService.$inject = ['$q','$http','servicioUsuarios','sessionService'];

  function authService($q, $http, servicioUsuarios, sessionService){
    let publicAPIauth = {
      logIn: _logIn,
      logOut: _logOut,
      isAuth: _isAuth,
      getAuthUser: _getAuthUser
    };
    return publicAPIauth;

    function _logIn(credentials) {
      
      let allUser = servicioUsuarios.retornarUsuario();
      let incioExitoso = false;

      for(let i = 0; i<allUser.length; i++){
        if(allUser[i].getCorreo() == credentials.correo && allUser[i].getContrasenna() == credentials.contrasenna){
          sessionService.create(allUser[i].getCorreo());
          incioExitoso = true;
        }
      }

      return incioExitoso;
    }

    function _logOut(){
      sessionService.destroy();
    }

    function _isAuth(){
      return !!sessionService.session;
    }
    
    function _getAuthUser() {
      if (sessionService.session) {
        return sessionService.session;
      }else{
        return undefined;
      }
    }
  }
})();