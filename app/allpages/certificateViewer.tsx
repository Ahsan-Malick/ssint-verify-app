

import Image from 'next/image'
import { Card, CardContent } from "../../components/ui/card"

interface CertificateViewerProps {
  certDetails: any; // Replace `any` with the specific type of `certDetails` if you know it
}


export default function CertificateViewer (props: CertificateViewerProps) {
 
  const { certDetails } = props;

  const date = new Date(certDetails.$createdAt);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium', // e.g., "Jan 3, 2025"
    timeStyle: 'short',  // e.g., "10:32 AM"
  }).format(date);
  

  return (
    <>
    { certDetails?
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
        <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">SSINT GRADING</h2>
            <p className="text-sm text-gray-600">
              Created on: {formattedDate} 
            </p>
          </div>
          {/* <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Certificate</h1> */}
          
          {/* Card Images */}
          <div className="flex justify-between sm:flex sm:justify-around mb-8">
            <div className={`relative aspect-[0.63] xxsm:aspect-[0.72756] xsm:h-[270px] xxsm:h-[250px] h-[200px] sm:h-[345px] md:h-[405px]  rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105`}>
              <Image 
                src={certDetails.frontImageUrl} 
                alt="Card Front" 
                fill={true} 
                objectFit="fill"
                className={`bg-gray-200`}
              />
            </div>
            <div className="relative aspect-[0.63] xxsm:aspect-[0.72756] xsm:h-[270px] xxsm:h-[250px] h-[200px] sm:h-[345px] md:h-[405px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <Image 
                src={certDetails.backImageUrl}  
                alt="Card Back" 
                fill={true}
                objectFit="fill"
                className="bg-gray-200"
              />
            </div>
          </div>
          
          {/* Card Details */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="SSINT ID" value={certDetails.ssintId} />
                <DetailItem label="Card Number" value={certDetails.cardNumber} />
                <DetailItem label="Card Name" value={certDetails.cardName} />
                <DetailItem label="Card Set" value={certDetails.cardSet} />
                <DetailItem label="Year" value={certDetails.cardYear} />
                <DetailItem label="Grade" value={certDetails.grade} />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">Additional Information</h3>
                <p className="text-gray-700">{certDetails.additionalInfo}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div> :<div>Null</div>
}
    </>
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

