const { accionesAPI } = require("../api");

const { wrapAsync, auth } = require("../infra");

module.exports = (app) => {
  app
    .route("/acciones")
    .get(wrapAsync(accionesAPI.list))
    .post(auth, wrapAsync(accionesAPI.add));

  app.route("/acciones/:accionesID").get(wrapAsync(accionesAPI.findById));
};
