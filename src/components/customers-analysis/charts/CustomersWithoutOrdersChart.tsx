/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import CustomersWithoutOrdersSkeleton from '../skeletal-loading/CustomersWithoutOrdersSkeleton';
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


const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

export default function CustomersWithoutOrdersChart() {
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
        fetchFromAPI('No Sales By Region').then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, []);
        
    if (loading) return <CustomersWithoutOrdersSkeleton />;
    

    const handleChageBarColors = chartData.map(() => {
        return barColors[Math.floor(Math.random() * barColors.length)];
    });

    const data = {
        labels: chartData.map(item => item.region),
        datasets: [
            {
                label: 'Order Frequency',
                data: chartData.map(item => item.customers_without_orders),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 25,
            }
        ]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
        animations: {
            y: {
                duration: 2000,
                easing: 'easeOutQuart',
                type: 'number',
                from: (context: any) => {
                    if (context.type === 'data') {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: { display: false, },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#cbd5e1',
                font: { weight: 600, size: 14 },
                offset: 1,
            },
        },
        scales: {
            y: {
                title: { display: false }, 
                grid: { display: false },
                ticks: { display: false }
            },
            x: {
                title: { display: false }, 
                grid: { display: false },
                ticks: { color: '#006fff', font: { size: 14, weight: 600 } }
            }
        },
    };
    
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Customers without Orders by Region
            </h2>
            <div className="h-full w-full">
                <Bar key="customers-without-orders-chart" data={data} options={options} />
            </div>
        </div>
    )
}
