import { CheckCircle } from "lucide-react";
import React from "react";

 const STEPS = [
    { num: 1, label: 'Biodata' },
    { num: 2, label: 'Layanan & Jadwal' },
    { num: 3, label: 'Bukti Bayar' },
    { num: 4, label: 'Status' },
  ];

const StepPemesanan = ({ currentStep }: { currentStep: number }) => {

    return (
        <>
          {STEPS.map((step) => (
            <React.Fragment key={step.num}>
              <div className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  currentStep === step.num
                    ? 'bg-marine-800 text-white ring-4 ring-marine-100 scale-110'
                    : currentStep > step.num
                      ? 'bg-cyan-500 text-white'
                      : 'bg-marine-100 text-marine-600'
                }`}>
                  {currentStep > step.num ? <CheckCircle className="h-5 w-5 fill-cyan-600 stroke-white" /> : step.num}
                </div>
                <span className="text-[10px] font-medium text-marine-800 mt-2 tracking-wide text-center leading-tight max-w-[60px]">
                  {step.label}
                </span>
              </div>
              {step.num < 4 && (
                <div className={`h-0.5 flex-1 mx-1 -mt-5 rounded transition-colors duration-300 ${
                  currentStep > step.num ? 'bg-cyan-500' : 'bg-marine-100'
                }`} />
              )}
            </React.Fragment>
          ))}
        </>
    )
}

export default StepPemesanan;