const Debtor = require("./../models/Debtor");

// @desc    get debtor data
// @route   GET  /API/v1/manage/get-debtor
// @access  protect with token
exports.handleGetDebtor = async (req, res) => {
  try {
    const debtorData = await Debtor.find({ userId: req.userId });
    const requiredData = debtorData.map((debtor) => {
      return {
        id: debtor._id,
        who: debtor.who,
        amount: debtor.amount,
        sourcePayment: debtor.sourcePayment,
        description: debtor.description,
        createdAt: debtor.createdAt,
        datePaid: debtor.datePaid,
      };
    });
    return res.status(200).json({ data: requiredData });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    set debtor data
// @route   POST  /API/v1/manage/set-debtor
// @access  protect with token
exports.handleSetDebtor = async (req, res) => {
  try {
    const { who, amount, paid, sourcePayment, datePaid, description } =
      req.body;
    await Debtor.debtorValidation({ who, amount });

    Debtor.create(
      {
        who,
        amount,
        paid,
        sourcePayment,
        datePaid,
        description,
        userId: req.userId,
      },
      (err, _) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "error in request", success: false, error: err });
        }
        return res.status(201).json({
          success: true,
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    update debtor data
// @route   PUT  /API/v1/manage/update-debtor
// @access  protect with token
exports.handleUpdateDebtor = async (req, res) => {
  try {
    const { who, amount, paid, sourcePayment, datePaid, description, _id } =
      req.body;

    await Debtor.debtorValidation({ who, amount });

    Debtor.updateOne(
      { _id: _id, userId: req.userId },
      { $set: { who, amount, paid, sourcePayment, datePaid, description } },
      null,
      (err, docs) => {
        if (err) {
          return res.status(400, {
            msg: "error in request",
            success: false,
            error: err,
          });
        }
        return res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "There Is A Problem Of Side Server", error: error });
  }
};

// @desc    delete debtor data
// @route   DELETE  /API/v1/manage/delete-debtor
// @access  protect with token
exports.handleDeleteDebtor = async (req, res) => {
  try {
    Debtor.findOneAndDelete(
      { _id: req.body._id, userId: req.userId },
      null,
      (err) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "error in request", success: false, error: err });
        }
        return res.status(200).json({ success: true });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "There Is A Problem Of Side Server", error });
  }
};
