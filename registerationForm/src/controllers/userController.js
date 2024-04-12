const { validationResult, check } = require("express-validator");
const User = require("../models/userModel");
const path = require("path");
const { sendEmailNotification } = require("./emailController");

const iranianPhoneNumberRegex = /^(?:\+98|0)?9\d{9}$/;

exports.validateRegistration = [
  check("email").optional().normalizeEmail(),
  check("nameAndLastName")
    .notEmpty()
    .withMessage("لطفا نام و نام خانوادگی را وارد کنید")
    .matches(/^[^0-9]+$/)
    .withMessage("نام و نام خانوادگی شامل اعداد نمی شوند")
    .isString(),
  check("phoneNumber").custom((value) => {
    if (!value) {
      throw new Error("لطفا شماره مبایل خود را وارد کنید");
    }
    if (!iranianPhoneNumberRegex.test(value)) {
      throw new Error("شماره شما صحیح نمی باشد");
    }
    return true;
  }),
];

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    email,
    phoneNumber,
    nameAndLastName,
    address,
    description,
    appointmentDate,
    appointmentType, // Add appointmentType here
  } = req.body;

  try {
    const newUser = new User({
      email,
      phoneNumber,
      nameAndLastName,
      address,
      description,
      appointmentDate,
      appointmentType, // Add appointmentType here
    });
    await newUser.save();
    await sendEmailNotification({
      phoneNumber,
      nameAndLastName,
      email,
      address,
      description,
      appointmentDate,
      appointmentType, // Add appointmentType here
    });
    res.sendFile(path.resolve(__dirname, "../../../success.html"));
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRegistrationPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../../index.html"));
};
