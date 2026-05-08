import type { Metadata } from "next";
import Sidebar from "@/components/general-components/Sidebar";
import PageHeading from "@/components/general-components/PageHeading";
import InputSection from "@/components/reports/InputSection";
import ReportsList from "@/components/reports/ReportsList";
import { ReportsProvider } from "@/contexts/ReportsProvider";

export const metadata: Metadata = {
    title: "Nexora",
};

export const runtime = 'edge';

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReportsProvider>
            <main className="grid grid-cols-[250px_1fr] h-screen w-full bg-[#161616] overflow-hidden">
                <Sidebar />
                
                <div className="flex flex-col h-full bg-(--main-bg-color) relative overflow-hidden">
                    <PageHeading />
                    
                    <section className="flex-1 overflow-y-auto pb-32">
                        {children}
                        
                        <div className="max-w-225 mx-auto w-full">
                            <ReportsList />
                        </div>
                    </section>

                    <div className="absolute bottom-0 left-0 w-full p-6 bg-linear-to-t from-(--main-bg-color) via-(--main-bg-color)/90 to-transparent z-50 flex justify-center pointer-events-none">
                        <div className="w-full max-w-175 pointer-events-auto">
                            <InputSection />
                        </div>
                    </div>
                </div>
            </main>
        </ReportsProvider>
    );
}