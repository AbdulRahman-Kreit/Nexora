import type { Metadata } from "next";
import "../../globals.css";

import TimelineFilter from "@/components/returns-analysis/TimelineFilter";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function ReturnsAnalysisLayout(props: { 
  children: React.ReactNode,
  "customer-returns-by-region": React.ReactNode,
  "order-returns-by-subcategory": React.ReactNode,
  "customer-returns-by-month": React.ReactNode,
  "order-returns-by-month": React.ReactNode,
}) {
  const { 
    children, 
    "customer-returns-by-region": customerReturnsByRegion, 
    "order-returns-by-subcategory": orderReturnsBySubcategory, 
    "customer-returns-by-month": customerReturnsByMonth, 
    "order-returns-by-month": OrderReturnsByMonth 
  } = props;

  return (
    <section className="flex flex-col h-screen overflow-hidden"> 
      
      <div className="flex-1 overflow-y-auto p-4 pb-10">
        {children}
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="min-h-[400px]">{customerReturnsByRegion}</div>
          <div className="min-h-[400px]">{orderReturnsBySubcategory}</div>
          <div className="min-h-[400px]">{customerReturnsByMonth}</div>
          <div className="min-h-[400px]">{OrderReturnsByMonth}</div>
        </section>
      </div>
    
      <div className="w-full z-50">
        <TimelineFilter />
      </div>
    </section>
  );
}