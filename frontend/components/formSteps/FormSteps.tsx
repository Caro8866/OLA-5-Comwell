import React from "react";

interface FormStepProps {
  nextStep: () => void;
  prevStep?: () => void;
}

export const FormStep1: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep1</h1>
    </div>
  );
};

export const FormStep2: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep2</h1>
    </div>
  );
};

export const FormStep3: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep3</h1>
    </div>
  );
};

export const FormStep4: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep4</h1>
    </div>
  );
};

export const FormStep5: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep5</h1>
    </div>
  );
};

export const FormStep6: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep6</h1>
    </div>
  );
};

export const FormStep7: React.FC<FormStepProps> = ({ nextStep, prevStep }) => {
  return (
    <div>
      <h1>FormStep7</h1>
    </div>
  );
};
