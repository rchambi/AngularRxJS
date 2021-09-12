const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = `
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'alvaro', 'alvaro@bytebank.com', '123', 'Alvaro' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'alvaro')
`;

const INSERT_DEFAULT_USER_2 = `
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'mario', 'mario@bytebank.com', '123', 'Mario' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'mario')
`;

const PORTFOLIO_SCHEMA = `
CREATE TABLE IF NOT EXISTS portfolio (
    portfolio_id INTEGER PRIMARY KEY AUTOINCREMENT,
    portfolio_create_date TIMESTAMP NOT NULL, 
    portfolio_descripcion TEXT DEFAULT ('') NOT NULL, 
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;

const PORTFOLIO_ITEM_SCHEMA = `
CREATE TABLE IF NOT EXISTS portfolio_item (
    item_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    item_quantidade REAL,
    item_precio REAL,
    portfolio_id INTEGER,
    acciones_id INTEGER,

    FOREIGN KEY (portfolio_id) REFERENCES portfolio (portfolio_id) ON DELETE CASCADE,
    FOREIGN KEY(acciones_id) REFERENCES acciones(acciones_id) ON DELETE CASCADE 
);
`;

const acciones_SCHEMA = `
CREATE TABLE IF NOT EXISTS acciones (
    acciones_id INTEGER PRIMARY KEY AUTOINCREMENT,
    acciones_codigo VARCHAR(10) NOT NULL UNIQUE, 
    acciones_descripcion VARCHAR(30) DEFAULT ('') NOT NULL, 
    acciones_precio REAL
)
`;

const INSERT_acciones_1 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'ALUR3', 'Alura ON', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'ALUR3')
`;

const INSERT_acciones_2 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'ALUR4', 'Alura PN', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'ALUR4')
`;

const INSERT_acciones_3 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'CAEL3', 'Caellum ON', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'CAEL3')
`;

const INSERT_acciones_4 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'CASC3', 'Casa do codigo ON', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'CASC3')
`;

const INSERT_acciones_5 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'JAVA3', 'JAVA ON', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'JAVA3')
`;

const INSERT_acciones_6 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'PHPP3', 'PHP ON', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'PHPP3')
`;

const INSERT_acciones_7 = `
INSERT INTO acciones (
    acciones_codigo, 
    acciones_descripcion,
    acciones_precio
) SELECT 'NETC3', 'Net Core ON', 25.10 WHERE NOT EXISTS (SELECT * FROM acciones WHERE acciones_codigo = 'NETC3')
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(USER_SCHEMA);
  db.run(INSERT_DEFAULT_USER_1);
  db.run(INSERT_DEFAULT_USER_2);
  db.run(acciones_SCHEMA);
  db.run(INSERT_acciones_1);
  db.run(INSERT_acciones_2);
  db.run(INSERT_acciones_3);
  db.run(INSERT_acciones_4);
  db.run(INSERT_acciones_5);
  db.run(INSERT_acciones_6);
  db.run(INSERT_acciones_7);
  db.run(PORTFOLIO_SCHEMA);
  db.run(PORTFOLIO_ITEM_SCHEMA);

  db.each("SELECT * FROM user", (err, user) => {
    console.log("Users");
    console.log(user);
  });
  db.each("SELECT * FROM acciones", (err, user) => {
    console.log("acciones");
    console.log(user);
  });
});

process.on("SIGINT", () =>
  db.close(() => {
    console.log("Database closed");
    process.exit(0);
  })
);

module.exports = db;
