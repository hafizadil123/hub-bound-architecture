const connection = require("../config/config");
const bcrypt = require("bcryptjs");
const TABLE = "users";

const user = function(){}

/*
 * Function to get user details by its email
 *
 * @params:
 *  {string} 'user_mail'
 *
 * @return:
 *  {obj|null} : If user is found, then we return the corresponding user details obj, else null is returned
 *
*/
user.getByEmail = async function(user_mail){

  const email = user_mail.trim().toLowerCase();
  const result = await connection.query(`SELECT * FROM ${TABLE} WHERE LOWER(email) LIKE '${email}'`);
  return (result[0].length > 0 ? result[0][0] : null)

}


user.getById = async function(id){

  const result = await connection.query(`SELECT * FROM ${TABLE} WHERE id = ${id}`);
  return (result[0].length > 0 ? result[0][0] : null)

}


user.validateById = async function(uid){

  const result = await connection.query(`SELECT count(*) AS count FROM ${TABLE} WHERE id = ${uid}`);
  return (result[0][0].count == 1);

}


user.updatePassword = async function(uid, password){

  const encryptPassword = bcrypt.hashSync(password.trim(), 6);
  const result = await connection.query(`UPDATE ${TABLE} SET password = '${encryptPassword}' WHERE id = ${uid}`);
  return (result[0].affectedRows == 1);

}

user.updateEmployee = async function(uid, fields){

  const encryptPassword = bcrypt.hashSync(fields.password.trim(), 6);
  const [result] = await connection.query(`UPDATE ${TABLE} SET firstname = '${fields.firstname.trim()}', lastname = '${fields.lastname.trim()}', email = '${fields.email.trim()}', password = '${encryptPassword}', status = 10 WHERE id = ${uid}`);
  return result.affectedRows == 1;

}

module.exports = user;
