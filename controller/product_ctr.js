const { Product } = require("../Model");

Product.sync({ force: false });

const addProduct = async (req, res) => {
  // const product = new Product({
  //   id: req.body.id,
  //   name: req.body.name,
  //   image: req.body.image,
  //   category: req.body.category,
  //   new_price: req.body.new_price,
  //   old_price: req.body.old_price,
  // })
  const { name, image, category, old_price, new_price } = req.body;

  await Product.create({ name, image, category, old_price, new_price });

  res.json({
    success: true,
    name: req.body.name,
  });
};

module.exports = {
  addProduct,
};
