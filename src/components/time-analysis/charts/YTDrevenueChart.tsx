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
    { month: "Jan", value: 12200000 },
    { month: "Feb", value: 8900000 },
    { month: "Mar", value: 7200000 },
    { month: "Apr", value: 8900000 },
    { month: "May", value: 13800000 },
    { month: "Jun", value: 4700000 },
    { month: "Jul", value: 9300000 },
    { month: "Aug", value: 11800000 },
    { month: "Sep", value: 5900000 },
    { month: "Oct", value: 10400000 },
    { month: "Nov", value: 9400000 },
    { month: "Dec", value: 5900000 },
];

export default function YTDrevenueChart() {
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
                font: { weight: 'bold' as const },
                formatter: (value: any) => Math.round(value / 1000000) + 'M' // التنسيق المطلوب
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#006fff', font: { weight: 600 } }
            },
            y: {
                grid: { display: false },
                ticks: { display: false },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="bg-linear-to-r from-[#151a21] to-[#161616] p-6 h-96 border-l-3 border-[#4a7fce]">
            <h2 className="text-gray-500 font-semibold mb-4">YTD Revenue</h2>
            <div className="min-h-[300px] w-full">
                <Line key="ytd-revenue-chart" data={data} options={options} />
            </div>
        </div>
    )
}
