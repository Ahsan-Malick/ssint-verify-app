'use client'
import React from 'react'
import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import { useRouter } from "next/navigation";



const CertInputPage = () => {
  const [ssintId, setSsintId] = useState('')

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(`/api/getCertificate/${ssintId}`); //returns a promise
    const data = await response.json()
    const certDetails = data.certDetails

    // Navigate to the certificate page with query params

    if(response.status===200){
    router.push(`/certificate?certDetails=${encodeURIComponent(JSON.stringify(certDetails))}`);
    }
    else{
      router.push(`/certificate?certDetails=${encodeURIComponent(JSON.stringify(certDetails))}`);
    }
  }

  return (
    <>
    
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      <div className="w-full bg-[#f5f5f5] py-2">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-black">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <Twitter size={20} />
            </a>
          </div>
          <div className="text-sm text-gray-600">
            NOW GRADING PATCH CARDS →
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="container mx-auto flex justify-center items-center py-4 px-4">
        <div className="text-black text-2xl font-bold">ssint.</div>
      </div>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold text-black tracking-wide" style={{ fontFamily: 'Inter' }}>
            Your Collection, Elevated
          </h1>
          <p className="text-gray-600 text-lg tracking-widest uppercase font-normal" style={{ fontFamily: 'Inter' }}>
            SPECIALISED SERVICES IN INSPECTION AND NOTATION OF TREASURES
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Enter SSINT ID"
              value={ssintId}
              onChange={(e) => setSsintId(e.target.value)}
              className="w-full border-gray-200 text-black placeholder-gray-400"
            />
            <Button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-md transition-colors"
            >
              Check Certificate
            </Button>
          </form>
        </div>
      </main>
    </div>
    </>
  )
}

export default CertInputPage
