const mongoose = require("mongoose")
const url = "mongodb+srv://dhanush-arch:<password>@cluster0.2dgml.mongodb.net/?retryWrites=true&w=majority"
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
connect
  .then(db => {
    console.log("connected to db")
  })
  .catch(err => {
    console.log(err)
  })
