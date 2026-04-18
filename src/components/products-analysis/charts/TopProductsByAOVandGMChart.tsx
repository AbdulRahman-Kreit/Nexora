"use client";
import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,PointElement, LineElement, LineController, Title, Tooltip, Legend, plugins } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

const aovData = [
    { product: "Hydrolyzed Whey", value: 11300 },
    { product: "Concentrated Whey", value: 10400 },
    { product: "Pure Casein", value: 8900 },
    { product: "Isolate Whey", value: 8300 },
    { product: "100% Egg Protein", value: 6500 },
    { product: "Blended Protein", value: 5500 },
    { product: "100% Vegan Protein", value: 3600 },
    { product: "STEAK in Powder", value: 3300 },
    { product: "PRO Weight lose", value: 2200 },
    { product: "Serious MASS Gainer", value: 1600 }
];

const gmData = [68.1, 68.4 ,68.8 ,69.0 ,68.9 ,68.9 ,69.1 ,69.1 ,68.3 ,68.9];

const barColors = ['#0085ff', '#69b4ff', '#e0ffff', '#006fff'];

const handleChageBarColors = aovData.map(() => {
    return barColors[Math.floor(Math.random() * barColors.length)];
});

export default function TopProductByAOVandGMChart() {
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
        labels: aovData.map(item => item.product),
        datasets: [
            {
                type: 'line' as const,
                label: 'GM%',
                data: gmData.map(item => item),
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
                data: aovData.map(item => item.value),
                backgroundColor: handleChageBarColors,
                borderRadius: 5,
                barThickness: 25,
                order: 2,
                yAxisID: 'y',
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    color: '#ffffff',
                    formatter: (value: any) => (value / 1000) + 'K',
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
                        }
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
