import userModel from "../models/userModel.js";

export const checkUniqueness = async (req, res) => {
  const { email, number } = req.body;
  console.log(req.body);
  try {
    let validEmail = true;
    let message = "";
    let validPhoneNumber = true;
    const existingEmailUser = await userModel.findOne({ email: email });
    if (existingEmailUser) {
      validEmail = false;
      message += "Email Already exists";
    }

    const existingNumberUser = await userModel.findOne({ number: number });
    if (existingNumberUser) {
      validPhoneNumber = false;
      if (!message) {
        message += "Phone number Already exists";
      } else {
        message = "Email & Phone number Already exists";
      }
    }

    res.status(200).json({ validEmail, validPhoneNumber, message });
  } catch (error) {
    console.error("Error during uniqueness check:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handlesaveDetails = async (req, res) => {
  const {  reduxData } = req.body;
  try {
    const user = new userModel({
      email: reduxData.email,
      password: reduxData.password,
      number: reduxData.number,
      name: reduxData.name,
      dob: reduxData.dob,
      address: reduxData.address,
      title: reduxData.title,
      year: reduxData.year,
      about: reduxData.about,
      employmentStatus:reduxData.employmentStatus,
      savings: reduxData.savings,
    });

    await user.save();

    console.log("User saved to the database:", user);

    res.status(200).json({ message: "Data received and saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
