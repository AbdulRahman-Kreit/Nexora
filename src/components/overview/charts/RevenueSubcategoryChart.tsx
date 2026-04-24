"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import RevenueBySubcategorySkeleton from '../skeletal-loading/RevenueBySubcategorySkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';
import { useFilter } from '@/contexts/FilterProvider';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function RevenueBySubcategory() {
    const { days } = useFilter(); 
    const chartRef = useRef<ChartJS<'doughnut'> | null>(null);
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
        fetchFromAPI('GM By Business Type', { days }).then(data => { 
            const result = Array.isArray(data) ? data : (data?.data || []);
            setchartData(result);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, [days]); 

    useEffect(() => {
        const chart = chartRef.current;
        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, []);

    if (loading) return <RevenueBySubcategorySkeleton />;

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
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const, 
                labels: {
                    color: currentThemeColor,
                    padding: 20,
                    usePointStyle: true, 
                    font: { size: 12, weight: '600' }
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || '';
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
                anchor: 'center' as const,
                align: 'center' as const,
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
        <div className={`bg-main-gradient ml-1 p-6 h-96 border-l-3 border-[#4a7fce] rounded-r-lg transition-all duration-500`}>
            <h2 className="text-(--alt-text-color) font-semibold mb-4">
                Revenue by Subcategory
            </h2>
            <div className="h-[280px] w-full">
                <Doughnut 
                    ref={chartRef}
                    key={`${currentThemeColor}-${days}`} 
                    data={data} 
                    options={options as any} />
            </div>
        </div>
    );
}