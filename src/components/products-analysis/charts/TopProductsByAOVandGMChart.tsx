"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, LineElement, LineController, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

import TopProductsbyAOVandGMSkeleton from '../skeletal-loading/TopProductsbyAOVandGMSkeleton';
import { fetchFromAPI } from '@/data/fetchFromAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

const gmData = [68.1, 68.4 ,68.8 ,69.0 ,68.9 ,68.9 ,69.1 ,69.1 ,68.3 ,68.9];

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];


export default function TopProductByAOVandGMChart() {
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
    
    if (loading) return <TopProductsbyAOVandGMSkeleton />;

    const handleChageBarColors = chartData.map(() => {
        return barColors[Math.floor(Math.random() * barColors.length)];
    });

    const data = {
        labels: chartData.map(item => item.product),
        datasets: [
            {
                type: 'line' as const,
                label: 'GM%',
                data: chartData.map(item => { 
                    if (item.gm_percent != 0) {
                        return parseFloat(item.gm_percent).toFixed(1);
                    }
                    return 0;
                }),
                borderColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4, 
                pointBackgroundColor: '#ffffff', 
                pointHoverRadius: 6, 
                fill: false,
                tension: 0.4, 
                order: 1,
                yAxisID: 'y1',
                datalabels: {
                    align: 'bottom',
                    anchor: 'end',
                    color: '#ffffff',
                    formatter: (value: any) => (value + "%"),
                    font: { weight: 600, size: 14 },
                    offset: 6,
                }
            },
            {
                type: 'bar' as const, 
                label: 'AOV',
                data: chartData.map(item => item.aov),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 25,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    color: '#ffffff',
                    formatter: (value: any) => {
                        const intValue = parseInt(value);
                        if (intValue >= 1000000) {
                            return (intValue / 1000000).toFixed(1) + 'M';
                        } else if (intValue >= 1000) {
                            return (intValue / 1000).toFixed(1) + 'K';
                        }
                        return intValue;
                    },
                    font: { weight: 600, size: 14 },
                }
            },
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
                    },
                }
            },
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        font: {
                            weight: 600,
                            size: 14
                        },
                        color: '#006fff'
                        
                    }
                },
                datalabels: {
                    display: true
                }
            },
            scales: {
                y: {
                    display: false,
                    
                },
                y1: {
                    display: false,
                    ticks: {
                        callback: (value: any) => (value / 1000000) + 'M'
                    }
                },
                x: {
                    ticks: {
                        color: '#006fff',
                        font: {
                            weight: 600,
                            size: 12
                        }, 
                        callback: function(value) {
                            const label = this.getLabelForValue(value);
                            return label.length > 8 ? label.substr(0, 8) + '..' : label; 
                        },
                        maxRotation: 0,
                        minRotation: 0,
                        padding: 10,
                        autoSkip: false,
                    }
                }
            },
        };
    
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold">
                Top 10 Products by AOV & GM%
            </h2>
            <div className="h-full w-full py-5">
                <Bar key="top-products-aov-gm-chart" data={data} options={options} />
            </div>
        </div>
    )
}
