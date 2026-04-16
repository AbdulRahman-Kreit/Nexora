"use client";
import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '@/data/fetchFromAPI';

export default function EmployeeStatisticsChart() {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFromAPI('Employee Analysis/table').then(data => {
            setTableData(data || []);
            setIsLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <div className="p-10 text-white">Loading Statistics...</div>;

    return (
        <div className="bg-[#006fff] p-6 max-h-[500px] flex flex-col shadow-2xl text-white rounded-xl relative overflow-hidden">
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
                <table className="w-full text-center border-collapse min-w-[800px]"> 
                    <thead className="sticky top-0 z-20 bg-[#006fff]">
                        <tr className="text-sm font-bold border-b-2 border-white/30">
                            <th className="pb-4 px-4 text-left whitespace-nowrap bg-[#006fff]">Employee Name</th>
                            <th className="pb-4 px-4 whitespace-nowrap bg-[#006fff]">Total Orders</th>
                            <th className="pb-4 px-4 whitespace-nowrap bg-[#006fff]">Total Sales</th>
                            <th className="pb-4 px-4 whitespace-nowrap bg-[#006fff]">Total Discounts</th>
                            <th className="pb-4 px-4 whitespace-nowrap bg-[#006fff]">Discounts %</th>
                            <th className="pb-4 px-4 whitespace-nowrap bg-[#006fff]">Total Commission</th>
                        </tr>
                    </thead>

                    <tbody className="text-[13px]">
                        {tableData.map((row, index) => (
                            <tr 
                                key={index} 
                                className={`${index % 2 === 0 ? 'bg-transparent' : 'bg-white/10'} transition-colors hover:bg-white/20`}
                            >
                                <td className="py-3 px-4 text-left font-medium whitespace-nowrap">
                                    {row.employee}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    {row.total_orders}
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    {Number(row.total_sales).toLocaleString('en-US')} $
                                </td>
                                <td className="py-3 px-4 text-red-100 whitespace-nowrap">
                                    {Number(row.total_discount).toLocaleString('en-US')} $
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                    {parseFloat(row.discount_percent).toFixed(2)}%
                                </td>
                                <td className="py-3 px-4 font-bold text-green-100 whitespace-nowrap">
                                    {Number(row.total_commision).toLocaleString('en-US')} $
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}