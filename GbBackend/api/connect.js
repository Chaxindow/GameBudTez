import mysql from "mysql";

// MySQL bağlantı bilgilerini içeren nesne
export const db = mysql.createConnection({
  host: "192.168.1.22",
  port: 3306,
  user: "root",
  password: "1234",
  database: "gamebud",
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
