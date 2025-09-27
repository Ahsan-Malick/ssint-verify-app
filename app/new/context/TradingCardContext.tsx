// context/TradingCardContext.tsx
"use client";

import { createContext, useContext, useState } from "react";



type CardContextType = {
  gradedTradingCard: JsonParsedData | null;
  setGradedTradingCard: (card: JsonParsedData) => void;
};

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


export interface TradingCardForDB {
  cardName: string;
  cardNumber: string;
  cardSet: string;
  cardYear: number;
  grade: number;
  cardPublisher: string;
}



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

const TradingCardContext = createContext<CardContextType>({
  gradedTradingCard: null,
  setGradedTradingCard: () => {},
});

export const useTradingCard = () => useContext(TradingCardContext);

export const TradingCardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [gradedTradingCard, setGradedTradingCard] =
    useState<JsonParsedData | null>(null);

  return (
    <TradingCardContext.Provider
      value={{ gradedTradingCard, setGradedTradingCard }}
    >
      {children}
    </TradingCardContext.Provider>
  );
};
