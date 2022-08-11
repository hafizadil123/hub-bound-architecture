var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Cryptr = require("cryptr");
const path = require("path");
var connection = require("../config/config");
var sendemail_class = require("../modules/email.js");
const { getPasswordResetURL } = require("../modules/email.js");
const htmlentities = require("html-entities");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
  "e082b7f11d7ee23751adf6af2576e38a"
);
const md5 = require("md5");
const stripe = require("stripe")(
  "sk_test_51KFPw1Jv1NThE3WiU1HQ5MZA4X1aHEuH1i3QXSmeatqKN716SyY0ZXix04v9oTAD4sLZqaGeZxyhMCPMTzoY16VP00qIvaQKBI"
);
const chimpMailModel = require("../models/chimp_mail");

const ORDER_STATUS_DELIVERED = 2;
const ORDER_STATUS_CANCELLED = 3;

const helper = require("../modules/helper.js");
/**
 * return dashboard information
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */

const subscribemailingList = async (email, first_name, last_name) => {
  const subscriberHash = md5(email.toLowerCase());
  const listId = "8aebf5cab7"; //for developement
  // const listId = '665337c1a6'; // live

  mailchimp.setConfig({
    apiKey: "e082b7f11d7ee23751adf6af2576e38a",
    server: "us8",
  });

  const response = await mailchimp.lists
    .setListMember(listId, subscriberHash, {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: first_name,
        LNAME: last_name,
      },
    })
    .then((res) => {
      console.log("response", res);
    })
    .catch((e) => {
      console.log("error", e);
    });
};

module.exports.Dashboard = async function (req, res) {
  let today = new Date();
  let month = today.getMonth() + 1;
  let current_date = today.getDate();
  let labels_array = [
    current_date - 6 + "/" + month,
    current_date - 5 + "/" + month,
    current_date - 4 + "/" + month,
    current_date - 3 + "/" + month,
    current_date - 2 + "/" + month,
    current_date - 1 + "/" + month,
    current_date + "/" + month,
  ];

  if (req.body.hasOwnProperty("uid") && req.body.uid != "") {
    var sqlQuery = "SELECT * FROM users WHERE id = '" + req.body.uid + "'";
    connection.query(sqlQuery, async function (err, resp, field) {
      if (err) {
        return res.status(400).json({
          status_code: 400,
          message: "Something went wrong.",
          data: {},
        });
      } else {
        if (resp.length > 0) {
          //           var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
          //     result = cars.reduce(function (r, a) {
          //         r[a.make] = r[a.make] || [];
          //         r[a.make].push(a);
          //         return r;
          //     }, Object.create(null));

          // console.log(result);

          //get order data
          var total_orders = 0;
          var total_orders_amount = 0;
          var total_item_offered = 0;
          var order_array = (order_item_data = []);
          var n = 0;
          var sqlQuery =
            "SELECT o.* from orders as o where o.business_id=" +
            req.body.business_id;
          await connection.query(sqlQuery).spread(async function (response) {
            if (response.length > 0) {
              total_orders = response.length;

              for (const i in response) {
                total_orders_amount =
                  parseFloat(total_orders_amount) +
                  parseFloat(response[i].grand_total);
                var sql =
                  "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
                  LEFT JOIN inventory as i ON oli.item_id = i.id\
                  where oli.order_id=" +
                  response[i].id;

                await connection.query(sql).spread(async function (line_items) {
                  for (const j in line_items) {
                    order_item_data[n] = line_items[j];
                    n++;
                  }
                });
              }
            }
          });

          order_array = order_item_data.reduce(function (r, a) {
            r[a.item_id] = r[a.item_id] || [];
            r[a.item_id].push(a);
            return r;
          }, Object.create(null));

          var product_names = [];
          var product_qty = [];
          for (const j in order_array) {
            product_names.push(order_array[j][0].product_name);
            var total_qty = 0;
            var product_deatils = order_array[j];
            for(const m in product_deatils){
              total_qty = parseInt(total_qty) + parseInt(product_deatils[m].qty)
            }
            product_qty.push(total_qty);
          }
          
          //total inventory listing
          var sqlQuery =
            "SELECT * FROM inventory WHERE status =1 and business_id =" +
            req.body.business_id;
          await connection.query(sqlQuery).spread(async function (response) {
            if (response.length > 0) {
              total_item_offered = response.length;
            }
          });

          responseData = {};

          let order_graph_data = {
            labels: labels_array,
            datasets: [
              {
                label: "",
                //data: [12, 19, 3, 5, 2, 3],
                data: [],
                fill: false,
                backgroundColor: "rgb(0, 127, 78)",
                borderColor: "rgba(0, 127, 78, 0.2)"
              },
            ],
          };

          let product_unavailable_graph_data = {
            labels: labels_array,
            datasets: [
              {
                label: "",
                //data: [12, 19, 3, 5, 2, 3],
                data: [],
                fill: false,
                backgroundColor: "rgb(206, 0, 0)",
                borderColor: "rgb(206, 0, 0, 0.2)",
              },
            ],
          };

          let product_performace_graph_data = {
            // labels: [
            //   "Apple, Fiji",
            //   "Prople Water, Grape",
            //   "Vanilla Yougurt, Activia",
            //   "Ice",
            // ],
            labels: product_names,
            datasets: [
              {
                label: "",
                // data: [20, 16, 12, 7],
                data: product_qty,
                fill: false,
                backgroundColor: "rgb(0, 127, 78)",
                borderColor: "rgba(0, 127, 78, 0.2)",
              },
            ],
          };

          responseData["order_graph"] = {
            data: order_graph_data,
            total_order: total_orders,
            total_revenue: "$" + total_orders_amount,
          };
          responseData["product_unavailable_graph"] = {
            data: product_unavailable_graph_data,
            item: 0,
            percantage: 0
          };
          responseData["product_performace_graph"] = {
            data: product_performace_graph_data,
            item: total_item_offered,
          };
          responseData["order_data"] = order_array;

          return res.status(200).json({
            status_code: 200,
            message: "Overall Performance.",
            data: responseData,
          });
        } else {
          return res.status(400).json({
            status_code: 400,
            message: "User not found.",
            data: {},
          });
        }
      }
    });
  } else {
    return res.status(400).json({
      status_code: 400,
      message: "Uid is required.",
      data: {},
    });
  }
};

/**
 * function to check email is availabe
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */

module.exports.availability = function (req, res) {
  if (req.body.hasOwnProperty("email") && req.body.email != "") {
    connection.query(
      "SELECT * FROM users WHERE email = '" +
        req.body.email +
        "' OR phone_number ='" +
        req.body.email +
        "'",
      function (err, results) {
        if (results.length <= 0) {
          return res.status(200).json({
            status_code: 200,
            message: "Email or Phone number is available.",
            data: {},
          });
        } else {
          return res.status(200).json({
            status_code: 400,
            message: "Email or Phone number already in use.",
            data: {},
          });
        }
      }
    );
  } else {
    return res.status(400).json({
      status_code: 400,
      message: "Email or Phone number is required.",
      data: {},
    });
  }
};

/**
 * user register
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.register = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var business_type =
    req.body.hasOwnProperty("business_type") && req.body.business_type != ""
      ? req.body.business_type
      : "";
  var business_name =
    req.body.hasOwnProperty("business_name") && req.body.business_name != ""
      ? req.body.business_name
      : "";
  var firstname =
    req.body.hasOwnProperty("firstname") && req.body.firstname != ""
      ? req.body.firstname
      : "";
  var lastname =
    req.body.hasOwnProperty("lastname") && req.body.lastname != ""
      ? req.body.lastname
      : "";
  var email =
    req.body.hasOwnProperty("email") && req.body.email != ""
      ? req.body.email
      : "";
  var password =
    req.body.hasOwnProperty("password") && req.body.password != ""
      ? req.body.password
      : "";
  var role =
    req.body.hasOwnProperty("role") && req.body.role != ""
      ? req.body.role
      : "2";
  var encrypted_pass = bcrypt.hashSync(password, 6);

  //checking if email is valid or available
  var sqlCheck = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {
        return res.status(400).json({
          status_code: 400,
          message: "An account already exists with this email.",
          data: {},
        });
      } else {
        var sqlQuery =
          "INSERT INTO users (firstname, lastname, email, role, password, created_at, updated_at) \
				VALUES ('" +
          firstname +
          "', '" +
          lastname +
          "', '" +
          email +
          "', '" +
          role +
          "', '" +
          encrypted_pass +
          "','" +
          date +
          "', '" +
          date +
          "')";

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in creating user account, please try after sometime.",
              data: {},
            });
          } else {
            const insertedId = response.insertId;
            //insert bussiness information
            var sqlQuery =
              "INSERT INTO business (name, type, firstname, lastname, email, created_by, created_at) \
				    VALUES ('" +
              business_name +
              "', '" +
              business_type +
              "', '" +
              firstname +
              "', '" +
              lastname +
              "', '" +
              email +
              "', '" +
              insertedId +
              "', '" +
              date +
              "')";

            await connection.query(sqlQuery, async function (errrs, rese) {
              if (errrs) {
                deleteUser(insertedId);
                return res.status(400).json({
                  status_code: 400,
                  message: "Something went wrong.",
                  data: {},
                });
              } else {
                //update bussiness information
                var sqlQuery =
                  "update users set business_ids = '" +
                  rese.insertId +
                  "' where id='" +
                  response.insertId +
                  "'";

                await connection.query(sqlQuery, async function (errr, resn) {
                  if (errrs) {
                    return res.status(400).json({
                      status_code: 400,
                      message: "Something went wrong.",
                      data: {},
                    });
                  } else {
                    var sqlQuery =
                      "SELECT * FROM users WHERE email = '" + email + "'";
                    connection.query(sqlQuery, async function (errs, respss) {
                      if (errs) {
                        return res.status(400).json({
                          status_code: 400,
                          message: "Something went wrong.",
                          data: {},
                        });
                      }

                      var profile_pic = respss[0].profile_pic;
                      var profile_pic_url =
                        process.env.upload + "images/user_dummy.png";
                      if (profile_pic != "" && profile_pic != null) {
                        profile_pic_url = profile_pic;
                      }
                      respss[0].profile_pic = profile_pic_url;
                      respss[0].business_id = rese.insertId;
                      var responseData = respss[0];

                      //remove fields from response
                      delete responseData["password"];

                      //subscribe the mailchimp audience list and send welcome email
                      var email = respss[0].email;
                      var firstname = respss[0].firstname;
                      var lastname = respss[0].lastname;
                      subscribemailingList(email, firstname, lastname);
                      chimpMailModel.sendConfirmationMail(email, firstname, responseData.id);

                      var output = {};
                      output = responseData;
                      return res.status(200).json({
                        status_code: 200,
                        message: "User account created successfully.",
                        data: output,
                      });
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
  });
};

/**
 * Social Login
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.sociallogin = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var business_type =
    req.body.hasOwnProperty("business_type") && req.body.business_type != ""
      ? req.body.business_type
      : "";
  var business_name =
    req.body.hasOwnProperty("business_name") && req.body.business_name != ""
      ? req.body.business_name
      : "";
  var firstname =
    req.body.hasOwnProperty("firstname") && req.body.firstname != ""
      ? req.body.firstname
      : "";
  var lastname =
      req.body.hasOwnProperty("lastname") && req.body.lastname != ""
        ? req.body.lastname
        : "";      
  var social_id =
    req.body.hasOwnProperty("social_id") && req.body.social_id != ""
      ? req.body.social_id
      : "";
  var email =
    req.body.hasOwnProperty("email") && req.body.email != ""
      ? req.body.email
      : "";
  var password =
    req.body.hasOwnProperty("password") && req.body.password != ""
      ? req.body.password
      : "password";
  var role =
    req.body.hasOwnProperty("role") && req.body.role != ""
      ? req.body.role
      : "2";
  var encrypted_pass = bcrypt.hashSync(password, 6);

  const ifLogin = req.body.login;

  //checking if email is valid or available
  var sqlCheck = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {
        var sqlQuery = "SELECT * FROM users WHERE email = '" + email + "'";
        connection.query(sqlQuery, async function (errs, respss) {
          if (errs) {
            return res.status(400).json({
              status_code: 400,
              message: "Something went wrong.",
              data: {},
            });
          }

          var profile_pic = respss[0].profile_pic;
          var profile_pic_url = process.env.upload + "images/user_dummy.png";
          if (profile_pic != "" && profile_pic != null) {
            profile_pic_url = profile_pic;
          }
          respss[0].profile_pic = profile_pic_url;

          //business details
          var business_ids = respss[0].business_ids;
          business_ids = business_ids.split(",");

          var sql = "SELECT * FROM business where id IN (?) and status=1";
          await connection
            .query(sql, [business_ids])
            .spread(async function (bussines) {
              respss[0].business = bussines;
            });

          var responseData = respss[0];
          responseData.business_id = business_ids[0];

          //remove fields from response
          delete responseData["password"];

          //subscribe the mailchimp audience list and send welcome email
          var email = respss[0].email;
          var firstname = respss[0].firstname;
          var lastname = respss[0].lastname;
          subscribemailingList(email, firstname, lastname);

          var output = {};
          output = responseData;

          //If employee, then add permissions
          if(output.role == 3)
            output.permissions = await getUsersPermissions(output.id);
          else
            output.permissions = null;

          return res.status(200).json({
            status_code: 200,
            message: "User login successfully.",
            data: output,
          });
        });
      } 
      else if(result.length == 0 && ifLogin == false){
        var sqlQuery =
          "INSERT INTO users (firstname, lastname, social_id, email, role, password, created_at, updated_at) \
				VALUES ('" +
          firstname +
          "', '" +
          lastname +
          "', '" +
          social_id +
          "', '" +
          email +
          "', '" +
          role +
          "', '" +
          encrypted_pass +
          "','" +
          date +
          "', '" +
          date +
          "')";

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in creating user account, please try after sometime.",
              data: {},
            });
          } else {
            //insert bussiness information
            var sqlQuery =
              "INSERT INTO business (name, type, firstname, lastname, email, created_by, created_at) \
				    VALUES ('" +
              business_name +
              "', '" +
              business_type +
              "', '" +
              firstname +
              "', '" +
              lastname +
              "', '" +              
              email +
              "', '" +
              response.insertId +
              "', '" +
              date +
              "')";

            await connection.query(sqlQuery, async function (errrs, rese) {
              if (errrs) {
                return res.status(400).json({
                  status_code: 400,
                  message: "Something went wrong.",
                  data: {},
                });
              } else {
                //update bussiness information
                var sqlQuery =
                  "update users set business_ids = '" +
                  rese.insertId +
                  "' where id='" +
                  response.insertId +
                  "'";

                await connection.query(sqlQuery, async function (errr, resn) {
                  if (errrs) {
                    return res.status(400).json({
                      status_code: 400,
                      message: "Something went wrong.",
                      data: {},
                    });
                  } else {
                    var sqlQuery =
                      "SELECT * FROM users WHERE email = '" + email + "'";
                    connection.query(sqlQuery, async function (errs, respss) {
                      if (errs) {
                        return res.status(400).json({
                          status_code: 400,
                          message: "Something went wrong.",
                          data: {},
                        });
                      }

                      var profile_pic = respss[0].profile_pic;
                      var profile_pic_url =
                        process.env.upload + "images/user_dummy.png";
                      if (profile_pic != "" && profile_pic != null) {
                        profile_pic_url = profile_pic;
                      }
                      respss[0].profile_pic = profile_pic_url;
                      respss[0].business_id = rese.insertId;
                      var responseData = respss[0];

                      //remove fields from response
                      delete responseData["password"];

                      //subscribe the mailchimp audience list and send welcome email
                      var email = respss[0].email;
                      var firstname = respss[0].firstname;
                      var lastname = respss[0].lastname;
                      subscribemailingList(email, firstname, lastname);
                      chimpMailModel.sendConfirmationMail(email, firstname, responseData.id);
                      chimpMailModel.sendPasswordResetMailSocial(email, firstname);

                      var output = {};
                      output = responseData;
                      return res.status(200).json({
                        status_code: 200,
                        message: "User account created successfully.",
                        data: output,
                      });
                    });
                  }
                });
              }
            });
          }
        });
      }
      else if(result.length == 0 && ifLogin == true){
        return res.status(400).json({
          status_code: 400,
          message: "User not found",
          data: {}
        });        
      }
    }
  });
};

/**
 * Welcome Email
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.welcomeEmail = async function (req, res) {
  var firstname =
    req.body.hasOwnProperty("firstname") && req.body.firstname != ""
      ? req.body.firstname
      : "";
  var lastname =
    req.body.hasOwnProperty("lastname") && req.body.lastname != ""
      ? req.body.lastname
      : "";
  var email =
    req.body.hasOwnProperty("email") && req.body.email != ""
      ? req.body.email
      : "";

  if (email) {
    subscribemailingList(email, firstname, lastname);
    return res.status(200).json({
      status_code: 200,
      message: "Welcome email sent to your email address.",
      data: {},
    });
  } else {
    return res.status(400).json({
      status_code: 400,
      message: "Problem in sending welcome email to your email address.",
      data: {},
    });
  }
};

/**
 * login api
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.login = async function (req, res) {
  var output = {};
  var sqlQuery = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
  connection.query(sqlQuery, async function (err, resp) {

    if (err) {
      return res.status(200).json({
        status_code: 400,
        message: "User not found.",
        data: {},
      });
    } else {
      if (resp.length > 0) {

        if(resp[0].status == 0){
          return res.status(400).json({
            status_code: 400,
            message: "Inactive user",
            data: {}
          });          
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          resp[0].password
        );        

        if (passwordIsValid) {
          var profile_pic = resp[0].profile_pic;
          var profile_pic_url = process.env.upload + "images/user_dummy.png";
          if (profile_pic != "" && profile_pic != null) {
            profile_pic_url = profile_pic;
          }
          resp[0].profile_pic = profile_pic_url;

          //business details
          var business_ids = resp[0].business_ids;
          business_ids = business_ids.split(",");

          var sql = "SELECT * FROM business where id IN (?) and status=1";
          await connection
            .query(sql, [business_ids])
            .spread(async function (bussines) {
              resp[0].business = bussines;
            });

          output = resp[0];

          //If employee, then add permissions
          if(output.role == 3)
            output.permissions = await getUsersPermissions(output.id);
          else
            output.permissions = null;

          return res.status(200).json({
            status_code: 200,
            message: "Login Successful.",
            data: output,
          });
        } else {
          return res.status(400).json({
            status_code: 400,
            message: "Invalid password.",
            data: {},
          });
        }
      }else{

        return res.status(400).json({
          status_code: 400,
          message: "User not found.",
          data: {}
        });

      }
    }
  });
};

/**
 * return user information
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.userInfo = function (req, res) {
  if (req.body.hasOwnProperty("uid") && req.body.uid != "") {
    var sqlQuery = "SELECT * FROM users WHERE id = '" + req.body.uid + "'";
    connection.query(sqlQuery, function (err, resp, field) {
      if (err) {
        return res.status(400).json({
          status_code: 400,
          message: "Something went wrong.",
          data: {},
        });
      } else {
        if (resp.length > 0) {
          var profile_pic = resp[0].profile_pic;
          var profile_pic_url = process.env.upload + "images/user_dummy.png";
          if (profile_pic != "" && profile_pic != null) {
            profile_pic_url = profile_pic;
          }
          resp[0].profile_pic = profile_pic_url;
          var responseData = resp[0];

          //remove fields from response
          delete responseData["password"];

          var output = {};
          output = responseData;
          return res.status(200).json({
            status_code: 200,
            message: "User account information.",
            data: output,
          });
        } else {
          return res.status(400).json({
            status_code: 400,
            message: "User not found.",
            data: {},
          });
        }
      }
    });
  } else {
    return res.status(400).json({
      status_code: 400,
      message: "Uid is required.",
      data: {},
    });
  }
};

/**
 * Update Account Info
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.updateAccount = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var firstname = req.body.hasOwnProperty("firstname")
    ? req.body.firstname
    : result[0].firstname;
  var lastname = req.body.hasOwnProperty("lastname")
    ? req.body.lastname
    : result[0].lastname;
  var email = req.body.hasOwnProperty("email")
    ? req.body.email
    : result[0].email;
  var business_type = req.body.hasOwnProperty("business_type")
    ? req.body.business_type
    : "";
  var business_name = req.body.hasOwnProperty("business_name")
    ? req.body.business_name
    : "";
  var business_id = req.body.hasOwnProperty("business_id")
    ? req.body.business_id
    : "";
  const password = req.body.password.trim();
  const empId = parseInt(req.body.employee_id);

  if( await checkEmailExists(email, empId) ){

    return res.status(400).json({
      status_code: 400,
      message: "An account already exists with this email",
      data: {}
    });    

  }

  //update bussiness information
  var sqlQuery =
    "update business set name = '" +
    business_name +
    "', type = '" +
    business_type +
    "',\
        firstname = '" +
    firstname +
    "', lastname = '" +
    lastname +
    "', email = '" +
    email +
    "'\
             where id='" +
    business_id +
    "'";

  await connection.query(sqlQuery, async function (err, resp) {
    if (err) {
      return res.status(200).json({
        status_code: 400,
        message:
          "Problem in updating business information, please try after sometime.",
        data: {}
      });
    } else {
      //Update name, email for all the existing businesses
      const updateExistingBusinesses = `UPDATE business SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}' WHERE created_by = ${empId}`;
      connection.query(updateExistingBusinesses);

      updateUserMail(firstname, lastname, email, password, empId)

      return res.status(200).json({
        status_code: 200,
        message: "business information updated successfully.",
        data: {}
      });
    }
  });
};

/**
 * Employee register
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.registerEmployee = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var firstname = req.body.hasOwnProperty("firstname")
    ? req.body.firstname
    : "";
  var lastname = req.body.hasOwnProperty("lastname") ? req.body.lastname : "";
  var email = req.body.hasOwnProperty("email") ? req.body.email : "";
  var phone = req.body.hasOwnProperty("phone") ? req.body.phone : "";
  var role = "3"; //employee role id
  var permissions = req.body.hasOwnProperty("empPermissions")
    ? req.body.empPermissions
    : [];
  var business = req.body.hasOwnProperty("business") ? req.body.business : [];
  var business_ids = business
    .map(function (val) {
      return val.id;
    })
    .join(",");

  var performance = false;
  var location = false;
  var inventor = false;
  var business_hours = false;
  var integrations = false;
  var employees = false;
  var payment = false;
  var delete_business = false;
  var order_management = false;
  permissions.map((item) => {
    if (item.name === "performance") {
      performance = item.value;
    } else if (item.name === "location") {
      location = item.value;
    } else if (item.name === "inventor") {
      inventor = item.value;
    } else if (item.name === "business_hours") {
      business_hours = item.value;
    } else if (item.name === "integrations") {
      integrations = item.value;
    } else if (item.name === "employee") {
      employees = item.value;
    } else if (item.name === "payment") {
      payment = item.value;
    } else if (item.name === "business_delete") {
      delete_business = item.value;
    } else if (item.name === "order_management") {
      order_management = item.value;
    }
  });

  //checking if email is valid or available
  var sqlCheck = "SELECT * FROM users WHERE email = '" + req.body.email + "'";
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {
        return res.status(400).json({
          status_code: 400,
          message: "An account already exists with this email.",
          data: {},
        });
      } else {
        var sqlQuery =
          "INSERT INTO users (firstname, lastname, email, phone, status, role, business_ids, created_at, updated_at) \
				VALUES ('" +
          firstname +
          "', '" +
          lastname +
          "', '" +
          email +
          "', '" +
          phone +
          "', " +
          0 + ", '" + 
          role +
          "', '" +
          business_ids +
          "','" +
          date +
          "', '" +
          date +
          "')";

        await connection.query(sqlQuery, async function (error, response) {

          if (error) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in creating employee account, please try after sometime.",
              data: {},
            });
          } else {
            //save user permission
            business.map(async function (bid) {
              var permissionQuery =
                "INSERT INTO permissions (uid, business_id, performance, location, inventor, business_hours, integrations, \
              employees, payment, delete_business, order_management) \
            VALUES (" +
                response.insertId +
                ", " +
                bid.id +
                "," +
                performance +
                ", " +
                location +
                ", " +
                inventor +
                ", \
            " +
                business_hours +
                ", " +
                integrations +
                "," +
                employees +
                ", " +
                payment +
                ", " +
                delete_business +
                ", " +
                order_management +
                ")";

              await connection.query(
                permissionQuery,
                async function (error, resp) {

                }
              );
            });

            var sqlQuery =
              "SELECT * FROM users WHERE role = 3 order by id DESC";
            await connection.query(sqlQuery, function (errs, respss) {

              if (errs) {
                return res.status(400).json({
                  status_code: 400,
                  message: "Something went wrong.",
                  data: {},
                });
              }

              var responseData = [];
              if (respss.length > 0) {
                for (const k in respss) {
                  var profile_pic = respss[k].profile_pic;
                  var profile_pic_url =
                    process.env.upload + "images/user_dummy.png";
                  if (profile_pic != "" && profile_pic != null) {
                    profile_pic_url = profile_pic;
                  }
                  respss[k].profile_pic = profile_pic_url;
                  responseData[k] = respss[k];

                  var business_ids = respss[k].business_ids;
                  business_ids = business_ids.split(",");
                  business_ids_json = [];
                  business_ids.map(async function (value, index) {
                    business_ids_json[index] = { id: value };
                  });
                  responseData[k].business_ids = business_ids_json;

                  //remove fields from response
                  delete responseData[k]["password"];
                }
              }

              var output = {};
              output = responseData;

              chimpMailModel.sendAdminInvitationMail(response.insertId, email, firstname);

              return res.status(200).json({
                status_code: 200,
                message: "Employee account created successfully.",
                data: output,
              });
            });
          }
        });
      }
    }
  });
};

/**
 * Update Employee
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.updateEmployee = async function (req, res) {
  //fetch users details
  uid = req.body.id;
  var sqlCheck = "SELECT * FROM users WHERE id = '" + uid + "'";
  await connection.query(sqlCheck).spread(async function (result) {
    if (result.length > 0) {
      var sqlCheck =
        "SELECT * FROM users WHERE email = '" +
        req.body.email +
        "' and  id != '" +
        uid +
        "'";
      await connection.query(sqlCheck, async function (errors, result, fields) {
        if (errors) {
          return res.status(400).json({
            status_code: 400,
            message: "An account already exists with this email.",
            data: {},
          });
        } else {
          let date = Math.floor(Date.now() / 1000);
          var firstname = req.body.hasOwnProperty("firstname")
            ? req.body.firstname
            : result[0].firstname;
          var lastname = req.body.hasOwnProperty("lastname")
            ? req.body.lastname
            : result[0].lastname;
          var email = req.body.hasOwnProperty("email")
            ? req.body.email
            : result[0].email;
          var phone = req.body.hasOwnProperty("phone")
            ? req.body.phone
            : result[0].phone;
          var role = "3"; //employee role id
          var permissions = req.body.hasOwnProperty("empPermissions")
            ? req.body.empPermissions
            : [];
          var business = req.body.hasOwnProperty("business")
            ? req.body.business
            : [];
          var business_ids = business
            .map(function (val) {
              return val.id;
            })
            .join(",");

          var performance = false;
          var location = false;
          var inventor = false;
          var business_hours = false;
          var returns = false;
          var employees = false;
          var payment = false;
          var delete_business = false;
          var order_management = false;
          permissions.map((item) => {
            if (item.name === "performance") {
              performance = item.value;
            } else if (item.name === "location") {
              location = item.value;
            } else if (item.name === "inventor") {
              inventor = item.value;
            } else if (item.name === "business_hours") {
              business_hours = item.value;
            } else if (item.name === "integrations") {
              returns = item.value;
            } else if (item.name === "employee") {
              employees = item.value;
            } else if (item.name === "payment") {
              payment = item.value;
            } else if (item.name === "business_delete") {
              delete_business = item.value;
            } else if (item.name === "order_management") {
              order_management = item.value;
            }
          });

          var sqlQuery =
            "update users set firstname = '" +
            firstname +
            "', lastname = '" +
            lastname +
            "', email = '" +
            email +
            "' \
        , role = '" +
            role +
            "', phone = '" +
            phone +
            "', updated_at = '" +
            date +
            "', business_ids = '" +
            business_ids +
            "' where id=" +
            uid;

          await connection.query(sqlQuery).spread(async function (response) {
            //delete user permission
            var sqlCheck = "delete FROM permissions WHERE uid = '" + uid + "'";
            await connection.query(sqlCheck).spread(async function (respe) {
              business.map(async function (bid) {
                //save user permission
                var permissionQuery =
                  "INSERT INTO permissions (uid, business_id, performance, location, inventor, business_hours, integrations, \
              employees, payment, delete_business, order_management) \
            VALUES (" +
                  uid +
                  ", " +
                  bid.id +
                  "," +
                  performance +
                  ", " +
                  location +
                  ", " +
                  inventor +
                  ", \
            " +
                  business_hours +
                  ", " +
                  returns +
                  "," +
                  employees +
                  ", " +
                  payment +
                  ", " +
                  delete_business +
                  ", " +
                  order_management +
                  ")";

                await connection
                  .query(permissionQuery)
                  .spread(async function (resp) {
                    console.log("inserted");
                  });
              });
            });

            var sqlQuery =
              "SELECT * FROM users WHERE role = 3 order by id DESC";
            await connection.query(sqlQuery, function (errs, respss) {
              if (errs) {
                return res.status(400).json({
                  status_code: 400,
                  message: "Something went wrong.",
                  data: {},
                });
              }
              console.log("respss", respss.length);
              var responseData = [];
              if (respss.length > 0) {
                for (const k in respss) {
                  var profile_pic = respss[k].profile_pic;
                  var profile_pic_url =
                    process.env.upload + "images/user_dummy.png";
                  if (profile_pic != "" && profile_pic != null) {
                    profile_pic_url = profile_pic;
                  }
                  respss[k].profile_pic = profile_pic_url;
                  responseData[k] = respss[k];

                  var business_ids = respss[k].business_ids;
                  business_ids = business_ids.split(",");
                  business_ids_json = [];
                  business_ids.map(async function (value, index) {
                    business_ids_json[index] = { id: value };
                  });
                  responseData[k].business_ids = business_ids_json;

                  //remove fields from response
                  delete responseData[k]["password"];
                }
              }

              var output = {};
              output = responseData;
              return res.status(200).json({
                status_code: 200,
                message: "Employee account updated successfully.",
                data: output,
              });
            });
          });
        }
      });
    } else {
      return res.status(400).json({
        status_code: 400,
        message: "Employee not found.",
        data: [],
      });
    }
  });
};

/**
 *  Employees Listing
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.Employees = async function (req, res) {
  var uid = req.body.hasOwnProperty("uid") ? req.body.uid : "";
  var business_id = req.body.hasOwnProperty("business_id")
    ? req.body.business_id
    : "0";

  var page = req.body.hasOwnProperty(page) ? req.body.page : 1;
  var limit = 10;
  var offset = 0;
  if (page <= "1" || page == "" || page == undefined || page == "undefined") {
    offset = 0;
    page = 1;
  } else {
    offset = limit * page - limit + 1;
  }

  var total_pages = 0;
  var sqlQuery =
    "SELECT * FROM users WHERE role = 3 and \
  (LOCATE('" +
    business_id +
    "', business_ids))";
    
  await connection.query(sqlQuery).spread(async function (response) {
    if (response.length > 0) {
      total_pages = Math.ceil(response.length / limit);
    }
  });

  var sqlQuery =
    "SELECT * FROM users WHERE role = 3 and \
  (LOCATE('" +
    business_id +
    "', business_ids)) LIMIT " +
    limit +
    "  offset " +
    offset;
  await connection.query(sqlQuery, async function (errs, respss) {
    if (errs) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong..",
        data: {},
      });
    }

    var responseData = [];
    if (respss.length > 0) {
      for (const k in respss) {
        var profile_pic = respss[k].profile_pic;
        var profile_pic_url = process.env.upload + "images/user_dummy.png";
        if (profile_pic != "" && profile_pic != null) {
          profile_pic_url = profile_pic;
        }
        respss[k].profile_pic = profile_pic_url;
        responseData[k] = respss[k];
        //add permission array
        responseData[k].permissions = {};
        var sqlQuery = "SELECT * FROM permissions WHERE uid = " + respss[k].id;
        await connection.query(sqlQuery).spread(async function (resps) {
          if (resps.length > 0) {
            responseData[k].permissions = resps[0];
          }
        });

        //remove fields from response
        delete responseData[k]["password"];
      }
    }

    var output = {};
    output = responseData;
    return res.status(200).json({
      status_code: 200,
      message: "Employee Listing.",
      data: {
        current_page: page,
        total_pages: total_pages,
        listing: output,
      },
    });
  });
};

/**
 *  Employee profile Info
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.EmployeeInfo = async function (req, res) {
  var uid = req.body.hasOwnProperty("uid") ? req.body.uid : "";

  var sqlQuery = "SELECT * from users where id=" + uid;
  await connection.query(sqlQuery, function (errs, respss) {
    if (errs) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong." + sqlQuery,
        data: {},
      });
    }

    var responseData = {};
    if (respss.length > 0) {
      for (const k in respss) {
        var profile_pic = respss[k].profile_pic;
        var profile_pic_url = process.env.upload + "images/user_dummy.png";
        if (profile_pic != "" && profile_pic != null) {
          profile_pic_url = profile_pic;
        }
        respss[k].profile_pic = profile_pic_url;
        responseData = respss[k];
      }
    }

    var output = {};
    output = responseData;
    return res.status(200).json({
      status_code: 200,
      message: "Employee profile information.",
      data: output,
    });
  });
};

/**
 *  Employee delete
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.EmployeeDelete = async function (req, res) {
  var employee_id = req.body.hasOwnProperty("employee_id")
    ? req.body.employee_id
    : "";

  var sqlQuery = "Delete FROM users where role=3 and id='" + employee_id + "'";
  await connection.query(sqlQuery, async function (errs, respss) {
    if (errs) {
      return res.status(400).json({
        status_code: 400,
        message: "Problem occured in employee deletion.",
        data: {},
      });
    } else {
      var sqlQuery = "Delete FROM permissions where uid='" + employee_id + "'";
      await connection.query(sqlQuery, async function (err, resp) {
        if (err) {
          return res.status(400).json({
            status_code: 400,
            message:
              "Employe deleted but problem occured in removing employee permessions.",
            data: {},
          });
        } else {
          return res.status(200).json({
            status_code: 200,
            message: "Employee deleted.",
            data: {},
          });
        }
      });

      return res.status(200).json({
        status_code: 200,
        message: "Employee deleted.",
        data: {},
      });
    }
  });
};

/**
 * Settings
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.Settings = async function (req, res) {
  //checking if user is valid or available
  var sqlCheck = "SELECT * FROM users WHERE id = '" + req.body.uid + "'";
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length <= 0) {
        return res.status(400).json({
          status_code: 400,
          message: "Employee not found!!!.",
          data: {},
        });
      } else {
        var sqlQuery =
          "SELECT * FROM setting WHERE uid='" +
          req.body.uid +
          "' and business_id = '" +
          req.body.business_id +
          "'";
        await connection.query(sqlQuery, function (errs, respss) {
          if (errs) {
            return res.status(400).json({
              status_code: 400,
              message: "Something went wrong.",
              data: {},
            });
          }

          return res.status(200).json({
            status_code: 200,
            message: "Setting information.",
            data: respss[0],
          });
        });
      }
    }
  });
};

/**
 * Setting Save
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.SettingsSave = async function (req, res) {

  const bodyReq = req.body;
  const updateAll = bodyReq.all_business;
  const uid = bodyReq.uid;
  const budinessId = bodyReq.business_id;
  let data = null, status = 400, message = '';

  //checking if user is valid or available
  var sqlCheck = "SELECT * FROM users WHERE id = '" + uid + "'";
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length <= 0) {
        return res.status(400).json({
          status_code: 400,
          message: "Employee not found!!!.",
          data: {},
        });
      } else {

        let upsert = false;

        if(updateAll){

          const getSettings = await getSettingsByBusiness(uid, budinessId);

          const updateBodyReq = {}
          updateBodyReq.products_updates = getSettings.length > 0 ? getSettings[0].products_updates != bodyReq.products_updates: true;
          updateBodyReq.order_cancel = getSettings.length > 0 ? getSettings[0].order_cancel != bodyReq.order_cancel : true;
          updateBodyReq.order_placed = getSettings.length > 0 ? getSettings[0].order_placed != bodyReq.order_placed: true;

          const submittedSettingIds = await getSubmittedSettingsByUser(uid);
          const businessIds = await getSubmittedBusinessIds(uid);
          //Get business ids which are not in the settings table
          // = businessIds - submittedSettings
          const nonSubmittedSettingIds = businessIds.filter( id => {
            return !submittedSettingIds.includes(id);
          } ); 

          const insertSettingIds = await insertSettings(uid, nonSubmittedSettingIds, bodyReq);
          const updateSettingIds = await updateSettings(uid, submittedSettingIds, bodyReq, updateBodyReq);

          upsert = insertSettingIds && updateSettingIds;

        }else{

          const updateBodyReq = { products_updates: true, order_cancel: true, order_placed: true };
          if(await ifSettingsByBusiness(uid, budinessId))
            upsert = await updateSettings(uid, [budinessId], bodyReq, updateBodyReq);
          else
            upsert = await insertSettings(uid, [budinessId], bodyReq);

        }

        if(upsert){

          status = 200;
          message += "Updated successfully!";
          data = getSettingsByBusiness(uid, budinessId);

        }else{

          message += "Something went wrong";

        }

        return res.status(200).json({
          status_code: status,
          message,
          data
        });        

      }
    }
  });
};

/**
 * Inventory Save
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.addInventory = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var product_name = req.body.hasOwnProperty("product_name")
    ? req.body.product_name
    : "";
  var brand_name = req.body.hasOwnProperty("brand_name")
    ? req.body.brand_name
    : "";
  var price = req.body.hasOwnProperty("price") ? req.body.price : "";
  var availability = req.body.hasOwnProperty("availability")
    ? req.body.availability
    : "";
  var category_id = req.body.hasOwnProperty("category_id")
    ? req.body.category_id
    : "";
  var business_id = req.body.hasOwnProperty("business_id")
    ? req.body.business_id
    : "";
  var employee_id = req.body.hasOwnProperty("employee_id")
    ? req.body.employee_id
    : "";
  var product_image =
    req.body.hasOwnProperty("product_image") &&
    req.body.hasOwnProperty("product_image") != ""
      ? req.body.product_image
      : "";
  var deal = req.body.hasOwnProperty("deal") ? req.body.deal : {};
  var unit = req.body.hasOwnProperty("unit") ? req.body.unit : [];

  const produtImageIds = req.body.product_image_ids.toString();

  var deal_qty = 0;
  var deal_price = 0;
  //if (deal.length > 0) {
  deal_qty = deal.qty;
  deal_price = deal.price;
  //}

  var unit1_qty = unit[0].number;
  var unit2_qty = unit[1].number;
  var unit1_type = unit[0].type;
  var unit2_type = unit[1].type;

  var sqlQuery =
    "INSERT INTO inventory (product_name, brand_name, price, availability, category, business_id,\
           deal_quantity, deal_price, employee_id, product_image, product_image_ids, unit1_quantity, unit1_type,\
           unit2_quantity, unit2_type,created_at, updated_at) \
				VALUES ('" +
    product_name +
    "', '" +
    brand_name +
    "','" +
    price +
    "', '" +
    availability +
    "', '" +
    category_id +
    "', '" +
    business_id +
    "',\
         '" +
    deal_qty +
    "', '" +
    deal_price +
    "', '" +
    employee_id +
    "', '" +
    product_image +
    "', \
         '" +
    produtImageIds + "', '" +      
    unit1_qty +
    "', '" +
    unit1_type +
    "', '" +
    unit2_qty +
    "', '" +
    unit2_type +
    "', \
         '" +
    date +
    "', '" +
    date +
    "')";

  console.log("sqlQuery", sqlQuery);
  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in saving inventory item.",
        data: {},
      });
    } else {
      var sqlQuery = "SELECT * FROM inventory WHERE id=" + response.insertId;
      await connection.query(sqlQuery, function (errs, respss) {
        if (errs) {
          return res.status(400).json({
            status_code: 400,
            message: "Something went wrong.",
            data: {},
          });
        }

        var responseData = [];
        if (respss.length > 0) {
          responseData = respss;
        }

        var output = {};
        output = responseData;
        return res.status(200).json({
          status_code: 200,
          message: "Inventory item saved successfully.",
          data: output,
        });
      });
    }
  });
};

/**
 * Inventory Update
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.editInventory = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var pid = req.body.hasOwnProperty("pid") ? req.body.pid : "";
  var product_name = req.body.hasOwnProperty("product_name")
    ? req.body.product_name
    : "";
  var brand_name = req.body.hasOwnProperty("brand_name")
    ? req.body.brand_name
    : "";
  var price = req.body.hasOwnProperty("price") ? req.body.price : "";
  var availability = req.body.hasOwnProperty("availability")
    ? req.body.availability
    : "";
  var category_id = req.body.hasOwnProperty("category_id")
    ? req.body.category_id
    : "";
  var business_id = req.body.hasOwnProperty("business_id")
    ? req.body.business_id
    : "";
  var employee_id = req.body.hasOwnProperty("employee_id")
    ? req.body.employee_id
    : "";
  var product_image =
    req.body.hasOwnProperty("product_image") &&
    req.body.hasOwnProperty("product_image") != ""
      ? req.body.product_image
      : "";
  var deal = req.body.hasOwnProperty("deal") ? req.body.deal : {};
  var unit = req.body.hasOwnProperty("unit") ? req.body.unit : [];

  const productImageIds = req.body.product_image_ids.toString();

  var deal_qty = 0;
  var deal_price = 0;
  // if (deal.length > 0) {
  deal_qty = deal.qty;
  deal_price = deal.price;
  // }

  var unit1_qty = unit[0].number;
  var unit2_qty = unit[1].number;
  var unit1_type = unit[0].type;
  var unit2_type = unit[1].type;

  var sqlQuery =
    "update inventory set product_name = '" +
    product_name +
    "', price = '" +
    price +
    "', category = '" +
    category_id +
    "' \
        , business_id = '" +
    business_id +
    "', deal_quantity = '" +
    deal_qty +
    "', deal_price = '" +
    deal_price +
    "' \
        , employee_id = '" +
    employee_id +
    "', availability = '" +
    availability +
    "', product_image = '" +
    product_image +
    "', product_image_ids = '" + productImageIds +"' ,\
         updated_at = '" +
    date +
    "', unit1_quantity = '" +
    unit1_qty +
    "', unit2_quantity = '" +
    unit2_qty +
    "', \
         unit1_type = '" +
    unit1_type +
    "', unit2_type = '" +
    unit2_type +
    "', brand_name = '" +
    brand_name +
    "' where id=" +
    pid;

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in saving inventory item.",
        data: {},
      });
    } else {
      var sqlQuery = "SELECT * FROM inventory WHERE id=" + response.insertId;
      await connection.query(sqlQuery, function (errs, respss) {
        if (errs) {
          return res.status(400).json({
            status_code: 400,
            message: "Something went wrong.",
            data: {},
          });
        }

        var responseData = [];
        if (respss.length > 0) {
          responseData = respss;
        }

        var output = {};
        output = responseData;
        return res.status(200).json({
          status_code: 200,
          message: "Inventory item updated successfully.",
          data: output,
        });
      });
    }
  });
};

/**
 * Inventory Delete
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.deleteInventory = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var pid = req.body.hasOwnProperty("pid") ? req.body.pid : "";

  var sqlQuery = "update inventory set status = 0 where id=" + pid;

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in detetion of inventory item.",
        data: {},
      });
    } else {
      return res.status(200).json({
        status_code: 200,
        message: "inventory deleted successfully.",
        data: {},
      });
    }
  });
};

/**
 * Inventory Listing
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.InvetoryList = async function (req, res) {
  var business_id = req.body.hasOwnProperty("business_id")
    ? req.body.business_id
    : "0";

  var page = req.body.hasOwnProperty(page) ? req.body.page : 1;
  var limit = 10;
  var offset = 0;
  if (page <= "1" || page == "" || page == undefined || page == "undefined") {
    offset = 0;
    page = 1;
  } else {
    offset = limit * page - limit + 1;
  }

  var total_pages = 0;
  var sqlQuery =
    "SELECT * FROM inventory WHERE business_id = " +
    business_id +
    " and status =1";
  await connection.query(sqlQuery).spread(async function (response) {
    if (response.length > 0) {
      total_pages = Math.ceil(response.length / limit);
    }
  });

  var sqlQuery =
    "SELECT i.*, c.name as category_name FROM inventory as i \
  LEFT JOIN category as c ON c.id = i.category\
  WHERE i.business_id = " +
    business_id +
    " and i.status =1 LIMIT " +
    limit +
    "  offset " +
    offset;
  await connection.query(sqlQuery, async function (errs, respss) {
    if (errs) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong..",
        data: {},
      });
    }

    return res.status(200).json({
      status_code: 200,
      message: "Invetory Listing.",
      data: {
        current_page: page,
        total_pages: total_pages,
        listing: respss,
      },
    });
  });
};

/**
 * business hours Save /edit
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.businessHours = async function (req, res) {
  //checking if user is valid or available
  const ifUpdateForAll = req.body.update_for_all;
  var sqlCheck =
    "SELECT * FROM business_hours WHERE business_id = '" +
    req.body.business_id +
    "'";
  await connection.query(sqlCheck, async function (errors, result) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length <= 0) {
        var business_id = req.body.business_id;
        var employee_id = req.body.employee_id;
        var monday = req.body.hours;

        var sqlQuery = "INSERT INTO business_hours (employee_id, business_id, hours) \
      VALUES ('" +
        employee_id +
        "','" +
        business_id +
        "', '" +
        JSON.stringify(monday) +
        "')";

        if(ifUpdateForAll == true){
          
            const businessIds = await getBusinessIdsForEmployee(employee_id);
            const businessIdsArr = businessIds.split(',').map( id => parseInt(id) );
            const submittedBusinessIds = await getSubmittedBusiness(employee_id);
            const diff = businessIdsArr.filter( id => !submittedBusinessIds.includes(id) );
  
            sqlQuery = "Update business_hours set employee_id = '" +
            employee_id +
            "', \
          hours = '" +
            JSON.stringify(monday) +
            "' where business_id IN (" + businessIds + ")";
  
            if(diff.length > 0){
  
              let insertFieldsQry = '';
  
              for(let i in diff){
                insertFieldsQry += `('${employee_id}','${diff[i]}', '${JSON.stringify(hours)}')`;
                insertFieldsQry += (i == diff.length-1) ? '' : ',';
              }
  
              const insertDiff = `INSERT INTO business_hours (employee_id, business_id, hours) VALUES ${insertFieldsQry}`;
              connection.query(insertDiff);
  
            }

        }

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message: "Problem in saving business hours.",
              data: {},
            });
          } else {
            var output = {};
            var sql =
              "SELECT * FROM business_hours where business_id = " + business_id;
            await connection.query(sql).spread(async function (businessHours) {
              for (const j in businessHours) {
                output.id = businessHours[j].id;
                output.business_id = businessHours[j].business_id;
                output.employee_id = businessHours[j].employee_id;
                output.hours = JSON.parse(businessHours[j].hours);
              }
            });

            return res.status(200).json({
              status_code: 200,
              message: "Business hours saved successfully.",
              data: output,
            });
          }
        });
      } else {
        var business_id = req.body.business_id;
        var employee_id = req.body.employee_id;
        var hours = req.body.hours;

        var sqlQuery = "";

        if(ifUpdateForAll == true){
          
          const businessIds = await getBusinessIdsForEmployee(employee_id);
          const businessIdsArr = businessIds.split(',').map( id => parseInt(id) );
          const submittedBusinessIds = await getSubmittedBusiness(employee_id);
          const diff = businessIdsArr.filter( id => !submittedBusinessIds.includes(id) );

          sqlQuery = "Update business_hours set employee_id = '" +
          employee_id +
          "', \
        hours = '" +
          JSON.stringify(hours) +
          "' where business_id IN (" + businessIds + ")";

          if(diff.length > 0){

            let insertFieldsQry = '';

            for(let i in diff){
              insertFieldsQry += `('${employee_id}','${diff[i]}', '${JSON.stringify(hours)}')`;
              insertFieldsQry += (i == diff.length-1) ? '' : ',';
            }

            const insertDiff = `INSERT INTO business_hours (employee_id, business_id, hours) VALUES ${insertFieldsQry}`;
            connection.query(insertDiff);

          }

        }else{
          sqlQuery = "Update business_hours set employee_id = '" +
          employee_id +
          "', \
        hours = '" +
          JSON.stringify(hours) +
          "' where business_id =" +
          business_id;
        }

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message: "Problem in updating business hours.",
              data: {},
            });
          } else {
            var output = {};
            var sql =
              "SELECT * FROM business_hours where business_id = " + business_id;
            await connection.query(sql).spread(async function (businessHours) {
              for (const j in businessHours) {
                output.id = businessHours[j].id;
                output.business_id = businessHours[j].business_id;
                output.employee_id = businessHours[j].employee_id;
                output.hours = JSON.parse(businessHours[j].hours);
              }
            });

            return res.status(200).json({
              status_code: 200,
              message: "Business hours saved successfully.",
              data: output,
            });
          }
        });
      }
    }
  });
};

/**
 * get business hours
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.getbusinessHours = async function (req, res) {
  var sqlQuery =
    "SELECT * FROM business_hours WHERE business_id=" + req.body.business_id;
  // var sqlQuery = "SELECT * FROM business_hours";
  await connection.query(sqlQuery, function (errs, businessHours) {
    if (errs) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong.",
        data: {},
      });
    } else {
      var output = {};
      if (businessHours.length > 0) {
        for (const j in businessHours) {
          output.id = businessHours[j].id;
          output.business_id = businessHours[j].business_id;
          output.employee_id = businessHours[j].employee_id;
          output.hours = JSON.parse(businessHours[j].hours);
          break;
        }
      }
      return res.status(200).json({
        status_code: 200,
        message: "Business hours.",
        data: output,
      });
    }
  });
};

/**
 * business location  save/edit
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.businessLocation = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var location =
    req.body.hasOwnProperty("location") && req.body.location != ""
      ? req.body.location
      : "";
  var state =
    req.body.hasOwnProperty("state") && req.body.state != ""
      ? req.body.state
      : "";
  var city =
    req.body.hasOwnProperty("city") && req.body.city != "" ? req.body.city : "";
  var country =
    req.body.hasOwnProperty("country") && req.body.country != ""
      ? req.body.country
      : "";
  var pincode =
    req.body.hasOwnProperty("pincode") && req.body.pincode != ""
      ? req.body.pincode
      : "";
  var latitude =
    req.body.hasOwnProperty("latitude") && req.body.latitude != ""
      ? req.body.latitude
      : "";
  var longitude =
    req.body.hasOwnProperty("longitude") && req.body.longitude != ""
      ? req.body.longitude
      : "";
  var business_id =
    req.body.hasOwnProperty("business_id") && req.body.business_id != ""
      ? req.body.business_id
      : "";
  var employee_id =
    req.body.hasOwnProperty("employee_id") && req.body.employee_id != ""
      ? req.body.employee_id
      : "";

  //checking if business_id is valid or available
  var sqlCheck = "SELECT * FROM business WHERE id = " + business_id;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {
        var sqlQuery =
          "update business set location = '" +
          location +
          "', state = '" +
          state +
          "', city = '" +
          city +
          "', country = '" +
          country +
          "' \
        , pincode = '" +
          pincode +
          "', latitude = '" +
          latitude +
          "', longitude = '" +
          longitude +
          "',created_by = '" +
          employee_id +
          "' where id=" +
          business_id;

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in updating business location, please try after sometime.",
              data: {},
            });
          } else {
            return res.status(200).json({
              status_code: 200,
              message: "Business location updated successfully.",
              data: {},
            });
          }
        });
      } else {
        return res.status(400).json({
          status_code: 400,
          message: "Problem in updating business location.",
          data: {},
        });
      }
    }
  });
};

/**
 * get business location
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.getbusinessLocation = async function (req, res) {
  var business_id =
    req.body.hasOwnProperty("business_id") && req.body.business_id != ""
      ? req.body.business_id
      : "";

  //checking if business_id is valid or available
  var sqlCheck = "SELECT * FROM business WHERE id = " + business_id;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      var output = {};
      if (result.length > 0) {
        output = result[0];
      }
      return res.status(200).json({
        status_code: 200,
        message: "Business location.",
        data: output,
      });
    }
  });
};

/**
 * business location  delete
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.deletebusinessLocation = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var location =
    req.body.hasOwnProperty("location") && req.body.location != ""
      ? req.body.location
      : "";
  var state =
    req.body.hasOwnProperty("state") && req.body.state != ""
      ? req.body.state
      : "";
  var city =
    req.body.hasOwnProperty("city") && req.body.city != "" ? req.body.city : "";
  var country =
    req.body.hasOwnProperty("country") && req.body.country != ""
      ? req.body.country
      : "";
  var pincode =
    req.body.hasOwnProperty("pincode") && req.body.pincode != ""
      ? req.body.pincode
      : "";
  var latitude =
    req.body.hasOwnProperty("latitude") && req.body.latitude != ""
      ? req.body.latitude
      : "";
  var longitude =
    req.body.hasOwnProperty("longitude") && req.body.longitude != ""
      ? req.body.longitude
      : "";
  var business_id =
    req.body.hasOwnProperty("business_id") && req.body.business_id != ""
      ? req.body.business_id
      : "";
  var employee_id =
    req.body.hasOwnProperty("employee_id") && req.body.employee_id != ""
      ? req.body.employee_id
      : "";

  //checking if business_id is valid or available
  var sqlCheck = "SELECT * FROM business WHERE id = " + business_id;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {
        var sqlQuery =
          "update business set location = '" +
          location +
          "', state = '" +
          state +
          "', city = '" +
          city +
          "', country = '" +
          country +
          "' \
        , pincode = '" +
          pincode +
          "', latitude = '" +
          latitude +
          "', longitude = '" +
          longitude +
          "',created_by = '" +
          employee_id +
          "' where id=" +
          business_id;

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in deleting business location, please try after sometime.",
              data: {},
            });
          } else {
            return res.status(200).json({
              status_code: 200,
              message: "Business location deleted successfully.",
              data: {},
            });
          }
        });
      } else {
        return res.status(400).json({
          status_code: 400,
          message: "Problem in deleting business location.",
          data: {},
        });
      }
    }
  });
};

/**
 * billing info  save/edit
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.billingInfo = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var name =
    req.body.hasOwnProperty("name") && req.body.name != "" ? req.body.name : "";
  var email =
    req.body.hasOwnProperty("email") && req.body.email != ""
      ? req.body.email
      : "";
  var state =
    req.body.hasOwnProperty("state") && req.body.state != ""
      ? req.body.state
      : "";
  var city =
    req.body.hasOwnProperty("city") && req.body.city != "" ? req.body.city : "";
  var street =
    req.body.hasOwnProperty("street") && req.body.street != ""
      ? req.body.street
      : "";
  var zip_code =
    req.body.hasOwnProperty("zip_code") && req.body.zip_code != ""
      ? req.body.zip_code
      : "";
  var business_id =
    req.body.hasOwnProperty("business_id") && req.body.business_id != ""
      ? req.body.business_id
      : "";
  var employee_id =
    req.body.hasOwnProperty("employee_id") && req.body.employee_id != ""
      ? req.body.employee_id
      : "";
  var credit_card =
    req.body.hasOwnProperty("credit_card") && req.body.credit_card != ""
      ? req.body.credit_card
      : "";
  var expire_date =
    req.body.hasOwnProperty("expire_date") && req.body.expire_date != ""
      ? req.body.expire_date
      : "";
  var expire_month =
    req.body.hasOwnProperty("expire_month") && req.body.expire_month != ""
      ? req.body.expire_month
      : "";
  var cvv =
    req.body.hasOwnProperty("cvv") && req.body.cvv != "" ? req.body.cvv : "";
  var stripe_customer_id = "";

  const updateAllBusinesses = req.body.hasOwnProperty("all_business") && req.body.all_business != "" ? req.body.all_business : false;

  await stripe.tokens.create(
    {
      // Create the card
      card: {
        number: credit_card,
        exp_month: expire_month,
        exp_year: expire_date,
        cvc: cvv,
      },
    },
    async function (err, token) {
      if (err) {
        return res.status(400).json({
          status_code: 400,
          message: err.message,
          data: {},
        });
      } else {
        if (stripe_customer_id) {
          await stripe.customers.createSource(
            stripe_customer_id,
            { source: token.id },
            async function (err, card) {
              if (err) {
                return res.status(400).json({
                  status_code: 400,
                  message: err.message,
                  data: {},
                });
              } else {
                //checking if business_id is valid or available
                var sqlCheck =
                  "SELECT * FROM billing_info WHERE business_id = " +
                  business_id;
                await connection.query(
                  sqlCheck,
                  async function (errors, result, fields) {
                    if (errors) {
                      return res.status(400).json({
                        status_code: 400,
                        message: "Something went wrong",
                        data: {},
                      });
                    } else {
                      if (result.length > 0) {
                        let sqlQuery = `update billing_info set name = '${name}', email = '${email}', 
                        city = '${city}', state = '${state}', zip_code = '${zip_code}', street = '${street}', 
                        credit_card = '${credit_card}', expire_date = '${expire_date}', expire_month = '${expire_month}', 
                        employee_id = '${employee_id}', stripe_customer_id = '${stripe_customer_id}' WHERE `; 
                        
                        if(updateAllBusinesses)
                          sqlQuery+= `employee_id = '${employee_id}'`;
                        else
                          sqlQuery+= `business_id = ${business_id}`;

                        await connection.query(
                          sqlQuery,
                          async function (error, response) {
                            if (error) {
                              return res.status(200).json({
                                status_code: 400,
                                message:
                                  "Problem in updating billing information, please try after sometime.",
                                data: {},
                              });
                            } else {
                              return res.status(200).json({
                                status_code: 200,
                                message:
                                  "Billing information updated successfully.",
                                data: {},
                              });
                            }
                          }
                        );
                      } else {
                        var sqlQuery =
                          "INSERT INTO billing_info (name, email, state, city,street,zip_code,\
          credit_card,expire_date,expire_month,business_id,employee_id, stripe_customer_id) \
          VALUES ('" +
                          name +
                          "','" +
                          email +
                          "', '" +
                          state +
                          "', '" +
                          city +
                          "' , '" +
                          street +
                          "' , '" +
                          zip_code +
                          "'\
        ,'" +
                          credit_card +
                          "','" +
                          expire_date +
                          "','" +
                          expire_month +
                          "','" +
                          business_id +
                          "','" +
                          employee_id +
                          "', '" +
                          stripe_customer_id +
                          "')";

                        await connection.query(
                          sqlQuery,
                          async function (error, response) {
                            if (error) {
                              return res.status(200).json({
                                status_code: 400,
                                message:
                                  "Problem in saving billing information.",
                                data: {},
                              });
                            } else {
                              return res.status(200).json({
                                status_code: 200,
                                message: "Billing info saved successfully.",
                                data: {},
                              });
                            }
                          }
                        );
                      }
                    }
                  }
                );
              }
            }
          );
        } else {
          await stripe.customers
            .create({
              name: name,
              email: email,
              source: token.id,
              address: {
                city: city,
                line1: street,
                postal_code: zip_code,
                state: state,
              },
            })
            .then(async function (customer) {
              await stripe.charges
                .create({
                  amount: 14.99 * 100,
                  currency: "usd",
                  customer: customer.id,
                })
                .then(async function () {
                  //create plan for oerticualr smb customer
                  // await stripe.subscription.create({
                  //   // amount: 10 * 100,
                  //   plan: "prod_KzGJeJ390jQxDr",
                  //   customer: customer.id,
                  //   // trial_end: $subscription_date,
                  // });

                  stripe_customer_id = customer.id;
                  console.log("stripe_customer_id", customer.id);
                  console.log("business_id", business_id);
                  //checking if business_id is valid or available
                  var sqlCheck =
                    "SELECT * FROM billing_info WHERE business_id = " +
                    business_id;
                  await connection.query(
                    sqlCheck,
                    async function (errors, result) {
                      if (errors) {
                        return res.status(400).json({
                          status_code: 400,
                          message: "Something went wrong",
                          data: {},
                        });
                      } else {
                        if (result.length > 0) {
               
                          let sqlQuery = `update billing_info set name = '${name}', email = '${email}', 
                          city = '${city}', state = '${state}', zip_code = '${zip_code}', street = '${street}', 
                          credit_card = '${credit_card}', expire_date = '${expire_date}', expire_month = '${expire_month}', 
                          employee_id = '${employee_id}', stripe_customer_id = '${stripe_customer_id}' WHERE `; 
                          
                          if(updateAllBusinesses)
                            sqlQuery+= `employee_id = '${employee_id}'`;
                          else
                            sqlQuery+= `business_id = ${business_id}`;

                          await connection.query(
                            sqlQuery,
                            async function (error, response) {
                              if (error) {
                                return res.status(200).json({
                                  status_code: 400,
                                  message:
                                    "Problem in updating billing information, please try after sometime.",
                                  data: {},
                                });
                              } else {
                                return res.status(200).json({
                                  status_code: 200,
                                  message:
                                    "Billing information updated successfully.",
                                  data: {},
                                });
                              }
                            }
                          );
                        } else {
                          
                          var sqlQuery =
                            "INSERT INTO billing_info (name, email, state, city,street,zip_code,\
          credit_card,expire_date,expire_month,business_id,employee_id, stripe_customer_id) \
          VALUES ('" +
                            name +
                            "','" +
                            email +
                            "', '" +
                            state +
                            "', '" +
                            city +
                            "' , '" +
                            street +
                            "' , '" +
                            zip_code +
                            "'\
        ,'" +
                            credit_card +
                            "','" +
                            expire_date +
                            "','" +
                            expire_month +
                            "','" +
                            business_id +
                            "','" +
                            employee_id +
                            "', '" +
                            stripe_customer_id +
                            "')";

                          await connection.query(
                            sqlQuery,
                            async function (error, response) {
                              if (error) {
                                return res.status(200).json({
                                  status_code: 400,
                                  message:
                                    "Problem in saving billing information.",
                                  data: {},
                                });
                              } else {

                                if(updateAllBusinesses){

                                  let updateSqlQuery = `update billing_info set name = '${name}', email = '${email}', 
                                  city = '${city}', state = '${state}', zip_code = '${zip_code}', street = '${street}', 
                                  credit_card = '${credit_card}', expire_date = '${expire_date}', expire_month = '${expire_month}', 
                                  stripe_customer_id = '${stripe_customer_id}' WHERE employee_id = ${employee_id}`;         
                                  
                                  connection.query(updateSqlQuery);

                                }

                                return res.status(200).json({
                                  status_code: 200,
                                  message: "Billing info saved successfully.",
                                  data: {},
                                });

                              }
                            }
                          );
                        }
                      }
                    }
                  );
                });
            })
            .catch(function (error) {
              return res.status(400).json({
                status_code: 400,
                message: error.message,
                data: {},
              });
            });
        }
      }
    }
  );

  // //checking if business_id is valid or available
  // var sqlCheck = "SELECT * FROM billing_info WHERE business_id = " + business_id;
  // await connection.query(sqlCheck, async function (errors, result, fields) {
  //   if (errors) {
  //     return res.status(400).json({
  //       status_code: 400,
  //       message: 'Something went wrong',
  //       data: {}
  //     });
  //   } else {
  //     if (result.length > 0) {
  //       var sqlQuery = "update billing_info set name = '" + name + "', email = '" + email + "', city = '" + city + "', state = '" + state + "' \
  //       , zip_code = '" + zip_code + "', street = '" + street + "', credit_card = '" + credit_card + "', expire_date = '" + expire_date + "' \
  //       ,expire_month = '" + expire_month + "', employee_id = '" + employee_id + "', stripe_customer_id = '" + stripe_customer_id + "' where business_id=" + business_id;

  //       await connection.query(sqlQuery, async function (error, response) {
  //         if (error) {
  //           return res.status(200).json({
  //             status_code: 400,
  //             message: 'Problem in updating billing information, please try after sometime.',
  //             data: {}
  //           });
  //         } else {
  //           return res.status(200).json({
  //             status_code: 200,
  //             message: 'Billing information updated successfully.',
  //             data: {}
  //           });
  //         }
  //       });
  //     } else {
  //       var sqlQuery = "INSERT INTO billing_info (name, email, state, city,street,zip_code,\
  //         credit_card,expire_date,expire_month,business_id,employee_id, stripe_customer_id) \
  //         VALUES ('"+ name + "','" + email + "', '" + state + "', '" + city + "' , '" + street + "' , '" + zip_code + "'\
  //       ,'"+ credit_card + "','" + expire_date + "','" + expire_month + "','" + business_id + "','" + employee_id + "', '" + stripe_customer_id + "')";

  //       await connection.query(sqlQuery, async function (error, response) {
  //         if (error) {
  //           return res.status(200).json({
  //             status_code: 400,
  //             message: 'Problem in saving billing information.',
  //             data: {}
  //           });
  //         } else {
  //           return res.status(200).json({
  //             status_code: 200,
  //             message: 'Billing info saved successfully.',
  //             data: {}
  //           });
  //         }
  //       });
  //     }
  //   }
  // });
};

/**
 * get billing information
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.getbillingInfo = async function (req, res) {
  var business_id =
    req.body.hasOwnProperty("business_id") && req.body.business_id != ""
      ? req.body.business_id
      : "";

  //checking if business_id is valid or available
  var sqlCheck =
    "SELECT * FROM billing_info WHERE business_id = " + business_id;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      var output = {};
      if (result.length > 0) {
        output = result[0];
      }
      return res.status(200).json({
        status_code: 200,
        message: "Billing info.",
        data: output,
      });
    }
  });
};

/**
 * get liburary images listing
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.Library = async function (req, res) {
  // var business_id = req.body.hasOwnProperty('business_id') && req.body.business_id != "" ? req.body.business_id : '';
  const uid = req.body.hasOwnProperty('uid') && req.body.uid > 0 ? req.body.uid : null;
  //checking if business_id is valid or available
  var sqlCheck = "SELECT * FROM photo_library WHERE uid IS null || uid = 0 || uid = " + uid;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      return res.status(200).json({
        status_code: 200,
        message: "Library photo listing.",
        data: result,
      });
    }
  });
};

/**
 * upload library image
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.uploadImage = async function (req, res) {
  
  var name =
    req.body.hasOwnProperty("name") && req.body.name != "" ? req.body.name : "";
  const uid = req.body.hasOwnProperty('uid') && req.body.uid > 0 ? req.body.uid : null;
  var url =
    req.body.hasOwnProperty("url") && req.body.url != "" ? req.body.url : "";
  var category =
    req.body.hasOwnProperty("category") && req.body.category != ""
      ? req.body.category
      : null; 

  var sqlQuery =
    "INSERT INTO photo_library (name, uid, url, category) \
				VALUES ('" +
    name +
    "','" +
    uid + "','" + 
    url +
    "', " +
    category +
    ")";

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in image uploading.",
        data: {},
      });
    } else {
      return res.status(200).json({
        status_code: 200,
        message: "Image is uploaded successfully.",
        data: { id: response.insertId }
      });
    }
  });
};

/**
 * delete library image
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.deleteImage = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var img_id =
    req.body.hasOwnProperty("img_id") && req.body.img_id != ""
      ? req.body.img_id
      : "";

  var sqlQuery = "DELETE FROM photo_library where id=" + img_id;

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in image deletion.",
        data: {},
      });
    } else {
      return res.status(200).json({
        status_code: 200,
        message: "Image is deleted successfully.",
        data: {},
      });
    }
  });
};

/**
 * integration info  save/edit
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.integrationSave = async function (req, res) {

  const bodyReq = req.body;

  const businessId = bodyReq.business_id;
  const empId = bodyReq.employee_id;
  const integrations = bodyReq.integrations;

  let upsert = true, httpStatus = 400, message = '';

  for(let i in integrations){

    const marketPlaceType = parseInt(i) + 1;
    const integration = integrations[i];

    const passOnCost = integration.pass_on_cost != undefined ? integration.pass_on_cost : '';
    const orderAllowed = integration.order_allowed != undefined ? integration.order_allowed : '';
    const activeStatus = integration.status != undefined ? Number(integration.status) : ''; 
    const fields = {
      pass_on_cost: passOnCost,
      order_allowed: orderAllowed,
      status: activeStatus
    }

    const checkIntegrationExists = await ifIntegrationByBusinessAndType(businessId, marketPlaceType);

    if(checkIntegrationExists){
      upsert &&= await updateIntegrationByBusinessAndType(businessId, marketPlaceType, fields);
    }else{
      upsert &&= await insertIntegration(businessId, empId, marketPlaceType, fields);
    }

  }

  if(upsert){
    httpStatus = 200;
    message += "Updated Successfully";
  }else{
    message += "Something went wrong";
  }

  return res.status(200).json({
    status_code: httpStatus,
    message,
    data: {}
  });  

}

/**
 * get integrations information
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.integrations = async function (req, res) {
  var business_id =
    req.body.hasOwnProperty("business_id") && req.body.business_id != ""
      ? req.body.business_id
      : "";

  //checking if business_id is valid or available
  var sqlCheck =
    "SELECT * FROM integrations WHERE business_id = " + business_id;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {

      const ifOrdersPaused = await ifOrderSettingPausedByBusiness(req.body.business_id);
      const data = {
        'result': result,
        'if_orders_paused': ifOrdersPaused
      }

      return res.status(200).json({
        status_code: 200,
        message: "Integrations Listing.",
        data
      });
    }
  });
};

/**
 * business delete
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.deleteBusiness = async function (req, res) {
  let date = Math.floor(Date.now() / 1000);
  var business_id = req.body.business_id;
  var employee_id = req.body.employee_id;

  //checking if business_id is valid or available
  var sqlCheck = "SELECT * FROM business WHERE id = " + business_id;
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {
        var sqlQuery =
          "update business set status = '0' where id=" + business_id;

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in deleting business, please try after sometime.",
              data: {},
            });
          } else {
            return res.status(200).json({
              status_code: 200,
              message: "Business deleted successfully.",
              data: {},
            });
          }
        });
      } else {
        return res.status(400).json({
          status_code: 400,
          message: "Business not found.",
          data: {},
        });
      }
    }
  });
};

/**
 * Add Business
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.addBusiness = async function (req, res) {
  //fetch users details
  var employee_id = req.body.employee_id;
  var sqlCheck = "SELECT * FROM users WHERE id = '" + employee_id + "'";
  await connection.query(sqlCheck, async function (errors, result, fields) {
    if (errors) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong",
        data: {},
      });
    } else {
      if (result.length > 0) {

        let date = Math.floor(Date.now() / 1000);
        var firstname = req.body.hasOwnProperty("firstname")
          ? req.body.firstname
          : "";
        var lastname = req.body.hasOwnProperty("lastname")
          ? req.body.lastname
          : "";
        var email = req.body.hasOwnProperty("email") ? req.body.email : "";
        var business_type = req.body.hasOwnProperty("business_type")
          ? req.body.business_type
          : "";
        var business_name = req.body.hasOwnProperty("business_name")
          ? req.body.business_name
          : "";
        const empId = parseInt(req.body.employee_id);
        const password = req.body.password.trim();

        if( await checkEmailExists(email, empId) ){

          return res.status(200).json({
            status_code: 400,
            message: "An account already exists with this email",
            data: {}
          });

        }

        //add bussiness information
        var sqlQuery =
          "INSERT INTO business (name, type, firstname, lastname, email, created_by, created_at) \
        values ('" +
          business_name +
          "', '" +
          business_type +
          "', '" +
          firstname +
          "', '" +
          lastname +
          "', \
        '" +
          email +
          "', '" +
          employee_id +
          "', '" +
          date +
          "')";

        await connection.query(sqlQuery, async function (err, resp) {
          if (err) {
            return res.status(200).json({
              status_code: 400,
              message:
                "Problem in creating new business information, please try after sometime." +
                sqlQuery,
              data: {},
            });
          } else {
            var business_ids = result[0].business_ids;
            business_ids = business_ids + "," + resp.insertId;
            var sqlQuery =
              "update users set business_ids = '" +
              business_ids +
              "' where id=" +
              employee_id;

              connection.query(sqlQuery, function(){});

            const getBusinessDetailsQuery = `SELECT * FROM business WHERE id = ${resp.insertId}`;

            //Update name, email for all the existing businesses
            const updateExistingBusinesses = `UPDATE business SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}' WHERE created_by = ${empId}`;
            connection.query(updateExistingBusinesses);

            updateUserMail(firstname, lastname, email, password, empId);

            await connection.query(getBusinessDetailsQuery, async function (error, response) {
              return res.status(200).json({
                status_code: 200,
                message: "Business added successfully.",
                data: {'inserted_details': response[0]}
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          status_code: 400,
          message: "User not found.",
          data: {},
        });
      }
    }
  });
};

/**
 *  business Info
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.businessInfo = async function (req, res) {
  var business_id = req.body.hasOwnProperty("business_id")
    ? req.body.business_id
    : "";

  var sqlQuery = "SELECT * from business where id=" + business_id;
  await connection.query(sqlQuery, function (errs, respss) {
    if (errs) {
      return res.status(400).json({
        status_code: 400,
        message: "Something went wrong." + sqlQuery,
        data: {},
      });
    } else {
      if (respss.length > 0) {
        return res.status(200).json({
          status_code: 200,
          message: "business information.",
          data: respss[0],
        });
      } else {
        return res.status(200).json({
          status_code: 200,
          message: "business not found.",
          data: {},
        });
      }
    }
  });
};

/**
 * order setting
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.orderSetting = async function (req, res) {
  var business_id = req.body.business_id;
  var order_accept_status = req.body.order_accept_status;

  if (
    order_accept_status == "" ||
    order_accept_status == undefined ||
    order_accept_status == null ||
    order_accept_status == "null" ||
    order_accept_status == "undefined"
  ) {
    order_accept_status = 0;
  }

  if (
    business_id == "" ||
    business_id == undefined ||
    business_id == null ||
    business_id == "null" ||
    business_id == "undefined"
  ) {
    return res.status(200).json({
      status_code: 400,
      message: "business_id is required to update order settings.",
      data: {}
    });
  }

  var sqlQuery =
    "SELECT * from order_settings where business_id=" + business_id;

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in updating order setting.",
        data: {}
      });
    } else {
     
      if (response.length > 0) {
        var sqlQuery =
          "UPDATE order_settings set order_accept_status = '" +
          order_accept_status +
          "' \
				where business_id = '" +
          business_id +
          "'";

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message: "Problem in updating order setting.",
              data: {}
            });
          } else {

            if(order_accept_status == 0){
              updateIntegrationOrdersPendingStatus(business_id, false);
            }

            return res.status(200).json({
              status_code: 200,
              message: "Order settings updated successfully.",
              data: {}
            });

          }
        });
      } else {

        var sqlQuery =
          "INSERT INTO order_settings (business_id, order_accept_status) \
				VALUES ('" +
          business_id +
          "', '" +
          order_accept_status +
          "')";

        await connection.query(sqlQuery, async function (error, response) {
          if (error) {
            return res.status(200).json({
              status_code: 400,
              message: "Problem in updating order setting.",
              data: {}
            });
          } else {
            
            if(order_accept_status == 0){
              updateIntegrationOrdersPendingStatus(business_id, false);
            }
            
            return res.status(200).json({
              status_code: 200,
              message: "Order settings updated successfully.",
              data: {}
            });

          }
        });
      }
    }
  });
};

/**
 * order create
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.orderCreate = async function (req, res) {

  var business_id = req.body.business_id;
  var customer_name = req.body.customer_name;
  var customer_phone = req.body.customer_phone;
  var status = req.body.status;
  var order_total = req.body.order_total;
  var grand_total = req.body.grand_total;
  var vat = req.body.vat;
  var tax = req.body.tax;
  var shiping = req.body.shiping;
  var products = req.body.products;
  var order_date = req.body.order_date;
  var pickup_date = req.body.pickup_date;

  var sqlQuery =
    "SELECT * from order_settings where business_id=" + business_id;

  await connection.query(sqlQuery).spread(async function (response) {
    if (response.length > 0) {
      if (response[0].order_accept_status == "1") {
        return res.status(200).json({
          status_code: 400,
          message: "New order acceptance is paused by the vendor.",
          data: {},
        });
      }
    }
  });

  var sqlQuery =
    "INSERT INTO orders (customer_name, customer_phone, business_id, status, grand_total, order_total, vat, tax, shiping, order_date, pickup_date) \
				VALUES ('" +
    customer_name +
    "','" +
    customer_phone +
    "','" +
    business_id +
    "', '" +
    status +
    "', '" +
    grand_total +
    "','" +
    order_total +
    "', '" +
    vat +
    "', '" +
    tax +
    "', '" +
    shiping +
    "', '" +
    helper.strtotime(order_date) +
    "', '" +
    helper.strtotime(pickup_date) +
    "')";

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(200).json({
        status_code: 400,
        message: "Problem in saving order.",
        data: {},
      });
    } else {
      for (const j in products) {
        var sqlQuery =
          "INSERT INTO order_line_items (order_id, item_id, qty, price, note) \
				VALUES ('" +
          response.insertId +
          "','" +
          products[j].item_id +
          "', '" +
          products[j].qty +
          "', '" +
          products[j].price +
          "', '" +
          products[j].note +
          "')";
        await connection.query(sqlQuery).spread(async function () {});
      }

      const getBusinessEmail = `SELECT email FROM business WHERE id = ${business_id}`;
      const businessEmailResp = await connection.query(getBusinessEmail);

      if(businessEmailResp[0].length > 0){
        const businessEmail = businessEmailResp[0][0].email;
        const orderId = response.insertId;
        const orderObj = [{ name: 'OREDR_DATE', content: order_date}, {name: 'OREDR_ID', content: orderId}, {name: 'OREDR_ITEMS', content: products.length}, {name: 'ORDER_LINK', content: `${process.env.WEB_URL}/pending-order-view?id=${orderId}`}];
        await chimpMailModel.sendCreateOrderMail(businessEmail, orderObj);
      }

      return res.status(200).json({
        status_code: 200,
        message: "Order created successfully.",
        data: {},
      });
    }
  });
};

/**
 * order update
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.orderUpdate = async function (req, res) {
  
  const order_id = req.body.order_id;
  const order_status = req.body.order_status;
  const availability = req.body.availability == undefined ? [] : req.body.availability;

  let updateDate = ''; const currentStamp = Math.floor(Date.now() / 1000);
  if(order_status == ORDER_STATUS_CANCELLED)
    updateDate += `, cancel_date = ${currentStamp}`;
  else if(order_status == ORDER_STATUS_DELIVERED)
    updateDate += `, pickup_date = ${currentStamp}`;
  
  const sqlQuery = `UPDATE orders SET status = '${order_status}'${updateDate} where id = ${order_id}`;

  await connection.query(sqlQuery, async function (error, response) {
    if (error) {
      return res.status(400).json({
        status_code: 400,
        message: "Problem in updating order status.",
        data: {},
      });
    } else {

      const updateAvailability = await updateOrderItemsAvailibility(availability);

      if(order_status == ORDER_STATUS_CANCELLED){
        const getBusinessDetailsQuery = await connection.query(`SELECT business.name, business.email FROM business INNER JOIN orders ON business.id = orders.business_id WHERE orders.id = ${order_id}`);
        const getBusinessDetails = getBusinessDetailsQuery[0];
        if(getBusinessDetails.length > 0){
          const orderDate = await getOrderCreatedDate(order_id);
          const order_obj = [{ name: 'ORDER_LINK', content: `${process.env.WEB_URL}/canceled-order-view?id=${order_id}`}, {name: 'ORDER_ID', content: order_id}, {name: 'ORDER_DATE', content: orderDate}];
          chimpMailModel.sendCancelOrderMail(getBusinessDetails[0].email, order_obj);
        }
      }

      if(updateAvailability){
        return res.status(200).json({
          status_code: 200,
          message: "Order status updated successfully.",
          data: {}
        });  
      }else{
        return res.status(400).json({
          status_code: 400,
          message: "Problem in updating order status.",
          data: {},
        });
      }

    }
  });
};

/**
 * order listing
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.orders = async function (req, res) {
  var business_id = req.body.business_id;
  var page = req.body.page;
  var limit = 10;
  var offset = 0;
  if (page <= "1" || page == "" || page == undefined || page == "undefined") {
    offset = 0;
  } else {
    offset = limit * page - limit + 1;
  }

  var output = {};
  const checkIntegrationOrderPending =  await checkIntegrationOrdersPaused(business_id);
  output.order_accept_status = Number(checkIntegrationOrderPending);
  output["complete_orders"] = [];
  output["pending_orders"] = [];
  output["canceled_orders"] = [];
  output["ongoing_orders"] = [];

  var sqlQuery =
    "SELECT * from order_settings where business_id=" + business_id;

  await connection.query(sqlQuery).spread(async function (response) {
    if (response.length > 0) {
      output.order_accept_status = (checkIntegrationOrderPending == true) ? 1: response[0].order_accept_status;
    }
  });

  //completed orders
  // var sqlQuery = "SELECT o.*, u.firstname as customer_firstname, u.lastname as customer_lastname from orders as o \
  // LEFT JOIN users as u ON o.customer = u.id\
  // where o.status = 2 and o.business_id=" + business_id + " limit " + limit + " offset " + offset;

  var sqlQuery =
    "SELECT o.* from orders as o \
  where o.status = 2 and o.business_id=" +
    business_id + " ORDER BY order_date DESC, timestamp DESC, id DESC" + 
    " limit " +
    limit +
    " offset " +
    offset;

  await connection.query(sqlQuery).spread(async function (response) {
    var order_array = [];
    for (const i in response) {
      order_array[i] = response[i];
      order_array[i]["order_items"] = [];
      var sql =
        "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
        LEFT JOIN inventory as i ON oli.item_id = i.id\
        where oli.order_id=" +
        response[i].id;
      await connection.query(sql).spread(async function (line_items) {
        order_array[i].order_items = line_items;
      });
    }
    output["complete_orders"] = order_array;
  });

  //pending orders
  // var sqlQuery = "SELECT o.*, u.firstname as customer_firstname, u.lastname as customer_lastname from orders as o \
  // LEFT JOIN users as u ON o.customer = u.id\
  // where o.status = 1 and o.business_id=" + business_id + " limit " + limit + " offset " + offset;

  var sqlQuery =
    "SELECT o.* from orders as o \
  where o.status = 1 and o.business_id=" +
    business_id + " ORDER BY order_date DESC, timestamp DESC, id DESC" + 
    " limit " +
    limit +
    " offset " +
    offset;

  await connection.query(sqlQuery).spread(async function (response) {
    var order_array = [];
    for (const i in response) {
      order_array[i] = response[i];
      order_array[i]["order_items"] = [];
      var sql =
        "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
        LEFT JOIN inventory as i ON oli.item_id = i.id\
        where oli.order_id=" +
        response[i].id;
      await connection.query(sql).spread(async function (line_items) {
        order_array[i].order_items = line_items;
      });
    }
    output["pending_orders"] = order_array;
  });

  //cancel orders
  // var sqlQuery = "SELECT o.*, u.firstname as customer_firstname, u.lastname as customer_lastname from orders as o \
  // LEFT JOIN users as u ON o.customer = u.id\
  // where o.status = 3 and o.business_id=" + business_id + " limit " + limit + " offset " + offset;

  var sqlQuery =
    "SELECT o.* from orders as o\
  where o.status = 3 and o.business_id=" +
    business_id + " ORDER BY order_date DESC, timestamp DESC, id DESC" + 
    " limit " +
    limit +
    " offset " +
    offset;

  await connection.query(sqlQuery).spread(async function (response) {
    var order_array = [];
    for (const i in response) {
      order_array[i] = response[i];
      order_array[i]["order_items"] = [];
      var sql =
        "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
        LEFT JOIN inventory as i ON oli.item_id = i.id\
        where oli.order_id=" +
        response[i].id;
      await connection.query(sql).spread(async function (line_items) {
        order_array[i].order_items = line_items;
      });
    }
    output["canceled_orders"] = order_array;
  });

  //ongoing orders
  // var sqlQuery = "SELECT o.*, u.firstname as customer_firstname, u.lastname as customer_lastname from orders as o \
  // LEFT JOIN users as u ON o.customer = u.id\
  // where o.status = 4 and o.business_id=" + business_id + " limit " + limit + " offset " + offset;

  var sqlQuery =
    "SELECT o.* from orders as o \
  where o.status = 4 and o.business_id=" +
    business_id + " ORDER BY order_date DESC, timestamp DESC, id DESC" + 
    " limit " +
    limit +
    " offset " +
    offset;

  await connection.query(sqlQuery).spread(async function (response) {
    var order_array = [];
    for (const i in response) {
      order_array[i] = response[i];
      order_array[i]["order_items"] = [];
      var sql =
        "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
        LEFT JOIN inventory as i ON oli.item_id = i.id\
        where oli.order_id=" +
        response[i].id;
      await connection.query(sql).spread(async function (line_items) {
        order_array[i].order_items = line_items;
      });
    }
    output["ongoing_orders"] = order_array;
  });

  return res.status(200).json({
    status_code: 200,
    message: "Order listing.",
    data: output,
  });
};

/**
 * load more orders
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.loadOrders = async function (req, res) {
  var business_id = req.body.business_id;
  var status = req.body.type;
  if (status == "" || status == undefined || status == "undefined") {
    status = 1;
  }
  var page = req.body.page;
  var limit = 10;
  var offset = 0;
  if (page <= "1" || page == "" || page == undefined || page == "undefined") {
    offset = 0;
    page = 1;
  } else {
    offset = limit * page - limit + 1;
  }

  var total_pages = 0;
  var sqlQuery =
    "SELECT * FROM orders WHERE status = " +
    status +
    " and business_id=" +
    business_id;
  await connection.query(sqlQuery).spread(async function (response) {
    if (response.length > 0) {
      total_pages = Math.ceil(response.length / limit);
    }
  });

  var output = {};
  var sqlQuery =
    "SELECT o.* from orders as o \
  where o.status = " +
    status +
    " and o.business_id=" +
    business_id +
    " limit " +
    limit +
    " offset " +
    offset;

  await connection.query(sqlQuery).spread(async function (response) {
    var order_array = [];
    for (const i in response) {
      order_array[i] = response[i];
      order_array[i]["order_items"] = [];
      var sql =
        "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
        LEFT JOIN inventory as i ON oli.item_id = i.id\
        where oli.order_id=" +
        response[i].id;
      await connection.query(sql).spread(async function (line_items) {
        order_array[i].order_items = line_items;
      });
    }
    output = order_array;
  });

  return res.status(200).json({
    status_code: 200,
    message: "Order listing.",
    data: {
      current_page: page,
      total_pages: total_pages,
      listing: output,
    },
  });
};

/**
 * order view
 *
 * @param {*} req
 * @param {*} res
 * @returns mix
 */
module.exports.viewOrders = async function (req, res) {
  var business_id = req.body.business_id;
  var order_id = req.body.order_id;

  var output = {};
  // var sqlQuery = "SELECT o.*, u.firstname as customer_firstname, u.lastname as customer_lastname from orders as o \
  // LEFT JOIN users as u ON o.customer = u.id\
  // where o.id=" + order_id;

  var sqlQuery = "SELECT o.* from orders as o where o.id=" + order_id;

  await connection.query(sqlQuery).spread(async function (response) {
    var order_array = [];
    for (const i in response) {
      order_array[i] = response[i];
      order_array[i]["order_items"] = [];
      var sql =
        "SELECT oli.*, i.product_name, i.product_image from order_line_items as oli \
        LEFT JOIN inventory as i ON oli.item_id = i.id\
        where oli.order_id=" +
        response[i].id;
      await connection.query(sql).spread(async function (line_items) {
        order_array[i].order_items = line_items;
      });
    }
    output = order_array;
  });

  return res.status(200).json({
    status_code: 200,
    message: "Order View.",
    data: output,
  });
};


/**
 * Delete user
 * @param {*} employee_id 
 * @returns 
 */
 module.exports.deleteUser = async function (req, res) {
  
  const uid = req.body.id;
  let status = 400; let message = '';
  const ifDeleted = await deleteUser(uid);

  if(ifDeleted){
    status = 200;
    message += 'User deleted successfully!';
  }else{
    message += "Something went wrong, couldn't delete user";
  }

  return res.status(200).json({
    status_code: status,
    message: message,
    data: null
  });
  
};


/**
 * Move image
 * @param 
 * @returns 
 */
 module.exports.moveImage = async function (req, res) {
  
  const bodyReq = req.body;
  let status = 400; let message = '';
  
  const moveType = parseInt(bodyReq.move_type);
  const productImageIds = bodyReq.product_image_ids;

  const move = await moveProductImages(moveType, productImageIds);

  if(move){
    status = 200;
    message += "Updated successfully";
  }else{
    message += "Something went wrong";
  }

  return res.status(200).json({
    status_code: status,
    message: message,
    data: null
  });
  
};


const getBusinessIdsForEmployee = async function(employee_id){

  const query = `SELECT business_ids FROM users WHERE id = ${employee_id}`;
  const result = await connection.query(query);
  return result[0][0].business_ids;

}

const getSubmittedBusiness = async function(employee_id){

  const [result] = await connection.query(`SELECT business_id FROM business_hours WHERE employee_id = ${employee_id}`);
  const business = [];
  for(let i in result){
    business.push(result[i].business_id);
  }
  return business;

}



const getSubmittedBusinessIds = async function(employee_id){

  const [result] = await connection.query(`SELECT id FROM business WHERE created_by = ${employee_id}`);
  const business = [];
  for(let i in result){
    business.push(result[i].id);
  }
  return business;

}


const deleteUser = async function(uid){

  const result = await connection.query(`DELETE FROM users WHERE id = ${uid}`);
  return result[0].affectedRows == 1;

}

const getSubmittedSettingsByUser = async function(uid){

  const [result] = await connection.query(`SELECT business_id FROM setting WHERE uid = ${uid}`);
  const businessIds = [];
  result.forEach(function(val){
    businessIds.push(val.business_id);
  });
  return businessIds;

}


const insertSettings = async function(uid, business_ids, fields){

  if(business_ids == null || business_ids.length == 0) return true;

  let query = '';
  business_ids.forEach( (val, i) => {
    query += `(${uid}, ${val}, '${fields.products_updates}', '${fields.order_cancel}', '${fields.order_placed}')`;
    query += (i == business_ids.length-1) ? '' : ',';
  } );

  const [result] = await connection.query(`INSERT INTO setting (uid, business_id, products_updates, order_cancel, order_placed) VALUES ${query}`);
  return result.affectedRows > 0;

}

const updateSettings = async function(uid, business_ids, fields, update_fields){

  if(business_ids == null || business_ids.length == 0 || Object.keys(update_fields).length == 0) return true;

  let query = '(';
  business_ids.forEach( (val, i) => {
    query += val;
    query += (i == business_ids.length-1) ? '' : ',';
  } );
  query += ')';

  let setFields = update_fields.products_updates ? ` products_updates = '${fields.products_updates}', ` : `uid = ${uid}, `;
  setFields += update_fields.order_cancel ? ` order_cancel = '${fields.order_cancel}', ` : `uid = ${uid}, `;
  setFields += update_fields.order_placed ? ` order_placed = '${fields.order_placed}' ` : `uid = ${uid} `;

  const sqlQuery = `UPDATE setting SET ${setFields} WHERE uid = ${uid} AND business_id IN ${query}`;

  const [result] = await connection.query(sqlQuery);
  return result.affectedRows > 0;

}


const getSettingsByBusiness = async function(uid, business_id){

  const [result] = await connection.query(`SELECT * FROM setting WHERE uid = ${uid} AND business_id = ${business_id}`);
  return result;

}


const ifSettingsByBusiness = async function(uid, business_id){

  const [result] = await connection.query(`SELECT count(*) AS count FROM setting WHERE uid = ${uid} AND business_id = ${business_id}`);
  return result[0].count == 1;

}


const ifIntegrationByBusinessAndType = async function(business_id, market_place_type){

  const [result] = await connection.query(`SELECT count(*) AS count FROM integrations WHERE business_id = ${business_id} AND market_place_type = ${market_place_type}`);
  return result[0].count > 0;

}


const updateIntegrationByBusinessAndType = async function(business_id, market_place_type, fields){

  const [result] = await connection.query(`UPDATE integrations SET pass_on_cost = '${fields.pass_on_cost}', order_allowed = '${fields.order_allowed}', status = '${fields.status}' WHERE business_id = ${business_id} AND market_place_type = ${market_place_type}`);
  return result.affectedRows > 0;

}


const insertIntegration = async function(budiness_id, emp_id, market_place_type, fields){

  const [result] = await connection.query(`INSERT integrations (market_place_type, pass_on_cost, order_allowed, status, business_id, employee_id) VALUES ('${market_place_type}', '${fields.pass_on_cost}', '${fields.order_allowed}', '${fields.status}', ${budiness_id}, ${emp_id})`);
  return result.affectedRows > 0;

}

const moveProductImages = async function(move_type, product_image_ids){

  if(product_image_ids.length == 0) return true;

  const produtImageIds = product_image_ids.toString();

  const [result] = await connection.query(`UPDATE photo_library SET category = ${move_type} WHERE id IN (${produtImageIds})`);
  return result.affectedRows > 0;

}


const checkIntegrationOrdersPaused = async(business_id) => {

  const [result] = await connection.query(`SELECT order_allowed FROM integrations WHERE business_id = ${business_id}`);

  //If there is either 0 or 1 result in integration for the given business id, then that means we don't need to set order button
  //as paused, because that means not all integrations (for the business) are saved, hence order status won't be pending (in the orders page)
  //and hence no need to check further
  if(result.length < 2) return false;

  let ordersPaused = true;
  //Check if the 'order_allowed' property contains '3' or not? '3' => Pending
  for(let i in result){
    ordersPaused &&= result[i].order_allowed.split(',').includes('3');
  }

  return ordersPaused;

}


const updateIntegrationOrdersPendingStatus = async(business_id, status_pending) => {

  const [result] = await connection.query(`SELECT id, order_allowed FROM integrations WHERE business_id = ${business_id}`);
  for(let i in result){

    const orderAllowed = result[i].order_allowed.split(',');
    //Add or remove pending status (3)
    const idx = orderAllowed.indexOf('3');
    //If 3 doesnt exists and we need to update status as pending
    // if(idx == -1 && status_pending == true){
    //   const orderAllowedStr = '3';
    //   connection.query(`UPDATE integrations SET order_allowed = '${orderAllowedStr}' WHERE id = ${result[i].id}`);
    // }
    //If 3 exists and we need to remove pending status
    if(idx > -1 && status_pending == false){
      orderAllowed.splice(idx, 1);
      connection.query(`UPDATE integrations SET order_allowed = '${orderAllowed}' WHERE id = ${result[i].id}`);
    } 

  }

}

const ifOrderSettingPausedByBusiness = async(business_id) => {

  const [result] = await connection.query(`SELECT order_accept_status FROM order_settings WHERE business_id = ${business_id}`);
  return result.length > 0 ? Boolean(parseInt(result[0].order_accept_status)) : false;

}


const updateOrderItemsAvailibility = async(items_availibility) => {

  let updateQry = true;
  for(i in items_availibility){
    
    const item = items_availibility[i];
    const [result] = await connection.query(`UPDATE order_line_items SET available = ${item.val} WHERE id = ${item.item_id}`);
    updateQry &&= result.affectedRows == 1;

  }

  return updateQry;

}


const getUsersPermissions = async(uid) => {

  const [result] = await connection.query(`SELECT * FROM permissions WHERE uid = ${uid}`);
  return result.length > 0 ? result : null;

}


const getOrderCreatedDate = async(id) => {

  const [result] = await connection.query(`SELECT from_unixtime(order_date, '%M %D, %Y') AS order_date FROM orders WHERE id = ${id}`);
  return result.length > 0 ? result[0].order_date : null;

}

const checkEmailExists = async(email, id = null) => {

  const eMail = email.trim().toLowerCase();
  const uidQry = id == null ? ``: ` AND id != ${id}`;
  const [result] = await connection.query(`SELECT count(*) AS count FROM users WHERE LOWER(email) LIKE '${eMail}'${uidQry}`);
  return result[0].count > 0;

}


const updateUserMail = async(first_name, last_name, email, password, uid) => {

  const eMail = email.trim();
  const encryptedPass = bcrypt.hashSync(password, 6);
  const [result] = await connection.query(`UPDATE users SET firstname = '${first_name}', lastname = '${last_name}', email = '${eMail}', password = '${encryptedPass}' WHERE id = ${uid}`);
  return result.affectedRows > 0;

}