const Category = require("../models/Category");
const cloudinary = require("../middleware/cloudinary");
const Position = require("../models/Position");
const errorHandler = require("../utils/error-handler");

module.exports.getAll = async function(req, res) {
  try {
    console.log("req.user", req.user);
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.getById = async function(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.remove = async function(req, res) {
  try {
    await Category.remove({ _id: req.params.id });
    await Position.remove({ category: req.params.id });

    res.status(200).json({
      message: "Категория была удалена"
    });
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.create = async function(req, res) {
  // const category = new Category({
  //   name: req.body.name,
  //   user: req.user.id,
  //   imageSrc: req.file ? req.file.path : "",
  //   imageName: req.body.imageName,
  //   cloudImage: req.file ? req.file.path : "",
  //   imageId: ""
  // });
  try {
    const cloudinaryResult = await cloudinary.uploads(
      req.file ? req.file.path : ""
    );

    const category = new Category({
      name: req.body.name,
      user: req.user.id,
      imageSrc: req.file ? req.file.path : "",
      cloudImageSrc: cloudinaryResult.url,
      imageId: cloudinaryResult.id
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    errorHandler(res, err);
  }
};
module.exports.update = async function(req, res) {
  const updated = {
    name: req.body.name
  };
  if (req.file) {
    const cloudinaryResult = await cloudinary.uploads(req.file.path);
    updated.imageSrc = req.file.path;
    updated.cloudImageSrc = cloudinaryResult.url;
    updated.imageId = cloudinaryResult.id;
  }
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.status(200).json(category);
  } catch (err) {
    errorHandler(res, err);
  }
};
