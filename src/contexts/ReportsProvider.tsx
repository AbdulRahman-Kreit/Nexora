"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ReportsContextType {
    reports: string[];
    addReport: (content: string) => void;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: React.ReactNode }) {
    const [reports, setReports] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('reports_history');
        if (saved) {
            try { setReports(JSON.parse(saved)); } catch (e) { setReports([]); }
        }
    }, []);

    const addReport = (content: string) => {
        const updated = [...reports, content];
        setReports(updated);
        localStorage.setItem('reports_history', JSON.stringify(updated));
    };

    return (
        <ReportsContext.Provider value={{ reports, addReport }}>
            {children}
        </ReportsContext.Provider>
    );
}

export const useReports = () => {
    const context = useContext(ReportsContext);
    if (!context) throw new Error("useReports must be used within a ReportsProvider");
    return context;
};