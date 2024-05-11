import mysql from "mysql";

// MySQL bağlantı bilgilerini içeren nesne
export const db = mysql.createConnection({
  host: "sql11.freesqldatabase.com",
  port: 3306,
  user: "sql11705274",
  password: "TyBUnYwqN8",
  database: "sql11705274",
});

// MySQL sunucusuna bağlanma işlemi
db.connect(function (err) {
  if (err) {
    console.error("MySQL sunucusuna bağlanamadi hatas: " + err.stack);
    return;
  }

  console.log(
    "MySQL sunucusuna başaryla bağlanildi. Bağlant ID: " + db.threadId
  );
});

// MySQL sunucusundan gelen hataları ele alma
db.on("error", function (err) {
  console.error("Beklenmeyen MySQL bağlant hatas: " + err.code);
});

/*Host: sql11.freesqldatabase.com
Database name: sql11705274
Database user: sql11705274
Database password: TyBUnYwqN8
Port number: 3306 */
