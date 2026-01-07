"use client";

import Navbar from "@/components/navbar";

export default function ResumePage() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#f7f6f3" }} // off-white
    >
      <Navbar />

      {/* Top padding added here */}
      <div className="flex justify-center px-4 pt-12 pb-24">
        <div className="w-full max-w-5xl">
          <iframe
            src="https://drive.google.com/file/d/1Uh54p0p5ise_OhPDbOLmIcx_oSBgVq5x/preview"
            className="w-full rounded-md shadow-lg border-0"
            style={{
              height: "calc(100vh - 220px)", // adjusted for extra padding
            }}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
