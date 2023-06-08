const registerProgressBarHelper = (step, currentStep) => {
  if (step <= currentStep) {
    return true;
  }
  return false;
};

export default registerProgressBarHelper;
