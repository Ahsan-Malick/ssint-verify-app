"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from ".../../../components/ui/button"
import { Badge } from "../../../../components/ui/badge"
import { Label } from "../../../../components/ui/label"
import { Separator } from ".../../../components/ui/separator"
import { Download } from "lucide-react"
import jsPDF from "jspdf"

interface TradingCard {
  id: string
  name: string
  year: number
  manufacturer: string
  set: string
  cardNumber: string
  sport: string
  player: string
  frontImage: string
  backImage: string
  overallGrade: number
  gradingDate: string
  certificationNumber: string
}


export default function CardOverview({card}: {card: TradingCard}) {
   const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-green-100 text-green-800"
    if (grade >= 7) return "bg-yellow-100 text-yellow-800"
    if (grade >= 5) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }
  return (
     <Card id="card-overview">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Card Overview
              <Badge className={`text-lg px-4 py-2 ${getGradeColor(card.overallGrade)}`}>
                Grade: {card.overallGrade}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Card Images */}
              <div className="md:col-span-2 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-center">Front</h3>
                  <div className="relative aspect-[3/4] border-2 border-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={card.frontImage || "/placeholder.svg"}
                      alt={`${card.name} front`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-center">Back</h3>
                  <div className="relative aspect-[3/4] border-2 border-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={card.backImage || "/placeholder.svg"}
                      alt={`${card.name} back`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-semibold text-gray-700">Card Name</Label>
                    <p className="text-gray-900">{card.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Year</Label>
                    <p className="text-gray-900">{card.year}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Manufacturer</Label>
                    <p className="text-gray-900">{card.manufacturer}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Set</Label>
                    <p className="text-gray-900">{card.set}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Card Number</Label>
                    <p className="text-gray-900">{card.cardNumber}</p>
                  </div>
                  <div>
                    <Label className="font-semibold text-gray-700">Sport</Label>
                    <p className="text-gray-900">{card.sport}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="font-semibold text-gray-700">Player</Label>
                    <p className="text-gray-900">{card.player}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
  );
}