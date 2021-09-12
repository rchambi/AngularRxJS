const { AccionesDao } = require("../infra");

const api = {};

api.add = async (req, res) => {
  const { codigo, descripcion, precio } = req.body;
  console.log(req.body);
  const AccionesDao = new AccionesDao(req.db);

  const accionesid = await AccionesDao.add(codigo, descripcion, precio);
  const acciones = await AccionesDao.findById(accionesid);
  console.log(`Accion adicionada`, acciones);
  res.json(acciones);
};

api.list = async (req, res) => {
  let { valor } = req.query;
  valor = valor || "";
  console.log(`Busca accion por ${valor}`);
  const acciones = await new AccionesDao(req.db).listAll(valor);
  const result = { payload: acciones };
  res.json(result);
};

api.findById = async (req, res) => {
  const { accionesID } = req.params;
  console.log("####################################");
  console.log(`Buscando acciones pelo ID ${accionesID}`);
  const acciones = await new AccionesDao(req.db).findById(accionesID);
  if (acciones) {
    res.json(acciones);
  } else {
    res.status(404).json({ message: "actions does not exist" });
  }
};

module.exports = api;
