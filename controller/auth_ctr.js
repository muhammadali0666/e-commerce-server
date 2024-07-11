const { User } = require("../Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({email: email });
    if (user) {
      return res.status(200).send({
        msg: "user already exists",
      });
    }
    ///////////////////////////// nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "muhammadalishuhratjonov50@gmail.com",
        pass: "gmlmvvatzkuedfqe",
      },
    });

    let randomStr = "";
    let randomNumberOne = Math.floor(Math.random() * 10);
    let randomNumberTwo = Math.floor(Math.random() * 10);
    let randomNumberThree = Math.floor(Math.random() * 10);
    let randomNumberFour = Math.floor(Math.random() * 10);
    let randomNumberFiveth = Math.floor(Math.random() * 10);
    let randomNumberSixth = Math.floor(Math.random() * 10);

    randomStr += randomNumberOne;
    randomStr += randomNumberTwo;
    randomStr += randomNumberThree;
    randomStr += randomNumberFour;
    randomStr += randomNumberFiveth;
    randomStr += randomNumberSixth;

    let mailOptions = {
      from: "muhammadalishuhratjonov50@gmail.com",
      to: `${email}`,
      subject: "ZarStore verify code ✋",
      html: `<b> your verification code is <span style="color: blue; font-size: 25px;">${randomStr}</span></b>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    /////////////////////////////

    if (!password.trim()) {
      return res.status(400).send({
        msg: "Password invalid",
      });
    }

    let hash = await bcrypt.hash(password, 12);

    await User.create({ username, email, password: hash, verify: randomStr });

    return res.status(201).send({
      msg: "Registered!",
      email,
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  register,
};
