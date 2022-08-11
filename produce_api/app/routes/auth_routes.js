const { authJwt } = require("../middleware");
const apicontroller = require("../controllers/apicontroller");
const userController = require("../controllers/user-controller");
const { validateParams } = require("../middleware/validation");
const { validateListingParams } = require("../middleware/validationListing");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/dashboard", validateListingParams([
    {
      param_key: 'uid',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.Dashboard);

  app.post("/api/availability", validateListingParams([
    {
      param_key: 'email',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },

  ]), apicontroller.availability);

  app.post("/api/user", validateListingParams([
    {
      param_key: 'uid',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.userInfo);

  app.post("/api/login", validateListingParams([
    {
      param_key: 'email',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'password',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.login);

  app.post("/api/register", validateListingParams([
    {
      param_key: 'firstname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'lastname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'email',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'password',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.register);

  app.post("/api/sociallogin", validateListingParams([
    {
      param_key: 'firstname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length >= 0 }]
    },
    {
      param_key: 'email',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'social_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'lastname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length >= 0 }]
    },    
    {
      param_key: 'business_type',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },    
    {
      param_key: 'business_name',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'login',
      required: true,
      type: 'boolean',
      validator_functions: [(param) => { return typeof(param) == "boolean" }]
    }          
  ]), apicontroller.sociallogin);

  app.post("/api/updateaccount", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'firstname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'lastname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'email',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'password',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_name',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_type',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: true,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) > 0 }]
    }
  ]), apicontroller.updateAccount);

  app.post("/api/addemployee", validateListingParams([
    {
      param_key: 'firstname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'lastname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'email',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.registerEmployee);

  app.post("/api/editemployee", validateListingParams([
    {
      param_key: 'id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.updateEmployee);

  app.post("/api/employees", validateListingParams([
    {
      param_key: 'uid',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.Employees);

  app.post("/api/employee-info", validateListingParams([
    {
      param_key: 'uid',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.EmployeeInfo);

  app.post("/api/employee-delete", validateListingParams([
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.EmployeeDelete);


  app.post("/api/user-delete", validateListingParams([
    {
      param_key: 'id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.deleteUser);  

  app.post("/api/settings", validateParams([
    {
      param_key: 'uid',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.Settings);

  app.post("/api/settings-save", validateListingParams([
    {
      param_key: 'uid',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.SettingsSave);

  app.post("/api/add-inventory", validateListingParams([
    {
      param_key: 'product_name',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'price',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'availability',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'category_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'product_image_ids',
      required: false,
      type: 'object',
      validator_functions: [(param) => { return param.length > 0 }]
    }    
  ]), apicontroller.addInventory);

  app.post("/api/edit-inventory", validateListingParams([
    {
      param_key: 'pid',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'product_name',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'price',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'availability',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'category_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'product_image_ids',
      required: false,
      type: 'object',
      validator_functions: [(param) => { return param.length > 0 }]
    }     
  ]), apicontroller.editInventory);

  app.post("/api/delete-inventory", validateListingParams([
    {
      param_key: 'pid',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.deleteInventory);

  app.post("/api/inventory-listing", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.InvetoryList);

  app.post("/api/add-business", validateListingParams([
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'firstname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'lastname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'email',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'password',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_name',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_type',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.addBusiness);

  app.post("/api/business-info", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.businessInfo);

  app.post("/api/delete-busniess", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.deleteBusiness);

  app.post("/api/business-hours", validateListingParams([
    {
      param_key: 'uid',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'hours',
      required: false,
      type: 'object',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'update_for_all',
      required: true,
      type: 'boolean',
      validator_functions: [(param) => { return true }]
    }    
  ]), apicontroller.businessHours);

  app.post("/api/get-business-hours", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.getbusinessHours);

  app.post("/api/business-location", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'location',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.businessLocation);

  app.post("/api/get-business-location", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.getbusinessLocation);

  app.post("/api/delete-business-location", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.deletebusinessLocation);

  app.post("/api/billing-info", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'all_business',
      required: true,
      type: 'boolean',
      validator_functions: [(param) => { return typeof(param) == "boolean" }]
    },    
  ]), apicontroller.billingInfo);

  app.post("/api/get-billing-info", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.getbillingInfo);

  app.post("/api/library", validateListingParams([
    {
      param_key: 'uid',
      required: false,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) > 0 }]
    }    
  ]), apicontroller.Library);

  app.post("/api/upload-image", validateListingParams([
    {
      param_key: 'url',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'name',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'category',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'uid',
      required: true,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) > 0 }]
    }    
  ]), apicontroller.uploadImage);

  app.post("/api/move-images", validateListingParams([
    {
      param_key: 'move_type',
      required: true,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) > 0 }]
    },
    {
      param_key: 'product_image_ids',
      required: true,
      type: 'object',
      validator_functions: [(param) => { return param.length > 0 }]
    }    
  ]), apicontroller.moveImage);

  app.post("/api/delete-image", validateListingParams([
    {
      param_key: 'img_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
  ]), apicontroller.deleteImage);

  app.post("/api/integration-save", validateListingParams([
    {
      param_key: 'business_id',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'integrations',
      required: true,
      type: 'object',
      validator_functions: [(param) => { return typeof(param) == 'object' }]
    }    
  ]), apicontroller.integrationSave);

  app.post("/api/integrations", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'employee_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.integrations);

  app.post("/api/create-order", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'customer_name',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'customer_phone',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'status',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'order_total',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'vat',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'tax',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'shiping',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'grand_total',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'pickup_date',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'products',
      required: false,
      type: 'object',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.orderCreate);

  app.post("/api/orders", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'page',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.orders);

  app.post("/api/more-orders", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'type',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'page',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.loadOrders);

  app.post("/api/order-view", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'order_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.viewOrders);

  app.post("/api/order-setting", validateListingParams([
    {
      param_key: 'business_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'order_accept_status',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.orderSetting);

  app.post("/api/update-order", validateListingParams([
    {
      param_key: 'order_id',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'order_status',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'order_status',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'availability',
      required: false,
      type: 'object',
      validator_functions: [(param) => { return typeof(param) == 'object' }]
    }           
  ]), apicontroller.orderUpdate);

  app.post("/api/welcome-email", validateListingParams([
    {
      param_key: 'email',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'firstname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'lastname',
      required: false,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), apicontroller.welcomeEmail);


  app.post("/user/password/reset", validateListingParams([
    {
      param_key: 'email',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]), userController.sendPasswordResetMail);


  app.post("/user/password-reset-token", validateListingParams([
    {
      param_key: 'token',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]) , userController.getUserByPasswordResetToken);  


  app.post("/api/invitation-token", validateListingParams([
    {
      param_key: 'invite',
      required: true,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) == 1 }]
    },
    {
      param_key: 'token',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }        
  ]), userController.getUserByInvitationToken);


  app.post("/user/password", validateListingParams([
    {
      param_key: 'uid',
      required: true,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) > 0 }]
    },
    {
      param_key: 'password',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }
  ]) , userController.updatePassword);    


  app.post("/api/employee/update", validateListingParams([
    {
      param_key: 'invite',
      required: false,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) >= 0 }]
    },
    {
      param_key: 'uid',
      required: true,
      type: 'number',
      validator_functions: [(param) => { return parseInt(param) > 0 }]
    }, 
    {
      param_key: 'firstname',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },  
    {
      param_key: 'lastname',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'email',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    },
    {
      param_key: 'password',
      required: true,
      type: 'string',
      validator_functions: [(param) => { return param.length > 0 }]
    }                        
  ]), userController.updateEmployeeAccount);

}
