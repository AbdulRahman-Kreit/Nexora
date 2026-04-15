"use client";
import React, { useState, useEffect } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RevenueOverTimeSkeleton from '../skeletal-loading/RevenueOverTimeSkeleton';

export default function RevenueOverTimeTable() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openYears, setOpenYears] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://analysis.laraveladvancedsayed101.cloud/api/admin/time-analysis/table');
                const result = await response.json();
                
                setTableData(result);

                const uniqueYears = [...new Set(result.map(item => item.year.toString()))];
                setOpenYears(uniqueYears);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleYear = (year) => {
        setOpenYears(prev => 
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    if (isLoading) return <RevenueOverTimeSkeleton />;
    
    return (
        <div className="bg-[#006fff] p-6 max-h-[500px] flex flex-col shadow-2xl text-white rounded-xl relative overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar {
                    scrollbar-width: thin !important;
                    scrollbar-color: rgba(255, 255, 255, 0.4) transparent !important;
                    overflow-y: auto !important;
                }
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 10px;
                }
            `}} />

            <div className="scroll-container custom-scrollbar">
                <table className="w-full text-center border-collapse">
                    <thead className="sticky top-0 z-20 bg-[#006fff]">
                        <tr className="text-sm font-bold">
                            <th className="pb-4 px-4 w-[25%] border-b-2 border-white/30 text-left bg-[#006fff]">Year</th>
                            <th className="pb-4 px-4 text-center w-[25%] border-b-2 border-white/30 bg-[#006fff]">Revenue</th>
                            <th className="pb-4 px-4 text-center w-[25%] border-b-2 border-white/30 bg-[#006fff]">MOM</th>
                            <th className="pb-4 px-4 text-center w-[25%] border-b-2 border-white/30 bg-[#006fff]">Var from the same time</th>
                        </tr>
                    </thead>

                    <tbody className="text-[13px]">
                        {
                            tableData.map((row, index) => {
                                const yearStr = row.year.toString();
                                const isOpen = openYears.includes(yearStr);
                                
                                const isFirstMonthOfYear = index === 0 || tableData[index - 1].year !== row.year;

                                return (
                                    <React.Fragment key={index}>
                                        {isFirstMonthOfYear && (
                                            <tr 
                                                onClick={() => toggleYear(yearStr)}
                                                className="bg-white/10 font-bold cursor-pointer transition-colors hover:bg-white/20"
                                            >
                                                <td className="py-3 px-4 text-left">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-4 flex justify-center transition-transform duration-200" 
                                                            style={{ transform: !isOpen ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
                                                            <FontAwesomeIcon icon={faChevronDown} className="text-[12px]" />
                                                        </div>
                                                        <span>{row.year}</span>
                                                    </div>
                                                </td>
                                                
                                                <td className="py-3 px-4 text-center">-</td>
                                                <td className="py-3 px-4 text-center">-</td>
                                                <td className="py-3 px-4 text-center">-</td>
                                            </tr>
                                        )}

                                        {isOpen && (
                                            <tr className={`${index % 2 === 0 ? 'transparent' : 'bg-[#3f8ef4]'} transition-colors hover:bg-white/20`}>
                                                <td className="py-3 px-4 text-left pl-10">
                                                    {row.month}
                                                </td>
                                                <td className="py-3 px-4 text-center font-medium">
                                                    {Number(row.revenue).toLocaleString('en-US')} $
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {row.mom}
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {row.var_from_same || '-'}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}