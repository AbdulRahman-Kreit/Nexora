"use client";
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ChartDataLabels
);

const chartData = [
    { country: "United States", revenue: 52000000 },
    { country: "Canada", revenue: 14000000 },
    { country: "France", revenue: 5000000 },
    { country: "United Kingdom", revenue: 4000000 },
    { country: "Germany", revenue: 2000000 },
    { country: "Brazil", revenue: 2000000 },
];

export default function RevenueByCountryChart() {
    const bgMaxValue = 80000000;

    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    
    useEffect(() => {
        const chart = chartRef.current;
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    const data = {
        labels: chartData.map(item => item.country),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map(item => item.revenue),
                backgroundColor: '#006fff',
                borderRadius: 5,
                barThickness: 25,
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
                label: 'Total Revenue',
                data: chartData.map(() => bgMaxValue),
                backgroundColor: '#12243c',
                borderRadius: 5,
                barThickness: 25,
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
                formatter: (value) => `${value / 1000000}M`,
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
                Revenue by Country
            </h2>
            <div className="h-full w-full">
                <Bar 
                    key="revenue-by-country-bar-chart" 
                    data={data} 
                    options={options} />
            </div>
        </div>
    )
}