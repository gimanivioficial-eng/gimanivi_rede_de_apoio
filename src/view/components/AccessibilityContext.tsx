
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface AccessibilityContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  autismMode: boolean;
  toggleAutismMode: () => void;
  readText: (text: string) => void;
  readPage: () => void;
  stopReading: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function AccessibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [autismMode, setAutismMode] = useState(false);

  const queueRef = useRef<string[]>([]);
  const activeRef = useRef(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "autism-mode",
      autismMode
    );
  }, [autismMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const increaseFontSize = () => {
    setFontSize((prev) => (prev < 24 ? prev + 2 : prev));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => (prev > 12 ? prev - 2 : prev));
  };

  const toggleAutismMode = () => {
    setAutismMode((prev) => !prev);
  };

  const stopReading = () => {
    activeRef.current = false;
    queueRef.current = [];

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const readText = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    stopReading();

    const cleanText = text.replace(/\s+/g, " ").trim();
    if (!cleanText) return;

    // Divide o conteúdo em partes menores.
    const sentences = cleanText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleanText];

    const chunks: string[] = [];
    let current = "";

    sentences.forEach((sentence) => {
      const part = sentence.trim();

      if ((current + " " + part).length > 220 && current) {
        chunks.push(current);
        current = part;
      } else {
        current += (current ? " " : "") + part;
      }
    });

    if (current) chunks.push(current);

    queueRef.current = chunks;
    activeRef.current = true;

    const speakNext = () => {
      if (!activeRef.current || queueRef.current.length === 0) {
        activeRef.current = false;
        return;
      }

      const nextText = queueRef.current.shift()!;
      const utterance = new SpeechSynthesisUtterance(nextText);

      utterance.lang = "pt-BR";
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        speakNext();
      };

      utterance.onerror = () => {
        activeRef.current = false;
        queueRef.current = [];
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  const readPage = () => {
    const content = document.querySelector("[data-read-content]");

    if (!content) return;

    const clone = content.cloneNode(true) as HTMLElement;

    clone.querySelectorAll(
      "button, nav, footer, script, style, input, textarea, select, [aria-hidden='true'], [data-no-read]"
    ).forEach((element) => element.remove());

    readText(clone.innerText);
  };

  useEffect(() => {
    return () => {
      activeRef.current = false;
      window.speechSynthesis?.cancel();
    };
  }, []);

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
        readPage,
        stopReading,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error(
      "useAccessibility must be used within AccessibilityProvider"
    );
  }

  return context;
}
