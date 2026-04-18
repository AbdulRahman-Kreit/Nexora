import type { Metadata } from "next";
import "../../globals.css";

import TimelineFilter from "@/components/customers-analysis/TimelineFilter";

export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function CustomersAnalysisLayout(props: { 
  children: React.ReactNode,
  "order-frequency": React.ReactNode,
  "churn-analysis": React.ReactNode,
  "profit-and-customers": React.ReactNode,
  "customers-without-orders": React.ReactNode,
}) {
  const { 
    children, 
    "order-frequency": orderFrequency, 
    "churn-analysis": churnAnalysis, 
    "profit-and-customers": profitAndCustomers, 
    "customers-without-orders": customersWithoutOrders 
  } = props;

  return (
    <section className="flex flex-col h-screen overflow-hidden"> 
  
      <div className="flex-1 overflow-y-auto pb-10">
        {children}
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full py-4 pl-4">
          <div className="min-h-[400px] gap-4">{orderFrequency}</div>
          <div className="min-h-[400px] gap-4">{churnAnalysis}</div>
          <div className="min-h-[400px] gap-4">{profitAndCustomers}</div>
          <div className="min-h-[400px] gap-4">{customersWithoutOrders}</div>
        </section>
      </div>

      <div className="w-full z-50">
        <TimelineFilter />
      </div>
    </section>
  );
}