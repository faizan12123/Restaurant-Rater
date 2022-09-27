module.exports = function(req, res, next) {
    const { email, name, password } = req.body; //destructure
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail); //checks if email is valid format
    }
    function validPassword(userPassword) {
      return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(userPassword)
    }
  
    if (req.path === "/api/v1/restaurants/register") { //if we go to the register page
      if (![email, name, password].every(Boolean)) {//if any input field is empty, throw error
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) { //if email is not in valid format, throw error
        return res.status(401).json("Invalid Email");
      } else if (!validPassword(password)) {
        return res.status(401).json("Invalid Password Format");
      }


    } else if (req.path === "/api/v1/restaurants/login") { //if we go to the login page
      if (![email, password].every(Boolean)) { //if any input field is empty, throw error
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) { //if email is not in valid format, throw error
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
}