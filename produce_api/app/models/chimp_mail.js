const client = require('@mailchimp/mailchimp_transactional')(process.env.MANDRILL_API_KEY);
const passwordResetModel = require("./password_reset");
const userInvitationMails = require('./user_invitation_mails');
const userVerificationModel = require("./user_verification_mail");

const chimpMail = function(){}

const TEMPLATE_PASSWORD_RESET = "reset-password";
const TEMPLATE_CREATE_ORDER = "new-order-placed";
const TEMPLATE_CANCEL_ORDER = "order-canceled";
const TEMPLATE_USER_VERIFICATION = "verify-email";
const TEMPLATE_USER_INVITATION = "admin-invitation";
const TEMPLATE_PASSWORD_RESET_SOCIAL = "forgot-password-3rd-party-login";

/*
 * Function to send password reset mail to the user
 *
 * @params:
 *  {string} 'user_first_name'
 *  {string} 'email'
 *
 * @return:
 *  {obj|null} : If user is found, then we return the corresponding user details obj, else null is returned
 *
*/
chimpMail.sendPasswordResetMail = async function(uid, email, user_first_name){

  const uToken = await passwordResetModel.createToken(uid);
  const resetPasswordUrl = `${process.env.WEB_URL}/forgot-password?token=${uToken}`;
  const params = [
    {name: 'FNAME', content: user_first_name},
    {name: 'URL', content: resetPasswordUrl}
  ];
  const sendMailResp = await chimpMail.sendMail(TEMPLATE_PASSWORD_RESET, email, "Password Reset", params);
  const sendMailRespStatus = sendMailResp.status == 'sent';
  return { 'status': sendMailRespStatus, 'reject_reason': sendMailResp.reject_reason }; 

}


/*
 * Function to send password reset mail to the user (for social login)
 *
 * @params:
 *  {int} 'uid'
 *  {string} 'user_first_name'
 *  {string} 'email'
 *
 * @return:
 *  {obj|null} : If user is found, then we return the corresponding user details obj, else null is returned
 *
*/
chimpMail.sendPasswordResetMailSocial = async function(email, user_first_name){

  const loginUrl = `${process.env.WEB_URL}/login`;
  const params = [
    {name: 'FNAME', content: user_first_name},
    {name: 'UPDATE_PROFILE', content: loginUrl}
  ];
  const sendMailResp = await chimpMail.sendMail(TEMPLATE_PASSWORD_RESET_SOCIAL, email, "Forgot password: 3rd party login", params);
  const sendMailRespStatus = sendMailResp.status == 'sent';
  return { 'status': sendMailRespStatus, 'reject_reason': sendMailResp.reject_reason }; 

}


/*
 * Function to send password reset mail to the user
 *
 * @params:
 *  {string} 'email'
 *
 * @return:
 *  {obj|null} : If user is found, then we return the corresponding user details obj, else null is returned
 *
*/
chimpMail.sendCreateOrderMail = async function(email, order_obj){

  const sendMailResp = await chimpMail.sendMail(TEMPLATE_CREATE_ORDER, email, "Order", order_obj);
  const sendMailRespStatus = sendMailResp.status == 'sent';
  return { 'status': sendMailRespStatus, 'reject_reason': sendMailResp.reject_reason }; 

}

/*
 * Function to send cancel order mail to the admin
 *
 * @params:
 *  {string} 'email'
 *
 * @return:
 *  {obj|null} : Whether order cancel mail has been sent successfully
 *
*/
chimpMail.sendCancelOrderMail = async function(email, order_obj){

  const sendMailResp = await chimpMail.sendMail(TEMPLATE_CANCEL_ORDER, email, "Order", order_obj);
  const sendMailRespStatus = sendMailResp.status == 'sent';
  return { 'status': sendMailRespStatus, 'reject_reason': sendMailResp.reject_reason }; 

}


/*
 * Function to send confirmation mail to the registered user
 *
 * @params:
 *  {string} 'email'
 *
 * @return:
 *  {obj|null} : If user is found, then we return the corresponding user details obj, else null is returned
 *
*/
chimpMail.sendConfirmationMail = async function(email, user_first_name, uid){

  const token = await userVerificationModel.createToken(uid)
  const verificationUrl = `${process.env.WEB_URL}/user/verification?token=${token}`;
  const params = [
    {
      name: 'FNAME', content: user_first_name
    },
    {
      name: 'UPDATE_PROFILE', content: verificationUrl
    }
  ];
  
  const sendMailResp = await chimpMail.sendMail(TEMPLATE_USER_VERIFICATION, email, "Verification", params);
  const sendMailRespStatus = sendMailResp.status == 'sent';
  return { 'status': sendMailRespStatus, 'reject_reason': sendMailResp.reject_reason }; 

}


chimpMail.sendAdminInvitationMail = async function(uid, email, user_first_name){

  const token = await userInvitationMails.createToken(uid);
  const userRegUrl = `${process.env.WEB_URL}/business-account?invite=1&token=${token}`;
  const params = [
    {
      name: 'FNAME', content: user_first_name
    },
    {
      name: 'REGISTER_URL', content: userRegUrl
    }
  ];
  const sendMailResp = await chimpMail.sendMail(TEMPLATE_USER_INVITATION, email, "Admin Invitation", params);
  const sendMailRespStatus = sendMailResp.status == 'sent';
  return { 'status': sendMailRespStatus, 'reject_reason': sendMailResp.reject_reason }; 

}


chimpMail.sendMail = async function(template, email, subject, params){

  const response = await client.messages.sendTemplate({
    template_name: template,
    template_content: [],
    message: {
      from_email: process.env.EMAIL_FROM,
      from_name: process.env.EMAIL_NAME,
      subject: subject,
      to: [{ email: email}],
      merge : true,
      global_merge_vars : params,
      merge_vars: []
    },
  });

  return {'status': response[0].status, 'reject_reason': response[0].reject_reason};

}


module.exports = chimpMail;
