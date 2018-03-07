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