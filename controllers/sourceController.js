const Source = require("./../models/Source");

// @desc    get source data
// @route   GET  /API/v1/manage/get-source
// @access  public
exports.handleGetSource = async (req, res) => {
  try {
    const sourceData = await Source.find({});
    return res.status(200).json({ data: sourceData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set source data
// @route   POST  /API/v1/manage/set-source
// @access  public
exports.handleSetSource = async (req, res) => {
  try {
    const { name, description, stock } = req.body;
    await Source.sourceValidation(req.body);

    const source = await Source.create({
      name,
      description,
      stock,
    });

    if (source) {
      return res.status(201).json({
        success: true,
      });
    } else {
      return res.status(400).json({ msg: "invalid set source" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update source data
// @route   PUT  /API/v1/manage/update-source
// @access  public
exports.handleUpdateSource = async (req, res) => {
  try {
    const { name, description, stock, _id } = req.body;

    await Source.sourceValidation({
      name,
      description,
      stock,
    });

    const update = await Source.updateOne(
      { _id },
      { name, description, stock }
    );
    // or $inc

    if (update) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ msg: "invalid set source" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete source data
// @route   DELETE  /API/v1/manage/delete-source
// @access  public
exports.handleDeleteSource = async (req, res) => {
  try {
    await Source.deleteOne({ _id: req.body._id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
