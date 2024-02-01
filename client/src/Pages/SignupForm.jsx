import React, { useState } from "react";
import axios from "../utils/axios.js";
import { useDispatch } from "react-redux";
import { saveEmailPassword } from "../actions/userActions.js";
import {
  AiFillInfoCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhoneNumber = () => {
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const validatePassword = () => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one uppercase letter and one number"
      );
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handling form submission...");
    validateEmail();
    validatePhoneNumber();
    validatePassword();
    validateConfirmPassword();

    if (!emailError && !phoneError && !passwordError && !confirmPasswordError) {
      try {
        const response = await axios.post(
          "http://localhost:4000/checkUniqueness",
          {
            email: email,
            number: phoneNumber,
          }
        );
        console.log("Handling form submission...");

        console.log("Response...................", response);
        if (!response.data.validEmail || !response.data.validPhoneNumber) {
          console.log("About to show toast error");
          toast.error(response.data.message);
        } else {
          dispatch(
            saveEmailPassword({
              email: email,
              password: confirmPassword,
              number: phoneNumber,
            })
          );
          navigate("/register");
        }
      } catch (error) {
        console.error("Error saving data to backend:", error);
      }
    } else {
      console.log("Form contains errors. Please fix them.");
    }
  };

  return (
    <div className="font-modern-era">
      <section className="mt-10 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
            Create your account
          </h1>
          <h3 className="text-gray-600 text-sm mb-8 text-center">
            Set up your RentlyPass in as little as 2 minutes.
          </h3>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Contact details
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  emailError ? "border-red-500" : ""
                }`}
                placeholder="name@company.com"
                required=""
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="number"
                id="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={validatePhoneNumber}
                placeholder="mobile number"
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                  phoneError ? "border-red-500" : ""
                }`}
                required=""
              />
              {phoneError && (
                <p className="text-red-500 text-xs mt-1">{phoneError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Set a password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  placeholder="create password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  required=""
                />
                <div
                  className="absolute top-3 right-2 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="text-gray-400" />
                  ) : (
                    <AiFillEye className="text-gray-400" />
                  )}
                </div>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={validateConfirmPassword}
                  placeholder="confirm password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                  required=""
                />
                <div
                  className="absolute top-3 right-2 cursor-pointer"
                  onClick={handleToggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible className="text-gray-400" />
                  ) : (
                    <AiFillEye className="text-gray-400" />
                  )}
                </div>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-xs mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <AiFillInfoCircle className="text-gray-400" />
              </div>
              <div className="ml-2 text-xs">
                <label htmlFor="terms" className="text-gray-400 font-medium">
                  We need a password to keep your information safe. But don’t
                  worry, we’ll also send your custom RentlyPass URL via email.
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create your account
            </button>
            <p className="text-xs font-medium text-gray-400">
              By clicking ‘Create your account’, you are agreeing to our{" "}
              <u>Terms & Conditions</u> and <u>Privacy Policy</u>.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupForm;
