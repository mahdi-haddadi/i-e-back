const Debtor = require("./../models/Debtor");

// @desc    get debtor data
// @route   GET  /API/v1/manage/get-debtor
// @access  public
exports.handleGetDebtor = async (req, res) => {
  try {
    const debtorData = await Debtor.find({});
    return res.status(200).json({ data: debtorData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set debtor data
// @route   POST  /API/v1/manage/set-debtor
// @access  public
exports.handleSetDebtor = async (req, res) => {
  try {
    const { who, amount, paid, sourcePayment, datePaid, description } =
      req.body;
    await Debtor.debtorValidation({ who, amount });

    const expense = await Debtor.create({
      who,
      amount,
      paid,
      sourcePayment,
      datePaid,
      description,
    });

    if (expense) {
      return res.status(201).json({
        success: true,
      });
    } else {
      return res.status(400).json({ msg: "invalid set debtor" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update debtor data
// @route   PUT  /API/v1/manage/update-debtor
// @access  public
exports.handleUpdateDebtor = async (req, res) => {
  try {
    const { who, amount, paid, sourcePayment, datePaid, description, _id } =
      req.body;

    await Debtor.debtorValidation({ who, amount });

    const update = await Debtor.updateOne(
      { _id },
      { who, amount, paid, sourcePayment, datePaid, description }
    );
    // or $inc

    if (update) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ msg: "invalid set debtor" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete debtor data
// @route   DELETE  /API/v1/manage/delete-debtor
// @access  public
exports.handleDeleteDebtor = async (req, res) => {
  try {
    await Debtor.deleteOne({ _id: req.body._id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
