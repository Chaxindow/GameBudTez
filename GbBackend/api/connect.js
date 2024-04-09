import mysql from "mysql";

// MySQL bağlantı bilgilerini içeren nesne
export const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "gamebud",
});

// MySQL sunucusuna bağlanma işlemi
db.connect(function (err) {
  if (err) {
    console.error("MySQL sunucusuna bağlanma hatas: " + err.stack);
    return;
  }

  console.log("MySQL sunucusuna başaryla bağlan. Bağlant ID: " + db.threadId);
});

// MySQL sunucusundan gelen hataları ele alma
db.on("error", function (err) {
  console.error("Beklenmeyen MySQL bağlant hatas: " + err.code);
});
