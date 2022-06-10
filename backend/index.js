const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const session = require('express-session');



const mysql = require("mysql")

if (process.env.NODE_ENV !== "production") {
    // Load environment variables from .env file in non prod environments
    require("dotenv").config()
}
require("./connectdb")
require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

const userRouter = require("./routes/userRoutes")
const app = express()
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))


const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
  
    credentials: true,
  }

app.use(cors(corsOptions))

app.use(passport.initialize())

app.use("/users", userRouter)

app.get("/", function (req, res) {
  res.send({ status: "success" })
})


const server = app.listen(process.env.PORT || 8081, function () {
    const port = server.address().port
  
    console.log("App started at port:", port)
  })