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
    this.retoques = [];
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
  setCompra(pobjCompra){
    this.retoques.push(pobjCompra);
  }
  getCompra(){
    return this.retoques
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

class Retoque { // crear clase del retoque al cual se le dara mantenimiento.
  constructor(pnombre, pprecio) {
    this.nombre = pnombre,
    this.precio = pprecio
  }
  getNombre(){
    return this.nombre
  }
  
  getPrecio(){
    return this.precio
  }
}

class Compra {
  constructor(pnombre, pprecio) {
    this.nombre = pnombre;
    this.precio = pprecio;
  }
}
