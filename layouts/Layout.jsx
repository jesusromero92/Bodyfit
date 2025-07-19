import React from "react";
import Header from "../components/inicio/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20"> {/* padding top para dejar espacio al header fijo */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
