import mysql from "mysql";

// MySQL bağlantı bilgilerini içeren nesne
export const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Doggerygt1907.",
  database: "social",
});

<<<<<<< HEAD
=======

>>>>>>> 0d32800f5f5a779204d013809d43e9f5aabdb6f7
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
<<<<<<< HEAD
=======

>>>>>>> 0d32800f5f5a779204d013809d43e9f5aabdb6f7
