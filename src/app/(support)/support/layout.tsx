import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/general-components/Sidebar";
import PageHeading from "@/components/support/PageHeading";
import Footer from "@/components/support/Footer";
import FAQaccordion from "@/components/support/FAQaccordion";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {

  return (
    <main className={`antialiased grid grid-cols-[250px_1fr] h-screen w-full 
    bg-[#161616] overflow-hidden`}>
      <Sidebar />
      <div className="flex flex-col h-full bg-(--main-bg-color) overflow-hidden relative">
        <PageHeading />
        
        <section className="flex-1 flex flex-col overflow-y-auto pb-[200px]">
          {children}
          <div className="px-16 py-8 flex justify-center items-center w-full">
            <FAQaccordion /> 
          </div>
            
        </section>
        <div className="absolute bottom-0 left-0 w-full z-50">
          <Footer />
        </div>
      </div>
    </main>
  );
}