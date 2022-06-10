const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Feedback = new Schema({
  faculty_id: {
    type: String,
    default: "",
  },
  q1:{
    type: String,
    default: ""
  },
  q2:{
    type: String,
    default: ""
  },
  q3:{
    type: String,
    default: ""
  },
  q4:{
    type: String,
    default: ""
  },
  q5:{
    type: String,
    default: ""
  },
  q6:{
    type: String,
    default: ""
  },
  q7:{
    type: String,
    default: ""
  },
  q8:{
    type: String,
    default: ""
  },
  q9:{
    type: String,
    default: ""
  },
  q10:{
    type: String,
    default: ""
  }
})

module.exports = mongoose.model("Feedback", Feedback)
