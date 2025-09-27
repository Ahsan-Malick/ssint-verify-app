"use client";
import Header from "./components/Header";
import CardDetails from "./components/CardDetails";
import CenteringDetails from "./components/CenteringDetails";
import DamageBreakDown from "./components/DamageBreakDown";

export default function GradingForm() {
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
        </div>
      </div>
    </div>
  );
}
