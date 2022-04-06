const Sub = require("../Models/sub");
const slugify = require("slugify");

exports.create = async (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  try {
    const sub = new Sub({ name, slug: slugify(name) });
    const savedSub = await sub.save();
    if (!savedSub) throw createError.InternalServerError();

    res.status(200).json({ savedSub });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.list = async (req, res, next) => {
  try {
    const subList = await Sub.find({}).sort({ createdAt: 1 }).exec();
    if (!subList)
      throw createError.InternalServerError("No categories in DB");
    res.status(200).json(subList);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.read = async (req, res, next) => {
  try {
    const sub = await Sub.findOne({ _id: req.params.id }).exec();
    if (!sub) throw createError.InternalServerError();

    res.status(200).send(sub);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.update = async (req, res, next) => {
  console.log(req.body);
  try {
    const { sub } = req.body;
    const updatedSub = await Sub.findOneAndUpdate(
      { _id: sub._id },
      { name: sub.name, slug: slugify(sub.name) },
      { new: true }
    );

    res.status(200).json({ updatedSub });
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.remove = async (req, res, next) => {
  console.log(req.params);
  try {
    const removedSub = await Sub.findByIdAndDelete(
      req.params.id
    ).exec();
    // const removedSub = await Sub.findOneAndDelete({
    //   slug: req.params.slug,
    // }).exec();
    //if (!savedSub) throw createError.InternalServerError();

    res.status(200).json({ removedSub });
  } catch (error) {
    res.status(400).send(error);
  }
};
