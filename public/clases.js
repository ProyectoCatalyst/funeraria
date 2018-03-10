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
  constructor(pedad, papodo, psexo, pestatura){
      this.edad = pedad;
      this.apodo = papodo;
      this.sexo = psexo;
      this.estatura = pestatura;
  }

  setEntierro(pnuevoEntierro) {
    this.entierro = pnuevoEntierro;
  }

  setCedulaCliente(pCedulaCliente) {
    this.clienteID = pCedulaCliente;
  }
}

class Entierro {
  constructor(phoraInicio, phoraFinal, pfecha, plugar, pprioridad) {
    this.horaInicio = phoraInicio;
    this.horaFinal = phoraFinal;
    this.fecha = pfecha;
    this.lugar = plugar;
    this.prioridad = pprioridad;
  }
}
