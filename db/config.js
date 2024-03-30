import pkg from 'pg';
const { Pool } = pkg;

const counter = 1;

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
    ssl: true
})

// async function createDatabase () {
//   await pool.query("CREATE DATABASE tasksdb");
// }

// async function createTable () {
//   await pool.query('CREATE TABLE tasks(id SERIAL PRIMARY KEY, title VARCHAR(50) UNIQUE, description VARCHAR(200))');
// }

// createDatabase().then(() => console.log('Database created successfully'));
// createTable().then(() => console.log('Table created successfully'));

async function createDatabaseAndTable() {
  try {
    await pool.query('CREATE DATABASE tasksdb')
    await pool.query(
      'CREATE TABLE tasks(id SERIAL PRIMARY KEY, title VARCHAR(50) UNIQUE, description VARCHAR(200))',
    ) 
    console.log('Base de datos y tabla creadas exitosamente');
    counter = 1;
  } catch (err) {
    console.error('Error al crear la base de datos o la tabla:', err)
  }
}
if(!counter) {
  createDatabaseAndTable();
} 
