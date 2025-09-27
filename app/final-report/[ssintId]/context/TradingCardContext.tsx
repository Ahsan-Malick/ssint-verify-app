// context/TradingCardContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

import { JsonParsedData } from "../layout";

type CardContextType = {
  gradedTradingCard: JsonParsedData | null;
  setGradedTradingCard: (card: JsonParsedData) => void;
};

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
