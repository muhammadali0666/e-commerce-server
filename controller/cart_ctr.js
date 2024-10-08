const BaseError = require("../error/base.error");
const { Cart, Products } = require("../Model");

const cart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = acceptVariable.id;
  // TODO: Get the logged-in user's ID
  try {
    let cart = await Cart.findOne({ userId });

    const doubleFounder = cart?.products.find((c) => c.productId === productId);

    if (doubleFounder) {
      throw BaseError.BadRequest("Click the Add to Cart button to increase the number of products previously added.")
    }

    const foundedProduct = await Products.findById(productId);

    if (!cart) {
      // Create a new cart for the user
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.products.findIndex((p) => p.productId === productId);

    if (itemIndex > -1) {
      // Product exists, update the quantity
      cart.products[itemIndex].quantity = quantity;
    } else {
      // Product doesn't exist, add it to the cart
      cart.products.push({
        productId: productId,
        quantity,
        name: foundedProduct.name,
        new_price: foundedProduct.new_price,
        old_price: foundedProduct.old_price,
        image: foundedProduct.image,
        category: foundedProduct.category,
      });
    }

    await cart.save();
    return res.json({
      message: "product added",
    });
  } catch (error) {
    next(error);
  }
};

const addQuantity = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = acceptVariable.id;
    let productsOfUser = await Cart.findOne({ userId });
    const foundedProduct = productsOfUser.products.find(
      (c) => c.productId === productId
    );

    if (foundedProduct) {
      foundedProduct.quantity += 1;
    }
    await productsOfUser.save();
    return res.json();
  } catch (error) {
    next(error);
  }
};

const reduceTheQuantity = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = acceptVariable.id;
    let productsOfUser = await Cart.findOne({ userId });
    const foundedProduct = productsOfUser.products.find(
      (c) => c.productId === productId
    );

    if (foundedProduct) {
      foundedProduct.quantity -= 1;
    }
    await productsOfUser.save();
    return res.json();
  } catch (error) {
    next(error);
  }
};

const getCarts = async (req, res, next) => {
  try {
    const userId = acceptVariable.id;
    let productsOfUser = await Cart.findOne({ userId });
    if (!productsOfUser) {
      throw BaseError.BadRequest("Product not found")
    }
    return res.json(productsOfUser);
  } catch (error) {
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = acceptVariable.id;
    let productsOfUser = await Cart.findOne({ userId });
    const foundedProduct = productsOfUser.products.findIndex(
      (c) => c.productId === productId
    );
    productsOfUser.products.splice(foundedProduct, 1);
    await productsOfUser.save();
    return res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  cart,
  getCarts,
  addQuantity,
  reduceTheQuantity,
  deleteCart,
};
