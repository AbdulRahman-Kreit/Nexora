/* eslint-disable react-hooks/purity */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import CustomersWithoutOrdersSkeleton from '../skeletal-loading/CustomersWithoutOrdersSkeleton';
import { fetchFromAPI } from "@/data/fetchFromAPI";
import { useFilter } from "@/contexts/FilterProvider";

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
    const { days } = useFilter(); 
    const chartRef = useRef<ChartJS<'bar'> | null>(null);
    const [chartData, setchartData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    const [currentThemeColor, setCurrentThemeColor] = useState('#006fff');

    const getCSSVariable = (variable: string) => {
        if (typeof window !== 'undefined') {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        }
        return '';
    };

    useEffect(() => {
        const updateTheme = () => {
            const color = getCSSVariable('--main-text-color') || '#006fff';
            setCurrentThemeColor(color);
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setLoading(true); 
        fetchFromAPI('No Sales By Region', { days }) 
            .then(data => {
                setchartData(data.regionsWithoutSales || []);
                setLoading(false);
            })
            .catch(error => {
                console.error(`API Error: ${error}`);
                setLoading(false);
            });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [days]); 

    if (loading) return <CustomersWithoutOrdersSkeleton />;

    const handleChageBarColors = chartData.map((_, index) => {
        return barColors[index % barColors.length];
    });

    const data = {
        labels: chartData.map(item => item.region),
        datasets: [
            {
                label: 'Customers without Orders',
                data: chartData.map(() => 1),
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
            easing: 'easeOutQuart' as const,
        },
        animations: {
            y: {
                duration: 2000,
                easing: 'easeOutQuart' as const,
                type: 'number' as const,
                from: (context: any) => {
                    if (context.type === 'data') {
                        return context.chart.scales.y.getPixelForValue(0);
                    }
                }
            }
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end' as const,
                align: 'top' as const,
                color: currentThemeColor, 
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
                ticks: { 
                    color: currentThemeColor, 
                    font: { size: 14, weight: 600 } 
                }
            }
        },
    };

    return (
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold">
                Customers without Orders by Region
            </h2>
            <div className="h-full w-full py-5">
                <Bar key={`${currentThemeColor}-${days}`} data={data} options={options as any} />
            </div>
        </div>
    );
}