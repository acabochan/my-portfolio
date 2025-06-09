import Image from "next/image";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#f2ede7", minHeight: "100vh" }}>
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold">Welcome to MySite</h1>
      </main>
    </div>
  );
}
