"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";
import Router from "next/router"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Sparkles, Zap, Shield, Search, Upload } from "lucide-react"
import { JsonParsedData } from "./context/TradingCardContext"
import {
  useTradingCard,
} from "./context/TradingCardContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export interface DetailsForReport {
  ssint_id: string;
  grading_data_front: string;
  grading_data_back: string;
  frontImageUrl: string;
  backImageUrl: string;
}

export interface DataFromDB {
  certDetails: DetailsForReport;
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const aiSectionRef = useRef<HTMLDivElement>(null)
  const inputSectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [submitId, setSubmitId] = useState("")
  const [reportId, setReportId] = useState("")

  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current?.children || [],
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
        },
      )

      // AI section animations
   const aiTitle = aiSectionRef.current?.querySelector(".ai-title");

if (aiTitle && aiSectionRef.current) {
  gsap.fromTo(
    aiTitle,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: aiSectionRef.current,
        start: "top 80%",
      },
    }
  );
}
      // Floating animation for AI cards
      gsap.to(cardsRef.current?.children || [], {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      })

      // Input sections animation
      gsap.fromTo(
        inputSectionRef.current?.children || [],
        {
          opacity: 0,
          x: -100,
          rotationY: -15,
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: inputSectionRef.current,
            start: "top 80%",
          },
        },
      )

      // Sparkle animation
      gsap.to(".sparkle", {
        rotation: 360,
        duration: 3,
        ease: "none",
        repeat: -1,
      })

      // Pulse animation for badges
      gsap.to(".pulse-badge", {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      })
    })

    return () => ctx.revert()
  }, [])

const scrollToInputs = () => {
  if (inputSectionRef.current) {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: {
        y: inputSectionRef.current,
        offsetY: 100,
      },
      ease: "power2.inOut",
    });
  }
};

  const { gradedTradingCard, setGradedTradingCard } = useTradingCard();
 
  const [ssintId, setSsintId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Animate button on submit
    gsap.to(e.target, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })
    if (!ssintId.trim()) return;
    setLoading(true);

    try {
      // Replace this with your actual fetch call
      const response = await fetch(`/api/get-final-data/${ssintId}`);
      const data = (await response.json()) as DataFromDB;
      const ssint_id = data.certDetails.ssint_id;
      const grading_data_front = JSON.parse(
        data.certDetails.grading_data_front
      );
      const grading_data_back = JSON.parse(data.certDetails.grading_data_back);
      const frontImageUrl = data.certDetails.frontImageUrl;
      const backImageUrl = data.certDetails.backImageUrl;

      const reportData: JsonParsedData = {
        ssint_id,
        grading_data_front,
        grading_data_back,
        frontImageUrl,
        backImageUrl
      };

      setGradedTradingCard(reportData);
      Router.push("/final-report");
    } catch (err) {
      console.error("Failed to fetch card", err);
    } finally {
      setLoading(false);
    }
  }
const router = useRouter();
  const handleReport = (e: React.FormEvent) => {
    e.preventDefault()
    // Animate button on submit
    gsap.to(e.target, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    })
    
    if (!reportId.trim()) return;
    router.push(`/final-report/${reportId}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div ref={heroRef} className="text-center space-y-8">
          <div className="relative">
            <Sparkles className="sparkle absolute -top-8 -left-8 w-8 h-8 text-blue-500" />
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-black via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight">
              SSINT. REGISTRY
            </h1>
            <Sparkles className="sparkle absolute -bottom-4 -right-4 w-6 h-6 text-purple-500" />
          </div>
          <p className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide">Verified, Secured, Trusted</p>
          <div className="flex justify-center space-x-4">
            <Badge className="pulse-badge bg-green-100 text-green-700 border-green-300">
              <Shield className="w-4 h-4 mr-1" />
              Verified
            </Badge>
            <Badge className="pulse-badge bg-blue-100 text-blue-700 border-blue-300">
              <Zap className="w-4 h-4 mr-1" />
              AI-Powered
            </Badge>
          </div>
          <div className="mt-12">
            <Button
              onClick={scrollToInputs}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
            >
              Get Started
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* AI Trading Card Grader Section */}
      <section ref={aiSectionRef} className="relative py-20 px-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="ai-title text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Introducing AI Trading Card Grader
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionary artificial intelligence technology that analyzes and grades your trading cards with
              unprecedented accuracy and speed.
            </p>
          </div>

          <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-white/80 border-blue-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-gray-900">AI-Powered Analysis</CardTitle>
                <CardDescription className="text-gray-600">
                  Advanced machine learning algorithms analyze card condition
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/80 border-purple-200 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-gray-900">Instant Results</CardTitle>
                <CardDescription className="text-gray-600">
                  Get comprehensive grading reports in seconds, not days or weeks
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>

      {/* Input Sections */}
      <section ref={inputSectionRef} className="relative py-20 px-4 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Submit Card Section */}
          <Card className="bg-white/90 border-blue-200 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-blue-600" />
                View Certificate
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter your SSINT ID to view your certificate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="submit-id" className="block text-sm font-medium text-gray-700 mb-2">
                    SSINT ID
                  </label>
                  <Input
                    id="submit-id"
                    type="text"
                    value={submitId}
                    onChange={(e) => setSubmitId(e.target.value)}
                    placeholder="Enter your SSINT ID"
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                View Certificate
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* View Report Section */}
          <Card className="bg-white/90 border-purple-200 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <Search className="w-6 h-6 mr-2 text-purple-600" />
                View Report
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access your AI grading report and verification details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReport} className="space-y-6">
                <div>
                  <label htmlFor="report-id" className="block text-sm font-medium text-gray-700 mb-2">
                    SSINT ID
                  </label>
                  <Input
                    id="report-id"
                    type="text"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    placeholder="Enter SSINT ID to view report"
                    className="bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">© 2024 SSINT Registry. Powered by AI. Secured by Blockchain.</p>
        </div>
      </footer>
    </div>
  )
}
