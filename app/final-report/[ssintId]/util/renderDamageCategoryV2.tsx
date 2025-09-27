import { Badge } from "../../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "../../../../components/ui/card";

import { GradingData } from "../layout";

import getGradeColor from "./getGradeColor";
import getSeverityLabel from "./getSeverityLabel";
import getSeverityColor from "./getSeverityColor";

const severities = [
  "minorDamages",
  "majorDamages",
  "majorPlusDamages",
] as const;

type SeverityKey = (typeof severities)[number];

const renderDamageCategoryV2 = (
  category: "corner" | "edges" | "surface", //corner, edges, or surface
  dataFront: GradingData["corner"],
  dataBack: GradingData["corner"],
  gradeFront?: number,
  gradeBack?: number
) => {
  return (
    <Card className="overflow-hidden shadow-sm border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100 pb-4">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <span className="text-xl font-semibold capitalize text-gray-800">
              {category}
            </span>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Front
              </div>
              <Badge
                className={`${getGradeColor(
                  gradeFront as number
                )} font-semibold px-3 py-1 text-lg`}
              >
                {gradeFront}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Back
              </div>
              <Badge
                className={`${getGradeColor(
                  gradeBack as number
                )} font-semibold px-3 py-1 text-lg`}
              >
                {gradeBack}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Front Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h4 className="text-lg font-semibold text-gray-800">
                Front Side
              </h4>
            </div>

            <div className="space-y-3">
              {severities.map((severity: SeverityKey) => (
                <div
                  key={severity}
                  className={`p-4 rounded-lg border ${getSeverityColor(
                    severity
                  )} border-gray-50 shadow-sm border-opacity-20`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {getSeverityLabel(severity)} Defects
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {dataFront[severity]}
                      </span>
                      <span className="text-sm text-gray-500">defects</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Back Side */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="text-lg font-semibold text-gray-800">Back Side</h4>
            </div>

            <div className="space-y-3">
              {severities.map((severity: SeverityKey, index) => (
                <div
                  key={severity}
                  className={`p-4 rounded-lg border ${getSeverityColor(
                    severity
                  )} border-gray-50 shadow-sm border-opacity-20`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {getSeverityLabel(severity)} Defects
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {dataBack[severity]}
                      </span>
                      <span className="text-sm text-gray-500">defects</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default renderDamageCategoryV2;
