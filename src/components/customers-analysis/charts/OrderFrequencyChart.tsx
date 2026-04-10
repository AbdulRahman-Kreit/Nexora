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
    { numberOfOrders: 1, customers: 30 },
    { numberOfOrders: 2, customers: 20 },
    { numberOfOrders: 3, customers: 38 },
    { numberOfOrders: 4, customers: 235 },
    { numberOfOrders: 5, customers: 20 },
    { numberOfOrders: 6, customers: 21 },
    { numberOfOrders: 7, customers: 34 },
    { numberOfOrders: 8, customers: 145 },
    { numberOfOrders: 9, customers: 10 },
    { numberOfOrders: 10, customers: 8 },
    { numberOfOrders: 11, customers: 10 },
    { numberOfOrders: 12, customers: 64 },
];

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

const handleChageBarColors = chartData.map(() => {
    return barColors[Math.floor(Math.random() * barColors.length)];
});

export default function OrderFrequencyChart() {
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
        labels: chartData.map(item => item.numberOfOrders),
        datasets: [
            {
                label: 'Order Frequency',
                data: chartData.map(item => item.customers),
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
                color: '#006fff',
                font: { weight: 600, size: 14 },
                offset: 1,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Customers',
                    color: '#006fff',
                    font: {
                        weight: 600,
                        size: 14,
                    },
                    padding: { bottom: 10 }
                }, 
                grid: { display: false },
                ticks: { display: false }
            },
            x: {
                title: {
                    display: true,
                    text: 'No. of Orders',
                    color: '#006fff',
                    font: {
                        weight: 600,
                        size: 14,
                    },
                    padding: { top: 10 }
                }, 
                grid: { display: false },
                ticks: { color: '#cbd5e1', font: { size: 14 } }
            }
        },
        layout: {
            padding: {
                bottom: 20,
                left: 10,
                right: 10,
                top: 20,
            }
        }
    };

    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Order Frequency
            </h2>
            <div className="h-full w-full">
                <Bar key="order-frequency-chart" data={data} options={options} />
            </div>
        </div>
    )
}
