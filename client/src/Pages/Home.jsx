import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import axios from "../utils/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "../actions/userActions.js";
import { useDispatch } from "react-redux";

const Home = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
  try {
    const response = await axios.post("http://localhost:4000/saveDetails", {
      
      reduxData: userData,
    });
    
    if(response.status===200){
      toast.success("saved User Informations");
      dispatch(clearUserData());
    }
  navigate('/')
  } catch (error) {
    console.error("Error saving data to backend:", error);
  }
}
  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-10 p-8 bg-white shadow-md max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Saved Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Name:</label>
          <input type="text" value={`${userData.title} ${userData.name}`} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input type="text" value={userData.email} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Mobile Number:</label>
          <input type="text" value={userData.number} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Current Address:</label>
          <input type="text" value={userData.address} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">How Long Lived in this Address (Years):</label>
          <input type="text" value={userData.year} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Date of Birth:</label>
          <input type="text" value={userData.dob} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Savings:</label>
          <input type="text" value={userData.savings} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Status:</label>
          <input type="text" value={userData.employmentStatus} disabled className="form-input" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">About:</label>
          <textarea value={userData.about} disabled className="form-input resize-none" />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save & Continue
        </button>
      </form>
    </div></>
  );
};

export default Home;
