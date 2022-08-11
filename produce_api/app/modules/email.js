var jwt=require('jsonwebtoken');
var nodemailer=require('nodemailer');
const Cryptr = require('cryptr');

const transporter = nodemailer.createTransport({
	
  host: process.env.EMAIL_HOST,
  transportMethod: 'SMTP',
  tls:{
        rejectUnauthorized:false
    },
  secure: false,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

const getPasswordResetURL = (user, token) =>{
	const url = process.env.Website_Domain+`api/resetpassword/${user.USER_id}/${token}`
	console.log(url+"    "+"Urk check"); 
	return url;
}
  
  
  
const emailverificationURL = (email) => {
	const cryptr = new Cryptr(process.env.CRYPT_KEY);
 
	const encryptedString = cryptr.encrypt(email);
	const url = process.env.Website_Domain+`api/emailverified/${encryptedString}`
	
	return url;
}

const emailVerifiedTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "Email Verification"
  const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We're excited to have you get started. First, you need to confirm your account.</p>
  <p>You can use the following link to verified your Email:</p>
  <button style="
    font-size: 22px;
    background-color: red;
    border-color: red;
    border-radius: 2px;"
><a target="_blank" style="color: #fff;border: none;text-decoration: none;"
	href=${url}>Verify Email</a></button>`

  return { from, to, subject, html }
}
  

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "Reset Password"
  const html = `
  <p>Hey ${user.name || user.email},</p>
  <p>We heard that you lost your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <button style="
    font-size: 22px;
    background-color: red;
    border-color: red;
    border-radius: 2px;"
><a target="_blank" style="color: #fff;border: none;text-decoration: none;"
	href=${url}>Password Update</a></button>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Do something outside today! </p>
  `

  return { from, to, subject, html }
}

// `secret` is passwordHash concatenated with user's createdAt,
// so if someones gets a user token they still need a timestamp to intercept.
const usePasswordHashToMakeToken = (user) => {
  const passwordHash = user.password;
  const created_at = user.created_at ;
  const userId = user.USER_id ;
  const secret = passwordHash + "-" + created_at
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600 // 1 hour
  })
  return token
}


//decrypt the verifying token
const decrypttoken = (token) => {
  const cryptr = new Cryptr(process.env.CRYPT_KEY);
  const decryptedString = cryptr.decrypt(token);
  
  return decryptedString
}



const send_email = {
	transporter:transporter,
	getPasswordResetURL:getPasswordResetURL,
    usePasswordHashToMakeToken: usePasswordHashToMakeToken,
    resetPasswordTemplate:resetPasswordTemplate,
	emailVerifiedTemplate:emailVerifiedTemplate,
	emailverificationURL:emailverificationURL,
	decrypttoken:decrypttoken
};
module.exports = send_email;