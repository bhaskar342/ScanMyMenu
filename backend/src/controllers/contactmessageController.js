const ContactMessage = require("../models/ContactMessageModel");

exports.postMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, message, restaurantName } = req.body;
    const newMessage = new ContactMessage({
      firstName,
      lastName,
      email,
      message,
      restaurantName,
    });
    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact Message Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
