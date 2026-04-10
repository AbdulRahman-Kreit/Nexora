"use client";
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartDataLabels
);

const chartDataValues = [
    { month: "Jan", value: 22 },
    { month: "Feb", value: 80 },
    { month: "Mar", value: 72 },
    { month: "Apr", value: 89 },
    { month: "May", value: 118 },
    { month: "Jun", value: 47 },
    { month: "Jul", value: 93 },
    { month: "Aug", value: 100 },
    { month: "Sep", value: 59 },
    { month: "Oct", value: 104 },
    { month: "Nov", value: 94 },
    { month: "Dec", value: 50 },
];

export default function OrderReturnsByMonthChart() {
    const chartRef = useRef<ChartJS<'line'> | null>(null);
        
        useEffect(() => {
            const chart = chartRef.current;
            return () => {
                if (chart) {
                    chart.destroy();
                }
            };
        }, []);

    
    const data = {
        labels: chartDataValues.map((item) => item.month),
        datasets: [
        {
            label: 'Customer Returns',
            data: chartDataValues.map((item) => item.value),
            fill: true,
            tension: 0.4,
            borderColor: '#006fff',
            borderWidth: 2,
            backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'transparent';
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(0, 111, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 111, 255, 0)');
            return gradient;
            },
            pointRadius: 6,
            pointBackgroundColor: '#006fff',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: 'rgba(0, 111, 255, 0.8)',
            pointHoverBorderWidth: 2,
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
        legend: { display: false },
        tooltip: {
            mode: 'index' as const,
            intersect: false,
        },
        datalabels: {
            display: true,
            align: 'top' as const,
            offset: 8,
            color: '#ffffff',
            font: { weight: 'bold' as const }
        }
        },
        scales: {
        x: {
            grid: { display: false },
            ticks: { color: '#006fff', font: { weight: 600 } }
        },
        y: {
            grid: { display: false },
            ticks: { color: '#006fff', font: { weight: 600 } },
            beginAtZero: true,
        },
        },
    };
        
    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] p-6 h-96 border-l-3 border-[#4a7fce]">
        <h2 className="text-gray-500 font-semibold mb-4">Order Returns by Month</h2>
        <div className="min-h-[300px] w-full">
            <Line key="order-returns-by-month-chart" data={data} options={options} />
        </div>
        </div>
    );
}
