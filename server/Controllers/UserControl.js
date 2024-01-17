/* The code is a JavaScript function that handles user registration. */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const JWT_Secret = process.env.JWT_Secret;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "belowe1160@gmail.com",
    pass: "vkeilndvszawverj",
  },
});

/* The code is a JavaScript function that handles user registration. */
exports.Register = async (req, res, next) => {
  try {
    const { Name, Address, Phone, Email, Password } = req.body;
    if (!Name || !Address || !Phone || !Email || !Password) {
      return res.status(400).send({ msg: "One or more field is empty" });
    }
    const HashedPassword = await bcrypt.hash(Password, 16);
    const user = new User({
      Name: Name,
      Address: Address,
      Phone: Phone,
      Email: Email,
      Password: HashedPassword,
      Cart: { Items: [] },
    });
    const UserInDB = await User.findOne({ Email: Email });
    if (UserInDB) {
      return res.status(409).send({ msg: "email is already used " });
    }
    const data = await user.save();
    transporter.sendMail({
      to: Email,
      from: "belowe1160@gmail.com",
      subject: "signup_Succeeded",
      html: "<h1>Thank You for the Signup in AttireHome </h1>",
    });
    res.status(201).json({ msg: "user sign up succesfully", data });
  } catch (err) {
    console.log(err);
  }
};

/* The `exports.Login` function is a JavaScript function that handles the login functionality for a
user. */
exports.Login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(204).json({ msg: "ONE OR MANDOTARY FIELD IS EMPTY" });
    }
    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(404).json({ msg: "Email not found" });
    }
    const matchedPassword = await bcrypt.compare(Password, user.Password);
    if (!matchedPassword) {
      return res.status(400).json({ msg: "Password is incorrect" });
    }
    const jwttoken = jwt.sign({ _id: user._id }, JWT_Secret);
    const userInfo = {
      Email: user.Email,
      Name: user.Name,
      _id: user._id,
      IsAuth: user.IsAuth,
    };

    res.status(200).json({
      token: jwttoken,
      user: userInfo,
      msg: "USER logged in successfully",
    });
  } catch (Err) {
    console.log(Err);
  }
};
/* The code is defining a function called `getUserBYId` that handles a GET request to retrieve a user
by their ID. */
exports.getUserBYId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(
      { _id: userId },
      "Name Email Address Phone"
    );
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    return res.status(200).json({ user: user });
  } catch (err) {
    console.log(err);
  }
};

exports.UpdateUser = async (req, res, next) => {
  try {
    const { Name, Address, Phone, Email, Password } = req.body;
    const UserId = req.params.userId;
    const user = await User.findById(UserId);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const UpdatedUser = await User.findByIdAndUpdate(
      { _id: UserId },
      {
        Name: Name,
        Address: Address,
        Phone: Phone,
        Email: Email,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ msg: "User updtaes", UpdatedUser });
  } catch (err) {
    console.log(err);
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const UserId = req.params.UserId;
    const { newPassword, confirmPassword } = req.body;

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ msg: "Password and confirm password do not match" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 16);

    // Update the user's password in the database
    const updatedUser = await User.findByIdAndUpdate(
      UserId,
      { Password: hashedPassword },
      { new: true } // To return the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res
      .status(200)
      .json({ msg: "Password reset successful", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Password reset failed" });
  }
};

exports.DeleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    //  const AdminCheck=await User.findById(req.user)
    if (userId.toString() === req.user._id.toString()) {
      return res.status(300).json({ msg: "You can't delete the Admin" });
    }
    await User.findByIdAndDelete({ _id: userId });
    return res.status(200).json({ msg: "User Removed" });
  } catch (err) {
    console.log(err);
  }
};
exports.getAllUser = async (req, res, next) => {
  const Users = await User.find();
  return res.status(200).json(Users);
};
