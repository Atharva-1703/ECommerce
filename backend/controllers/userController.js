const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFound = await User.findById(user.id).select("-password");
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    user: userFound,
  });
});

exports.getReviews = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFound = await User.findById(user.id)
    .populate("reviews")
    .select("reviews");
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    reviews: userFound.reviews,
  });
});

exports.addFavourite = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }
  const userFound = await User.findById(user.id);
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  userFound.favourites.push(productId);
  await userFound.save();
  res.status(200).json({
    success: true,
    message: "Product added to favourites",
  });
});

exports.removeFavourite = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }
  const userFound = await User.findById(user.id);
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  userFound.favourites = userFound.favourites.filter(
    (item) => item.toString() !== productId
  );
  await userFound.save();
  res.status(200).json({
    success: true,
    message: "Product removed from favourites",
  });
});

exports.getFavourites = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFound = await User.findById(user.id)
    .populate({
      path: "favourites",
      select: "_id title thumbnail stock price discountPercentage rating",
    })
    .select("favourites");
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    favourites: userFound.favourites,
  });
});

exports.addToCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product ID format",
    });
  }
  if (!quantity || quantity < 1) {
    quantity = 1;
  }
  const userFound = await User.findById(user.id);
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const productExists = userFound.cart.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productExists == -1) {
    userFound.cart.push({
      product: productId,
      quantity: quantity,
    });
  } else {
    userFound.cart[productExists].quantity += quantity;
  }
  await userFound.save();
  if (productExists != -1) {
    return res.status(200).json({
      success: true,
      message: "Product quantity updated in cart",
      cart: userFound.cart,
    });
  }
  res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart: userFound.cart,
  });
});

exports.editCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const { cartId, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }
  if (!quantity || quantity < 1) {
    quantity = 1;
  }
  const userFound = await User.findByIdAndUpdate(
    user.id,
    {
      $set: {
        "cart.$[elem].quantity": quantity,
      },
    },
    {
      new: true,
      arrayFilters: [{ "elem._id": cartId }],
    }
  );
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "quantity updated to cart",
  });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const { cartId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(cartId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  const userFound = await User.findByIdAndUpdate(
    user.id,
    { $pull: { cart: { _id: new mongoose.Types.ObjectId(cartId) } } },
    { new: true }
  );
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
    cart: userFound.cart,
  });
});

exports.getCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFound = await User.findById(user.id)
    .populate({
      path: "cart.product",
      select: "_id title thumbnail stock price discountPercentage rating",
    })
    .select("cart");
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  res.status(200).json({
    success: true,
    cart: userFound.cart,
  });
});

exports.clearCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const userFound = await User.findById(user.id);
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  userFound.cart = [];
  await userFound.save();
  res.status(200).json({
    success: true,
    message: "Cart cleared",
  });
});

exports.addAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  const { address } = req.body;
  address.name = address.name.toLowerCase();

  const userFound = await User.findById(user.id);
  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (userFound.address.find((item) => item.name === address.name)) {
    return res.status(400).json({
      success: false,
      message: "Address with same name already exists",
    });
  }
  userFound.address.push(address);
  await userFound.save();
  return res.status(200).json({
    success: true,
    message: "Address added",
    address: userFound.address,
  });
});

exports.removeAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  const { addressId } = req.body;

  const userFound = await User.findById(user.id);

  const addressIndex = userFound.address.findIndex(
    (item) => item._id.toString() === addressId
  );
  if (addressIndex == -1) {
    return res.status(404).json({
      success: false,
      message: "Address not found",
    });
  }
  userFound.address.splice(addressIndex, 1);
  await userFound.save();

  if (!userFound) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Address deleted",
  });
});

exports.editAddress = asyncHandler(async (req, res) => {
  const user = req.user;
  const { addressId, newAddress } = req.body;
  if (!addressId || !newAddress) {
    return res.status(400).json({
      success: false,
      message: "Incomplete data provided",
    });
  }

  newAddress.name = newAddress.name.toLowerCase();
  if (userFound.address.find((item) => item.name === address.name)) {
    return res.status(400).json({
      success: false,
      message: "Address with same name already exists",
    });
  }
  if (mongoose.Types.ObjectId.isValid(addressId)) {
    const userFound = await User.findOneAndUpdate(
      { _id: user.id, "address._id": addressId },
      {
        $set: {
          "address.$.name": newAddress.name,
          "address.$.street": newAddress.street,
          "address.$.city": newAddress.city,
          "address.$.state": newAddress.state,
          "address.$.postalCode": newAddress.postalCode,
          "address.$.country": newAddress.country,
          "address.$.phone": newAddress.phone,
        },
      },
      { new: true }
    );
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Address updated",
      address: userFound.address,
    });
  }

  return res.status(400).json({
    success: false,
    message: "Invalid ID format",
  });
});
