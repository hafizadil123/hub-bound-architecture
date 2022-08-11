const connection = require("../config/config");
const TABLE = "user_verification_mail";

const userVerificationMail = function(){}

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
userVerificationMail.createToken = async function(uid){

  const token = userVerificationMail.generateUToken();
  const result = await connection.query(`INSERT INTO ${TABLE} SET uid = ${uid}, token = '${token}'`);
  return (result[0].affectedRows == 1 ? token : null)

}


userVerificationMail.getUserByToken = async function(token){

  const result = await connection.query(`SELECT uid FROM ${TABLE} WHERE token = '${token}'`);
  return (result[0].length == 0) ? null : result[0][0].uid;

}

userVerificationMail.generateUToken = (length = 5) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = userVerificationMail;
