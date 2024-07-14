const { User, Products } = require("../Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(200).send({
        message: "user already exists",
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
        message: "Password invalid",
      });
    }

    let hash = await bcrypt.hash(password, 12);

    await User.create({ username, email, password: hash, verify: randomStr });

    return res.status(201).send({
      message: "Registered!",
      email,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const verifyCode = async (req, res) => {
  try {
    const { verify, email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.send({
        message: "user not found",
      });
    }
    if (user.verify !== verify) {
      return res.send({
        message: "verify code mistake or you must be refresh and try again",
      });
    }

    if (user.verify === verify) {
      await User.findByIdAndUpdate(user._id, { verified: true });
      let token = await jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SEKRET_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.send({
        message: "Success",
        token,
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email: email });

    let founEmail = user.email === email;

    if (!founEmail) {
      return res.status(404).send({
        message: "You haven't registered",
      });
    }

    let check = await bcrypt.compare(password, user.password);

    if (check && user.verified === true) {
      let token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.SEKRET_KEY,
        {
          expiresIn: "24h",
        }
      );
      return res.send({
        message: "Success",
        token,
      });
    } else {
      res.send({
        message: "Password wrong or you are not veriy your code",
      });
    }
  } catch (err) {
    throw new Error(err);
  }
};

const shoppingCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = acceptVariable.id;

    const foundedUser = await User.findById(userId);
    const foundedProduct = await Products.findById(productId);

    // foundedUser.products.find(async (item) => {
    await foundedUser.products.push({
      productId: productId,
      quantity: +1,
      name: foundedProduct.name,
      price: foundedProduct.new_price,
    });
    await foundedUser.save();
    res.json({
      success: "product added",
    });
    // });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  register,
  verifyCode,
  login,
  shoppingCart,
};
