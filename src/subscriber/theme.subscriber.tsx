import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  gradient: string;
  primaryColor: string;
  contrastColor: string;
  setGradient: (gradient: string) => void;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const contrastColorMap: Record<string, string> = {
  "from-violet-200 to-pink-200": "#5b21b6", // Violet
  "from-orange-400 to-pink-600": "#d97706", // Orange
  "from-blue-400 to-teal-300": "#2563eb", // Blue
  "from-green-400 to-teal-600": "#047857", // Green
  "from-gray-800 to-blue-900": "#1e40af", // Dark Blue
};

const gradientPresets = [
  { label: "Default", gradient: "from-violet-200 to-pink-200" },
  { label: "Sunset", gradient: "from-orange-400 to-pink-600" },
  { label: "Ocean", gradient: "from-blue-400 to-teal-300" },
  { label: "Forest", gradient: "from-green-400 to-teal-600" },
  { label: "Night Sky", gradient: "from-gray-800 to-blue-900" },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gradient, setGradientState] = useState<string>(
    "from-violet-200 to-pink-200"
  );
  const [primaryColor, setPrimaryColor] = useState<string>("#5b21b6"); // Default Violet-800
  const [contrastColor, setContrastColor] = useState<string>(
    contrastColorMap[gradient]
  );

  const setGradient = (label: string) => {
    const preset = gradientPresets.find((preset) => preset.label === label);
    if (preset) {
      setGradientState(preset.gradient);
    } else {
      console.warn(`Gradient label "${label}" not found`);
    }
  };

  useEffect(() => {
    // Update the primary and contrast colors dynamically
    const newPrimaryColor = contrastColorMap[gradient];
    setPrimaryColor(newPrimaryColor);
    setContrastColor(newPrimaryColor);
    document.documentElement.style.setProperty(
      "--primary-color",
      newPrimaryColor
    );
    document.documentElement.style.setProperty(
      "--contrast-color",
      newPrimaryColor
    );
  }, [gradient]);

  return (
    <ThemeContext.Provider
      value={{
        gradient,
        primaryColor,
        contrastColor,
        setGradient,
        setPrimaryColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
