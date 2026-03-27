import type { Metadata } from "next";
import "../../globals.css";
import Statistics from "@/components/products-analysis/Statistics";
import SectionSwitcher from "@/components/products-analysis/SectionSwitcher";


export const metadata: Metadata = {
  title: "Nexora",
  description: "The next generation of business analytics & data visualization",
};

export default function ProductsAnalysisLayout(props: { 
  children: React.ReactNode,
  "cost-and-gm": React.ReactNode, 
  "revenue-and-profit": React.ReactNode, 
  "top-products-by-total-orders": React.ReactNode, 
  "top-products-by-aov-and-gm": React.ReactNode,
}) {
  const { 
    children, 
    "cost-and-gm": costAndGM, 
    "revenue-and-profit": revenueAndProfit, 
    "top-products-by-total-orders": topProductsByTotalOrders, 
    "top-products-by-aov-and-gm": topProductsByAOVandGM
  } = props;

  return (
    <section className="flex-1 flex flex-col overflow-y-auto pb-20">
      {children}
      
      <div className="flex flex-col lg:flex-row w-full gap-4 p-4">
        
        <div className="flex-1 flex flex-col gap-4 transition-all duration-500">
          
          <div className="w-full">
            <Statistics />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="p-4 min-h-[400px]">
              {costAndGM}
            </div>
            <div className="py-4 min-h-[400px]">
              {revenueAndProfit}
            </div>
            
            <div className="p-4">
              {topProductsByTotalOrders}
            </div>

            <div className="p-4 md:col-span-2 lg:col-span-3 min-h-[400px]">
              {topProductsByAOVandGM}
            </div>
          </div>
        </div>

        <div className="lg:w-auto">
          <SectionSwitcher />
        </div>

      </div>
    </section>
  );
}