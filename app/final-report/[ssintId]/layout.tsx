"use client";

import { useEffect, useState } from "react";
import {
  TradingCardProvider,
  useTradingCard,
} from "./context/TradingCardContext";
import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

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

export interface JsonParsedData {
  ssint_id: string;
  grading_data_front: {
    card_side: string;
    card_details: TradingCardForDB;
    damage_details: GradingData;
    grading_result: GradeResult;
  };
  grading_data_back: {
    card_side: string;
    card_details: TradingCardForDB;
    damage_details: GradingData;
    grading_result: GradeResult;
  };
  frontImageUrl: string;
  backImageUrl: string;
}

export interface GradingData {
  corner: {
    numberOfDamages: number;
    majorDamages: number;
    minorDamages: number;
    majorPlusDamages: number;
  };
  surface: {
    numberOfDamages: number;
    majorDamages: number;
    minorDamages: number;
    majorPlusDamages: number;
  };
  edges: {
    numberOfDamages: number;
    majorDamages: number;
    minorDamages: number;
    majorPlusDamages: number;
  };
  centering: number;
  centeringRatio: {
    front: string; // e.g. "55/45"
    back: string; // e.g. "60/40"
  };
}

export interface TradingCardForDB {
  cardName: string;
  cardNumber: string;
  cardSet: string;
  cardYear: number;
  type1?: string;
  type2?: string;
  type3?: string;
  gradeName: string;
  grade: number | null;
  cardPublisher: string;
  additionalInfo?: string;
}

export interface GradeResult {
  finalGrade: number;
  condition: string;
  breakdown: {
    corner: number;
    surface: number;
    edges: number;
    centering: number;
  };
}

export default function AddReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TradingCardProvider>
      <AddReportLayoutInner>{children}</AddReportLayoutInner>
    </TradingCardProvider>
  );
}

function AddReportLayoutInner({ children }: { children: React.ReactNode }) {
  const { gradedTradingCard, setGradedTradingCard } = useTradingCard();
  const params = useParams<{ ssintId: string }>();
  const ssintId = params?.ssintId;


  const handleSubmit = async () => {
    if (!ssintId.trim()) return;

   

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
        backImageUrl,
      };

      setGradedTradingCard(reportData);
    } catch (err) {
      console.error("Failed to fetch card", err);
    }
  };

  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    // Capture the DOM as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // higher scale = sharper text/images
      useCORS: true, // allow cross-origin images
      backgroundColor: "#fff", // ensures white background
      foreignObjectRendering: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // Create PDF with same size as canvas
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("report.pdf");
  };

  useEffect(() => {
    handleSubmit();
  });

  if (!gradedTradingCard) {
    return (
      <div className="max-w-md mx-auto mt-20 space-y-4 text-center">
        <h2 className="text-2xl font-bold">Loading Report...</h2>
      </div>
    );
  }

  return (
    <>
      {!ssintId ? (
        notFound()
      ) : (
        <main ref={reportRef} id="report-content">
          <Download
            className="bg-green-400 p-2 mx-auto hover:cursor-pointer  text-white  rounded-md"
            onClick={downloadPDF}
            width={40}
            height={30}
          ></Download>
          {children}
        </main>
      )}
    </>
  );
}
