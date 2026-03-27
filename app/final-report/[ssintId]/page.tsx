"use client";
import { useState } from "react";
import Header from "./components/Header";
import CardDetails from "./components/CardDetails";
import CenteringDetails from "./components/CenteringDetails";
import DamageBreakDown from "./components/DamageBreakDown";
import GradeCalculationsModal from "./components/GradeCalculationsModal";
import { Calculator } from "lucide-react";

export default function GradingForm() {
  const [showCalcModal, setShowCalcModal] = useState(false);

  return (
    <div>
      <div>
        <div className="mx-auto p-6 space-y-8">
          {/* Header */}

          <Header />

          {/* Card Details Section */}
          <CardDetails />

          {/* Grade Breakdown Section */}
          <CenteringDetails />

          {/* Damage Analysis Section */}
          <DamageBreakDown />

          {/* View Grade Calculations Button */}
          <div className="flex justify-center pt-4 pb-8">
            <button
              onClick={() => setShowCalcModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Calculator className="w-5 h-5" />
              View Grade Calculations
            </button>
          </div>
        </div>
      </div>

      {/* Grade Calculations Modal */}
      <GradeCalculationsModal
        isOpen={showCalcModal}
        onClose={() => setShowCalcModal(false)}
      />
    </div>
  );
}
