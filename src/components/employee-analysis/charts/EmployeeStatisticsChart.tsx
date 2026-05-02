"use client"; 
import React, { useState, useEffect } from 'react';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EmployeeStatisticsChart() {
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchFromAPI('Employee Analysis/table');
                setTableData(data || []);
            } catch (err) {
                console.error(`API Error: ${err}`);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const filteredData = tableData.filter((row) =>
        row.employee.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div className="p-10 text-white text-center">Loading statistics...</div>;
    }

    if (error) {
        return <div className="p-10 text-red-500">Failed to load statistics. Session may be expired.</div>;
    }

    if (!tableData || tableData.length === 0) {
        return <div className="p-10 text-white text-center">No statistics available.</div>;
    }

    return (
        <div className="bg-[#006fff] p-6 h-[800px] flex flex-col shadow-2xl text-white rounded-xl relative overflow-hidden">
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

            <div className="mb-6 relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                    <FontAwesomeIcon icon={faSearch}/>
                </span>
                <input
                    type="text"
                    placeholder="Search for an employee by name..."
                    className="w-full p-2 pl-10 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/50 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

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
                        {filteredData.length > 0 ? (
                            filteredData.map((row: any, index: number) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-10 text-center text-white/50">
                                    No employees match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}