const mongoose = require("mongoose");
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// password hashing
userSchema.pre("save",  function(){
    this.password= bcrypt.hashSync(this.password,10);
})

// generate jwt token
userSchema.methods.generateToken =  async function(){
 try {
  const token= await jwt.sign({id: this._id,email:this.email},process.env.JWT_SECRET_KEY)
  return token;
 } catch (error) {
  console.log("token error" , error);
 }
}

// compare password
userSchema.methods.comparePassword= function(password){
   return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);



module.exports = User;
