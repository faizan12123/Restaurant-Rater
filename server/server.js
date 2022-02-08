require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./utils/jwtGenerator")
const jwt = require("jsonwebtoken");




//*******************middleware*************

/* example of middleware:
//middleware
app.use((req,res, next) => { //next tells it to send the request to the next middleware
    console.log("yea our middlware");
    next();
}); //order matters because routes will run in order

app.use((req,res, next) => { 
    console.log("this is our second middleware");
    next();
});*/


app.use(cors()); //allows fetch requests from other domains(allows our front-end on a different local host to send a request to this local host)
app.use(express.json()) //it takes the info inside of the body and attaches it to the req object. it turns json object into js object




//********** Restaurant Finder Routes ************

//get all restaurants and it's associated average rating and number of reviews
app.get('/api/v1/restaurants/home', async (req, res) => {

    try{
        const restaurantRatingsData = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;")
        res.status(200).json({
            status: "success",
            results: restaurantRatingsData.rows.length, //gets the number of restaurants in the database
            data: {
                restaurant: restaurantRatingsData.rows
            },
        }); 
    } catch (err){
        console.log(err);
    }
}); //displays this json onto the URL: http://localhost:3001/api/v1/restaurants

//get a restaurant and the reviews for that restaurant and the average rating of that restaurant and the amount of reviews for that restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
    const restaurant = await db.query("select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;", [req.params.id]); //this is a paramatized query which prevents us from sql injection attacks. is basically the same as: select * from restaurants where id = req.params.id but prevents sql injections
    const reviews = await db.query("select * from reviews where restaurant_id = $1", [req.params.id]); //gets reviews tied to target restaurant
    
    res.status(200).json({
        status: "succes",
        data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows,
        }
    })
    }catch (err) {
        console.log(err);
    }
}) //":id" means that it can be any number and that id is just a variable


// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);

    try{
        const results = await db.query("insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        console.log(results);

        res.status(201).json ({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
    console.log(err);
    }

});


//Create a review
app.post("/api/v1/restaurants/:id/addReview", async(req,res) => {
    try {
        const newReview = await db.query("INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning*;", [req.params.id, req.body.name, req.body.review, req.body.rating])

        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })

    } catch (err) {
        console.log(err)
    }
})

//update restaurants
app.put("/api/v1/restaurants/:id",  async (req,res) => {
    try {
const results = await db.query(
    "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning*", [req.body.name, req.body.location, req.body.price_range, req.params.id])
console.log(results);
    res.status(200).json ({
        status: "success",
        data: {
            restaurant: results.rows[0]
        }
    })

    } catch(err) {
        console.log(err);
    }
})

//delete restaurant
app.delete("/api/v1/restaurants/:id", (req,res) => {
    try {
        const results = db.query("DELETE FROM restaurants where id = $1", [req.params.id])
        
        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        console.log(err);
    }

})




//********************************** login page, register page and authentication routes/middleware *******************************

//middleware for registration and login veryfication
app.use((req,res, next) => {
    const { email, name, password } = req.body; //destructure
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail); //checks if email is valid format
    }
  
    if (req.path === "/api/v1/restaurants/register") { //if we go to the register page
      if (![email, name, password].every(Boolean)) {//if any input field is empty, throw error
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) { //if email is not in valid format, throw error
        return res.status(401).json("Invalid Email");
      }


    } else if (req.path === "/api/v1/restaurants/login") { //if we go to the login page
      if (![email, password].every(Boolean)) { //if any input field is empty, throw error
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) { //if email is not in valid format, throw error
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  })

//registering route
app.post("/api/v1/restaurants/register", async (req, res) => {
    try {

        //1. destructure the req.body (name, email, password)
        const {name, email, password} = req.body;

        //2. Check if user exists (if user exist then throw error)
        const user = await db.query("SELECT * FROM users WHERE user_email = $1", [email])

        if(user.rows.length !==0) {
            return res.status(401).send("User already exists") //401 = unauthenticated 
        }
        //3. Bcrypt the user password
        const saltRound = 10; //how encrypted the password will be
        const salt = await bcrypt.genSalt(saltRound)

        const bcryptPassword = await bcrypt.hash(password, salt) //will give us a decrypted password

        //4. Enter the new user inside our database
        const newUser = await db.query ("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword])
        

        //5. generating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id); //passing in the new user's user_id to the jason web token generator

        res.json({token})


    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


//login route
app.post("/api/v1/restaurants/login", async (req, res) => {
    try {

        //1. destructure the req.body
        const {email, password} = req.body

        //2. check if user doesn't exist (if not then we throw error)
        const user = await db.query("SELECT * from users where user_email = $1", [email])

        if(user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect")
        }

        //3. check if incoming password is the same as the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password) //Comparing inputed password with the password in the database

        if(!validPassword) {
            return res.status(401).json("Password or Email is incorrect")
        }

        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id)

        res.json({token})

    } catch (err) {
        console.log(err.message)
    }
})



//middleware for authorization to authorize the person. Making sure the token is legit
app.use((req,res, next) => { 
    try {
        const jwtToken = req.header("token")

        if(!jwtToken) { //if there is no jwt token then the user is not authorized to access that entity
            return res.status(403).json("Not Authorized")
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret) //checks to see if the jwt token is valid, if it is then we can return a payload that we can use within our routes

        req.user = payload.user; //user is from the jwtGenerator.js file


    } catch (err) {
        console.log(err.message)
        return res.status(403).json("Not Authorized")
    }
    next()
})


//authorization route
app.post("/api/v1/restaurants/is-verify", async (req,res) => {
    try {
        res.json(true) //if token is valid then, return true statement that the user's token is valid
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})


//route for getting authorized user's information when on home page
app.get('/api/v1/restaurants/home', async (req, res) => {
    try {
      const user = await db.query("SELECT user_name FROM users WHERE user_id = $1",[req.user]); //req.user has the payload (from authorization middleware)
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });



//************ port connection***************
const port = process.env.PORT || 3001; //gets the port from the .env file but if none is there then it will default to port 3001
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});