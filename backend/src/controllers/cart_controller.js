import Cart from "../models/cart_model.js";
import Users from "../models/user_model.js";
import Products from "../models/product_model.js";

export const addCartItem = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    //check if the product exists

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "No products found" });
    }

    //add the product to user's the cart
    const cart = await Cart.findOne({ user: req.user.id });

    //if the cart does not exist, create a new one
    //else add the product to the cart n increase the product qty

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, qty: quantity }],
        //first time user - no product, create it
      });
    } else {
      const findItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (findItemIndex > -1) {
        //product is already there then inc the qty
        cart.items[findItemIndex].qty += quantity;
      } else {
        //already existing user - product not there? add it
        cart.items.push({ product: productId, qty: quantity });
      }
    }

    await cart.save();
    //returning the cart so as to refresh the UI for added items
    res.status(200).json({ message: "Added item to cart", cart });
  } catch (error) {
    console.log("Add items error, error");
    res.status(500).json({ message: "Server error" });
  }
};

export const getCartItems = async (req, res) => {
  try {
    //get the user's cart
    const userCart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );
    //populate is a mongoose level fucnton which replace the object for each product n injects the document associated with ecah
    //     {
    //   "items": [
    //     { "product": "64abc...", "quantity": 2 }
    //   ]
    //     // }
    //     {
    //   "items": [
    //     {
    //       "product": {
    //         "_id": "64abc...",
    //         "name": "Shoes",
    //         "price": 2999
    //       },
    //       "quantity": 2
    //     }
    //   ]
    // }

    res.status(200).json(userCart || { items: [] });
  } catch (error) {
    console.log("Add items error, error");
    res.status(500).json({ message: "Server error" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    //get the user's cart, access the items
    //retain all except the one to be deleetd
    const { productId } = req.params;

    const userCart = await Cart.findOne({ user: req.user.id });
    if (!userCart) return res.status(404).json({ message: "Cart not found" });

    //if exists
    //modify the items array for user
    userCart.items = userCart.items.filter(
      (item) => item.product.toString() != productId
    );

    await userCart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    console.log("Add items error, error");
    res.status(500).json({ message: "Server error" });
  }
};
