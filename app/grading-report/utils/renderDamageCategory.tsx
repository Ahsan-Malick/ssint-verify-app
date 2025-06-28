"use client"

import Image from "next/image"
import { Badge } from "../../../components/ui/badge"
import { CategoryDamages } from "../components/Report"
import exp from "constants"
import getGradeColor from "./getGradeColor"

 
 
 
 
const renderDamageCategory = (categoryName: string, categoryData: CategoryDamages, subgrade: number) => {



    return (
      <div id={`${categoryName}-section`} className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg capitalize">{categoryName}</h3>
          <Badge className={getGradeColor(subgrade)}>Grade: {subgrade}</Badge>
        </div>

        <div className="space-y-3">
          {/* Minor Damages */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
              <span className="font-medium">Minor Damages</span>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                {categoryData.minor.count}
              </Badge>
            </div>
            {categoryData.minor.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 pl-4">
                {categoryData.minor.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden hover:border-yellow-400 transition-colors cursor-pointer"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${categoryName} minor defect ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                      Defect {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Major Damages */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
              <span className="font-medium">Major Damages</span>
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                {categoryData.major.count}
              </Badge>
            </div>
            {categoryData.major.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 pl-4">
                {categoryData.major.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden hover:border-orange-400 transition-colors cursor-pointer"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${categoryName} major defect ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                      Defect {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Major+ Damages */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded">
              <span className="font-medium">Major+ Damages</span>
              <Badge variant="outline" className="bg-red-100 text-red-800">
                {categoryData.majorPlus.count}
              </Badge>
            </div>
            {categoryData.majorPlus.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 pl-4">
                {categoryData.majorPlus.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden hover:border-red-400 transition-colors cursor-pointer"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${categoryName} major+ defect ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                      Defect {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  export default renderDamageCategory