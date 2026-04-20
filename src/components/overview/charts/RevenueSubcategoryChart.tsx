"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import RevenueByBusinessSkeleton from '../skeletal-loading/RevenueBySubcategorySkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);



export default function RevenueByBusinessTypeChart() {
    const chartRef = useRef<ChartJS<'doughnut'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
        
        useEffect(() => {
            const chart = chartRef.current;
            return () => {
                if (chart) {
                    chart.destroy();
                }
            };
        }, []);

    useEffect(() => {
            fetchFromAPI('GM By Business Type').then(data => {
                const result = Array.isArray(data) ? data : (data?.data || []);
                setchartData(result);
                setLoading(false);
            }).catch(error => {
                console.error(`API Error: ${error}`);
                setLoading(false);
            })
        }, []);

    if (loading) return <RevenueByBusinessSkeleton />;

    const data = {
        labels: chartData.map(item => item.business_type),
        datasets: [
            {
                data: chartData.map(item => parseInt(item.gm_percent)),
                backgroundColor: ['#e1ffff', '#69b4ff', '#006fff'],
                borderWidth: 0,
                cutout: '55%',
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom', 
                labels: {
                    color: '#cbd5e1',
                    padding: 20,
                    usePointStyle: true, 
                    font: { size: 12, weight: '600' }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.business_type || '';
                        const value = context.formattedValue;
                        return ` ${label}: ${value}%`;
                    }
                }
            },
            datalabels: {
                display: true,
                color: '#161616',
                font: { weight: 'bold', size: 12 },
                formatter: (value: unknown) => `${value}%`,
                anchor: 'center',
                align: 'center',
            },
        },
        layout: {
            padding: {
                top: 10,
                bottom: 10,
            }
        }
    };

    return (
        <div className="bg-[#151a21] p-6 h-96 border-l-3 border-[#4a7fce] rounded-r-lg">
            <h2 className="text-gray-500 font-semibold mb-4">
                Revenue by Subcategory
            </h2>
            <div className="h-[280px] w-full">
                <Doughnut 
                    key="revenue-by-business-type-doughnut-chart"
                    data={data} 
                    options={options} />
            </div>
        </div>
    );
}