/* eslint-disable react-hooks/purity */
import type { Metadata } from "next";
import "../../globals.css";
import Statistics from "@/components/products-analysis/Statistics";
import SectionSwitcher from "@/components/products-analysis/SectionSwitcher";
import TimelineFilter from "@/components/products-analysis/TimelineFilter";

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
    <section className="flex flex-col h-screen overflow-hidden relative">
      
      <div className="flex-1 overflow-y-auto pb-10">
        {children}
        
        <div className="flex flex-col lg:flex-row w-full gap-4 relative">
          
          <div className="flex-1 flex flex-col gap-4 transition-all duration-500">
            
            <div className="w-3/4">
              <Statistics />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-4 min-h-[400px]">
                {costAndGM}
              </div>
              <div className="py-4 min-h-[400px]">
                {revenueAndProfit}
              </div>
              
              <div className="p-4">
                {topProductsByTotalOrders}
              </div>

              <div className="p-4 md:col-span-2 lg:col-span-2 min-h-[400px]">
                {topProductsByAOVandGM}
              </div>
            </div>
          </div>
          
          <div className="lg:w-auto absolute right-5 top-3 z-50">
            <SectionSwitcher />
          </div>

        </div>
      </div>

      
      <div className="w-full 50">
          <TimelineFilter />
      </div>

    </section>
  );
}