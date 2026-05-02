"use client";
import { useReports } from "@/contexts/ReportsProvider";
import ReportDisplay from "./ReportDisplay";

export default function ReportsList() {
    const { reports } = useReports();
    return (
        <div className="flex flex-col gap-4 mt-8">
            {reports.map((report, index) => (
                <ReportDisplay key={index} content={report} />
            ))}
        </div>
    );
}