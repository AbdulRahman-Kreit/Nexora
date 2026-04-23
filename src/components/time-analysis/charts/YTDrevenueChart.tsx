"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { fetchFromAPI } from '@/data/fetchFromAPI';

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

const monthMapping: { [key: number]: string } = {
    1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
    7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
};

export default function YTDrevenueChart() {
    const chartRef = useRef<ChartJS<'line'> | null>(null);
    const [chartDataValues, setChartDataValues] = useState<{ month: string, value: number }[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(true);

    // مراقبة تغيير الثيم
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchFromAPI('Time Analysis/getRevenueYtd Copy');
                if (Array.isArray(result)) {
                    const formattedData = result.map((item: any) => ({
                        month: monthMapping[item.month] || `M${item.month}`,
                        value: Number(item.revenue)
                    }));
                    setChartDataValues(formattedData);
                }
            } catch (error) {
                console.error("Error fetching YTD Revenue:", error);
            }
        };

        loadData();

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
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
                pointBorderColor: isDarkMode ? '#ffffff' : '#151a21',
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
        animations: {
            y: {
                type: 'number' as const,
                duration: 2000,
                easing: 'easeOutQuart' as const,
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
                color: isDarkMode ? '#ffffff' : '#006fff',
                font: { weight: 'bold' as const },
                formatter: (value: any) => {
                    if (value >= 1000000) return Math.round(value / 1000000) + 'M';
                    if (value >= 1000) return Math.round(value / 1000) + 'K';
                    return value;
                }
            },
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
        <div className="bg-main-gradient p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500">
            <h2 className="text-gray-500 font-semibold mb-4">YTD Revenue</h2>
            <div className="min-h-[300px] w-full">
                <Line 
                    ref={chartRef} 
                    key={`${isDarkMode}-${JSON.stringify(chartDataValues)}`} 
                    data={data} 
                    options={options as any} 
                />
            </div>
        </div>
    );
}