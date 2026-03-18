import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/general-components/Sidebar";
import PageHeading from "@/components/general-components/PageHeading";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`antialiased grid grid-cols-[250px_1fr] h-screen w-full 
    bg-[#161616] overflow-hidden`} suppressHydrationWarning>
      <Sidebar />
      <div className="flex flex-col h-full overflow-hidden">
        <PageHeading />
        {children}
      </div>
    </main>
  );
}