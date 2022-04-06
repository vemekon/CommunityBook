const Product = require("../Models/product");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  
  req.body.slug = slugify(req.body.title)
  try {
    const product = new Product(req.body);
    const savedproduct = await product.save();
    if (!savedproduct) throw createError.InternalServerError();

    res.status(200).json({ savedproduct });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.list = async (req, res, next) => {
  try {
    const productList = await Product.find({}).sort({ createdAt: 1 }).exec();
    if (!productList) throw createError.InternalServerError();
    res.status(200).json(productList);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.read = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).exec();
    if (!product) throw createError.InternalServerError();

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updatedproduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).json({ updatedproduct });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.remove = async (req, res, next) => {
  try {
    const removedproduct = await Product.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    //if (!savedproduct) throw createError.InternalServerError();

    res.status(200).json({ removedproduct });
  } catch (error) {
    res.status(400).send(error);
  }
};