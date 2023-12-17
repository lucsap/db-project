function beforeCreate(connection, callback){
  // Cria o banco de dados antes de executar as migrations
  const dbName = process.env.DB_NAME; // process.env.DB_NAME;

  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
    if (err) {
      console.error(`Error creating database "${dbName}": ${err.message}`);
      callback(err, connection);
    } else {
      console.log(`Database "${dbName}" created or already exists`);
      callback(null, connection);
    }
  });
}
