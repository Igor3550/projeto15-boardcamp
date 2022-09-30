import pg from 'pg';
const { Pool } = pg;

const connectionConfig = {
  user : 'postgres',
  password : '1212',
  host : 'localhost',
  port : 5432,
  database : 'boardcamp'
}

const connection = new Pool(connectionConfig);

export default connection;