import React from "react";

function Spiner({ fullHeight = false }: { fullHeight?: boolean }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: fullHeight ? "80vh" : "auto" }}
    >
      <div className="border-8 h-10 w-10 rounded-full border-t-black animate-spin"></div>
    </div>
  );
}

export default Spiner;
