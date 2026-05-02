"use client";
import React, { useState } from 'react';
import { faAngleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { useReports } from '@/contexts/ReportsProvider';


export default function InputSection() {
    const [days, setDays] = useState<number>(7);
    const [loading, setLoading] = useState<boolean>(false);
    const { addReport } = useReports();

    const handleGenerate = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await fetchFromAPI("send the days", { days });
            if (data?.content) {
                addReport(data.content);
            }
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between gap-3 px-8 py-4 bg-(--side-bar-bg-color) 
            w-full rounded-2xl font-semibold shadow-2xl border border-white/5">
            <div className="flex items-center gap-3">
                <span className="text-(--main-text-color)">Generate report for the last</span>
                <input 
                    type="number" 
                    value={days}
                    min={7}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="bg-(--field-bg-color) text-(--main-text-color) border-2 border-(--main-text-color) rounded-md p-2 w-[80px] text-center outline-none" 
                />
                <span className="text-(--main-text-color)">days</span>
            </div>
            <button onClick={handleGenerate} disabled={loading} className="bg-[#006fff] text-white rounded-full w-10 h-10 hover:bg-[#0056c7] transition-colors">
                <FontAwesomeIcon icon={loading ? faSpinner : faAngleRight} className={loading ? 'animate-spin' : ''} />
            </button>
        </div>
    );
}