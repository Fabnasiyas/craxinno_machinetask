import React, { useEffect } from "react";
import axios from "../utils/axios.js";
import logo1 from "../assets/graxinno.png";
import { FaRegQuestionCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <nav class="border py-4 px-16 flex justify-between items-center">
        <img src={logo1} alt="Left Image" class="h-14 w-48" />

        <span className=" text-2xl mr-8">
          <FaRegQuestionCircle />
        </span>
      </nav>
    </div>
  );
};

export default Navbar;
