"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import renderDamageCategory from "../utils/renderDamageCategory";
import CardOverview from "./lib/CardOverview";
import CenteringGrade from "./lib/CenteringGrade";

interface TradingCard {
  id: string;
  name: string;
  year: number;
  manufacturer: string;
  set: string;
  cardNumber: string;
  sport: string;
  player: string;
  frontImage: string;
  backImage: string;
  overallGrade: number;
  gradingDate: string;
  certificationNumber: string;
}

interface GradeBreakdown {
  frontGrade: number;
  backGrade: number;
  frontRatio: number;
  backRatio: number;
}

interface DefectData {
  count: number;
  images: string[];
}

export interface CategoryDamages {
  minor: DefectData;
  major: DefectData;
  majorPlus: DefectData;
}

interface DamageAnalysis {
  corners: CategoryDamages;
  edges: CategoryDamages;
  surface: CategoryDamages;
}

interface Subgrades {
  corners: number;
  edges: number;
  surface: number;
}

// Sample data - in real app this would come from your database
const sampleCard: TradingCard = {
  id: "TC001",
  name: "Michael Jordan Rookie Card",
  year: 1986,
  manufacturer: "Fleer",
  set: "Basketball",
  cardNumber: "#57",
  sport: "Basketball",
  player: "Michael Jordan",
  frontImage: "/placeholder.svg?height=400&width=300",
  backImage: "/placeholder.svg?height=400&width=300",
  overallGrade: 8.5,
  gradingDate: "2024-01-15",
  certificationNumber: "PSA12345678",
};

//Will come from database
const sampleGradeBreakdown: GradeBreakdown = {
  frontGrade: 8.5,
  backGrade: 8.0,
  frontRatio: 0.55,
  backRatio: 0.45,
};

//Will come from database
const sampleDamageAnalysis: DamageAnalysis = {
  corners: {
    minor: {
      count: 2,
      images: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    major: {
      count: 1,
      images: ["/placeholder.svg?height=100&width=100"],
    },
    majorPlus: {
      count: 0,
      images: [],
    },
  },
  edges: {
    minor: {
      count: 1,
      images: ["/placeholder.svg?height=100&width=100"],
    },
    major: {
      count: 0,
      images: [],
    },
    majorPlus: {
      count: 0,
      images: [],
    },
  },
  surface: {
    minor: {
      count: 0,
      images: [],
    },
    major: {
      count: 1,
      images: ["/placeholder.svg?height=100&width=100"],
    },
    majorPlus: {
      count: 0,
      images: [],
    },
  },
};

//Will Come from database
const sampleSubgrades: Subgrades = {
  corners: 8.0,
  edges: 8.5,
  surface: 9.0,
};

export default function GradingReport() {
  const [card] = useState<TradingCard>(sampleCard);
  const [gradeBreakdown] = useState<GradeBreakdown>(sampleGradeBreakdown);
  const [damageAnalysis] = useState<DamageAnalysis>(sampleDamageAnalysis);
  const [subgrades] = useState<Subgrades>(sampleSubgrades);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-green-100 text-green-800";
    if (grade >= 7) return "bg-yellow-100 text-yellow-800";
    if (grade >= 5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minor":
        return "bg-yellow-100 text-yellow-800";
      case "major":
        return "bg-orange-100 text-orange-800";
      case "majorPlus":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const downloadPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      // Get all the main sections that shouldn't be split
      const sections = [
        {
          id: "report-header",
          element: document.getElementById("report-header"),
        },
        {
          id: "card-overview",
          element: document.getElementById("card-overview"),
        },
        {
          id: "grade-breakdown",
          element: document.getElementById("grade-breakdown"),
        },
        {
          id: "corners-section",
          element: document.getElementById("corners-section"),
        },
        {
          id: "edges-section",
          element: document.getElementById("edges-section"),
        },
        {
          id: "surface-section",
          element: document.getElementById("surface-section"),
        },
      ];

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const margin = 10;
      const contentWidth = pageWidth - 2 * margin;
      let currentY = margin;
      let isFirstPage = true;

      for (const section of sections) {
        if (!section.element) continue;

        // Create canvas for this section
        const canvas = await html2canvas(section.element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          width: section.element.scrollWidth,
          height: section.element.scrollHeight,
        });

        // Calculate dimensions
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        // Check if we need a new page
        if (!isFirstPage && currentY + imgHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }

        // Add the section to PDF
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          margin,
          currentY,
          contentWidth,
          imgHeight
        );

        currentY += imgHeight + 5; // Add small spacing between sections
        isFirstPage = false;
      }

      // Download the PDF
      const fileName = `Trading_Card_Report_${card.certificationNumber}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="space-y-8">
        {/* Header */}
        <div id="report-header" className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Trading Card Grading Report
          </h1>
          <p className="text-gray-600">
            Certification #{card.certificationNumber}
          </p>
          <p className="text-sm text-gray-500">
            Graded on {new Date(card.gradingDate).toLocaleDateString()}
          </p>
        </div>

        {/* Card Display Section */}
        <CardOverview card={card} />

        {/* Grade Breakdown Section */}
        <CenteringGrade gradeBreakdown={gradeBreakdown} />

        {/* Damage Analysis Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Damage Analysis by Category
          </h2>

          {/* Corners */}
          {renderDamageCategory(
            "corners",
            damageAnalysis.corners,
            subgrades.corners
          )}

          {/* Edges */}
          {renderDamageCategory("edges", damageAnalysis.edges, subgrades.edges)}

          {/* Surface */}
          {renderDamageCategory(
            "surface",
            damageAnalysis.surface,
            subgrades.surface
          )}
        </div>
      </div>

      <Separator />

      {/* Download Section */}
      <div className="text-center">
        <Button
          onClick={downloadPDF}
          size="lg"
          className="px-8"
          disabled={isGeneratingPDF}
        >
          <Download className="mr-2 h-5 w-5" />
          {isGeneratingPDF ? "Generating PDF..." : "Download Report as PDF"}
        </Button>
      </div>
    </div>
  );
}
