import  { useState } from 'react';
import { Steps } from 'antd';
import {
  AccountForm,
  AddressForm,
  PersonalForm
} from '../../components';

const { Step } = Steps;

const FormPage = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  }

  return (
    <>
      <Steps current={step - 1} size="small">
        <Step title="Personal Information" />
        <Step title="Address Information" />
        <Step title="Account Information" />
      </Steps>

      {step === 1 && (
        <PersonalForm onNext={handleNext} />
      )}

      {step === 2 && (
        <AddressForm onNext={handleNext} onPrev={handlePrev} />
      )}

      {step === 3 && (
        <AccountForm onPrev={handlePrev} />
      )}


    </>
  )
}

export default FormPage;
