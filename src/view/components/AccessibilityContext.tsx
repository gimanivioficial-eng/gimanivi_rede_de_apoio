import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AccessibilityContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  autismMode: boolean;
  toggleAutismMode: () => void;
  readText: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [autismMode, setAutismMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (autismMode) {
      document.documentElement.classList.add("autism-mode");
    } else {
      document.documentElement.classList.remove("autism-mode");
    }
  }, [autismMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(fontSize - 2);
  };

  const toggleAutismMode = () => setAutismMode(!autismMode);

  const readText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        autismMode,
        toggleAutismMode,
        readText,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
