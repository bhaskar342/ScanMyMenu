const Restaurant = require("../../models/RestaurantModel");

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().select("-password").lean();
    return res.json({ success: true, restaurants });
  } catch (err) {
    console.error("getAllRestaurants error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleRestaurantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }
    restaurant.isActive = !restaurant.isActive;
    await restaurant.save();
    return res.json({
      success: true,
      message: `Restaurant is now ${
        restaurant.isActive ? "active" : "inactive"
      }`,
    });
  } catch (err) {
    console.error("toggleRestaurantStatus error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
