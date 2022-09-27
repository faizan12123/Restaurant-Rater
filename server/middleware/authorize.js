const jwt = require("jsonwebtoken");
require("dotenv").config();

//middleware for authorization to authorize the person. Making sure the token is legit
module.exports = function(req, res, next) {
    const jwtToken = req.header("token") //get token from header

        if(!jwtToken) { //if there is no jwt token then the user is not authorized to access that entity
            return res.status(403).json("Not Authorized")
        }

    try {
        const verify = jwt.verify(jwtToken, process.env.jwtSecret) //checks to see if the jwt token is valid, if it is then we can return a payload that we can use within our routes

        req.user = verify.user; //user is from the jwtGenerator.js file

    } catch (err) {
        console.log(err.message)
        return res.status(403).json("Not Authorized")
    }
    next()
}