import { BookingFormProvider } from "@/context/BookingFormContext";
import React, { useEffect, useState } from "react";
import { FormStep1, FormStep2, FormStep3, FormStep4, FormStep5, FormStep6, FormStep7 } from "../formSteps/FormSteps";

function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormStep1 nextStep={nextStep} />;
      case 2:
        return <FormStep2 nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <FormStep3 nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <FormStep4 nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <FormStep5 nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <FormStep6 nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <FormStep7 nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <FormStep1 nextStep={nextStep} />;
    }
  };

  useEffect(() => {
    console.log(`Current form step: ${currentStep}`);
  }, [currentStep]);

  return <BookingFormProvider>{renderStep()}</BookingFormProvider>;
}

export default BookingForm;
