/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchFromAPI } from '@/data/fetchFromAPI'; 
import RevenueOverTimeSkeleton from '../skeletal-loading/RevenueOverTimeSkeleton';

export const runtime = 'edge';

export default function RevenueOverTimeTable() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openYears, setOpenYears] = useState([]);

    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', { month: 'long' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                const result = await fetchFromAPI('Time Analysis/table');
                
                setTableData(result);

                const uniqueYears = [...new Set(result.map((item: any) => item.year.toString()))];
                setOpenYears(uniqueYears);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleYear = (year: string) => {
        setOpenYears(prev => 
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    if (isLoading) return <RevenueOverTimeSkeleton />;
    
    return (
        <div className="bg-[#006fff] p-6 h-200 flex flex-col shadow-2xl text-white rounded-xl relative overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar {
                    scrollbar-width: thin !important;
                    scrollbar-color: rgba(255, 255, 255, 0.4) transparent !important;
                    overflow: auto !important; 
                }
                .custom-scrollbar::-webkit-scrollbar { 
                    width: 5px; 
                    height: 5px; 
                }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 10px;
                }
            `}} />

            <div className="scroll-container custom-scrollbar overflow-x-auto w-full">
                <table className="w-full text-center border-collapse min-w-200">
                    <thead className="sticky top-0 z-20 bg-[#006fff]">
                        <tr className="text-sm font-bold">
                            <th className="pb-4 px-4 w-[33%] border-b-2 border-white/30 text-left bg-[#006fff]">Year / Month</th>
                            <th className="pb-4 px-4 text-center w-[33%] border-b-2 border-white/30 bg-[#006fff]">Revenue</th>
                            <th className="pb-4 px-4 text-center w-[33%] border-b-2 border-white/30 bg-[#006fff]">MOM %</th>
                        </tr>
                    </thead>

                    <tbody className="text-[13px]">
                        {
                            tableData.map((row: any, index: number) => {
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
                                            </tr>
                                        )}

                                        {isOpen && (
                                            <tr className={`${index % 2 === 0 ? 'transparent' : 'bg-[#3f8ef4]'} transition-colors hover:bg-white/20`}>
                                                <td className="py-3 px-4 text-left pl-10">
                                                    {getMonthName(row.month)}
                                                </td>
                                                <td className="py-3 px-4 text-center font-medium">
                                                    {Number(row.revenue).toLocaleString('en-US')} $
                                                </td>
                                                <td className="py-3 px-4 text-center">
                                                    {row.mom_pct_revenue !== null ? `${row.mom_pct_revenue}%` : '-'}
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