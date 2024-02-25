const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// user signin
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "Email id not registerd" });
    }

    const passwordMatch = await userExist.comparePassword(password); //password compare

    console.log(passwordMatch);
    if (userExist && passwordMatch) {
      const token = await userExist.generateToken();

      return res.status(200).send({ message: "Token created", token });
    }
    return res.status(401).json({ message: "Invalid email or password " });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// user registration
const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All field required" });
    }
    const isUserRegistered = await User.findOne({ email });
    if (isUserRegistered) {
      return res.status(403).json({ message: "User already registered" });
    }

    const registeredUser = await new User({
      firstName,
      lastName,
      email,
      password,
    });

    await registeredUser.save();

    return res.status(201).json({ message: "User registered succefully" });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

module.exports = {
  userSignIn,
  userRegister,
};
