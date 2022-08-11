const validateParams = function (requestParams) {
  return function (req, res, next) {
    for (let param of requestParams) {
      if (checkParamPresent(Object.keys(req.body), param)) {
        let reqParam = req.body[param.param_key];
        if (!checkParamType(reqParam, param)) {
          return res.status(400).json({
            status: 400,
            message: `${param.param_key} is of type ` +
              `${typeof reqParam} but should be ${param.type}`,
            data: {}
          });
        } else {
          if (!runValidators(reqParam, param)) {
            return res.status(400).json({
              status: 400,
              message: `Validation failed for ${param.param_key}`,
              data: {}
            });
          }
        }
      } else if (param.required) {
        return res.status(400).json({
          status: 400,
          message: `Missing Parameter ${param.param_key}`,
          data: {}
        });
      }
    }
    next();
  }
};

const checkParamPresent = function (reqParams, paramObj) {
  return (reqParams.includes(paramObj.param_key));
};

const checkParamType = function (reqParam, paramObj) {
  const reqParamType = typeof reqParam;
  return reqParamType === paramObj.type;
};

const runValidators = function (reqParam, paramObj) {
  for (let validator of paramObj.validator_functions) {
    if (!validator(reqParam)) {
      return false
    }
  }
  return true;
};

module.exports = {
  validateParams: validateParams
};