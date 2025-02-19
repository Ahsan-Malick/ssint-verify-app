import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Link from "next/link";


interface CertificateViewerProps {
  certDetails: any; // Replace `any` with the specific type of `certDetails` if you know it
}

export default function CertificateViewer(props: CertificateViewerProps) {
  const { certDetails } = props;

  const date = new Date(certDetails.$createdAt);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium", // e.g., "Jan 3, 2025"
    timeStyle: "short", // e.g., "10:32 AM"
  }).format(date);

  

  return (
    <>
      {certDetails ? (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-3 sm:p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-3 xsm:p-6 sm:p-8">
              <div className="flex flex-col items-end sm:items-center mb-8 relative">
                <Button asChild
                  variant="outline"
                  size="sm"
                  className="absolute left-0 top-0 flex items-center text-gray-600 hover:text-gray-800"
                >
                  <Link href="/">← Home</Link>
                </Button>
                <h2 className="xsm:text-xl sm:text-2xl font-semibold text-gray-800">
                  SSINT. GRADING
                </h2>
                {/* <p className="text-sm text-gray-600">
              Created on: {formattedDate} 
            </p> */}
              </div>
              {/* <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Certificate</h1> */}

              {/* Card Images */}
              <div className="flex justify-between sm:flex sm:justify-around mb-8">
                <div
                  className={`relative aspect-[0.63] xxsm:aspect-[0.72756] xsm:h-[270px] xxsm:h-[250px] h-[200px] sm:h-[345px] md:h-[405px]  rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105`}
                >
                  {certDetails.frontImageUrl?
                  <Image 
                src={certDetails.frontImageUrl}
                  
                alt="Card Front" 
                fill={true} 
                objectFit="fill"
                className={`bg-gray-200`}
              />
                  : <p>No Image Provided</p>
}
                </div>
                <div className="relative aspect-[0.63] xxsm:aspect-[0.72756] xsm:h-[270px] xxsm:h-[250px] h-[200px] sm:h-[345px] md:h-[405px] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                  {certDetails.backImageUrl?
                  <Image 
                src={certDetails.backImageUrl}
                alt="Card Back" 
                fill={true}
                objectFit="fill"
                className="bg-gray-200"
              />
                 :  <p>No Image Provided</p> 
}

                </div>
                  
              </div>

              {/* Card Details */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <DetailItem label="SSINT. ID" value={certDetails.ssintId} />
                    <DetailItem
                      label="Card Number"
                      value={certDetails.cardNumber}
                    />
                    <DetailItem
                      label="Card Name"
                      value={certDetails.cardName}
                    />
                    <DetailItem label="Card Set" value={certDetails.cardSet} />
                    <DetailItem label="Year" value={certDetails.cardYear} />
                    <DetailItem label="Grade" value={certDetails.grade} />
                    <DetailItem
                      label="Population"
                      value={certDetails.population}
                    />
                    <DetailItem
                      label="Pop Higher"
                      value={certDetails.popHigher}
                    />
                    <DetailItem
                      label="Card Publisher"
                      value={certDetails.cardPublisher}
                    />
                    <DetailItem
                      label="Label Type"
                      value="Aluminium Laser Engraved"
                    />
                  </div>
                  <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                      Additional Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {certDetails.additionalInfo}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>Null</div>
      )}
    </>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="animate-fadeIn bg-white p-3 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className=" text-md sm:text-lg font-semibold text-gray-900 whitespace-normal overflow-hidden break-words max-w-full">
        {value}
      </p>
    </div>
  );
}
