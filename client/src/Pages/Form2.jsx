import React, { useState } from "react";
import axios from "../utils/axios.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { saveFinancialDetails } from "../actions/userActions.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Form2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [savings, setSavings] = useState("");

  const [employmentStatus, setEmploymentStatus] = useState("");
  const userData = useSelector((state) => state.user);
  console.log(userData, "................................");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      saveFinancialDetails({
        savings: savings,
        employmentStatus: employmentStatus,
      })
    );
    navigate('/home')
   
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
        Financial information
      </h1>
      <h3 className="text-gray-600 text-sm mb-8 text-center">
        All your information is stored securely.{" "}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
            className="border bg-white border-gray-300 rounded-md p-4 w-full text-sm text-gray-500 "
            required
          >
            <option value="" disabled>
              What is your current employment status?
            </option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="selfEmployed">Self-Employed</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            id="savings"
            name="savings"
            value={savings}
            onChange={(e) => setSavings(e.target.value)}
            className="border  border-gray-300 rounded-md p-4 w-full text-sm  "
            required
            placeholder="Additional savings/investments"
          />
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

export default Form2;
