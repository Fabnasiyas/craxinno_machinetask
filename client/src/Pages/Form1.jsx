import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { savePersonalDetails } from "../actions/userActions.js";
import { useNavigate } from "react-router-dom";

const Form1 = ({ onNextStep }) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  console.log(userData);
  const [title, setTitle] = useState("Mr");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [year, setYears] = useState("");
  const [about, setAbout] = useState("");
  const [dob, setDob] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const getMaxDate = () => {
    const currentDate = new Date();
    const maxDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    return maxDate.toISOString().split("T")[0];
  };

  const validateDateOfBirth = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    if (isNaN(age) || age < 18) {
      return "You must be at least 18 years old.";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!dob) {
      errors.dob = "Date of Birth is required";
    } else {
      const dobError = validateDateOfBirth(dob);
      if (dobError) {
        errors.dob = dobError;
      }
    }
    if (!year.trim()) {
      errors.year = "Years is required";
    }
    if (!about.trim()) {
      errors.about = "About yourself is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(
      savePersonalDetails({
        title: title,
        name: name,
        address: address,
        year: year,
        dob: setFormattedDate(dob),
        about: about,
      })
    );
    setFormErrors({});
    onNextStep();
  };

  const setFormattedDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white ">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Personal information
      </h1>
      <h3 className="text-gray-600 text-sm mb-8 text-center">
        Please answer questions as accurately as possible.
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <select
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-4 text-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="Mr">Mr.</option>
              <option value="Mrs">Mrs.</option>
            </select>
          </div>
          <div className="flex-grow">
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Full Name as per your Passport"
              onChange={(e) => setName(e.target.value)}
              className={`border border-gray-300 rounded-md p-4 w-full text-sm focus:outline-none focus:ring focus:border-blue-500 ${
                formErrors.name ? "border-red-500" : ""
              }`}
              // required
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>
        </div>
        <div>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`border border-gray-300 rounded-md p-4 w-full text-sm focus:outline-none focus:ring focus:border-blue-500 ${
              formErrors.address ? "border-red-500" : ""
            }`}
            placeholder="current address"
          />
          {formErrors.address && (
            <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
          )}
        </div>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          max={getMaxDate()}
          onChange={(e) => setDob(e.target.value)}
          className={`border border-gray-300 rounded-md p-4 w-full text-sm focus:outline-none focus:ring focus:border-blue-500 ${
            formErrors.dob ? "border-red-500" : ""
          }`}
        />

        <div>
          <input
            type="number"
            id="year"
            name="year"
            value={year}
            onChange={(e) => setYears(e.target.value)}
            className={`border border-gray-300 rounded-md p-4 w-full text-sm focus:outline-none focus:ring focus:border-blue-500 ${
              formErrors.year ? "border-red-500" : ""
            }`}
            placeholder="How long have you lived at this address?"
          />
          {formErrors.year && (
            <p className="text-red-500 text-xs mt-1">{formErrors.year}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            id="about"
            name="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className={`border p-2 pb-20 border-gray-300 rounded-md  w-full text-sm focus:outline-none focus:ring focus:border-blue-500 ${
              formErrors.about ? "border-red-500" : ""
            }`}
            placeholder="Tell us a bit about yourself (what are you like as a person, do you have any hobbies, etc.)"
          />
          {formErrors.about && (
            <p className="text-red-500 text-xs mt-1">{formErrors.about}</p>
          )}
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <AiFillInfoCircle className="text-gray-400" />
          </div>
          <div className="ml-2 text-xs">
            <label htmlFor="terms" className="text-gray-400 font-medium">
              All information can be edited once you have created your <br />{" "}
              account.
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default Form1;
