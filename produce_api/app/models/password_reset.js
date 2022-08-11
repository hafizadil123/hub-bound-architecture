const connection = require("../config/config");
const TABLE = "password_reset";

const passwordReset = function(){}

/*
 * Function to create an entry for password reset token
 *
 * @params:
 *  {int} 'uid'
 *
 * @return:
 *  {string} : Unique token generated
 *
*/
passwordReset.createToken = async function(uid){

  const uToken = passwordReset.generateUToken();
  const result = await connection.query(`INSERT INTO ${TABLE} SET uid = ${uid}, utoken = '${uToken}'`);
  return (result[0].affectedRows == 1 ? uToken : null)

}


passwordReset.getUserByToken = async function(token){

  const result = await connection.query(`SELECT uid FROM ${TABLE} WHERE utoken = '${token}'`);
  return (result[0].length == 0) ? null : result[0][0].uid;

}

passwordReset.generateUToken = (length = 5) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = passwordReset;
