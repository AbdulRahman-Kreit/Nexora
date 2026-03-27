"use client";
import React from 'react';
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
    { product: "Whey Pro...", value: 2600 },
    { product: "Gainer", value: 2000 },
    { product: "BCAA", value: 1800 },
    { product: "Egg Protein", value: 1600 },
    { product: "Jerseys", value: 1400 },
    { product: "Casein Pro...", value: 1400 },
    { product: "Vitamins", value: 1300 },
    { product: "Vests", value: 1200 },
    { product: "Meal Repl...", value: 1100 },
    { product: "Blended P...", value: 1100 }
];

export default function TopProductsbyTotalOrdersChart() {
    const bgMaxValue = 5000;

    const data = {
        labels: chartData.map(item => item.product),
        datasets: [
            {
                label: 'Top Product',
                data: chartData.map(item => item.value),
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
                },
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
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        grouped: false, 
        animation: {
            duration: 2000,
            easing: 'easeOutQuart',
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: 'end',
                align: 'right',
                color: '#006fff',
                font: { weight: 600 },
                formatter: (value) => `${value / 1000}K`,
                offset: 5,
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                max: bgMaxValue 
            },
            y: {
                grid: { display: false },
                ticks: { color: '#006fff', font: { weight: 600 } },
                border: { display: false }
            }
        },
        layout: {
            padding: { right: 5 }
        }
    }
    
    return (
        <div className={`bg-linear-to-r from-[#151a21] to-[#161616] ml-1 
        p-6 h-96 border-l-3 border-[#4a7fce]`}>
            <h2 className="text-gray-500 font-semibold mb-4">
                Top 10 Orders by Total Orders
            </h2>
            <Bar data={data} options={options} />
        </div>
    )
}
