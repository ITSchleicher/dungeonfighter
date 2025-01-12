
import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';


// //Using Sequelize

// let sequelize;

// if (process.env.DB_URL) {
//   sequelize = new Sequelize(process.env.DB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PW,
//     {
//       host: 'localhost',
//       dialect: 'postgres',
//     },
//   );
// }

const { Pool } = pg;

let pool;

if (process.env.DB_URL) {
  pool = new Pool({
    connectionString: process.env.DB_URL,
  });
} else {
  pool = new Pool({
    user: process.env.DATABASE_USER,
    host: 'localhost',
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432, 
  });
}



const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};
export { pool, connectToDb };