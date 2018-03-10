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

class Animador{
  constructor(pcodigo, pnombre, pcosto, pestado){
    this.codigo = pcodigo;
    this.nombre = pnombre;
    this.costo = pcosto;
    this.estado = pestado;
  }
  getCodigo(){
    return this.codigo;
  }
  getEstado(){
    return this.estado;
  }
  getCosto(){
    return this.costo;
  }
}

class Fiesta{
  constructor(pfecha, phoras, ppago, pcostoTotal){
    this.fecha = pfecha;
    this.horas = phoras;
    this.pago = ppago;
    this.costoTotal = pcostoTotal;
    this.animadores = [];
  }
  getFecha(){
    return this.fecha;
  }
  getAnimadores(){
    return this.animadores;
  }
  setAnimadores(pnuevoAnimador){
    this.animadores.push(pnuevoAnimador);
  }
}