"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imageUrlToBase64 } from "../util/imageToBase64";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { useTradingCard } from "../context/TradingCardContext";
import { getGradeShadowColor } from "../util/getGradeColor";

export default function CardDetails() {
  const { gradedTradingCard } = useTradingCard();

  const frontGrade =
    gradedTradingCard?.grading_data_front.grading_result.finalGrade;
  const backGrade =
    gradedTradingCard?.grading_data_back.grading_result.finalGrade;

  const finalGradeRaw = 0.6 * (frontGrade ?? 0) + 0.4 * (backGrade ?? 0);
  const finalGrade = Math.round(finalGradeRaw * 2) / 2;

  const frontImageUrl = gradedTradingCard?.frontImageUrl;
  const backImageUrl = gradedTradingCard?.backImageUrl;
  console.log("Front Image URL:", frontImageUrl);
  

  const [frontBase64, setFrontBase64] = useState<string | null>(null);
  const [backBase64, setBackBase64] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // optional cleanup flag

    async function convertImages() {
      try {
        const front = await imageUrlToBase64(frontImageUrl);
        const back = await imageUrlToBase64(backImageUrl);
        if (isMounted) {
          setFrontBase64(front);
          setBackBase64(back);
        }
      } catch (err) {
        console.error("Failed to convert images to base64", err);
      }
    }

    // convertImages();

    return () => {
      isMounted = false; // cancel if component unmounts
    };
  }, [frontImageUrl, backImageUrl]);

  // if (!frontBase64 || !backBase64) return <p>Loading images...</p>;

  return (
    <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-transparent bg-gradient-to-r from-blue-100/50 via-white to-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Card Analysis Results
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card Images Upload */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Front Image
              </Label>
              <div className="relative aspect-[3/4] border-2 border-gradient-to-r from-blue-200 to-purple-200 rounded-xl overflow-hidden hover:from-blue-300 hover:to-purple-300 transition-all duration-300 shadow-md hover:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  // src={frontImageUrl || "/placeholder.svg"}
                  src="https://cloud.appwrite.io/v1/storage/buckets/6775a4990027d4965a7d/files/68ceb34700192d737a1f/view?project=67756cb000335c15693f"
                  alt="Card front"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Back Image
              </Label>
              <div className="relative aspect-[3/4] border-2 border-gradient-to-r from-purple-200 to-blue-200 rounded-xl overflow-hidden hover:from-purple-300 hover:to-blue-300 transition-all duration-300 shadow-md hover:shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src={backImageUrl || "/placeholder.svg"}
                  alt="Card back"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Card Details Form */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  SSINT ID
                </Label>
                <Input
                  value={gradedTradingCard?.ssint_id}
                  readOnly
                  placeholder="Enter card name"
                  className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Card Name
                </Label>
                <Input
                  value={
                    gradedTradingCard?.grading_data_front.card_details.cardName
                  }
                  readOnly
                  placeholder="Enter card name"
                  className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Card Number
                </Label>
                <Input
                  value={
                    gradedTradingCard?.grading_data_front.card_details
                      .cardNumber
                  }
                  readOnly
                  placeholder="Manufacturer"
                  className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Card Set
                </Label>
                <Input
                  value={
                    gradedTradingCard?.grading_data_front.card_details.cardSet
                  }
                  readOnly
                  placeholder="Set name"
                  className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Card Year
                </Label>
                <Input
                  value={
                    gradedTradingCard?.grading_data_front.card_details.cardYear
                  }
                  readOnly
                  placeholder="#123"
                  className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
                      {gradedTradingCard?.grading_data_front.card_details.type1 && (
                <div className="mt-1">
                  <Label>Detail 1</Label>
                  <Input
                    value={
                      gradedTradingCard?.grading_data_front.card_details.type1
                    }
                    readOnly
                    placeholder="Player name"
                  />
                </div>
              )}

              {gradedTradingCard?.grading_data_front.card_details.type2 && (
                <div className="mt-1">
                  <Label>Detail 2</Label>
                  <Input
                    value={
                      gradedTradingCard?.grading_data_front.card_details.type2
                    }
                    readOnly
                    placeholder="Player name"
                  />
                </div>
              )}
                {gradedTradingCard?.grading_data_front.card_details.type3 && (
                <div className="mt-1">
                  <Label>Detail 2</Label>
                  <Input
                    value={
                      gradedTradingCard?.grading_data_front.card_details.type2
                    }
                    readOnly
                    placeholder="Player name"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Card Publisher
                </Label>
                <Input
                  value={
                    gradedTradingCard?.grading_data_front.card_details
                      .cardPublisher
                  }
                  readOnly
                  placeholder="PSA12345678"
                  className="bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                AI Grade
              </Label>
              <Input
                className={`${getGradeShadowColor(
                  finalGrade
                )} font-bold text-lg text-center bg-gradient-to-rborder-2 border-gradient-to-r from-blue-300 to-purple-300 shadow-lg`}
                value={finalGrade}
                readOnly
                placeholder="Player name"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
