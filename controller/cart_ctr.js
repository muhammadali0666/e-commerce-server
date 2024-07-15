const {Cart} = require("../Model");

const cart = async (req, res) => {
  const { productId, quantity, name, price } = req.body;
  const userId = acceptVariable.id; 
  // TODO: Get the logged-in user's ID

  try {
    let cart = await Cart.findOne({ userId });

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
      cart.products.push({ productId, quantity, name, price });
    }

    await cart.save();
    return res.json(cart);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  cart
}
