const { Products } = require("../Model");

const addProduct = async (req, res, next) => {
  try {
    const { name, image, category, old_price, new_price } = req.body;
    if (!name || !image || !category || !old_price || !new_price) {
      throw BaseError.BadRequest("All datas required")
    }

    await Products.create({ name, image, category, old_price, new_price });

    res.json({
      success: "created",
      name: req.body.name,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    //   if (req.email.role === "user") {
    //     return res.send({
    //       msg: "you are not admin",
    //     });
    //   }

    // const page = parseInt(req.query.page);
    // const limit = parseInt(req.query.limit);

    const product = await Products.find();

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

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

const getMenProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const products = await Products.find();

    const product = products.filter((item) => item.category == "men");

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < product.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = product.slice(startIndex, endIndex);

    return res.json(results);
  } catch (error) {
    next(error);
  }
};

const getWomenProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const products = await Products.find();

    const product = products.filter((item) => item.category == "women");

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < product.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = product.slice(startIndex, endIndex);

    return res.json(results);
  } catch (error) {
    next(error);
  }
};

const getKidsProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const products = await Products.find();

    const product = products.filter((item) => item.category == "kid");

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < product.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = product.slice(startIndex, endIndex);

    return res.json(results);
  } catch (error) {
    next(error);
  }
};

const getLatestProduct = async (req, res, next) => {
  try {
    const latestProdcts = await Products.find();
    return res.json(latestProdcts.reverse().slice(0, 10));
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    // if (req.email.role === "user") {
    //   return res.send({
    //     msg: "you are not admin",
    //   });
    // }
    const { id } = req.params;

    // const finder = await Product.findOne({ where: { id: id } });

    await Products.deleteOne({
      _id: id,
    });
    return res.json({
      msg: "deleted product!",
    });
  } catch (error) {
    next(error);
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
  getMenProducts,
  getWomenProducts,
  getKidsProducts,
  getLatestProduct,
  deleteProduct,
};
