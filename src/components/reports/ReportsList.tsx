"use client";
import React, { memo } from 'react';
import { useReports } from "@/contexts/ReportsProvider";
import ReportDisplay from "./ReportDisplay";

const ReportsList = memo(function ReportsList() {
    const { reports } = useReports();
    return (
        <div className="flex flex-col gap-4 mt-8">
            {reports.map((report, index) => (
                <ReportDisplay key={index} index={index} content={report} createdAt={''} />
            ))}
        </div>
    );
});

export default ReportsList;