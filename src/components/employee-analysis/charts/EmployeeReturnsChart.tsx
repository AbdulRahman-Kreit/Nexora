"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import TopEmployeesSkeleton from '../skeletal-loading/TopEmployeeSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ChartDataLabels
);


export default function EmployeeReturnsChart() {
    const bgMaxValue = 100;
        
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
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
        fetchFromAPI('returns-by-employee').then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, []);
    
    if (loading) return <TopEmployeesSkeleton />;
    
    const data = {
        labels: chartData.map(item => item.employee),
        datasets: [
            {
                label: 'Sales',
                data: chartData.map(item => item.returned_orders),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 20,
                order: 1,
                animations: {
                x: {
                    duration: 2000,
                    easing: 'easeOutQuart',
                    type: 'number',
                    from: (context: any) => {
                        if (context.type === 'data' && context.datasetIndex === 0) {
                                return context.chart.scales.x.getPixelForValue(0);
                            }
                            return undefined;
                        }
                    }
                },
            },
            {
                label: 'Total Sales',
                data: chartData.map(() => bgMaxValue),
                backgroundColor: '#12243c',
                borderRadius: 5,
                barThickness: 20,
                order: 2, 
                datalabels: { display: false } 
            }
        ]
    };
    
    const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    grouped: false, 
    animation: {
        duration: 2000,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: { display: false },
            datalabels: {
            anchor: 'end',
            align: 'right',
            color: '#006fff',
                font: { weight: 600 },
                formatter: (value: number) => {
                    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                    return value;
                },
                offset: 5,
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                max: bgMaxValue 
            },
            y: {
                grid: { display: false },
                ticks: { color: '#006fff', font: { weight: 600 } },
                border: { display: false }
            }
        },
        layout: {
            padding: { right: 5 }
        }
    }
        
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Order Returned by Employee
            </h2>
            <div className="h-full w-full pb-5">
                <Bar 
                    key="employee-returns-chart" 
                    data={data} 
                    options={options} />
            </div>
        </div>
    )
}
