
import renderDamageCategoryV2 from "../util/renderDamageCategoryV2";
import { useTradingCard } from "../context/TradingCardContext";

export interface GradingData {
  corner: {
    numberOfDamages: number;
    majorDamages: number;
    minorDamages: number;
    majorPlusDamages: number;
  };
  surface: {
    numberOfDamages: number;
    majorDamages: number;
    minorDamages: number;
    majorPlusDamages: number;
  };
  edges: {
    numberOfDamages: number;
    majorDamages: number;
    minorDamages: number;
    majorPlusDamages: number;
  };
  centering: number;
  centeringRatio: {
    front: string; // e.g. "55/45"
    back: string; // e.g. "60/40"
  };
}

export default function DamageBreakDown() {
  const defaultDamageDetail = {
    numberOfDamages: 0,
    majorDamages: 0,
    minorDamages: 0,
    majorPlusDamages: 0,
  };

  const { gradedTradingCard } = useTradingCard();

  const damageCategories: Array<{
    key: "corner" | "edges" | "surface";
    dataFront: GradingData["corner"];
    dataBack: GradingData["corner"];
    gradeFront: number;
    gradeBack: number;
  }> = [
    {
      key: "corner",
      dataFront:
        gradedTradingCard?.grading_data_front.damage_details.corner ??
        defaultDamageDetail,
      dataBack:
        gradedTradingCard?.grading_data_back.damage_details.corner ??
        defaultDamageDetail,
      gradeFront:
        gradedTradingCard?.grading_data_front.grading_result?.breakdown
          .corner ?? 0,
      gradeBack:
        gradedTradingCard?.grading_data_back.grading_result?.breakdown.corner ??
        0,
    },
    {
      key: "edges",
      dataFront:
        gradedTradingCard?.grading_data_front.damage_details.edges ??
        defaultDamageDetail,
      dataBack:
        gradedTradingCard?.grading_data_back.damage_details.edges ??
        defaultDamageDetail,
      gradeFront:
        gradedTradingCard?.grading_data_front.grading_result?.breakdown.edges ??
        0,
      gradeBack:
        gradedTradingCard?.grading_data_back.grading_result?.breakdown.edges ??
        0,
    },
    {
      key: "surface",
      dataFront:
        gradedTradingCard?.grading_data_front.damage_details.surface ??
        defaultDamageDetail,
      dataBack:
        gradedTradingCard?.grading_data_back.damage_details.surface ??
        defaultDamageDetail,
      gradeFront:
        gradedTradingCard?.grading_data_front.grading_result?.breakdown
          .surface ?? 0,
      gradeBack:
        gradedTradingCard?.grading_data_back.grading_result?.breakdown
          .surface ?? 0,
    },
  ];

  return (
    <div className="space-y-6">
       <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Damage Analysis by Category</h2>
            <p className="text-gray-600">Defect counts for front and back sides of the card</p>
          </div>

   

           {damageCategories.map(
        ({ key, dataFront, dataBack, gradeFront, gradeBack }, index) => (
          <div key={index}>
            {renderDamageCategoryV2(
              key,
              dataFront,
              dataBack,
              gradeFront,
              gradeBack
             
            )}
          </div>
        )
      )}
    </div>
  );
}
