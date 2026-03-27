"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { useTradingCard } from "../context/TradingCardContext";

interface GradeCalculationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GradeCalculationsModal({
  isOpen,
  onClose,
}: GradeCalculationsModalProps) {
  const { gradedTradingCard } = useTradingCard();
  const [showTwoPerfectRule, setShowTwoPerfectRule] = useState(false);

  if (!isOpen || !gradedTradingCard) return null;

  const frontBreakdown =
    gradedTradingCard.grading_data_front.grading_result.breakdown;
  const backBreakdown =
    gradedTradingCard.grading_data_back.grading_result.breakdown;

  // Front Grade
  const frontGradeRaw =
    (frontBreakdown.corner +
      frontBreakdown.edge +
      frontBreakdown.surface +
      frontBreakdown.centering) /
    4;
  const frontGrade =
    gradedTradingCard.grading_data_front.grading_result.finalGrade;

  // Back Grade
  const backGradeRaw =
    (backBreakdown.corner +
      backBreakdown.edge +
      backBreakdown.surface +
      backBreakdown.centering) /
    4;
  const backGrade =
    gradedTradingCard.grading_data_back.grading_result.finalGrade;

  // Final Grade
  const finalGradeRaw = 0.6 * frontGrade + 0.4 * backGrade;
  let finalGrade: number;

  if (finalGradeRaw > 9.5 && finalGradeRaw < 10) {
    finalGrade = 9.5;
  } else {
    finalGrade = Math.round(finalGradeRaw * 2) / 2;
  }

  // Check for .75 adjustment
  const rawRounded = Math.round(finalGradeRaw * 100) / 100;
  const hasPointSevenFive = (rawRounded * 100) % 100 === 75;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Grade Calculations
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-6">
          {/* Step 1: Front Grade */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-800">
                Front Grade
              </h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Corners</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {frontBreakdown.corner}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Edges</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {frontBreakdown.edge}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Surface</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {frontBreakdown.surface}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Centering</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {frontBreakdown.centering}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-2">
                <div className="text-sm text-gray-500 text-center">
                  ({frontBreakdown.corner} + {frontBreakdown.edge} +{" "}
                  {frontBreakdown.surface} + {frontBreakdown.centering}) ÷ 4
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-gray-400">=</span>
                  <span className="font-mono text-lg font-bold text-blue-600">
                    {frontGradeRaw.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    Final: {frontGrade}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Step 2: Back Grade */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-800">
                Back Grade
              </h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Corners</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {backBreakdown.corner}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Edges</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {backBreakdown.edge}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Surface</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {backBreakdown.surface}
                  </span>
                </div>
                <div className="flex justify-between items-center px-3 py-2 bg-white rounded-lg">
                  <span className="text-gray-500">Centering</span>
                  <span className="font-mono font-semibold text-gray-800">
                    {backBreakdown.centering}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-2">
                <div className="text-sm text-gray-500 text-center">
                  ({backBreakdown.corner} + {backBreakdown.edge} +{" "}
                  {backBreakdown.surface} + {backBreakdown.centering}) ÷ 4
                </div>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-gray-400">=</span>
                  <span className="font-mono text-lg font-bold text-purple-600">
                    {backGradeRaw.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    Final: {backGrade}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Step 3: Final Grade */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-800">
                Final Grade
              </h3>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 space-y-3">
              {/* Formula */}
              <div className="text-sm text-gray-600 text-center space-y-1">
                <div>
                  (0.6 × <span className="font-semibold text-blue-600">{frontGrade}</span>)
                  {" + "}
                  (0.4 × <span className="font-semibold text-purple-600">{backGrade}</span>)
                </div>
                <div className="text-gray-400">
                  = (
                  <span className="font-mono">{(0.6 * frontGrade).toFixed(2)}</span>)
                  {" + "}
                  (<span className="font-mono">{(0.4 * backGrade).toFixed(2)}</span>)
                </div>
                <div className="text-gray-400">
                  = <span className="font-mono font-semibold text-gray-700">{finalGradeRaw.toFixed(2)}</span>
                </div>
              </div>

              {/* .75 adjustment note */}
              {hasPointSevenFive && (
                <div className="text-xs text-center bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-3 py-2">
                  ⚠️ Grade ending in .75 is adjusted to .50
                  <br />
                  <span className="font-mono">
                    {finalGradeRaw.toFixed(2)} → {finalGrade.toFixed(1)}
                  </span>
                </div>
              )}

              {/* Final result */}
              <div className="flex flex-col items-center gap-1 pt-2 border-t border-gray-200/60">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Final Grade
                </span>
                <span className="font-mono text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {finalGrade.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200" />

          {/* Two-Perfect Rule — Collapsible */}
          <div>
            <button
              onClick={() => setShowTwoPerfectRule(!showTwoPerfectRule)}
              className="w-full flex items-center justify-between gap-2 py-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 text-xs font-bold">
                  ℹ
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  Two-Perfect Rule
                </span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  Legacy
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showTwoPerfectRule ? "rotate-180" : ""
                }`}
              />
            </button>

            {showTwoPerfectRule && (
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 text-sm text-gray-600 space-y-3 mt-2">
                <p>
                  In earlier versions of our grading system, we used the{" "}
                  <span className="font-semibold text-gray-700">Two-Perfect Rule</span>{" "}
                  to ensure that cards with minor flaws were not
                  over-graded. Some cards in our database may still reflect
                  grades calculated under this rule.
                </p>

                <p>
                  <span className="font-semibold text-gray-700">How it worked:</span>{" "}
                  If exactly two out of three areas (Corners, Edges, Surface)
                  scored a perfect{" "}
                  <span className="font-mono font-semibold">10</span>, the grade
                  for that side was set to the score of the third area — rather
                  than averaging everything together.
                </p>

                <div className="bg-white/70 rounded-lg p-3 space-y-1">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Example
                  </div>
                  <div className="text-sm text-gray-600">
                    Corners:{" "}
                    <span className="font-mono font-semibold">10</span>,
                    Edges:{" "}
                    <span className="font-mono font-semibold">10</span>,
                    Surface:{" "}
                    <span className="font-mono font-semibold">9</span>,
                    Centering:{" "}
                    <span className="font-mono font-semibold">10</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Average would be{" "}
                    <span className="font-mono">9.75</span> → rounds to{" "}
                    <span className="font-mono">10</span>, but the card has a
                    visible flaw. So the grade for this side ={" "}
                    <span className="font-mono font-semibold text-amber-700">9</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  This rule helped ensure robust and honest grading by
                  preventing near-perfect cards from receiving a perfect score.
                  We have since moved to improved calculation methods for
                  greater accuracy, but the Two-Perfect Rule remains a
                  reflection of our commitment to fair grading. We are always
                  working to refine our techniques so that every grade you
                  receive is one you can trust.
                </p>
              </div>
            )}
          </div>

          {/* Explanation footer */}
          <div className="text-xs text-gray-400 text-center leading-relaxed pt-2">
            The front side contributes 60% and the back side contributes 40% to
            the overall grade. If the final grade ends with 9.75 it is adjusted to 9.5 instead of 10, for more fair grading. Each side is graded on Corners, Edges, Surface &amp;
            Centering.
          </div>
        </div>
      </div>
    </div>
  );
}
