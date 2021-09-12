const accionesConverter = (row) => ({
  id: row.acciones_id,
  codigo: row.acciones_codigo,
  descripcion: row.acciones_descripcion,
  precio: parseFloat((Math.random() * (100 - 1) + 1).toFixed(2)),
});

class AccionesDao {
  constructor(db) {
    this._db = db;
  }

  add(codigo, descripcion, precio) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
                INSERT INTO acciones (
                    acciones_codigo, 
                    acciones_descripcion,
                    acciones_precio
                    ) values (?,?,?)
                `,
        [codigo, descripcion, precio],
        function (err) {
          if (err) {
            console.log(err);
            return reject("Can`t add acciones");
          }
          resolve(this.lastID);
        }
      );
    });
  }

  listAll(value) {
    return new Promise((resolve, reject) => {
      this._db.all(
        `
              SELECT 
                    acciones_id,acciones_codigo,acciones_descripcion,acciones_precio
                FROM acciones
                WHERE acciones_codigo LIKE $codigo
			UNION 
			  SELECT 
                    acciones_id,acciones_codigo,acciones_descripcion,acciones_precio
                FROM acciones
                WHERE acciones_descripcion LIKE $codigo
                `,
        { $codigo: `%${value}%` },
        (err, rows) => {
          if (err) {
            console.log("++++ERRO+++");
            console.log(err);
            return reject("Can`t load acciones");
          }
          const acciones = rows.map(accionesConverter);
          return resolve(acciones);
        }
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this._db.get(
        `
              SELECT 
                    acciones_id,acciones_codigo,acciones_descripcion,acciones_precio
                FROM acciones
                WHERE acciones_id = ?
                `,
        [id],
        (err, row) => {
          console.log(row);
          if (err) {
            console.log(err);
            return reject("Can`t load acciones");
          }
          return resolve(accionesConverter(row));
        }
      );
    });
  }
}

module.exports = AccionesDao;
