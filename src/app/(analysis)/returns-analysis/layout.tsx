import type { Metadata } from "next";
import "../../globals.css";

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
    <section className="flex-1 flex flex-col overflow-y-auto pb-20">
      {children}
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px w-full">
        
        <div className="p-4 min-h-[400px]">
          {customerReturnsByRegion}
        </div>

        <div className="p-4 min-h-[400px]">
          {orderReturnsBySubcategory}
        </div>

        <div className="p-4 min-h-[400px]">
          {customerReturnsByMonth}
        </div>

        <div className="p-4 min-h-[400px]">
          {OrderReturnsByMonth}
        </div>

      </section>
    </section>
  );
}