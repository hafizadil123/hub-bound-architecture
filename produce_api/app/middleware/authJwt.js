const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];
	/* console.log(req); */
	if (!token) {
		return res.status(200).json({
			status_code: 400,
			status: 'error',
			error: 'No token provided!',
		});
	}

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		/* console.log("hello"); */
		if (err) {
			return res.status(200).json({
				status_code: 400,
				status: 'error',
				error: 'Unauthorized token!',
			});
		}
		req.userId = decoded.id;
		next();
	});
};


const authJwt = {
	verifyToken: verifyToken
};
module.exports = authJwt;