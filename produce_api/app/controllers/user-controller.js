const userModel = require("../models/user");
const chimpMailModel = require("../models/chimp_mail");
const passwordResetModel = require("../models/password_reset");
const userInvitationMails = require('../models/user_invitation_mails');

const STATUS_SUCCESS = 200;
const STATUS_FAIL = 400;

const ROLE_USER = 2;
const ROLE_EMPLOYEE = 3;

/**
 * Send mail to user for password reset
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */

module.exports.sendPasswordResetMail = async (req, res) => {

  let message = "", status = STATUS_FAIL, response = null;

  const user = await userModel.getByEmail(req.body.email);

  if(user == null){
    message = "User not found";
  }else{
    
    let sendMailResp = null;
    if(user.social_id == null)
      sendMailResp = await chimpMailModel.sendPasswordResetMail(user.id, user.email, user.firstname);
    else
      sendMailResp = await chimpMailModel.sendPasswordResetMailSocial(user.email, user.firstname);
    
    if(sendMailResp.status){
      status = STATUS_SUCCESS;
      message = "Successfully delivered! Please check your mail.";
    }else{
      message = "Something went wrong, unable to send mail";
    } 
    response = sendMailResp.reject_reason;
  }

  return res.status(200).json({
    status_code: status,
    message,
    data: response
  });

};


module.exports.getUserByPasswordResetToken = async function(req, res){

  const token = req.body.token;
  let message = "", status = STATUS_FAIL, response = null;

  const userId = await passwordResetModel.getUserByToken(token);
  if(userId == null) {
    message = "Invalid token";
  }
  else{
    status = STATUS_SUCCESS;
    response = {uid: userId};
  }
  

  return res.status(200).json({
    status_code: status,
    message,
    data: response
  });

}


module.exports.updatePassword = async function(req, res){

  const uid = parseInt(req.body.uid);
  let message = "", status = STATUS_FAIL, response = null;

  const ifUser = await userModel.validateById(uid);

  if(ifUser){

    const updateResp = await userModel.updatePassword(uid, req.body.password);

    if(updateResp){
      message = "Updated successfully!";
      status = STATUS_SUCCESS;
    }else{
      message = "Failed to update";
    }

  }else{

    message = "User not found";

  }

  return res.status(200).json({
    status_code: status,
    message,
    data: response
  });

}


module.exports.getUserByInvitationToken = async(req, res) => {

  const token = req.body.token;
  let message = "", status = STATUS_FAIL, response = null;

  const userId = await userInvitationMails.getUserByToken(token);
  if(userId == null) {
    message += "Invalid token";
  }
  else{
    
    response = await userModel.getById(userId);
    if(response != null){
      status = STATUS_SUCCESS;
      delete response.password;
    }else{
      message += "Invalid token, user not found";
    }

  }
  

  return res.status(status).json({
    status_code: status,
    message,
    data: response
  });  

}


module.exports.updateEmployeeAccount = async(req, res) => {
 
  const bodyReq = req.body;
  let message = "", status = STATUS_FAIL, response = null;

  const invited = bodyReq.invite == undefined ? false: Boolean(bodyReq.invite);
  const uid = parseInt(bodyReq.uid);

  const userExists = await userModel.validateById(uid);

  if(userExists){

    const updateUser = await userModel.updateEmployee(uid, bodyReq);
    if(updateUser){
      status = STATUS_SUCCESS;
      message += "Updated successfully!";
      response = await userModel.getById(uid);
      if(response != null){
        response.business_id = response.business_ids;
        delete response.password;
      }
    }else{
      message += "Something went wrong!";
    }

  }else{

    message += "User not found";

  }
  
  return res.status(status).json({
    status_code: status,
    message,
    data: response
  });    

}