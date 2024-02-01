import React, { useState } from "react";
import Form1 from "./Form1";
import Form2 from "./Form2";

const FormHeader = () => {
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  return (
    <div>
      <div className="flex items-center justify-center mb-6 mt-11">
        <div
          onClick={() => handleStepClick(1)}
          className={`rounded-full border ${
            activeStep === 1
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 text-gray-300"
          } w-8 h-8 flex items-center justify-center font-bold mr-5 cursor-pointer`}
        >
          1
        </div>
        <div
          onClick={() => handleStepClick(2)}
          className={`rounded-full border ${
            activeStep === 2
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 text-gray-300"
          } w-8 h-8 flex items-center justify-center font-bold cursor-pointer`}
        >
          2
        </div>
      </div>

      {activeStep === 1 && <Form1 onNextStep={handleNextStep} />}
      {activeStep === 2 && <Form2 />}
    </div>
  );
};

export default FormHeader;
