const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Default PostgreSQL connection details
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'stmary_exit_exam'
};

const pool = new Pool(dbConfig);

async function initializeDatabase() {
  // First, check if database exists by trying to connect
  console.log(`[Database] Attempting to connect to database: ${dbConfig.database}...`);
  
  const testPool = new Pool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: 'postgres' // connect to default database first to check
  });

  try {
    const res = await testPool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbConfig.database]);
    
    if (res.rowCount === 0) {
      console.log(`[Database] Database "${dbConfig.database}" does not exist. Creating it now...`);
      await testPool.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log(`[Database] Database "${dbConfig.database}" created successfully.`);
    } else {
      console.log(`[Database] Database "${dbConfig.database}" already exists.`);
    }
  } catch (err) {
    console.error('[Database] Error checking/creating database:', err.message);
    console.log('[Database] Proceeding with standard connection attempt...');
  } finally {
    await testPool.end();
  }

  // Run the setup script to create tables and seed questions if users or questions table does not exist
  try {
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'questions'
      );
    `);
    
    const tablesExist = tableCheck.rows[0].exists;
    let questionsCount = 0;
    
    if (tablesExist) {
      const countRes = await pool.query('SELECT COUNT(*) FROM questions');
      questionsCount = parseInt(countRes.rows[0].count);
    }

    if (!tablesExist || questionsCount === 0) {
      console.log('[Database] Tables not found or questions are empty. Seeding database schema...');
      const sqlPath = path.join(__dirname, '../database/setup.sql');
      const sqlContent = fs.readFileSync(sqlPath, 'utf8');
      
      await pool.query(sqlContent);
      console.log('[Database] Schema created and seeded successfully.');
    } else {
      console.log(`[Database] Schema is already initialized with ${questionsCount} questions.`);
    }
  } catch (err) {
    console.error('[Database] Failed to execute database setup script:', err.message);
  }
}

// Immediately trigger initialization
initializeDatabase();

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: () => pool
};
