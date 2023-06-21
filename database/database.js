const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'discord_api'
}).promise();

async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUser(user_id, server_id) {
  const [rows] = await pool.query(`
  SELECT * 
  FROM users 
  WHERE user_id = ? AND server_id = ?
  `, [user_id,server_id]);

  if (!rows.length) return undefined; // don't like this line but it makes sense given the context
  return rows[0];
}

// // optional parameter i included with pronouns

async function addUser(user_id,server_id,pronouns) {
  var sql_query = "INSERT INTO users (user_id, server_id) VALUES (?,?)";
  var params = [user_id,server_id]; 
  if(pronouns != undefined) {
    sql_query = `
    INSERT INTO users (user_id, server_id, pronouns) 
    VALUES (?,?,?)
    `;
    params.push(JSON.stringify((pronouns)));
  }
  await pool.query(sql_query,params);
  return await getUser(user_id,server_id);
}

async function deleteUser(user_id, server_id) {
  await pool.query(`
  DELETE
  FROM users
  WHERE user_id = ? AND server_id = ?
  `,[user_id,server_id]);
}

async function updateUser(user_id,server_id,pronouns) {
  pronouns = JSON.stringify((pronouns)); 
  await pool.query(`
  UPDATE users
  SET pronouns = ?
  WHERE user_id = ? AND server_id = ? 
  `,[pronouns,user_id,server_id]);
  return await getUser(user_id,server_id);
}

async function userExists(user_id, server_id) {
  const user = await getUser(user_id,server_id); 
  return user != undefined; 
}


module.exports =  {
  getUsers, 
  getUser, 
  addUser, 
  deleteUser, 
  updateUser,
  userExists
}

