import Image from 'next/image'
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

const cardData = {
  ssintId: "SSINT-001",
  cardNumber: "CARD-12345",
  cardName: "Charizard VMAX",
  cardSet: "Champion's Path",
  cardYear: 2020,
  grade: "PSA 10",
  additionalInfo: "This is a highly sought-after Pokémon card in mint condition."
}

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Pokémon Card Certificate</h1>
          
          {/* Card Images */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image 
                src="/placeholder.svg?height=400&width=300" 
                alt="Card Front" 
                layout="fill" 
                objectFit="cover"
                className="bg-gray-200"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-semibold">Card Front</span>
              </div>
            </div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image 
                src="/placeholder.svg?height=400&width=300" 
                alt="Card Back" 
                layout="fill" 
                objectFit="cover"
                className="bg-gray-200"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-semibold">Card Back</span>
              </div>
            </div>
          </div>
          
          {/* Card Details */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="SSINT ID" value={cardData.ssintId} />
                <DetailItem label="Card Number" value={cardData.cardNumber} />
                <DetailItem label="Card Name" value={cardData.cardName} />
                <DetailItem label="Card Set" value={cardData.cardSet} />
                <DetailItem label="Year" value={cardData.cardYear.toString()} />
                <DetailItem label="Grade" value={cardData.grade} />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Additional Information</h3>
                <p className="text-gray-700">{cardData.additionalInfo}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="animate-fadeIn">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  )
}

