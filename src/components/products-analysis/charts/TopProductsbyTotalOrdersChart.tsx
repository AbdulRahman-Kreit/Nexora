/* eslint-disable react-hooks/purity */
import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import TopProductsbyTotalOrdersSkeleton from '../skeletal-loading/TopProductsbyTotalOrdersSkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function TopProductsbyTotalOrdersChart() {
    const bgMaxValue = 5000;
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
        fetchFromAPI('Top Products').then(data => {
            setchartData(data);
            setLoading(false);
        }).catch(error => {
            console.error(`API Error: ${error}`);
            setLoading(false);
        })
    }, []);

    if (loading) return <TopProductsbyTotalOrdersSkeleton />;

    const data = {
        labels: chartData.map(item => item.product),
        datasets: [
            {
                label: 'Top Product',
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
                }
            },
            {
                label: 'Top Product',
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
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        grouped: false, 
        animation: {
            duration: 2000,
            easing: 'easeOutQuart' as const,
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end' as const,
                align: 'right' as const,
                color: '#006fff',
                font: { weight: 600 as const },
                formatter: (value: any) => {
                    return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : parseInt(value);
                },
                offset: 5,
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                max: bgMaxValue,
            },
            y: {
                grid: { display: false },
                ticks: {
                    color: '#006fff',
                    font: {
                        weight: 600 as const,
                        size: 12
                    }, 
                    callback: function(this: any, value: any) {
                        const label = this.getLabelForValue(value);
                        return label.length > 8 ? label.substr(0, 8) + '..' : label; 
                    },
                    autoSkip: false,
                },
                border: { display: false }
            }
        },
        layout: {
            padding: { right: 25 }
        }
    }
    
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-2/3 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-0">
                Top 10 Products by Total Orders
            </h2>
            <div className="h-[calc(100%-40px)] w-full mt-0">
                <Bar key="top-products-chart" data={data} options={options} />
            </div>
        </div>
    )
}