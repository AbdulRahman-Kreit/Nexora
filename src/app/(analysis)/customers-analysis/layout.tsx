import type { Metadata } from "next";
import "../../globals.css";

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
    <section className="flex-1 flex flex-col overflow-y-auto pb-20">
      {children}
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px w-full">
        
        <div className="p-4 min-h-[400px]">
          {orderFrequency}
        </div>

        <div className="p-4 min-h-[400px]">
          {churnAnalysis}
        </div>

        <div className="p-4 min-h-[400px]">
          {profitAndCustomers}
        </div>

        <div className="p-4 min-h-[400px]">
          {customersWithoutOrders}
        </div>

      </section>
    </section>
  );
}