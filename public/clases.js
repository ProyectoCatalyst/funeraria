class Usuario {
  constructor(pcedula, pnombre, pprimerApellido, psegundoApellido, psexo, pfecha, pprovincia, pcanton, pdistrito, pnombreUsuario, pcorreo, pcontrasenna) {
    this.cedula = pcedula;
    this.nombre = pnombre;
    this.primerApellido = pprimerApellido;
    this.segundoApellido = psegundoApellido;
    this.sexo = psexo;
    this.fecha = pfecha;
    this.provincia = pprovincia;
    this.canton = pcanton;
    this.distrito = pdistrito;
    this.nombreUsuario = pnombreUsuario;
    this.correo = pcorreo;
    this.contrasenna = pcontrasenna;
    this.difuntos = [];
  }

  getNombreCompleto() {
    return `${this.nombre} ${this.primerApellido} ${this.segundoApellido}`;
  }

  getUsuario() {
    return this.usuario;
  }

  getCorreo() {
    return this.correo;
  }

  getContrasenna() {
    return this.contrasenna;
  }

  getCedula() {
    return this.cedula;
  }

  getDifuntos() {
    return this.difuntos
  }

  setDifuntos(pdifunto) {
    this.difuntos.push(pdifunto);
  }
}

class Difunto {
  constructor(pdifuntoid, pedad, papodo, psexo, pestatura) {
    this.difuntoID = pdifuntoid;
    this.edad = pedad;
    this.apodo = papodo;
    this.sexo = psexo;
    this.estatura = pestatura;
    this.entierro = [];
  }

  getDifuntoID() {
    return this.difuntoID;
  }

  setCedulaCliente(pCedulaCliente) {
    this.clienteID = pCedulaCliente;
  }

  getCedulaCliente() {
    return this.clienteID;
  }

  setEntierro(pnuevoEntierro) {
    this.entierro.push(pnuevoEntierro);
  }
  getEntierro() {
    return this.entierro;
  }
}

class Entierro {
  constructor(pentierroID, phoraInicio, phoraFinal, pfecha, plugar, pprioridad) {
    this.entierroID = pentierroID;
    this.horaInicio = phoraInicio;
    this.horaFinal = phoraFinal;
    this.fecha = pfecha;
    this.lugar = plugar;
    this.prioridad = pprioridad;
  }

  getEntieroID() {
    return this.entierroID;
  }
  setCedulaCliente(pCedulaCliente) {
    this.clienteID = pCedulaCliente;
  }

  getCedulaCliente() {
    return this.clienteID;
  }

  setIdDifunto(pdifuntoid){
    this.idDifunto = pdifuntoid;
  }
  getIdDifunto(){
    return this.idDifunto;
  }
  
}
