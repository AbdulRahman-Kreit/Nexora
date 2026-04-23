import type { Metadata } from "next";
import "../../globals.css";

import TimelineFilter from "@/components/employee-analysis/TimelineFilter";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function TimeAnalysisLayout(props: { 
  children: React.ReactNode,
  "top-employees": React.ReactNode,
  "employee-returns": React.ReactNode,
  "employee-statistics": React.ReactNode,
}) {
  const { 
    children, 
    "top-employees": topEmployees, 
    "employee-returns": employeeReturns, 
    "employee-statistics": employeeStatistics, 
  } = props;

  return (
    <section className="flex flex-col h-screen bg-(--main-bg-color) overflow-hidden"> 
      
      <div className="flex-1 overflow-y-auto pb-10">
        {children}
        
        <section className="grid grid-cols-2 gap-4 w-full py-4 pl-4">
          
          <div className="flex flex-col gap-4">
            <div className="min-h-[400px]">{topEmployees}</div>
            <div className="min-h-[400px]">{employeeReturns}</div>
          </div>
          
          <div className="h-full mx-4 pr-4">
            <div className="h-full min-h-[816px]">{employeeStatistics}</div>
          </div>

        </section>
      </div>
  
      <div className="w-full z-50">
        <TimelineFilter />
      </div>
    </section>
  );
}