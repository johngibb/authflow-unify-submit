
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { enUS } from "../locales/en-US";
import { esES } from "../locales/es-ES";

interface TranslationContextType {
  t: (key: string) => string;
  currentLanguage: string;
  setLanguage: (language: string) => void;
  availableLanguages: { code: string; name: string }[];
}

const locales: Record<string, Record<string, string>> = {
  "en-US": enUS,
  "es-ES": esES,
};

const availableLanguagesList = [
  { code: "en-US", name: "English" },
  { code: "es-ES", name: "Español" }
];

export const TranslationContext = createContext<TranslationContextType>({
  t: () => "",
  currentLanguage: "en-US",
  setLanguage: () => {},
  availableLanguages: availableLanguagesList,
});

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en-US";
  });

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const t = (key: string): string => {
    const translations = locales[currentLanguage] || locales["en-US"];
    return translations[key] || key;
  };

  const setLanguage = (language: string) => {
    if (locales[language]) {
      setCurrentLanguage(language);
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        t,
        currentLanguage,
        setLanguage,
        availableLanguages: availableLanguagesList,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
