import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/general-components/Sidebar";
import PageHeading from "@/components/general-components/PageHeading";
import TimelineFilter from "@/components/overview/TimelineFilter";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function OverviewLayout(props: { 
  children: React.ReactNode,
  "revenue-and-gm": React.ReactNode,
  "revenue-by-country": React.ReactNode,
  "revenue-by-subcategory": React.ReactNode,
  "revenue-by-category": React.ReactNode,
}) {
  const { 
    children, 
    "revenue-and-gm": revenueAndGm, 
    "revenue-by-country": revenueByCountry, 
    "revenue-by-subcategory": revenueBySubcategory, 
    "revenue-by-category": revenueByCategory 
  } = props;

  return (
    <main className={`antialiased grid grid-cols-[250px_1fr] h-screen w-full 
    overflow-hidden`}>
      <Sidebar />
      <div className="flex flex-col h-full overflow-hidden relative">
        <PageHeading />
        
        <section className="flex-1 flex flex-col overflow-y-auto pb-20">
          {children}
            <section className={`grid grid-cols-12 gap-4 p-4 w-full`}>
              <div className="col-span-8 flex flex-col gap-4">
                <div>
                  {revenueAndGm}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        {revenueByCategory}
                    </div>
                    <div className="col-span-1">
                        {revenueBySubcategory}
                    </div>
                </div>
              </div>
              <div className="col-span-4">
                  {revenueByCountry}
              </div>
            </section>
            
        </section>
        <div className="absolute bottom-0 left-0 w-full z-50">
          <TimelineFilter />
        </div>
      </div>
    </main>
  );
}