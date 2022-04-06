const Category = require("../Models/category");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  try {
    const category = new Category({ name, slug: slugify(name) });
    const savedCategory = await category.save();
    if (!savedCategory) throw createError.InternalServerError();

    res.status(200).json({ savedCategory });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.list = async (req, res, next) => {
  try {
    const categoryList = await Category.find({}).sort({ createdAt: 1 }).exec();
    if (!categoryList)
      throw createError.InternalServerError("No categories in DB");
    res.status(200).json(categoryList);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.read = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    if (!category) throw createError.InternalServerError();

    res.status(200).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.update = async (req, res, next) => {
  console.log(req.body);
  try {
    const { category } = req.body;
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: category._id },
      { name: category.name, slug: slugify(category.name) },
      { new: true }
    );

    res.status(200).json({ updatedCategory });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.remove = async (req, res, next) => {
  console.log(req.params);
  try {
    const removedCategory = await Category.findByIdAndDelete(
      req.params.id
    ).exec();
    // const removedCategory = await Category.findOneAndDelete({
    //   slug: req.params.slug,
    // }).exec();
    //if (!savedCategory) throw createError.InternalServerError();

    res.status(200).json({ removedCategory });
  } catch (error) {
    res.status(400).send(error);
  }
};
