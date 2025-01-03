import { useRouter } from 'next/navigation'
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { AlertCircle } from 'lucide-react'

export default function CertificateNotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-red-600">
            <AlertCircle className="mr-2 h-6 w-6" />
            Certificate Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            We're sorry, but we couldn't find the certificate you're looking for. It may have been removed or doesn't exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Return to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

