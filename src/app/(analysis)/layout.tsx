import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/general-components/Sidebar";
import PageHeading from "@/components/general-components/PageHeading";


export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="antialiased grid grid-cols-[250px_1fr] h-screen w-full bg-[#161616] overflow-hidden" suppressHydrationWarning>
      <Sidebar />
      <div className="flex flex-col h-full overflow-y-auto">
        <PageHeading />
        <div className="flex-1 flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
}