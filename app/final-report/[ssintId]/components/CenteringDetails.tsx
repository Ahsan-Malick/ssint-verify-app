import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import getGradeColor from "../util/getGradeColor";
import { useTradingCard } from "../context/TradingCardContext";


export default function CenteringDetails() {
  const { gradedTradingCard } = useTradingCard();

  const frontCenteringGrade =
    gradedTradingCard?.grading_data_front.damage_details.centering;
  const backCenteringGrade =
    gradedTradingCard?.grading_data_back.damage_details.centering;
  const finalCenteringGradeRaw =
    0.6 * (frontCenteringGrade ?? 0) + 0.4 * (backCenteringGrade ?? 0);
  const finalCenteringGrade = Math.round(finalCenteringGradeRaw * 2) / 2;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-2 border-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />

      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse shadow-lg" />
          Grade Breakdown - Centering Analysis
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Centering Ratios
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl border border-blue-200/50 hover:border-blue-300/70 transition-all duration-200 hover:shadow-md">
                <Label className="font-medium text-gray-700">Front Ratio</Label>
                <Input
                  type="text"
                  value={
                    gradedTradingCard?.grading_data_front.damage_details
                      .centeringRatio.front
                  }
                  className="w-24 bg-white/80 border-blue-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 font-mono text-center"
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl border border-blue-200/50 hover:border-blue-300/70 transition-all duration-200 hover:shadow-md">
                <Label className="font-medium text-gray-700">Back Ratio</Label>
                <Input
                  type="text"
                  value={
                    gradedTradingCard?.grading_data_back.damage_details
                      .centeringRatio.back
                  }
                  className="w-24 bg-white/80 border-blue-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-200/50 font-mono text-center"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              Centering Grade
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-xl border border-purple-200/50 hover:border-purple-300/70 transition-all duration-200 hover:shadow-md">
                <Label className="font-medium text-gray-700">Front Grade</Label>
                <Input
                  type="text"
                  value={
                    gradedTradingCard?.grading_data_front.damage_details
                      .centering
                  }
                  className="w-24 bg-white/80 border-purple-200/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50 font-mono text-center font-bold"
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-xl border border-purple-200/50 hover:border-purple-300/70 transition-all duration-200 hover:shadow-md">
                <Label className="font-medium text-gray-700">Back Grade</Label>
                <Input
                  type="text"
                  value={
                    gradedTradingCard?.grading_data_back.damage_details
                      .centering
                  }
                  className="w-24 bg-white/80 border-purple-200/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/50 font-mono text-center font-bold"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-8">
          <div className="text-center p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl border-2 border-blue-200/30 shadow-lg">
            <div className="mb-2 text-sm font-medium text-gray-600 uppercase tracking-wide">
              AI Analysis Result
            </div>
            <Badge
              className={`text-xl px-6 py-3 font-bold bg-gradient-to-r from-white to-gray-50 text-gray-800 border-2 hover:scale-105 transition-transform duration-200 ${getGradeColor(
                finalCenteringGrade
              )}`}
            >
              Overall Centering Grade: {finalCenteringGrade}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
