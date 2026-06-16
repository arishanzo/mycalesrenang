import { CheckCircle } from "lucide-react";
import React from "react";

 const STEPS = [
    { num: 1, label: 'Biodata' },
    { num: 2, label: 'Layanan' },
     { num: 3, label: 'Invoice' },
    { num: 4, label: 'Bukti Bayar' },
    { num: 5, label: 'Selesai' },
  ];

const StepPemesanan = ({ currentStep }: { currentStep: number }) => {

    return (
        <>
        <div className="relative mb-12 max-w-7xl mx-auto px-4 mt-6">
            {/* Background progress route wire */}
            <div className="absolute top-5 left-12 right-12 h-1 bg-marine-100 rounded-full" />
            
            {/* Realtime color filled track width indicator */}
            <div 
              className="absolute top-5 left-12 h-1 bg-gradient-to-r from-marine-800 to-cyan-500 rounded-full transition-all duration-500" 
              style={{ 
                width: `${Math.min(100, Math.max(0, ((currentStep - 1) / 5) * 100))}%`,
                right: '3rem'
              }} 
            />

            <div className="grid grid-cols-5 items-center justify-between">
              {STEPS.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2 select-none relative z-10 ${
                    currentStep === step.num
                      ? 'border-marine-800 bg-marine-800 text-white ring-4 ring-marine-100 font-bold scale-110'
                      : currentStep > step.num
                        ? 'border-cyan-500 bg-cyan-500 text-white font-bold'
                        : 'border-marine-250 bg-white text-marine-600 font-normal'
                  }`}>
                    {currentStep > step.num ? (
                      <CheckCircle className="h-5 w-5 fill-cyan-500 stroke-white shrink-0" />
                    ) : (
                      step.num
                    )}
                  </div>
                  <span
                  className={`mt-2 text-[10px] sm:text-xs font-semibold tracking-wide text-center whitespace-nowrap px-1 ${
                    currentStep === step.num
                      ? 'text-marine-950 font-bold'
                      : 'text-marine-650 font-medium'
                  }`}
                >
                  {step.label}
                </span>
                </div>
              ))}
            </div>
          </div>
   </>
  );
};

export default StepPemesanan;