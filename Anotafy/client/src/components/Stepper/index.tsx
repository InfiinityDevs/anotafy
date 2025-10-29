interface StepperProps {
  totalSteps: number;
  currentStep: number;
  primaryColor?: "blue" | "green" | "red" | "purple" | "orange" | "indigo";
  className?: string;
}

export default function Stepper({ 
  totalSteps, 
  currentStep, 
  primaryColor = "blue", 
  className = "" 
}: StepperProps) {
  
  const colorClasses = {
    blue: {
      active: "bg-blue-500 border-blue-500",
      pulse: "bg-blue-500",
      text: "text-blue-500"
    },
    green: {
      active: "bg-green-500 border-green-500", 
      pulse: "bg-green-500",
      text: "text-green-500"
    },
    red: {
      active: "bg-red-500 border-red-500",
      pulse: "bg-red-500", 
      text: "text-red-500"
    },
    purple: {
      active: "bg-purple-500 border-purple-500",
      pulse: "bg-purple-500",
      text: "text-purple-500"
    },
    orange: {
      active: "bg-orange-500 border-orange-500",
      pulse: "bg-orange-500",
      text: "text-orange-500"
    },
    indigo: {
      active: "bg-indigo-500 border-indigo-500",
      pulse: "bg-indigo-500",
      text: "text-indigo-500"
    }
  };

  const colors = colorClasses[primaryColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className={`w-full h-min ${className}`}>
      <div className="flex flex-row items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;
          const isCurrent = index === currentStep - 1;

          return (
            <>
              {/* Linha */}
              <div
                className={`w-full h-1 transition-all duration-500 ${
                  isActive
                    ? colors.active
                    : "bg-gray-300"
                }`}
              />

              {/* Ponto com pulso */}
              <div className="relative">
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? colors.active
                      : "bg-gray-200 border-gray-300"
                  } shrink-0 z-10 relative`}
                />
                {isCurrent && (
                  <div className={`absolute inset-0 w-5 h-5 rounded-full ${colors.pulse} animate-ping opacity-75`} />
                )}
              </div>
            </>
          );
        })}

        {/* Linha final */}
        <div
          className={`w-full h-1 transition-all duration-500 ${
            currentStep === totalSteps
              ? colors.active
              : "bg-gray-300"
          }`}
        />
      </div>
    </div>
  );
}