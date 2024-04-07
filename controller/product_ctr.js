const { Product } = require("../Model");

Product.sync({ force: false });

const addProduct = async (req, res) => {
  const { name, image, category, old_price, new_price } = req.body;
  if (!name || !image || !category || !old_price || !new_price) {
    res.json({
      message: "all datas required",
    });
  }

  await Product.create({ name, image, category, old_price, new_price });

  res.json({
    success: "created",
    name: req.body.name,
  });
};

const getProducts = async (req, res) => {
  try {
    //   if (req.email.role === "user") {
    //     return res.send({
    //       msg: "you are not admin",
    //     });
    //   }

    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);

    const product = await Product.findAll();

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

    // const results = {};

    // if (endIndex < students.length) {
    //   results.next = {
    //     page: page + 1,
    //     limit: limit,
    //   };
    // }
    // if (startIndex > 0) {
    //   results.prev = {
    //     page: page - 1,
    //     limit: limit,
    //   };
    // }
    // results.results = students.slice(startIndex, endIndex);

    return res.send(product);
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // if (req.email.role === "user") {
    //   return res.send({
    //     msg: "you are not admin",
    //   });
    // }
    const { id } = req.params;

    // const finder = await Product.findOne({ where: { id: id } });

    await Product.destroy({
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    return res.send({
      msg: "deleted product!",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

// const getFullInfoStudent = async (req, res) => {
//   try {
//     if (req.email.role === "user") {
//       return res.send({
//         msg: "you are not admin",
//       });
//     }
//     const { id } = req.params;

//     const result = await Groups.findOne({ where: { id: id } });
//     const student = await Students.findAll({
//       where: { science: result.GroupYonalish },
//     });
//     return res.json(student);
//   } catch (err) {
//     return res.status(400).send({
//       msg: err.message,
//     });
//   }
// };

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
};
