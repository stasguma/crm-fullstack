const cloudinary = require("cloudinary");
const config = require("../config/keys");

cloudinary.config({
  cloud_name: config.cloudName,
  api_key: config.apiKey,
  api_secret: config.apiSecret
});

module.exports.uploads = file => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      result => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};
