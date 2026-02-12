const MenuItem = require("../models/MenuItemModel");
const Category = require("../models/FoodCategoryModel");
const cloudinary = require("../config/cloudinaryConfig");
const RestaurantModel = require("../models/RestaurantModel");
const { uploadMenuImage } = require("../utils/imageService");

exports.addMenuItem = async (req, res) => {
  try {
    const body = req.body || {};

    const restaurant = await RestaurantModel.findById(req.user.restaurantId);
    if (!restaurant)
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });

    let {
      name,
      description,
      category,
      price,
      isVeg,
      isAvailable,
      isBestSeller,
      variants,
    } = body;

    // ---------- REQUIRED FIELD ----------
    if (!name)
      return res.status(400).json({
        success: false,
        message: "Name required",
      });

    // ---------- CATEGORY VALIDATION ----------
    const validCategory = await Category.findOne({
      _id: category,
      restaurantId: req.user.restaurantId,
    });

    if (!validCategory)
      return res.status(400).json({
        success: false,
        message: "Invalid category. Create the category first.",
      });

    // ---------- VARIANTS SAFE PARSE ----------
    if (variants && typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format for variants",
        });
      }
    }

    if (!Array.isArray(variants)) variants = [];

    // ---------- NORMALIZE DATA ----------
    price = price ? Number(price) : null;
    isVeg = isVeg === true || isVeg === "true";
    isAvailable = isAvailable === true || isAvailable === "true";
    isBestSeller = isBestSeller === true || isBestSeller === "true";

    // ---------- IMAGE RULE ----------
    let imageData = {};

    if (restaurant.hasPictures) {
      imageData = await uploadMenuImage({
        file: req.file,
        name,
        restaurantId: restaurant._id,
      });
    }
    // ---------- CREATE ITEM ----------
    const newItem = await MenuItem.create({
      restaurantId: restaurant._id,
      name,
      description: description || "",
      category,
      price,
      isVeg,
      isAvailable,
      isBestSeller,
      variants,
      ...imageData,
    });

    res.status(201).json({
      success: true,
      menuItem: newItem,
    });
  } catch (err) {
    console.error("Add Menu Item Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

exports.getAllMenuItems = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantId; // MUST be correct

    const items = await MenuItem.find({ restaurantId })
      .populate("category")
      .lean();
    return res.json({ success: true, menuItems: items });
  } catch (err) {
    console.error("getAllMenuItems error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await MenuItem.findOne({
      _id: id,
      restaurantId: req.user.restaurantId,
    });

    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });

    // ✅ Delete Cloudinary image ONLY if uploaded (not initials)
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId);
    }

    await item.deleteOne();

    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Delete Menu Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const body = req.body || {};
    const { id } = req.params;

    // ---------- FIND RESTAURANT ----------
    const restaurant = await RestaurantModel.findById(req.user.restaurantId);
    if (!restaurant)
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });

    // ---------- FIND ITEM ----------
    const item = await MenuItem.findOne({
      _id: id,
      restaurantId: req.user.restaurantId,
    });

    if (!item)
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });

    let {
      name,
      description,
      category,
      price,
      isVeg,
      isAvailable,
      isBestSeller,
      variants,
    } = body;

    // ---------- CATEGORY VALIDATION ----------
    if (category) {
      const validCategory = await Category.findOne({
        _id: category,
        restaurantId: req.user.restaurantId,
      });

      if (!validCategory)
        return res.status(400).json({
          success: false,
          message: "Invalid category",
        });

      item.category = category;
    }

    // ---------- VARIANTS SAFE PARSE ----------
    if (variants && typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON format for variants",
        });
      }
    }

    // ---------- APPLY FIELD UPDATES ----------
    if (name !== undefined) item.name = name;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price ? Number(price) : null;
    if (Array.isArray(variants)) item.variants = variants;

    if (isVeg !== undefined)
      item.isVeg = isVeg === true || isVeg === "true";

    if (isAvailable !== undefined)
      item.isAvailable = isAvailable === true || isAvailable === "true";

    if (isBestSeller !== undefined)
      item.isBestSeller = isBestSeller === true || isBestSeller === "true";

    // ---------- IMAGE RULE ----------
    if (restaurant.hasPictures) {
      // If new image uploaded → replace
      if (req.file) {
        if (item.imagePublicId) {
          await cloudinary.uploader.destroy(item.imagePublicId);
        }

        const imageData = await uploadMenuImage({
          file: req.file,
          name: item.name,
          restaurantId: restaurant._id,
        });

        item.imageUrl = imageData.imageUrl;
        item.imagePublicId = imageData.imagePublicId;
      }
    } else {
      // Restaurant disabled pictures → remove old images
      if (item.imagePublicId) {
        await cloudinary.uploader.destroy(item.imagePublicId);
        item.imageUrl = undefined;
        item.imagePublicId = undefined;
      }
    }

    await item.save();

    res.json({
      success: true,
      updatedItem: item,
    });
  } catch (err) {
    console.error("Update Menu Item Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
