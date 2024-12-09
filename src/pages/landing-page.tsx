import React, { useState, useEffect } from "react";

function LandingPage() {
  const phrases = [
    "no meu prato?",
    "no meu lanche?",
    "no meu jantar?",
    "na minha sobremesa?",
    "na minha refeição favorita?",
    "no meu café da manhã?",
    "em um ovo?",
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => {
        const currentIndex = phrases.indexOf(prev);
        return phrases[(currentIndex + 1) % phrases.length];
      });
    }, 2000); // Change phrase every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [phrases]);

  return (
    <div className="flex flex-col text-left pt-10 max-w-[800px] mx-auto">
      <h1 className="text-6xl font-bold">
        Quantas calorias tem<br></br>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
          {currentPhrase}
        </span>
      </h1>
    </div>
  );
}

export default LandingPage;
