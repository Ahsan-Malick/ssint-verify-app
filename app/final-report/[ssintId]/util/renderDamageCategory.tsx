import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Upload, X } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/app/components/ui/card";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { DamageImages } from "../page";
import { GradingData } from "@/app/defect-detection/components/card-analysis/GradingPanel";
import { Textarea } from "@/app/components/ui/textarea";

type ReportDamageAnalysisImages = {
  ssint_id: string;
  front: {
    corner: {
      minor: string[];
      major: string[];
      majorPlus: string[];
    };
    edges: {
      minor: string[];
      major: string[];
      majorPlus: string[];
    };
    surface: {
      minor: string[];
      major: string[];
      majorPlus: string[];
    };
  };
  back: {
    corner: {
      minor: string[];
      major: string[];
      majorPlus: string[];
    };
    edges: {
      minor: string[];
      major: string[];
      majorPlus: string[];
    };
    surface: {
      minor: string[];
      major: string[];
      majorPlus: string[];
    };
  };
};

type FinalReport = {};

const renderDamageCategory = (
  category: "corner" | "edges" | "surface", //corner, edges, or surface
  dataFront: GradingData["corner"],
  dataBack: GradingData["corner"],
  damageImagesData: DamageImages,
  setDamageImagesData: Dispatch<SetStateAction<DamageImages>>,
  gradeFront?: number,
  gradeBack?: number
) => {
  const defectImageUpload = (
    file: File,
    category: "corner" | "edges" | "surface",
    side: "front" | "back",
    type: "minor" | "major" | "majorPlus"
  ) => {
    const previewUrl = URL.createObjectURL(file); // Turn File into previewable URL

 

    setDamageImagesData((prev) => ({
      ...prev,
      [side]: {
        ...prev[side],
        [category]: {
          ...prev[side][category], //spread other types like minor, major, majorPlus
          [type]: {
          url: [...prev[side][category][type].url || [], previewUrl],
          file: [...prev[side][category][type].file || [], file],
        },
      }
      },
    }));
  };

  const defectImageDelete = (
    type: "minor" | "major" | "majorPlus",
    category: "corner" | "edges" | "surface",
    side: "front" | "back",
    indexToRemove: number
  ) => {
    setDamageImagesData((prev) => {
      const currentUrlArray = prev[side][category][type].url || [];
      const currentFileArray = prev[side][category][type].file || [];

      return {
        ...prev,
        [side]: {
          ...prev[side],
          [category]: {
            ...prev[side][category],
            [type]: {
              url: currentUrlArray.filter((_, idx) => idx !== indexToRemove),
              file: currentFileArray.filter((_, idx) => idx !== indexToRemove),
            },
          },
        },
      };
    });
  };

  return (
    <Card className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <CardTitle className="flex justify-between items-center">
          <span className="font-semibold text-lg capitalize">
            {category} Analysis
          </span>
          <div className="flex">
            <div className="text-center">
              <Label
                htmlFor="total-occurances"
                className="text-gray-800 text-sm"
              >
                Total {/* named as numberOfDamages in other places */}
              </Label>
              <Input
                id="total-occurances"
                placeholder="0"
                className="w-20 text-center mt-1 border-gray-300 bg-white"
                value={dataFront.numberOfDamages}
                readOnly
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center ">
              <Label className="text-gray-800 text-sm">Front Grade</Label>
              <Input
                id="grade"
                placeholder="0"
                value={gradeFront}
                readOnly
                className="w-20 text-center mt-1 border-gray-300 bg-white"
              />
            </div>
            <div className="text-center">
              <Label className="text-gray-800 text-sm">Back Grade</Label>
              <Input
                id="grade"
                placeholder="0"
                value={gradeBack}
                readOnly
                className="w-20 text-center mt-1 border-gray-300 bg-white"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Front Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <h4 className="text-lg font-semibold text-gray-800">
                Front Side
              </h4>
            </div>
            {/* Minor Damages */}
            <div className="p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50">
              <div className="flex justify-between items-center p-2">
                <span className="font-medium">Minor Damages</span>
                <Badge className=" text-yellow-800 text-center text-md w-[10%]">
                  {dataFront.minorDamages}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {damageImagesData["front"][category].minor?.url.map(
                  (image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg group hover:border-blue-400 transition-colors">
                        <Image
                          src={image as string || "/placeholder.svg"}
                          alt="Minor defect"
                          fill
                          className="object-contain bg-white group-hover:scale-105 transition-transform"
                        />

                        <button
                          onClick={() =>
                            defectImageDelete("minor", category, "front", index)
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="">
                        <Textarea
                          placeholder="Add description"
                          className="mt-2"
                          rows={2}
                        />
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors bg-white">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          defectImageUpload(file, category, "front", "minor");
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Major Damages */}
            <div className="p-4 rounded-lg border-2 border-orange-300 bg-orange-50">
              <div className="flex justify-between items-center p-2 ">
                <span className="font-medium">Major Damages</span>
                <Badge className=" text-orange-800 text-md w-[10%]">
                  {dataFront.majorDamages}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {damageImagesData["front"][category].major?.url.map(
                  (image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg group hover:border-blue-400 transition-colors">
                        <Image
                          src={image as string || "/placeholder.svg"}
                          alt="Major defect"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() =>
                            defectImageDelete("major", category, "front", index)
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors bg-white">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          defectImageUpload(file, category, "front", "major");
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Major+ Damages */}
            <div className="p-4 rounded-lg border-2 border-red-300 bg-red-50">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">Major+ Damages</span>
                <Badge className=" text-red-800 text-md w-[10%]">
                  {dataFront.majorPlusDamages}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {damageImagesData["front"][category].majorPlus?.url.map(
                  (image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg group hover:border-blue-400 transition-colors">
                        <Image
                          src={image as string || "/placeholder.svg"}
                          alt="Major+ defect"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() =>
                            defectImageDelete(
                              "majorPlus",
                              category,
                              "front",
                              index
                            )
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors bg-white">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          defectImageUpload(
                            file,
                            category,
                            "front",
                            "majorPlus"
                          );
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="space-y-3">
            <div className="flex items-center justify-center border-t border-gray-300 gap-2 mb-4">
              <div className="w-4 h-4 bg-green-500 rounded-full mt-3"></div>
              <h4 className="text-lg font-semibold text-gray-800 mt-3">
                Back Side
              </h4>
            </div>
            {/* Minor Damages */}
            <div className="p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50">
              <div className="flex justify-between items-center p-2">
                <span className="font-medium">Minor Damages</span>
                <Badge className=" text-yellow-800 text-center text-md w-[10%]">
                  {dataBack.minorDamages}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {damageImagesData["back"][category].minor?.url.map(
                  (image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg group hover:border-blue-400 transition-colors">
                        <Image
                          src={image as string || "/placeholder.svg"}
                          alt="Minor defect"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />

                        <button
                          onClick={() =>
                            defectImageDelete("minor", category, "back", index)
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors bg-white">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          defectImageUpload(file, category, "back", "minor");
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Major Damages */}
            <div className="p-4 rounded-lg border-2 border-orange-300 bg-orange-50">
              <div className="flex justify-between items-center p-2 ">
                <span className="font-medium">Major Damages</span>
                <Badge className=" text-orange-800 text-md w-[10%]">
                  {dataBack.majorDamages}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {damageImagesData["back"][category].major?.url.map(
                  (image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg group hover:border-blue-400 transition-colors">
                        <Image
                          src={image as string || "/placeholder.svg"}
                          alt="Major defect"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() =>
                            defectImageDelete("major", category, "back", index)
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors bg-white">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          defectImageUpload(file, category, "back", "major");
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Major+ Damages */}
            <div className="p-4 rounded-lg border-2 border-red-300 bg-red-50">
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">Major+ Damages</span>
                <Badge className=" text-red-800 text-md w-[10%]">
                  {dataBack.majorPlusDamages}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {damageImagesData["back"][category].majorPlus?.url.map(
                  (image, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative w-full h-40 border-2 border-gray-300 rounded-lg group hover:border-blue-400 transition-colors">
                        <Image
                          src={image as string || "/placeholder.svg"}
                          alt="Major+ defect"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() =>
                            defectImageDelete(
                              "majorPlus",
                              category,
                              "back",
                              index
                            )
                          }
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )
                )}

                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-400 transition-colors bg-white">
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          defectImageUpload(
                            file,
                            category,
                            "back",
                            "majorPlus"
                          );
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default renderDamageCategory;
