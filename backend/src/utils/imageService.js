const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig");
const generateInitialsImage = require("../utils/generateInitialsImage");

async function uploadMenuImage({ file, name, restaurantId }) {
  let imageUrl = null;
  let imagePublicId = null;

  // CASE 1 → user uploaded image
  if (file) {
    const upload = await cloudinary.uploader.upload(file.path, {
      folder: `scanmymenu/${restaurantId}/menu`,
    });

    imageUrl = upload.secure_url;
    imagePublicId = upload.public_id;
    fs.unlink(file.path, () => {});
    return { imageUrl, imagePublicId };
  }

  // CASE 2 → generate initials image
  const initials = name
    .split(" ")
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  const localPath = generateInitialsImage(initials);

  const upload = await cloudinary.uploader.upload(localPath, {
    folder: `scanmymenu/${restaurantId}/menu`,
  });

  fs.unlink(localPath, () => {});
  return { imageUrl: upload.secure_url, imagePublicId: upload.public_id };
}

module.exports = { uploadMenuImage };
