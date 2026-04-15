import type { Metadata } from "next";
import "../../globals.css";

import TimelineFilter from "@/components/returns-analysis/TimelineFilter";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function ReturnsAnalysisLayout(props: { 
  children: React.ReactNode,
  "ytd-revenue": React.ReactNode,
  "revenue-by-month": React.ReactNode,
  "revenue-over-time": React.ReactNode,
}) {
  const { 
    children, 
    "ytd-revenue": ytdRevenue, 
    "revenue-by-month": revenueByMonth, 
    "revenue-over-time": revenueOverTime, 
  } = props;

  return (
    <section className="flex flex-col h-screen overflow-hidden"> 
      
      <div className="flex-1 overflow-y-auto p-4 pb-10">
        {children}
        
        <section className="grid grid-cols-2 gap-4 w-full py-10 pl-4">
          
          <div className="flex flex-col gap-4">
            <div className="min-h-[400px]">{ytdRevenue}</div>
            <div className="min-h-[400px]">{revenueByMonth}</div>
          </div>
          
          <div className="h-full">
            <div className="h-full min-h-[816px]">{revenueOverTime}</div>
          </div>

        </section>
      </div>
  
      <div className="w-full z-50">
        <TimelineFilter />
      </div>
    </section>
  );
}