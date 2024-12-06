import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-xl mt-4">Página não encontrada</p>
      <Link to="/" className="text-blue-500 mt-6">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default NotFound;
