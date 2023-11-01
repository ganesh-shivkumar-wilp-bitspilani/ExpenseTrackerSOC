const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {constants} = require("../constants")

const validateToken = asyncHandler(async(req, res, next) => {
    let jwtToken;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        jwtToken = authHeader.split(" ")[1];
        jwt.verify(jwtToken, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                res.status(constants.UNAUTHORIZED);
                throw Error("User is not authorized");
            }
            req.user = decoded.user;
            next();

            if(!jwtToken) {
                res.status(constants.UNAUTHORIZED);
                throw new Error("User is not authorised or token is not present");
            }
        })
    }
});

module.exports = validateToken;